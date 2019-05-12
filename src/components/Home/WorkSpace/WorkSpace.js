import React from 'react'
import { Drawer } from 'antd';

import './WorkSpace.css'
import SignUp from './SignUp/SignUp'
import SignIn from './SignIn/SignIn'
import ForgetPassword from './ForgetPassword/ForgetPassword'
import { ReactComponent as Logo } from '../../../assets/img/Logo_ITG.svg'
import { ReactComponent as Logo1 } from '../../../assets/img/Logo_ITG1.svg'

class WorkSpace extends React.Component {
    state = { childrenDrawer: false };
    showChildrenDrawer = () => {
        this.setState({
            childrenDrawer: true,
        });
    };

    onChildrenDrawerClose = () => {
        this.setState({
            childrenDrawer: false,
        });
    };

    render() {
        return (
            <div >
                <div style={{ marginLeft: '20%', textAlign: 'center', width: '60vw', alignContent: 'center', alignItems: 'center', maxWidth: '300px', margin: 'auto' }}>
                    <Logo style={{ width: '200px', height: '30vh', }} />
                    <SignIn />

                    <br />
                    <br />
                    <span>
                        <span style={{ cursor: 'pointer', display: 'inline-block', color: '#1890ff' }}>
                            <ForgetPassword />
                        </span>
                        <span style={{ display: 'inline-block', color: '#1890ff' }}>
                            &nbsp; or &nbsp;
                        </span>
                        <span onClick={this.showChildrenDrawer} style={{ cursor: 'pointer', display: 'inline-block', color: '#fa541c' }}>
                            Register now
                    </span>
                    </span>

                    <Drawer
                        title={<Logo1 style={{ width: '60px', height: '40px', }} />}
                        placement="top"
                        height={"100%"}
                        onClose={this.onChildrenDrawerClose}
                        visible={this.state.childrenDrawer}
                    >
                        <SignUp />
                    </Drawer>
                </div>
            </div>

        )
    }
}

export default WorkSpace;

