import React from 'react';
import { Drawer } from 'antd';

import datascienceAPI from '../../apis/datascienceAPI'
import './Home.css';
import WorkSpace from '../../components/Home/WorkSpace/WorkSpace';

class Home extends React.Component {
    state = { visible: true, placement: 'top' };
    componentDidMount() {
        if (localStorage.getItem('accessToken')) {
            datascienceAPI.get(`/check`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    this.props.history.push(`/datascience/lab`)
                })
                .catch(error => {
                    console.log(error)
                    return 0
                })
        }
    }
    render() {
        return (
            <div className="home">
                <Drawer
                    placement={this.state.placement}
                    closable={false}
                    visible={this.state.visible}
                    height={'95vh'}
                    style={{ backgroundColor: '#fa541c' }}
                >
                    <WorkSpace />
                </Drawer>

            </div>
        )
    }
}

export default Home;