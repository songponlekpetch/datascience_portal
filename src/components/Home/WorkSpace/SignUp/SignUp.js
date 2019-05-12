import React from 'react'
import { Form, Input, Button, Icon, DatePicker, Divider, Radio, message, Spin, Select } from 'antd';

import datascienceAPI from '../../../../apis/datascienceAPI'

const RadioGroup = Radio.Group;
const { Option } = Select;
const initialState = {
    registerForm: {
        email: {
            value: null,
            rule: {
                type: 'email',
                required: true,
                message: 'Please input your email'
            },
            touch: false,
            validated: true
        },
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
        firstname: {
            value: null,
            rule: {
                type: 'text',
                required: true,
                message: 'Please input your firstname'
            },
            touch: false,
            validated: true
        },
        lastname: {
            value: null,
            rule: {
                type: 'text',
                required: true,
                message: 'Please input your firstname'
            },
            touch: false,
            validated: true
        },
        birthDate: {
            value: null,
            validated: true,
            rule: {
                type: 'default',
            }
        },
        mobilePhone: {
            value: null,
            rule: {
                type: 'mobilePhone',
                required: true,
                message: 'Please input your mobile phone'
            },
            touch: false,
            validated: true
        },
        gender: {
            value: null,
            validated: true,
            rule: {
                type: 'default',
            }
        }
    },
    hasSpin: false
}

class SignUp extends React.Component {
    state = initialState

    inputChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'email': return this.setRegisterFormInput('email', value)
            case 'password': return this.setRegisterFormInput('password', value)
            case 'confirmPassword': return this.setRegisterFormInput('confirmPassword', value)
            case 'firstname': return this.setRegisterFormInput('firstname', value)
            case 'lastname': return this.setRegisterFormInput('lastname', value)
            case 'mobilePhone': return this.setRegisterFormInput('mobilePhone', value)
            default: break
        }
    }

    setRegisterFormInput = async (name, value) => {
        const registerForm = this.state.registerForm
        if (!registerForm[name].touch) {
            if (name === 'confirmPassword') {
                registerForm[name].validated = false
            } else {
                registerForm[name].validated = this.checkValidatedInput(registerForm, name, value)
            }

            registerForm[name].touch = true
        }
        else {
            registerForm[name].validated = this.checkValidatedInput(registerForm, name, value)
        }

        registerForm[name].value = value
        await this.setState({ registerForm })

    }

    checkValidatedInput = (registerForm, name, value) => {
        const rule = registerForm[name].rule
        switch (rule.type) {
            case 'email': return true ? (/\w+[@]\w+[.]\w+/).test(value) : false
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
            case 'mobilePhone': {

                if ((/\d+/).test(value)) {

                    if ((/^0\d+/).test(value)) {
                        if (value.length === 10) {
                            return true
                        }
                        else {
                            return false
                        }
                    }
                    if (value.length === 9) {

                        return true
                    }
                    else {
                        return false
                    }
                }
                break

            }
            default:
                return true


        }
    }



    birthDateChange = (date, dateString) => {
        this.setRegisterFormInput('birthDate', dateString)
    }

    genderChange = (e) => {
        this.setRegisterFormInput('gender', e.target.value)
    }

    checkInput = () => {
        const registerForm = this.state.registerForm
        const findNull = Object.keys(registerForm).filter((key) => {
            return registerForm[key].value === null || registerForm[key].validated === false
        })
        return findNull.length !== 0 ? true : false
    }

    onSubmit = async () => {
        await this.setState({ hasSpin: true })
        const registerForm = this.state.registerForm
        const payload = {
            'email': registerForm.email.value,
            'password': registerForm.password.value,
            'firstname': registerForm.firstname.value,
            'lastname': registerForm.lastname.value,
            'gender': registerForm.gender.value,
            'birth_date': registerForm.birthDate.value,
            'mobile_phone': registerForm.mobilePhone.value
        }
        await datascienceAPI.post('/register', payload)
            .then(async response => {
                const msg = response.data.message
                message.success(msg);
                await this.setState(initialState)
                await this.setState({ hasSpin: false })
            })
            .catch(error => {
                const msg = error.response.data.message
                message.error(msg);
                this.setState({ hasSpin: false })
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '66',
        })(
            <Select style={{ width: 70 }}>
                <Option value="66">+66</Option>
            </Select>
        );
        return (
            <div style={{ overflow: 'auto', maxHeight: '80vh' }}>
                <div style={{ marginLeft: '20%', textAlign: 'center', width: '70vw', alignContent: 'center', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
                    <Spin tip="Registering..." spinning={this.state.hasSpin}>
                        <Icon type="solution" style={{ fontSize: '100px', color: '#fa541c', marginBottom: '40px' }} />
                        <Divider>Authentication</Divider>
                        <Form.Item
                            hasFeedback={this.state.registerForm.email.touch}
                            validateStatus={this.state.registerForm.email.validated || !this.state.registerForm.email.touch ? 'success' : 'error'}
                            help={this.state.registerForm.email.validated ? null : this.state.registerForm.email.rule.message}
                        >
                            <Input id="email" placeholder="Email" onChange={this.inputChange} noValidate />
                        </Form.Item>
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
                        <Divider>User Information</Divider>
                        <Form.Item
                            hasFeedback={this.state.registerForm.firstname.touch}
                            validateStatus={this.state.registerForm.firstname.validated || !this.state.registerForm.firstname.touch ? 'success' : 'error'}
                            help={this.state.registerForm.firstname.validated ? null : this.state.registerForm.firstname.rule.message}
                        >
                            <Input id="firstname" placeholder="Firstname" onChange={this.inputChange} noValidate />
                        </Form.Item>
                        <Form.Item
                            hasFeedback={this.state.registerForm.lastname.touch}
                            validateStatus={this.state.registerForm.lastname.validated || !this.state.registerForm.lastname.touch ? 'success' : 'error'}
                            help={this.state.registerForm.lastname.validated ? null : this.state.registerForm.lastname.rule.message}
                        >
                            <Input id="lastname" placeholder="Lastname" onChange={this.inputChange} noValidate />
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('date-picker', { rules: [{ type: 'object', required: true, message: 'Please select time!' }] })(
                                <DatePicker id="birthDate" onChange={this.birthDateChange} placeholder="Birth Date" />
                            )}
                        </Form.Item>
                        <Form.Item
                            hasFeedback={this.state.registerForm.mobilePhone.touch}
                            validateStatus={this.state.registerForm.mobilePhone.validated || !this.state.registerForm.mobilePhone.touch ? 'success' : 'error'}
                            help={this.state.registerForm.mobilePhone.validated ? null : this.state.registerForm.mobilePhone.rule.message}
                        >
                            <Input id="mobilePhone" addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Mobile Phone" onChange={this.inputChange} noValidate />
                        </Form.Item>

                        <Form.Item>
                            <RadioGroup onChange={this.genderChange} >
                                <Radio value={'Male'}>Male</Radio>
                                <Radio value={'Female'}>Female</Radio>
                            </RadioGroup>
                        </Form.Item>

                        <Button type="primary" disabled={this.checkInput()} onClick={() => this.onSubmit()} style={{ width: '100%' }}>
                            Sign up
                    </Button>
                    </Spin>
                </div>
            </div>

        )
    }
}

export default Form.create()(SignUp);