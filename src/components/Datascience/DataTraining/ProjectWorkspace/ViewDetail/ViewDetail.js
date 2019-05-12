import React from 'react'
import { Drawer, Button, Col, Row, Icon, Timeline, Spin, message, Table } from 'antd';

import datascienceAPI from '../../../../../apis/datascienceAPI'

const initialState = {
    visible: false,
    hasSpin: false,
    calScore: {
        accuracyScore: null,
        confusionMatrix: null,
        meanAbsoluteError: null,
        meanSquaredError: null,
        rootMeanSquaredError: null
    },
    modelParameter: {
        columns: null,
        data: null
    }
};

const pStyle = {
    fontSize: 16,
    color: '#fa541c',
    lineHeight: '24px',
    display: 'block',
    marginBottom: 16,
};

const DescriptionItem = ({ title, content }) => (
    <div
        style={{
            fontSize: 14,
            lineHeight: '22px',
            marginBottom: 7,
            color: 'rgba(0,0,0,0.65)',
        }}
    >
        <p
            style={{
                marginRight: 8,
                display: 'inline-block',
                color: 'rgba(0,0,0,0.85)',
            }}
        >
            {title}:
      </p>
        {content}
    </div>
);

class ViewDetail extends React.Component {
    state = initialState

    showDrawer = () => {
        this.setState({
            visible: true,
        });
        this.fetchCalScore()
        this.fetchModelParameter()

    };
    fetchModelParameter = async () => {
        await datascienceAPI.get(`/datascience/experiment/model_parameter/${this.props.experiment.model_parameter_id}`)
            .then(async response => {
                const res = response.data.data.model_parameter
                const columns = Object.keys(res[0]).map((item, index) => {
                    return {
                        title: item,
                        dataIndex: item,
                        key: index
                    }
                })
                const data = res.map((item, index) => {
                    item.key = index
                    return item
                })

                const modelParameter = this.state.modelParameter
                modelParameter.columns = columns
                modelParameter.data = data
                await this.setState({ modelParameter })
            })

    }

    fetchCalScore = async () => {
        await datascienceAPI.get(`/datascience/experiment/cal_score/${this.props.experiment.cal_score_id}`)
            .then(async response => {
                const score = response.data.data
                const calScore = this.state.calScore
                if (score.accuracy_score) {
                    calScore.accuracyScore = score.accuracy_score
                }
                if (score.confusion_matrix) {
                    calScore.confusionMatrix = score.confusion_matrix
                }
                if (score.mean_absolute_error) {
                    calScore.meanAbsoluteError = score.mean_absolute_error
                }
                if (score.mean_squared_error) {
                    calScore.meanSquaredError = score.mean_squared_error
                }
                if (score.root_mean_squared_error) {
                    calScore.rootMeanSquaredError = score.root_mean_squared_error
                }

                await this.setState({ calScore })
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    onClose = () => {
        this.resetState()
    };

    onSubmit = async () => {
        this.onClose()

    }

    resetState = async () => {
        await this.setState(initialState)
    }

    relearning = (experimentId) => {
        this.setState({ hasSpin: true })
        datascienceAPI.put(`/datascience/experiment/relearning/${experimentId}`)
            .then(response => {
                message.success(response.data.message)
                this.setState({ hasSpin: false })
                this.onClose()
            })
            .catch(error => {
                message.error(error.response.data.message)
                this.setState({ hasSpin: false })
            })
    }

    render() {
        const experiment = this.props.experiment
        return (
            <div>
                <div onClick={this.showDrawer}>
                    <Icon type="eye" /> View Details
                </div>

                <Drawer
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <p style={{ ...pStyle, marginBottom: 24 }}>Experiment</p>
                    <Spin tip="Re-Learning..." spinning={this.state.hasSpin}>
                        <Timeline>
                            <Timeline.Item>
                                <p style={pStyle}>Details</p>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Name" content={experiment.experiment_name} />
                                    </Col>
                                </Row>
                                <Row>

                                    <Col span={12}>
                                        <DescriptionItem
                                            title="Description"
                                            content={experiment.experiment_description}
                                        />
                                    </Col>
                                </Row>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p style={pStyle}>Datasource</p>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem
                                            title="Datasource"
                                            content={experiment.datasource_name}
                                        />
                                    </Col>
                                    <Col span={12}>
                                        <DescriptionItem
                                            title="Y Col"
                                            content={experiment.y_col}
                                        />
                                    </Col>
                                </Row>

                            </Timeline.Item>
                            <Timeline.Item>
                                <p style={pStyle}>Model</p>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Model" content={experiment.model.model_name} />
                                    </Col>

                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <DescriptionItem title="Type" content={experiment.model.model_type} />
                                    </Col>
                                </Row>
                                <Row>
                                    {this.state.calScore.accuracyScore ? (
                                        <Col span={22}>
                                            <DescriptionItem title="Accuracy score" content={(this.state.calScore.accuracyScore * 100).toFixed(2) + '%'} />
                                        </Col>
                                    ) : null}
                                    {this.state.calScore.meanAbsoluteError ? (
                                        <Col span={22}>
                                            <DescriptionItem title="Mean Absolute Error" content={(this.state.calScore.meanAbsoluteError * 100).toFixed(2) + '%'} />
                                        </Col>
                                    ) : null}
                                    {this.state.calScore.meanSquaredError ? (
                                        <Col span={22}>
                                            <DescriptionItem title="Mean Squared Error" content={(this.state.calScore.meanSquaredError * 100).toFixed(2) + '%'} />
                                        </Col>
                                    ) : null}
                                    {this.state.calScore.rootMeanSquaredError ? (
                                        <Col span={22}>
                                            <DescriptionItem title="Root Mean Squared Error" content={(this.state.calScore.rootMeanSquaredError * 100).toFixed(2) + '%'} />
                                        </Col>
                                    ) : null}
                                    {this.state.calScore.confusionMatrix ? (
                                        <Col span={22}>
                                            <DescriptionItem title="Confusion Matrix" content={
                                                (
                                                    <table style={{ width: '100%' }}>
                                                        <tbody>
                                                            {Object.keys(this.state.calScore.confusionMatrix).map((row, rindex) => {
                                                                return (
                                                                    <tr key={rindex}>
                                                                        {Object.keys(this.state.calScore.confusionMatrix[row]).map((col, cindex) => {
                                                                            return <th key={cindex}>{this.state.calScore.confusionMatrix[row][col]}</th>
                                                                        })}
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>

                                                    </table>
                                                )
                                            } />
                                        </Col>
                                    ) : null}

                                </Row>
                            </Timeline.Item>
                            <Timeline.Item>
                                <p style={pStyle}>Model Parameter</p>
                                <Table
                                    columns={this.state.modelParameter.columns}
                                    dataSource={this.state.modelParameter.data}
                                    size="middle"
                                    bordered
                                />,
                            </Timeline.Item>
                        </Timeline>
                    </Spin>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e9e9e9',
                            padding: '10px 16px',
                            background: '#fff',
                            textAlign: 'right',
                        }}
                    >
                        <Button icon="file-sync" style={{ marginRight: 8 }} onClick={() => this.relearning(experiment.experiment_id)}>Re-Learning</Button>
                        <Button
                            onClick={this.onClose}
                            style={{ marginRight: 8 }}>
                            Close
                        </Button>
                    </div>
                </Drawer>

            </div>
        );
    }
}

export default ViewDetail;