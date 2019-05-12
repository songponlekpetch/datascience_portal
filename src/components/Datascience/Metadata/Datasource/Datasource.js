import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Layout, PageHeader, Tabs, } from 'antd';

import * as action from '../../../../store/actions/index'
import DataTable from './DataTable/DataTable'
import DataDict from './DataTable/DataDict'
import DeleteDatasource from './DeleteDatasource/DeleteDatasource'

const TabPane = Tabs.TabPane;

class Datasource extends React.Component {

    componentDidMount() {
        this.props.onFetchDatasource(this.props.match.params.datasourceId)
    }

    datasourceHeader = () => {
        const data = this.props.metadata
        if (data) {
            return (
                <PageHeader
                    style={{ width: '100%', margin: 'auto' }}
                    onBack={() => this.props.history.push(`/datascience/metadata`)}
                    title={data.datasource_name}
                    extra={[
                        <DeleteDatasource key="2" datasourceId={data.datasource_id} />,
                    ]}
                    footer={
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Data" key="1">
                                <DataTable datasourceId={this.props.match.params.datasourceId} />
                            </TabPane>
                            <TabPane tab="Data Dictionary" key="2" >
                                <br />
                                <DataDict table={this.props.header} metadata={this.props.metadata} />
                            </TabPane>
                        </Tabs>

                    }
                >
                    <div>Description : {data.datasource_description || 'No Description'}</div>

                </PageHeader>
            )
        }

    }

    render() {
        return (
            <Layout>
                {this.datasourceHeader()}
            </Layout>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        metadata: state.datasource.datasource.metadata,
        header: state.datasource.datasource.header
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchDatasource: (id) => dispatch(action.getDatasource(id))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Datasource));

