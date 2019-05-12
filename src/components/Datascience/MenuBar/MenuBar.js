import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu, Icon, } from 'antd';

import * as action from '../../../store/actions/index'
import NewDatasource from '../Metadata/NewDatasource/NewDatasource'

const SubMenu = Menu.SubMenu;

class Menubar extends React.Component {
    render() {
        return (
            <Menu
                theme="light"
                mode="vertical"
                selectable={false}
                style={{ backgroundColor: 'transparent' }}

            >
                <SubMenu
                    key="sub1"
                    style={{ color: 'white' }}
                    title={<div><Icon type="table" /><span>Metadata</span></div>}
                >
                    <Menu.Item key="1" ><NewDatasource /></Menu.Item>
                    <Menu.Item key="2"><Link to="/datascience/metadata" onClick={() => this.props.onFetchDatasources()}><span><Icon type="eye" />View Datasource</span></Link></Menu.Item>
                </SubMenu>
                <Menu.Item key="4" >
                    <Link to="/datascience/lab">
                        <span style={{ color: 'white' }}>
                            <Icon type="experiment" />
                            <span>Data Lab</span>
                        </span>
                    </Link>

                </Menu.Item>
            </Menu>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchDatasources: () => dispatch(action.getDatasources())
    }
}

export default (connect(null, mapDispatchToProps)(Menubar));