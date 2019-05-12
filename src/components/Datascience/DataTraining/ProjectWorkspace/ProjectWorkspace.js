import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import { Layout, PageHeader, Divider, Button } from 'antd';

import ExperimentList from '../ProjectWorkspace/ExperimentList/ExperimentList'
import NewExperiment from '../Experiment/NewExperiment/NewExperiment'
import DeleteProject from './DeleteProject/DeleteProject'

const { Content, } = Layout;

class ProjectWorkspace extends React.Component {


    showProject = (project) => {
        if (project) {
            return (
                <div>
                    <PageHeader
                        title={
                            <div>
                                <div>{project.project_name}</div>
                                <div style={{ marginLeft: 16, fontSize: 12, color: '#fa541c' }}>{project.project_description}</div>
                            </div>
                        }
                        extra={
                            [
                                // <Button key='1'>View Datasource</Button>,
                                <Button key='2'><NewExperiment collectionId={project.collection_id} projectId={project.project_id} datasourceId={project.datasource_id} /></Button>,
                                <DeleteProject key='4' projectId={project.project_id} />
                            ]
                        }

                    />
                    <Divider></Divider>
                    <br />
                    <Content>
                        <ExperimentList projectId={project.project_id} experiments={this.props.experiments} />
                    </Content>
                </div>
            )
        }
    }

    render() {
        return (
            <Layout style={{ backgroundColor: 'white', height: '88vh', padding: '10px' }}>
                {this.showProject(this.props.project)}
            </Layout>
        )
    }
}
const mapStateToProp = (state) => {
    return {
        project: state.project.selectedProject,
        experiments: state.experiment.experiments
    }
}


export default withRouter(connect(mapStateToProp)(ProjectWorkspace));

