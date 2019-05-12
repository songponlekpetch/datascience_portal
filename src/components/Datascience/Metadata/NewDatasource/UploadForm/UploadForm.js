import React from 'react'
import { connect } from 'react-redux'
import { Form, Input } from 'antd';

import * as action from '../../../../../store/actions/index'
import SourceType from '../SourceType/SourceType'

class UploadForm extends React.Component {
    state = {
        datasourceForm: {
            name: null,
            description: null,
            selectedFile: null,
            fileType: null
        }

    }

    componentDidUpdate() {
        this.props.onNewDatasourceForm(this.state.datasourceForm)
    }

    uploadFile = async (selectedFile) => {
        let datasource = this.state.datasourceForm
        datasource.selectedFile = selectedFile
        await this.setState({ datasourceForm: datasource })
    }

    updateName = async (value) => {
        let datasource = this.state.datasourceForm
        datasource.name = value
        await this.setState({ datasourceForm: datasource })
    }

    updateDescription = async (value) => {
        let datasource = this.state.datasourceForm
        datasource.description = value
        await this.setState({ datasourceForm: datasource })
    }

    updateFileType = async (value) => {
        let datasource = this.state.datasourceForm
        datasource.fileType = value
        await this.setState({ datasourceForm: datasource })
    }

    inputValue = (event) => {
        switch (event.target.id) {
            case 'name':
                this.updateName(event.target.value)
                break
            case 'description':
                this.updateDescription(event.target.value)
                break
            default:
                break

        }
    }

    render() {
        return (
            <div>
                <Form layout='vertical'>
                    <Form.Item
                        label="Datasource name"
                        formLayout="vertical"
                    >
                        <Input id="name" placeholder="Datasource name" onChange={this.inputValue} />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        formLayout="vertical"
                    >
                        <Input id="description" placeholder="Datasource description" onChange={this.inputValue} />
                    </Form.Item>
                    <Form.Item label="Upload file" >
                        <SourceType uploadFile={this.uploadFile} updateFileType={this.updateFileType} />
                    </Form.Item>

                </Form>
            </div>
        );
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        onNewDatasourceForm: (datasourceForm) => dispatch(action.newDatasource(datasourceForm))
    }
}

export default connect(null, mapDispatchToProps)(UploadForm);