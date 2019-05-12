import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, message } from 'antd';

import * as action from '../../../../../store/actions/index'
import datascienceAPI from '../../../../../apis/datascienceAPI'

const confirm = Modal.confirm;

class DeleteExperiment extends React.Component {
    state = { visible: false }
    showDeleteConfirm = (projectId, experimentName) => {
        const reloadExperiment = this.props.onFetchExperiments
        confirm({
            title: 'Are you sure delete this experiment?',
            content: this.props.experimentName,
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                datascienceAPI.delete(`/datascience/experiment/${projectId}/${experimentName}`)
                    .then(response => {
                        const msg = response.data.message
                        message.success(msg);
                        reloadExperiment()
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
            <div>
                <Button icon="delete" onClick={() => this.showDeleteConfirm(this.props.projectId, this.props.experimentName)} type="dash" />
            </div>

        )
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchExperiments: (projectId) => dispatch(action.getExperiments(projectId))
    }
}

export default connect(null, mapDispatchToProps)(DeleteExperiment);