import React from 'react';
import { Table } from 'antd';

const columns = [{
    title: 'Name',
    dataIndex: 'column_name',
},
{
    title: 'Data Type',
    dataIndex: 'data_type',
},

];

class DataDict extends React.Component {
    render() {
        return (
            <Table
                columns={columns}
                dataSource={this.props.table}
                bordered
                size="small"
                title={() => (
                    <div>
                        <div>
                            <b>DATASOURCE ID : {this.props.metadata.datasource_id}</b>
                        </div>
                    </div>
                )}
                footer={() => <div>CREATEED AT {this.props.metadata.created_at}</div>}
            />
        )
    }
}

export default DataDict;
