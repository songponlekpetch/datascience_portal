import React from 'react'
import { Menu, Dropdown, Button, Icon } from 'antd';

import UploadFile from './UploadFile/UploadFile'

class MakePrediction extends React.Component {

    uploadFile = (selectedFile, type) => {
        this.props.uploadFile(selectedFile, type)
    }

    menu = (
        <Menu>
            <Menu.Item key="1"><UploadFile uploadFile={this.uploadFile} type="csv" accept=".csv" /></Menu.Item>
            <Menu.Item key="2"><UploadFile uploadFile={this.uploadFile} type="excel" accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" /></Menu.Item>
        </Menu>
    )

    render() {
        return (
            <div>
                <Dropdown overlay={this.menu}>
                    <Button style={{ marginLeft: 8 }}>
                        Get Data <Icon type="down" />
                    </Button>
                </Dropdown>
            </div>
        );
    }
}

export default MakePrediction;