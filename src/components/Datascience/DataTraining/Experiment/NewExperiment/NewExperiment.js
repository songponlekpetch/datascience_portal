import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Icon, Steps, Select, Spin, InputNumber, message } from 'antd';

import * as action from '../../../../../store/actions/index'
import datascienceAPI from '../../../../../apis/datascienceAPI'

const Step = Steps.Step;
const { Option, OptGroup } = Select;


class NewExperiment extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            visible: false,
            experimentForm: {
                name: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your experiment name'
                    },
                    touch: false,
                    validated: true
                },
                description: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your project description'
                    },
                    touch: false,
                    validated: true
                },
                projectId: {
                    value: null,
                    validated: true
                },
                collectionId: {
                    value: null,
                    validated: true
                },
                datasourceId: {
                    value: null,
                    validated: true
                },
                model: {
                    value: null,
                    validated: true
                },
                parameter: {
                    value: null,
                    validated: true
                },
                yColumn: {
                    value: null,
                    validated: true
                },
            },
            hasSpin: false,
            modelSelection: null,
            yColumnSelection: null,
            modelParameter: null,
        };
        return initialState;
    }

    showDrawer = () => {
        const experimentForm = this.state.experimentForm
        experimentForm.projectId.value = this.props.projectId
        experimentForm.collectionId.value = this.props.collectionId
        experimentForm.datasourceId.value = this.props.datasourceId
        this.setState(
            {
                experimentForm,
                visible: true
            }
        )
        this.loadModelSelection()
        this.loadYColumnSelection()
    };

    onClose = () => {
        this.resetState()
    };

    loadModelSelection = async () => {
        await datascienceAPI.get('/datascience/models')
            .then((response) => {
                const data = response.data.data
                const modelSelection = data.map((item, index) => {
                    return (
                        <OptGroup key={index} label={item.type}>
                            {
                                item.models.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.id}>{item.name}</Option>
                                    )
                                })
                            }

                        </OptGroup>
                    )
                })

                this.setState({ modelSelection })

            })
            .catch((error) => {
                console.log(error.response.data.message)
            })
    }

    loadYColumnSelection = () => {
        const projectId = this.state.experimentForm.projectId.value
        datascienceAPI.get(`/datascience/project/columns_filter/${projectId}`)
            .then(response => {
                const data = response.data.columns_filter
                const yColumnSelection = data.map((item, index) => {
                    return (

                        <Option key={index} value={item}>{item}</Option>

                    )
                })

                this.setState({ yColumnSelection })

            })
            .catch(error => {
                console.log(error.response.data)
            })

    }

    modelSelectionChange = async (value) => {
        await this.setState({ modelParameter: null })
        datascienceAPI.get(`/datascience/model/${value}`)
            .then(response => {
                this.setState({ modelParameter: response.data.data })
                const parameter = response.data.data.map(item => {
                    return {
                        name: item.name,
                        value: item.default,
                        format: item.format
                    }
                })
                const experimentForm = this.state.experimentForm
                experimentForm.parameter.value = parameter
                this.setState({ experimentForm })
            })
        const experimentForm = this.state.experimentForm
        experimentForm.model.value = value
        await this.setState({ experimentForm })
    }

    setModelParameter = (modelParameter) => {
        return modelParameter.map((item, index) => {

            return (
                <Row key={index} gutter={16} >
                    <Col span={20}>
                        <Form.Item label={item.name}>
                            {this.setModelParameterInput(item)}
                        </Form.Item>
                    </Col>
                </Row>
            )

        })
    }

    setModelParameterInput = (item) => {
        switch (item.type) {
            case 'string':
                return this.setModelParameterInputString(item)
            case 'int':
                return this.setModelParameterInputInt(item)
            case 'boolean':
                return this.setModelParameterInputBoolean(item)
            default:
                break
        }
    }

    setModelParameterInputString = (item) => {
        return (
            <Select
                style={{ width: 200 }}
                optionFilterProp="children"
                defaultValue={item.default}
                onChange={(value) => {
                    const experimentForm = this.state.experimentForm
                    experimentForm.parameter.value = experimentForm.parameter.map(param => {
                        if (param.name === item.name) {
                            param.value = value
                            return param
                        } else {
                            return param
                        }
                    })
                    this.setState({ experimentForm })
                }}
            >
                {item.option.map((subOption, index) => {
                    return <Option key={index} value={subOption}>{subOption}</Option>
                })}

            </Select>
        )
    }

    setModelParameterInputInt = (item) => {
        return (
            <InputNumber
                min={item.rule.min === "Infinity" ? -Infinity : item.rule.min}
                max={item.rule.max === "Infinity" ? Infinity : item.rule.max}
                defaultValue={item.default}
                onChange={(value) => {
                    const experimentForm = this.state.experimentForm
                    experimentForm.parameter.value = experimentForm.parameter.map(param => {
                        if (param.name === item.name) {
                            param.value = value
                            return param
                        } else {
                            return param
                        }
                    })
                    this.setState({ experimentForm })
                }}
            />
        )
    }

    setModelParameterInputBoolean = (item) => {
        return (
            <Select
                style={{ width: 200 }}
                optionFilterProp="children"
                defaultValue={item.default}
                onChange={(value) => {
                    const experimentForm = this.state.experimentForm
                    experimentForm.parameter.value = experimentForm.parameter.map(param => {
                        if (param.name === item.name) {
                            param.value = value
                            return param
                        } else {
                            return param
                        }
                    })
                    this.setState({ experimentForm })
                }}
            >
                {item.option.map((subOption, index) => {
                    return <Option key={index} value={subOption}>{subOption}</Option>
                })}

            </Select>
        )
    }

    yColumnSelectionChange = async (value) => {
        const experimentForm = this.state.experimentForm
        experimentForm.yColumn.value = value
        await this.setState({ experimentForm })
    }

    inputChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'name':
                return this.updateExperimentForm('name', value)
            case 'description':
                return this.updateExperimentForm('description', value)
            default:
                break
        }
    }

    updateExperimentForm = async (name, value) => {
        const experimentForm = this.state.experimentForm
        experimentForm[name].validated = this.checkValidatedInput(experimentForm, name, value)

        if (!experimentForm[name].touch) {
            experimentForm[name].touch = true
        }

        experimentForm[name].value = value
        await this.setState({ experimentForm })
    }

    checkValidatedInput = (experimentForm, name, value) => {
        const rule = experimentForm[name].rule
        switch (rule.type) {
            case 'text': {
                if (rule.required) {
                    if (value && value.length > 0) {
                        return true
                    } else {
                        return false
                    }
                }
                break
            }
            default:
                return true
        }
    }

    checkInput = () => {
        const experimentForm = this.state.experimentForm
        const findNull = Object.keys(experimentForm).filter((key) => {
            return experimentForm[key].value === null || experimentForm[key].validated === false
        })
        return findNull.length !== 0 ? true : false
    }

    onSubmit = async () => {
        this.setState({ hasSpin: true })
        const form = this.state.experimentForm
        const projectId = form.projectId.value
        const name = form.name.value
        const payload = {
            'experiment_description': form.description.value,
            'datasoruce_id': form.datasourceId.value,
            'model_id': form.model.value,
            'model_parameter': form.parameter.value,
            'y_col': form.yColumn.value,
        }

        await datascienceAPI.post(`/datascience/experiment/${projectId}/${name}`, payload)
            .then(async response => {
                message.success(response.data.message)
                await this.resetState()
                this.props.onFetchExperiments(projectId)
                this.setState({ hasSpin: false })
            })
            .catch(error => {
                message.error(error.response.data.message)
                this.setState({ hasSpin: false })
            })
    }

    resetState = async () => {

        await this.setState(this.getInitialState())
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <div onClick={this.showDrawer}>
                    <Icon type="plus" /> New Experiment
                </div>

                <Drawer
                    title="Create a new experiment"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Spin tip="Processing..." spinning={this.state.hasSpin}>
                        <Steps direction="vertical" >
                            <Step title="Define Experiment" status="process" description={
                                <Form layout="vertical" hideRequiredMark>
                                    <Row gutter={16}>
                                        <Col span={20}>
                                            <Form.Item
                                                label="Name"
                                                hasFeedback={this.state.experimentForm.name.touch}
                                                validateStatus={this.state.experimentForm.name.validated || !this.state.experimentForm.name.touch ? null : 'error'}
                                                help={this.state.experimentForm.name.validated ? null : this.state.experimentForm.name.rule.message}
                                            >
                                                <Input id="name" placeholder="Please enter project name" onChange={this.inputChange} value={this.state.experimentForm.name.value} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={20}>
                                            <Form.Item
                                                label="Description"
                                                hasFeedback={this.state.experimentForm.description.touch}
                                                validateStatus={this.state.experimentForm.description.validated || !this.state.experimentForm.description.touch ? null : 'error'}
                                                help={this.state.experimentForm.description.validated ? null : this.state.experimentForm.description.rule.message}
                                            >
                                                <Input.TextArea id="description" rows={4} placeholder="please enter url description" onChange={this.inputChange} value={this.state.experimentForm.description.value} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            }>

                            </Step>
                            <Step title="Define Y column" status="process" description={
                                <Row gutter={16}>
                                    <Col span={20}>

                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select a Y column"
                                            optionFilterProp="children"
                                            onChange={this.yColumnSelectionChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            value={this.state.experimentForm.yColumn.value}
                                        >
                                            {this.state.yColumnSelection}
                                        </Select>


                                    </Col>
                                </Row>
                            } />
                            <Step title="Select Model" status="process" description={
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select a model"
                                            optionFilterProp="children"
                                            onChange={this.modelSelectionChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            value={this.state.experimentForm.model.value}
                                        >
                                            {this.state.modelSelection}
                                        </Select>
                                    </Col>
                                </Row>

                            } />
                            {this.state.modelParameter ?
                                <Step title="Model Parameter" status="process" description={
                                    <div>{this.setModelParameter(this.state.modelParameter)}</div>
                                } />
                                : null
                            }
                            <br/>
                            <br/>

                        </Steps>
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
                        <Button
                            onClick={this.onClose}
                            style={{ marginRight: 8 }}>
                            Cancel
                        </Button>
                        <Button
                            onClick={this.onSubmit}
                            type="primary"
                            disabled={this.checkInput()}>
                            Create Experiment
                        </Button>
                    </div>
                </Drawer>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {

    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchExperiments: (projectId) => dispatch(action.getExperiments(projectId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewExperiment));