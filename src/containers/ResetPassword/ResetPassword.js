import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Icon, Divider, message, Spin, Input } from 'antd';

import datascienceAPI from '../../apis/datascienceAPI'

const initialState = {
    resetForm: {
        password: {
            value: null,
            rule: {
                type: 'password',
                required: true,
                message: 'Please input your password'
            },
            touch: false,
            validated: true
        },
        confirmPassword: {
            value: null,
            rule: {
                type: 'confirmPassword',
                required: true,
                message: 'Confirm password should be matched with password'
            },
            touch: false,
            validated: true
        },
    },
    hasSpin: false
}

class ResetPassword extends React.Component {
    state = initialState

    inputChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'password': return this.setRegisterFormInput('password', value)
            case 'confirmPassword': return this.setRegisterFormInput('confirmPassword', value)
            default: break
        }
    }

    setResetFormInput = async (name, value) => {
        const resetForm = this.state.resetForm
        if (!resetForm[name].touch) {
            if (name === 'confirmPassword') {
                resetForm[name].validated = false
            } else {
                resetForm[name].validated = this.checkValidatedInput(resetForm, name, value)
            }

            resetForm[name].touch = true
        }
        else {
            resetForm[name].validated = this.checkValidatedInput(resetForm, name, value)
        }

        resetForm[name].value = value
        await this.setState({ resetForm })

    }

    checkValidatedInput = (registerForm, name, value) => {
        const rule = registerForm[name].rule
        switch (rule.type) {
            case 'password': {
                if (value.length >= 6) {
                    if (!registerForm['confirmPassword'].touch || value === registerForm['confirmPassword'].value) {
                        registerForm['confirmPassword'].validated = true
                    } else {
                        registerForm['confirmPassword'].validated = false
                    }

                    return true
                } else {
                    return false
                }
            }
            case 'confirmPassword': {
                if (value && value.length > 0) {
                    if (value === registerForm['password'].value) {
                        return true
                    } else {
                        return false
                    }
                } else {
                    return false
                }

            }
            case 'text': {
                if (rule.required) {
                    if (value && value.length > 0) {
                        return true
                    } else {
                        return false
                    }
                }
                break
            }
            default:
                return true


        }
    }

    checkInput = () => {
        const resetForm = this.state.resetForm
        const findNull = Object.keys(resetForm).filter((key) => {
            return resetForm[key].value === null || resetForm[key].validated === false
        })
        return findNull.length !== 0 ? true : false
    }

    onSubmit = (userId) => {
        this.setState({ hasSpin: true })
        datascienceAPI.put(`/resetpassword/${userId}`, { password: this.state.resetForm.password.value })
            .then(response => {
                message.success(response.data.message)
                this.setState({ hasSpin: false })
                this.props.history.push(`/`)
            })
            .catch(error => {
                message.error(error.data.message)
                this.setState({ hasSpin: false })
            })
    }


    render() {
        return (
            <div style={{ overflow: 'auto', minHeight: '90vh' }}>
                <div style={{ marginLeft: '20%', textAlign: 'center', width: '70vw', alignContent: 'center', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
                    <Spin tip="Activating..." spinning={this.state.hasSpin}>
                        <Icon type="key" style={{ fontSize: '100px', color: '#fa541c', marginBottom: '40px', marginTop: '60px' }} />
                        <Divider>Reset Password</Divider>
                        <Form.Item
                            hasFeedback={this.state.registerForm.password.touch}
                            validateStatus={this.state.registerForm.password.validated || !this.state.registerForm.password.touch ? 'success' : 'error'}
                            help={this.state.registerForm.password.validated ? null : this.state.registerForm.password.rule.message}
                        >
                            <Input id="password" placeholder="Password" type="password" onChange={this.inputChange} noValidate />
                        </Form.Item>
                        <Form.Item
                            hasFeedback={this.state.registerForm.confirmPassword.touch}
                            validateStatus={this.state.registerForm.confirmPassword.validated || !this.state.registerForm.confirmPassword.touch ? 'success' : 'error'}
                            help={this.state.registerForm.confirmPassword.validated ? null : this.state.registerForm.confirmPassword.rule.message}
                        >
                            <Input id="confirmPassword" placeholder="Confirm Password" type="password" onChange={this.inputChange} noValidate />
                        </Form.Item>
                        <Button type="primary" disabled={this.checkInput()} onClick={() => this.onSubmit(this.props.match.params.userId)} style={{ width: '100%' }}>
                            Activate
                        </Button>
                    </Spin>
                </div>
            </div>

        )
    }
}

export default withRouter(Form.create()(ResetPassword));