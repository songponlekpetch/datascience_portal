import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal, Button, message } from 'antd';

import datascienceAPI from '../../../../../apis/datascienceAPI'

const confirm = Modal.confirm;

class DeleteDatasource extends React.Component {
    state = {
        visible: false,
        reset: false
    }
    showDeleteConfirm = (datasourceId) => {
        const route = () => this.props.history.push(`/datascience/metadata`)
        confirm({
            title: 'Are you sure delete this datasource?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                datascienceAPI.delete(`/datascience/datasource/${datasourceId}`)
                    .then(response => {
                        const msg = response.data.message
                        message.success(msg);
                        route()
                    }).catch(error => {
                        console.log(error)
                        const msg = error.response.data.message
                        message.error(msg);
                    })
            }
        })
    }

    render() {
        return (
            <Button icon="delete" onClick={() => this.showDeleteConfirm(this.props.datasourceId)} type="danger" />
        )
    }
}


export default withRouter(DeleteDatasource);