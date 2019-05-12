import React from 'react'
import { withRouter } from 'react-router-dom';
import { Input, Form, Button, Icon, Spin, message } from 'antd';

import datascienceAPI from '../../../../apis/datascienceAPI'

const initialState = {
    loginForm: {
        email: null,
        password: null
    },
    hasSpin: false
}

class SignIn extends React.Component {
    state = initialState

    inputValue = (event) => {
        const value = event.target.value
        switch (event.target.id) {
            case 'email': return this.updateEmail(value)
            case 'password': return this.updatePassword(value)
            default: break
        }
    }

    updateEmail = async (value) => {
        const loginForm = this.state.loginForm
        loginForm.email = value
        await this.setState({ loginForm })
    }

    updatePassword = async (value) => {
        const loginForm = this.state.loginForm
        loginForm.password = value
        await this.setState({ loginForm })
    }

    onSummit = async (e) => {
        e.preventDefault()
        this.setState({ hasSpin: true })
        const loginForm = this.state.loginForm
        await datascienceAPI.post(`/login`, loginForm)
            .then(async response => {
                const data = response.data
                const accessToken = data.access_token
                const refreshToken = data.refresh_token
                await localStorage.setItem('accessToken', accessToken)
                await localStorage.setItem('refreshToken', refreshToken)
                this.setState({ hasSpin: false })
                this.props.history.push(`/datascience/lab`)
            })
            .catch(error => {
                message.error(error.response.data.message)
                this.setState({ hasSpin: false })
            })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            < Spin tip="Loging in ..." spinning={this.state.hasSpin}>
                <Form onSubmit={this.onSummit} >
                    <Form.Item >
                        {getFieldDecorator('email')(<Input id="email" placeholder="Email" type="email" onChange={this.inputValue} prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    <Form.Item >
                        {getFieldDecorator('password')(<Input id="password" placeholder="Password" type="password" onChange={this.inputValue} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }} >
                        Log in
                    </Button>
                </Form>
            </ Spin>
        )
    }
}

export default withRouter(Form.create()(SignIn));