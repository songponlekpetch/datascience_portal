import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button, Icon, Divider, message, Spin } from 'antd';

import datascienceAPI from '../../apis/datascienceAPI'

class ConfirmEmail extends React.Component {
    state = {
        hasSpin: false
    }
    onSubmit = (userId) => {
        this.setState({ hasSpin: true })
        datascienceAPI.put(`/confirm/${userId}`)
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
                        <Icon type="solution" style={{ fontSize: '100px', color: '#fa541c', marginBottom: '40px', marginTop: '60px' }} />
                        <Divider>Click for activate your account</Divider>
                        <Button type="primary" onClick={() => this.onSubmit(this.props.match.params.userId)} style={{ width: '100%' }}>
                            Activate
                    </Button>
                    </Spin>
                </div>
            </div>

        )
    }
}

export default withRouter(Form.create()(ConfirmEmail));