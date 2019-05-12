import React from 'react'
import { Modal, Button, Form, Input } from 'antd';

const initialState = {
    visible: false,
    value: null
}
class EditDataset extends React.Component {
    state = initialState

    showModal = () => {
        this.setState({
            visible: true,
            value: this.props.value.text
        });
    }

    handleOk = (e) => {
        this.props.edited(this.props.value.yCol, this.props.value.index, this.state.value)
        this.setState(initialState);
    }

    handleCancel = (e) => {
        this.setState(initialState);
    }

    inputValue = (e) => {
        this.setState({ value: e.target.value })
    }

    render() {
        return (
            <div>
                <Button icon="edit" type="dashed" shape="circle" onClick={this.showModal} />
                <Modal
                    title={`Edit ${this.props.value.yCol}`}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" onClick={this.handleOk}>
                            Edit
                        </Button>,
                    ]}
                >
                    <Form.Item label={this.props.value.yCol}>
                        <Input id={this.props.value.yCol} defaultValue={this.state.value} onChange={this.inputValue} />
                    </Form.Item>
                </Modal>
            </div>
        );
    }
}

export default EditDataset;