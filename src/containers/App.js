import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import "antd/dist/antd.css";
import { Layout } from 'antd';

import NavBar from '../components/NavBar/NavBar'
import MainRoute from '../routes/MainRoute'

const { Header } = Layout;

class App extends React.Component {
    render() {
        return (
            <Router>
                <Layout >
                    <Header style={{ backgroundColor: '#fafafa', borderBottom: '5px solid #e8e8e8' }}>
                        <NavBar />
                    </Header>
                    <MainRoute />
                </Layout>
            </Router>
        )
    }
}

export default App;