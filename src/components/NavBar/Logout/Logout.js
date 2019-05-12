import React from 'react'
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu, Dropdown, Button, Icon } from 'antd';

import datascienceAPI from '../../../apis/datascienceAPI'
import * as action from '../../../store/actions/index'

class Logout extends React.Component {
    logout = () => {
        this.props.onSelectProject(null)
        datascienceAPI.post('/logout', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(response => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                this.props.history.push(`/`)
            })
            .catch(error => {
                localStorage.removeItem('accessToken')
                localStorage.removeItem('refreshToken')
                this.props.history.push(`/`)
            }
            )

    }
    menu = (
        <Menu>
            <Menu.Item key="1" onClick={() => this.logout()}><Icon type="logout" />Logout</Menu.Item>
        </Menu>
    );
    render() {
        return (
            <div>
                <Dropdown overlay={this.menu}>
                    <Button type="primary" shape="circle" icon="user" style={{ marginLeft: 8 }} />
                </Dropdown>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        onSelectProject: (projects) => dispatch(action.selectProject(projects)),
    }
}

export default connect(null, mapDispatchToProps)(withRouter(Logout));