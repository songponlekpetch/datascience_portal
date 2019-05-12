import React from 'react'
import { Tabs } from 'antd';

import UploadFile from '../UploadForm/UploadFile'

const TabPane = Tabs.TabPane;

class SourceType extends React.Component {
    state = {
        fileType: 'csv'
    }
    componentDidMount() {
        this.props.updateFileType(this.state.fileType)
    }

    uploadFile = (selectedFile) => {
        this.props.uploadFile(selectedFile)
    }

    selectFileType = (key) => {
        this.setState({ fileType: key }, () => {
            this.props.updateFileType(this.state.fileType)
        })
    }

    render() {
        return (
            <div>
                <Tabs tabPosition="top" onChange={this.selectFileType}>
                    <TabPane tab="CSV" key="csv" ><UploadFile uploadFile={this.uploadFile} /></TabPane>
                    <TabPane tab="EXCEL" key="excel" disabled>Content of Tab 2</TabPane>
                    <TabPane tab="XML" key="xml" disabled>Content of Tab 3</TabPane>
                    <TabPane tab="JSON" key="json" disabled>Content of Tab 3</TabPane>
                    <TabPane tab="API" key="api" disabled>Content of Tab 3</TabPane>
                    <TabPane tab="Database" key="database" disabled>Content of Tab 3</TabPane>
                    <TabPane tab="IOT" key="iot" disabled>Content of Tab 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

export default SourceType;