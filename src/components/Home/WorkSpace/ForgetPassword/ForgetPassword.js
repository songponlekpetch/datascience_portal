import React from 'react'
import { Modal, Form, Input, message } from 'antd';

import datascienceAPI from '../../../../apis/datascienceAPI'

class ForgetPassword extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.getIinitialState()
    }

    getIinitialState = () => {
        return {
            forgetPasswordForm: {
                email: {
                    value: null,
                    rule: {
                        type: 'email',
                        required: true,
                        message: 'Please input your email'
                    },
                    touch: false,
                    validated: true
                }
            },
            visible: false
        }

    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    }

    handleOk = (e) => {
        const email = this.state.forgetPasswordForm.email.value
        datascienceAPI.post('/forgetpassword', { email: email })
            .then(response => {
                message.success(response.data.message)
                this.setState(this.getIinitialState())
            })
            .catch(error => {
                message.error(error.response.data.message)
            })
    }

    handleCancel = (e) => {
        this.setState(this.getIinitialState());
    }

    inputChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'email': return this.setForgetPasswordInput('email', value)
            default: break
        }
    }

    setForgetPasswordInput = async (name, value) => {
        const forgetPasswordForm = this.state.forgetPasswordForm
        if (!forgetPasswordForm[name].touch) {
            forgetPasswordForm[name].validated = this.checkValidatedInput(forgetPasswordForm, name, value)
            forgetPasswordForm[name].touch = true
        }
        else {
            forgetPasswordForm[name].validated = this.checkValidatedInput(forgetPasswordForm, name, value)
        }

        forgetPasswordForm[name].value = value
        await this.setState({ forgetPasswordForm })

    }

    checkValidatedInput = (forgetPasswordForm, name, value) => {
        const rule = forgetPasswordForm[name].rule
        switch (rule.type) {
            case 'email': return true ? (/\w+[@]\w+[.]\w+/).test(value) : false
            default:
                return true

        }
    }

    render() {
        return (
            <div>
                <span type="primary" onClick={this.showModal}>
                    Forget password?
                </span>
                <Modal
                    title="Forget Password"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="Send email"
                    cancelText="Cancel"
                >
                    <Form.Item
                        label="Email"
                        hasFeedback={this.state.forgetPasswordForm.email.touch}
                        validateStatus={this.state.forgetPasswordForm.email.validated || !this.state.forgetPasswordForm.email.touch ? 'success' : 'error'}
                        help={this.state.forgetPasswordForm.email.validated ? null : this.state.forgetPasswordForm.email.rule.message}
                    >
                        <Input id="email" placeholder="Email" onChange={this.inputChange} noValidate />
                    </Form.Item>
                </Modal>
            </div>
        );
    }
}

export default Form.create()(ForgetPassword);