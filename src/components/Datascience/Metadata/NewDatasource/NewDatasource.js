import React from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Button, Progress, message } from 'antd';

import * as action from '../../../../store/actions/index'
import datascienceAPI from '../../../../apis/datascienceAPI'
import UploadForm from './UploadForm/UploadForm'

class NewDatasource extends React.Component {
    state = {
        visible: false,
        loading: false,
        progressing: 0
    }
    clearState = () => {
        this.setState({
            visible: false,
            loading: false,
            progressing: 0
        });
    }


    showModal = () => {
        this.setState({
            visible: true
        });
    }

    handleOk = (e) => {
        this.setState({
            loading: true
        });

        const data = this.props.datasourceForm
        const datasourceName = data.name
        const formData = new FormData()
        formData.append('datasource_description', data.description)
        formData.append('upload_file', data.selectedFile, data.selectedFile.name)

        datascienceAPI.post(`/datascience/datasource/${datasourceName}`, formData, {
            onUploadProgress: progressEvent => {
                const progress = progressEvent.loaded / progressEvent.total
                this.setState({ progressing: progress * 100 })
            }
        }
        ).then(response => {
            this.props.onFetchDatasources()
            this.clearState()
        }).catch(error => {
            this.clearState()
            message.error(error.response.data.message)
        })


    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }

    footer = () => {
        return (
            [
                <span key="1">{this.state.loading ? <Progress key="1" percent={this.state.progressing} /> : null}</span>,
                <Button key="2" onClick={this.handleCancel}>Close</Button>,
                <Button key="3" type="primary" loading={this.state.loading} onClick={this.handleOk}>
                    Upload
                </Button>
            ]
        )
    }

    render() {
        return (
            <div>
                <div type="primary" onClick={this.showModal} style={{ cursor: 'pointer' }}>
                    <Icon type="plus" />New Datasource
                </div>
                <Modal
                    title="New Datasource"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        this.footer()
                    }
                >
                    <UploadForm />
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        datasourceForm: state.datasource.datasourceForm
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasources: () => dispatch(action.getDatasources())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDatasource);