import React from 'react'
import { List, Icon, Button } from 'antd';

import ViewDetail from '../ViewDetail/ViewDetail'
import DataPrediction from '../DataPrediction/DataPrediction'
import DeleteExperiment from '../../Experiment/DeleteExperiment/DeleteExperiment'

class ExperimentList extends React.Component {

    fetchExperiments = () => {
        return this.props.experiments
    }

    render() {
        return (
            <div>
                <h3 style={{ marginLeft: 16, marginBottom: 16 }}>Experiments</h3>
                <div style={{ marginLeft: 64, marginRight: 64 }}>
                    <List
                        itemLayout="horizontal"
                        dataSource={this.fetchExperiments()}
                        renderItem={(item, index) => (
                            <List.Item key={index}>
                                <List.Item.Meta
                                    avatar={<Icon type="project" style={{ fontSize: '24px', color: '#fa541c' }} />}
                                    title={<div>{item.experiment_name}</div>}
                                    description={item.experiment_description}

                                />
                                <Button style={{ marginRight: 8 }}><ViewDetail experiment={item} /></Button>
                                <Button style={{ marginRight: 8 }}><DataPrediction experiment={item} /></Button>
                                <DeleteExperiment projectId={this.props.projectId} experimentName={item.experiment_name} />
                            </List.Item>
                        )
                        }
                    />
                </div>
            </div>
        )
    }
}

export default ExperimentList;

