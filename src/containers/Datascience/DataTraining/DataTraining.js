import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout, PageHeader, Button } from 'antd';

import * as action from '../../../store/actions/index'
import Collection from '../../../components/Datascience/DataTraining/Collection/Collection'
import ProjectWorkspace from '../../../components/Datascience/DataTraining/ProjectWorkspace/ProjectWorkspace'
import NewCollection from '../../../components/Datascience/DataTraining/Collection/NewCollection/NewCollection'

const { Content, Sider } = Layout;

class DataTraining extends React.Component {
    componentDidMount() {
        this.props.onFetchCollections()
    }

    setCollections = () => {
        if (this.props.collections) {
            const collections = this.props.collections.data
            return (
                <Collection collections={collections} />
            )
        }

    }
    render() {
        return (
            <Layout>
                <Content>
                    <Layout style={{ minHeight: '88vh' }}>
                        <Layout style={{ minHeight: '88vh' }}>
                            <Sider
                                width="250"
                                style={{ backgroundColor: '#f5f5f5' }}
                            >
                                <PageHeader
                                    style={{ backgroundColor: 'transparent' }}
                                    subTitle={<Button><NewCollection /></Button>}
                                />
                                {this.setCollections()}
                            </Sider>
                            <Content>
                                <ProjectWorkspace />
                            </Content>
                        </Layout>
                    </Layout>
                </Content>
            </Layout>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        collections: state.collection.collections
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchCollections: () => dispatch(action.getCollections())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataTraining));