import React from 'react'
import { connect } from 'react-redux'
import { Modal, Button, message } from 'antd';

import * as action from '../../../../../store/actions/index'
import datascienceAPI from '../../../../../apis/datascienceAPI'

const confirm = Modal.confirm;

class DeleteProject extends React.Component {
    state = {
        visible: false,
        reset: false
    }
    showDeleteConfirm = (projectId) => {
        const resetSelectProject = this.props.onSelectProject
        const fetchColections = this.props.onFetchCollections
        confirm({
            title: 'Are you sure delete this project?',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                datascienceAPI.delete(`/datascience/project/${projectId}`)
                    .then(response => {
                        const msg = response.data.message
                        resetSelectProject(null)
                        fetchColections()
                        message.success(msg);
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
            <Button icon="delete" onClick={() => this.showDeleteConfirm(this.props.projectId)} type="dashed" />


        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectProject: (projects) => dispatch(action.selectProject(projects)),
        onFetchCollections: () => dispatch(action.getCollections())
    }
}

export default connect(null, mapDispatchToProps)(DeleteProject);