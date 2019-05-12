import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Layout, List, Card, PageHeader, Divider, Button, Icon, Typography } from 'antd';

import * as action from '../../../../store/actions/index'
import NewDatasource from '../NewDatasource/NewDatasource'

const { Content, } = Layout;
const { Meta } = Card;
const { Title } = Typography;

class DatasourceList extends React.Component {
    componentDidMount() {
        this.props.onFetchDatasources()
    }

    datasourceHeader = () => {
        return (
            <PageHeader
                title="Datasources"
                extra={[<Button key='1'><NewDatasource /></Button>]}

            />
        )
    }
    route = (title) => {
        this.props.history.push(`/datascience/metadata/${title}`)
    }

    datasources = (data) => {
        if (data) {
            return (
                <List
                    grid={{
                        gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 4,
                    }}
                    dataSource={data}
                    renderItem={(item, index) => (
                        <List.Item key={index}>
                            <Card
                                hoverable
                                onClick={() => { this.route(item.datasource_id) }}
                                key={index}
                            >
                                <Meta
                                    key={index}
                                    avatar={
                                        <Icon
                                            type="database"
                                            theme="twoTone"
                                            twoToneColor="#fa541c"
                                            style={{ fontSize: '32px' }}
                                        />
                                    }
                                    title={
                                        <div>
                                            {<Title level={4}>{item.datasource_name}</Title>}
                                        </div>}
                                    description={
                                        item.datasource_description ? item.datasource_description : 'No description'
                                    }
                                />

                            </Card>
                        </List.Item>
                    )}
                />
            )
        }

    }

    render() {
        return (
            <Layout>
                <div>
                    {this.datasourceHeader()}
                </div>
                <Divider />
                <Content>{this.datasources(this.props.datasources)}</Content>
            </Layout>

        )
    }
}

const mapStateToProps = state => {
    return {
        datasources: state.datasource.datasources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasources: () => dispatch(action.getDatasources())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatasourceList));

