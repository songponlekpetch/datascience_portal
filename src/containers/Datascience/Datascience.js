import React from 'react'
import { withRouter } from 'react-router-dom';
import { Layout, Icon, Divider } from 'antd';
import './Datascience.css'

import DatascienceRoute from '../../routes/DatascienceRoute'
import Menubar from '../../components/Datascience/MenuBar/MenuBar'

const { Content, Sider } = Layout;


class Datascience extends React.Component {
    state = {
        collapsed: false,
    };

    componentDidMount() {
        if (localStorage.getItem('accessToken')) {

        } else {
            this.props.history.push(`/`)
        }
    }

    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }


    render() {
        return (

            <Layout style={{ minHeight: '90vh' }}>

                <Sider
                    theme="light"
                    width="250"
                    className="background"

                >
                    <div className="logo" style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
                        <Icon type="deployment-unit" style={{ fontSize: '30px', color: 'white' }} />
                        <h4 style={{ color: 'white' }}>ITG Data Science</h4>
                    </div>
                    <Divider />
                    <Menubar />
                </Sider>

                <Content style={{ margin: '10px 10px 0', overflow: 'initial' }}>
                    <DatascienceRoute />
                </Content>
            </Layout>

        );
    }
}

export default withRouter(Datascience);