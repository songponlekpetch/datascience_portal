import React from 'react'
import { connect } from 'react-redux'
import { Drawer, Form, Button, Col, Row, Input, Steps, Select, Checkbox, message, Spin } from 'antd';

import datascienceAPI from '../../../../../apis/datascienceAPI'
import * as actions from '../../../../../store/actions/index'

const Step = Steps.Step;
const Option = Select.Option;

class NewProjectDrawer extends React.Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState = () => {
        const initialState = {
            visible: false,
            projectForm: {
                name: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your project name'
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
                datasourceId: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your project description'
                    },
                    touch: false,
                    validated: true
                },
                columns: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your project description'
                    },
                    touch: false,
                    validated: true
                },
                collectionId: {
                    value: null,
                    rule: {
                        type: 'text',
                        required: true,
                        message: 'Please input your project description'
                    },
                    touch: false,
                    validated: true
                }
            },
            CheckBox: null,
            hasSpin: false
        };
        return initialState;
    }

    showDrawer = () => {
        const projectForm = this.state.projectForm
        projectForm.collectionId.value = this.props.collectionId
        this.setState({ projectForm })
        this.props.onFetchDatasources()
        this.setState({
            visible: true,
        });

    };

    onClose = () => {
        this.resetState()
    };

    handleChange = async (value) => {
        const datasourceId = value
        const projectForm = this.state.projectForm
        projectForm.datasourceId.value = datasourceId
        await this.setState({ projectForm })
        this.getDatasourceColumns()

    }

    getDatasourceColumns = async () => {
        await this.setState({ CheckBox: null })
        const datasourceId = this.state.projectForm.datasourceId.value
        if (datasourceId) {
            await datascienceAPI.get(`/datascience/datasource/columns/${datasourceId}`)
                .then(async (response) => {
                    const columns = response.data.header
                    const columns_filter = columns.map((item) => item.column_name)
                    const projectForm = this.state.projectForm
                    projectForm.columns.value = columns_filter
                    await this.setState({ projectForm })
                    await this.setState({
                        CheckBox:
                            <Checkbox.Group
                                key='1'
                                style={{ width: '100%' }}
                                defaultValue={this.state.projectForm.columns.value}
                                onChange={this.updateCheckBox}
                            >
                                {
                                    columns.map((item, index) => {
                                        return (
                                            <Row key={index + 1}>
                                                <Col span={12}>
                                                    <Checkbox value={item.column_name}>
                                                        {item.column_name}
                                                    </Checkbox>
                                                </Col >
                                                <Col span={12}>( {item.data_type} )</Col>
                                            </Row>
                                        )
                                    })
                                }
                            </Checkbox.Group>
                    })

                })
                .catch((error) => {
                    console.log(error.response.data)
                })
        }

    }

    loadSelection = () => {
        const datasources = this.props.datasources
        if (datasources) {
            return datasources.map((item, index) => {
                return (
                    <Option key={index} value={item.datasource_id}>{item.datasource_name}</Option>
                )
            })
        }

    }

    inputChange = (e) => {
        const value = e.target.value
        switch (e.target.id) {
            case 'name':
                return this.updateProjectForm('name', value)
            case 'description':
                return this.updateProjectForm('description', value)
            default:
                break
        }
    }

    updateProjectForm = async (name, value) => {
        const projectForm = this.state.projectForm
        projectForm[name].validated = this.checkValidatedInput(projectForm, name, value)

        if (!projectForm[name].touch) {
            projectForm[name].touch = true
        }

        projectForm[name].value = value
        await this.setState({ projectForm })
    }

    checkValidatedInput = (projectForm, name, value) => {
        const rule = projectForm[name].rule
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

    updateCheckBox = async (values) => {
        const projectForm = this.state.projectForm
        projectForm.columns.value = values
        await this.setState({ projectForm })
    }

    checkInput = () => {
        const projectForm = this.state.projectForm
        const findNull = Object.keys(projectForm).filter((key) => {
            return projectForm[key].value === null || projectForm[key].validated === false
        })
        return findNull.length !== 0 ? true : false

    }

    onSubmit = async () => {
        await this.setState({ hasSpin: true })
        const projectForm = this.state.projectForm
        const payload = {}
        Object.keys(projectForm).forEach(value => {
            payload[value] = projectForm[value].value
        })
        datascienceAPI.post('/datascience/project', payload)
            .then(async (response) => {
                const msg = response.data.message
                message.success(msg)
                await this.setState({ hasSpin: false })
                this.props.onFetchCollections()
                this.onClose()
            })
            .catch(async (error) => {
                const msg = error.response.data.message
                message.error(msg)
                await this.setState({ hasSpin: false })
            })
    }

    resetState = async () => {
        this.setState(this.getInitialState())
    }

    render() {
        return (
            <div>
                <div onClick={this.showDrawer}>
                    New Project
                </div>

                <Drawer
                    title="Create a new project"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Spin tip="Saving" spinning={this.state.hasSpin}>
                        <Steps direction="vertical" >
                            <Step title="Define Project" status="process" description={
                                <Form layout="vertical" hideRequiredMark>
                                    <Row gutter={16}>
                                        <Col span={20}>
                                            <Form.Item
                                                label="Name"
                                                hasFeedback={this.state.projectForm.name.touch}
                                                validateStatus={this.state.projectForm.name.validated || !this.state.projectForm.name.touch ? null : 'error'}
                                                help={this.state.projectForm.name.validated ? null : this.state.projectForm.name.rule.message}
                                            >
                                                <Input id="name" placeholder="Please enter project name" onChange={this.inputChange} value={this.state.projectForm.name.value} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={20}>
                                            <Form.Item
                                                label="Description"
                                                hasFeedback={this.state.projectForm.description.touch}
                                                validateStatus={this.state.projectForm.description.validated || !this.state.projectForm.description.touch ? null : 'error'}
                                                help={this.state.projectForm.description.validated ? null : this.state.projectForm.description.rule.message}
                                            >
                                                <Input.TextArea id="description" rows={4} placeholder="please enter url description" onChange={this.inputChange} value={this.state.projectForm.description.value} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            }>

                            </Step>
                            <Step title="Select Datasource" status="process" description={
                                <Row gutter={16}>
                                    <Col span={20}>
                                        <Select
                                            showSearch
                                            style={{ width: '100%' }}
                                            placeholder="Select a datasource"
                                            optionFilterProp="children"
                                            onChange={this.handleChange}
                                            onFocus={this.handleFocus}
                                            onBlur={this.handleBlur}
                                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                            value={this.state.projectForm.datasourceId.value}
                                        >
                                            {this.loadSelection()}
                                        </Select>
                                    </Col>
                                </Row>

                            } />
                            {this.state.CheckBox ? <Step title="Columns Filtering" status="process" description={this.state.CheckBox} /> : null}

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
                            Create Project
                        </Button>
                    </div>
                </Drawer>

            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        datasources: state.datasource.datasources
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasources: () => dispatch(actions.getDatasources()),
        onFetchCollections: () => dispatch(actions.getCollections())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(NewProjectDrawer));