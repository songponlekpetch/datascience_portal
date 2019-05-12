import React from 'react'
import { Modal, Button } from 'antd';

import Dataset from './Dataset/Dataset'

class PreviewDataset extends React.Component {
    state = {
        visible: false
    }
    componentDidUpdate() {
        if (this.props.preDataset.visible !== this.state.visible) {
            this.setState({ visible: !this.state.visible })
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = () => {
        this.props.onSubmit()
    }

    handleCancel = () => {
        this.props.onClose()
    }
    render() {
        return (
            <Modal
                visible={this.state.visible}
                title="Data Preview"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" onClick={this.handleOk}>
                        Load
                    </Button>,
                ]}
            >
                {this.state.visible ? <Dataset dataset={this.props.preDataset} /> : null}
            </Modal>
        )
    }
}

export default PreviewDataset;