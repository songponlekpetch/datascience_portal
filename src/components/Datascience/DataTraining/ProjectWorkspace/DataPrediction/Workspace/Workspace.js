import React from 'react'
import { CSVDownload } from "react-csv"
import { Layout, Spin, Steps, Icon, Divider, Button, Form, message } from 'antd';

import datascienceAPI from '../../../../../../apis/datascienceAPI'
import MakePrediction from './MakePrediction/MakePrediction'
import PreviewDataset from './PreviewDataset/PreviewDataset'
import Dataset from './PreviewDataset/Dataset/Dataset'

const { Sider, Content, } = Layout;
const Step = Steps.Step;
const initialState = {
    loading: false,
    preDataset: {
        header: null,
        data: null,
        visible: false
    },
    dataset: {
        header: null,
        data: null,
    },
    exportCSV: false
}

class Workspace extends React.Component {
    state = initialState
    uploadFile = async (selectedFile, type) => {
        this.setState({ loading: true })
        const formData = new FormData()
        formData.append('file_type', type)
        formData.append('upload_file', selectedFile, selectedFile.name)
        const experiment = this.props.experiment
        await datascienceAPI.post(`/datascience/preprediction/${experiment.experiment_name}`, formData, {
            onUploadProgress: progressEvent => {
                const progress = progressEvent.loaded / progressEvent.total
                this.setState({ progressing: progress * 100 })
            }
        })
            .then(async response => {
                const preDataset = this.state.preDataset
                preDataset.data = response.data.dataset
                preDataset.header = response.data.header
                preDataset.visible = true
                await this.setState({ preDataset })
                await this.setState({ loading: false })
            })
            .catch(error => {
                this.setState({ loading: false })
            })
    }
    drawerClose = async () => {
        const preDataset = this.state.preDataset
        preDataset.visible = !preDataset.visible
        await this.setState({ preDataset })
    }
    drawerSubmit = async () => {
        const preDataset = this.state.preDataset
        preDataset.visible = !preDataset.visible
        await this.setState({ preDataset })
        await this.setState({ loading: true })
        const experiment = this.props.experiment
        await datascienceAPI.post(`/datascience/prediction/${experiment.experiment_name}`, { data: this.state.preDataset.data })
            .then(async response => {
                const data = response.data.data
                const header = Object.keys(data[0]).map(item => {
                    return {
                        name: item
                    }
                })
                const dataset = this.state.dataset
                dataset.data = data
                dataset.header = header
                this.setState({ dataset })
                const preDataset = this.state.preDataset
                preDataset.visible = false
                await this.setState({ preDataset })
                await this.setState({ loading: false })

            })
            .catch(error => {
                this.setState({ loading: false })
                message.error(error.response.data.message)
            })
    }
    componentDidUpdate() {
        if (this.props.closed === false) {
            if (this.state.preDataset.header) {
                this.setState({
                    preDataset: {
                        header: null,
                        data: null,
                        visible: false
                    },
                    dataset: {
                        header: null,
                        data: null,
                    },
                    exportCSV: false
                })
            }

        }

    }

    editDataset = async (column, index, value) => {
        const dataset = this.state.dataset
        dataset.data[index][column] = value
        await this.setState({ dataset })
    }

    appendDataToDatasource = () => {
        this.setState({ loading: true })
        const dataset = this.state.dataset.data.map(item => {
            const keys = Object.keys(item)
            const newKey = keys.filter(x => {
                return x !== 'key'
            })
            const newItem = {}
            for (let i = 0; i < newKey.length; i++) {
                newItem[newKey[i]] = item[newKey[i]]
            }
            return newItem

        })
        const data = { predicted_data: dataset }
        datascienceAPI.post(`/datascience/prediction/add/${this.props.experiment.datasource_name}`, data)
            .then(response => {
                const msg = response.data.message
                message.success(msg)
                this.setState({ loading: false })
            })
            .catch(error => {
                const msg = error.response.data.message
                message.error(msg)
                this.setState({ loading: false })
            })
    }

    exportDataToCSV = () => {
        this.setState({ exportCSV: true })
    }

    rearrangeDataset = () => {
        const dataset = this.state.dataset.data
        const csv = dataset.map(item => {
            const keys = Object.keys(item)
            const newKey = keys.filter(x => {
                return x !== 'key'
            })
            const newItem = {}
            for (let i = 0; i < newKey.length; i++) {
                newItem[newKey[i]] = item[newKey[i]]
            }
            return newItem

        })
        return csv
    }

    render() {
        return (
            <Spin tip="Loading..." spinning={this.state.loading}>
                <Layout style={{ height: '90vh' }}>
                    <Sider style={{ backgroundColor: 'white' }} >
                        <Steps direction="vertical" size="small" status="process" >
                            <Step
                                title="Experiment"
                                status="process"
                                icon={<Icon type="experiment" />}
                                description={this.props.experiment.experiment_name} />
                            <Step
                                title="Datasource"
                                status="process"
                                icon={<Icon type="database" />}
                                description={this.props.experiment.datasource_name} />
                            <Step
                                title="Model"
                                status="process"
                                icon={<Icon type="thunderbolt" />}
                                description={this.props.experiment.model.model_name} />
                            <Step
                                title="Prediction"
                                status="process"
                                icon={<Icon type="rocket" />}
                                description={this.props.experiment.y_col} />

                        </Steps>
                        <Divider />
                        <Form.Item label="Import Data" >
                            <div style={{ margin: 'auto' }}><MakePrediction uploadFile={this.uploadFile} /></div>
                        </Form.Item>
                        <Divider />
                        <Steps direction="vertical" size="small" status="process" >
                            <Step
                                title="Export Data"
                                status="process"
                                icon={<Icon type="file" />}
                                description={
                                    (

                                        <Button key="save" style={{ margin: 'auto' }} disabled={this.state.dataset.data ? false : true} onClick={() => this.exportDataToCSV()}>CSV</Button>

                                    )}
                            />
                        </Steps>
                        {this.state.exportCSV ? <CSVDownload data={this.rearrangeDataset()} filename={"my-file.csv"} target="_blank" /> : null}
                        <Divider />
                        <Steps direction="vertical" size="small" status="process" >
                            <Step
                                title="Append Data To Datasource"
                                status="process"
                                icon={<Icon type="build" />}
                                description={
                                    (

                                        <Button key="save" style={{ margin: 'auto' }} disabled={this.state.dataset.data ? false : true} onClick={() => this.appendDataToDatasource()}>Save</Button>

                                    )}
                            />
                        </Steps>

                    </Sider>
                    <Content>
                        {this.state.dataset.data ? <Dataset dataset={this.state.dataset} yCol={this.props.experiment.y_col} editDataset={this.editDataset} /> : null}
                    </Content>
                </Layout>
                <PreviewDataset preDataset={this.state.preDataset} onClose={this.drawerClose} onSubmit={this.drawerSubmit} />

            </Spin>
        )
    }
}

export default Workspace;