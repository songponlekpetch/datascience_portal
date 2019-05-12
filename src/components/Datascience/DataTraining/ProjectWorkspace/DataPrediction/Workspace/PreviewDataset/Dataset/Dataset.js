import React from 'react'
import { Table, } from 'antd';

import EditDataset from './EditDataset/EditDataset'

class Dataset extends React.Component {
    editValue = (column, index, value) => {
        console.log(column, index, value)
        this.props.editDataset(column, index, value)
    }
    getColumns = (header) => {
        if (header) {
            const columns = header.map((item, index) => {
                return (
                    {
                        title: item.name,
                        dataIndex: item.name,
                        key: index,
                        render: item.name === this.props.yCol ? (text, record, index) => {
                            return (
                                <div>
                                    <EditDataset value={{ yCol: this.props.yCol, index, text }} edited={this.editValue} />
                                    <div style={{ color: '#fa541c' }}>
                                        {text}
                                    </div>
                                </div>
                            )
                        } : null
                    }
                )
            })
            return columns
        }

    }

    getData = (data) => {
        if (data) {
            return data.map((item, index) => {
                item.key = index
                return item
            })
        }
    }

    getTable = (dataset) => {
        return (
            <Table
                columns={this.getColumns(dataset.header)}
                dataSource={this.getData(dataset.data)}
                bordered
                size="middle"
            />
        )
    }
    render() {
        return (
            <div style={{ width: '100%', overflow: 'auto' }}>
                {this.getTable(this.props.dataset)}
            </div>

        )
    }
}

export default Dataset;
