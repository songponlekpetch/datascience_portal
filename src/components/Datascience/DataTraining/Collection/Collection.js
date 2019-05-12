import React from 'react'
import { connect } from 'react-redux'
import { Menu, Icon, Button } from 'antd';

import * as action from '../../../../store/actions/index'
import NewProjectDrawer from '../ProjectWorkspace/NewProject/NewProjectDrawer'
import DeleteCollection from './DeleteCollection/DeleteCollection'

const { SubMenu } = Menu;
const ButtonGroup = Button.Group;

class Collection extends React.Component {
    state = {
        rootSubmenuKeys: []
    };

    setProjects = async (projects, collectionId) => {
        projects.collection_id = collectionId
        await this.props.onFetchExperiments(projects.project_id)
        await this.props.onSelectProject(projects)
    }

    setCollections = () => {
        if (this.props.collections) {
            const collections = this.props.collections
            return collections.map((mainItem, index) => {
                return (
                    <SubMenu
                        key={index}
                        title={<span><Icon type="folder" /><span>{mainItem.collection_name}</span></span>}
                    >

                        {mainItem.projects.map((item) => {
                            return (
                                <Menu.Item key={item.project_id} onClick={() => this.setProjects(item, mainItem.collection_id)}>
                                    <div>{item.project_name}</div>
                                </Menu.Item>
                            )
                        })}
                        <Menu.Item key="deleteCollection" ><ButtonGroup>
                            <DeleteCollection collectionId={mainItem.collection_id} />
                            <Button ><NewProjectDrawer collectionId={mainItem.collection_id} /></Button>
                        </ButtonGroup></Menu.Item>
                    </SubMenu>

                )
            })
        }

    }

    render() {
        return (
            <div>
                <Menu
                    style={{ backgroundColor: 'transparent', maxHeight: '30vh' }}
                    selectable={false}
                >
                    {this.setCollections()}
                </Menu>
            </div>

        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSelectProject: (projects) => dispatch(action.selectProject(projects)),
        onFetchExperiments: (projectId) => dispatch(action.getExperiments(projectId))
    }
}

export default connect(null, mapDispatchToProps)(Collection);