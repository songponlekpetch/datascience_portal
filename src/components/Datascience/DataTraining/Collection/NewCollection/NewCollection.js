import React from 'react'
import { connect } from 'react-redux'
import { Modal, Icon, Button, Form, Input, Alert } from 'antd';

import * as actions from '../../../../../store/actions/index'
import datascienceAPI from '../../../../../apis/datascienceAPI'

class NewCollection extends React.Component {
    state = {
        visible: false,
        input: {
            name: null,
            description: null
        },
        error: {
            status: false,
            message: null
        }
    }
    clearState = () => {
        this.setState({
            visible: false,
        });
    }


    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = async (e) => {
        this.setState({ error: { status: false, message: null } });
        await datascienceAPI.post('/datascience/collection', this.state.input)
            .then((response) => {

                this.props.getCollections()
                this.setState({
                    visible: false,
                });
            })
            .catch((error) => {
                this.setState({ error: { status: true, message: error.response.data.message } });
            })

    }

    handleCancel = (e) => {

        this.setState({
            visible: false,
        });
    }

    handleClose = () => {

        this.setState({ error: { status: false, message: null } });
    }

    footer = () => {
        return (
            [
                <Button key="back" onClick={this.handleCancel}>Close</Button>,
                <Button key="submit" type="primary" onClick={this.handleOk}>
                    New Collection
                </Button>
            ]
        )
    }

    updateName = async (name) => {
        const input = this.state.input
        input.name = name
        await this.setState({ input: input })
    }

    updateDescription = async (description) => {
        const input = this.state.input
        input.description = description
        await this.setState({ input: input })
    }

    inputValue = (e) => {
        switch (e.target.id) {
            case 'name':
                this.updateName(e.target.value)
                break
            case 'description':
                this.updateDescription(e.target.value)
                break
            default:
                break
        }
    }

    render() {
        return (
            <div>
                <div type="primary" onClick={this.showModal} style={{ cursor: 'pointer' }}>
                    <Icon type="plus" />New Collection
                </div>
                <Modal
                    title="New Collection"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={
                        this.footer()
                    }
                >
                    {
                        this.state.error.status ? (
                            <Alert
                                message={this.state.error.message}
                                type="error"
                                closable
                                afterClose={this.handleClose}
                            />
                        ) : null
                    }
                    <br />
                    <div>
                        <Form layout='vertical'>
                            <Form.Item
                                label="Collection name"
                                formLayout="vertical"
                            >
                                <Input id="name" placeholder="Collection name" onChange={this.inputValue} />
                            </Form.Item>
                            <Form.Item
                                label="Description"
                                formLayout="vertical"
                            >
                                <Input id="description" placeholder="Collection description" onChange={this.inputValue} />
                            </Form.Item>

                        </Form>
                    </div>
                </Modal>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getCollections: () => { dispatch(actions.getCollections()) }
    }
}

export default connect(null, mapDispatchToProps)(NewCollection);