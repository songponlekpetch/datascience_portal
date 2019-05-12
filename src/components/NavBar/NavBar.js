import React from 'react'
import { Row, Col } from 'antd';

import '../NavBar/NavBar.css'
import logo from '../../assets/img/itg_logo.png'
import Logout from './Logout/Logout'

class Navbar extends React.Component {
    state = {
        current: 'mail',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {
        return (
            <div >
                <Row>
                    <Col span={2}>
                        <div>
                            <img src={logo} alt="Intelligist Platform" style={{ marginLeft: '-20px', maxHeight: '30px' }} />
                        </div>

                    </Col>
                    <Col span={1}>

                    </Col>
                    <Col span={19}>

                    </Col>
                    <Col span={2}>
                        <div style={{ float: 'right' }}>
                            <Logout />
                        </div>

                    </Col>
                </Row>
            </div>
        );
    }
}

export default Navbar;