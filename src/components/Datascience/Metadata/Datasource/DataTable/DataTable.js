import React from 'react'
import { Table, Spin, Pagination } from 'antd';

import datascienceAPI from '../../../../../apis/datascienceAPI'

class DataTable extends React.Component {
    state = {
        header: null,
        data: null,
        hasLoading: true,
        rows: null,
        pageSize: 10
    }

    componentDidMount() {
        this.getData(1)
        this.getPages()

    }

    getPages = () => {
        datascienceAPI.get(`/datascience/datasource/${this.props.datasourceId}/${this.state.pageSize}`)
            .then(async response => {
                await this.setState({ rows: response.data.data.rows })
            })
    }

    getData = async (page) => {
        console.log()
        await this.setState({ hasLoading: true })
        datascienceAPI.get(`/datascience/datasource/${this.props.datasourceId}/${this.state.pageSize}/page/${page}`)
            .then(async response => {
                await this.setState(response.data)
                await this.setState({ hasLoading: false })

            })
    }

    gennerateTable = () => {
        const header = this.state.header
        const data = this.state.data
        if (header) {
            const columns = header.map((header, index) => {
                return {
                    title: header.column_name === 'id' ? <div style={{ color: '#fa541c' }}>{header.column_name}</div> : header.column_name,
                    dataIndex: header.column_name,
                    key: index,
                    render: header.column_name === 'id' ? text => <div style={{ color: '#fa541c' }}>{text}</div> : null
                }
            })

            const dataset = data.map((item, index) => {
                item.key = index
                return item
            })


            return (
                <Table
                    columns={columns}
                    dataSource={dataset}
                    bordered
                    size="middle"
                    pagination={false}
                    style={{ maxHeight: '67vh', overflow: 'auto' }}
                />
            )
        }

    }

    pageChange = (page) => {
        this.getData(page)
    }

    onShowSizeChange = async (current, pageSize) => {
        await this.setState({ pageSize })
        this.getData(current)
        this.getPages()
    }

    render() {
        return (
            <Spin tip="Loading..." spinning={this.state.hasLoading}>
                <div style={{ margin: 'auto', alignItems: 'center', textAlign: 'right' }}>
                    <Pagination
                        defaultCurrent={1}
                        total={this.state.rows}
                        onChange={this.pageChange}
                        showSizeChanger
                        onShowSizeChange={this.onShowSizeChange}
                    />
                    <br />
                    {this.gennerateTable()}
                    <br />
                </div>
            </Spin>

        )
    }
}

export default DataTable;