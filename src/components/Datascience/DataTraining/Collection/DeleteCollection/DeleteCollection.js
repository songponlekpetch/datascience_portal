import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, message } from 'antd';

import * as action from '../../../../../store/actions/index'
import datascienceAPI from '../../../../../apis/datascienceAPI'

const confirm = Modal.confirm;

class DeleteCollection extends React.Component {
    state = { visible: false }
    showDeleteConfirm = (collectionId) => {
        const reset = this.props.onFetchCollections
        confirm({
            title: 'Are you sure delete this collection?',
            content: this.props.collectionId,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                datascienceAPI.delete(`/datascience/collection/${collectionId}`)
                    .then(response => {
                        const msg = response.data.message
                        message.success(msg);
                        reset()
                    })
                    .catch(error => {
                        const msg = error.response.data.message
                        message.error(msg);
                    })
            }
        })
    }

    render() {
        return (
            <Button icon="delete" onClick={() => this.showDeleteConfirm(this.props.collectionId)} type="danger" />

        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchCollections: () => dispatch(action.getCollections())
    }
}

export default connect(null, mapDispatchToProps)(DeleteCollection);