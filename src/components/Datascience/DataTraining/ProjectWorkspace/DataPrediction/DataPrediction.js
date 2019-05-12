import React from 'react'
import { Drawer } from 'antd';

import Workspace from './Workspace/Workspace';

class DataPrediction extends React.Component {
    state = { visible: false, placement: 'top' };

    showDrawer = () => {
        this.setState({
            visible: true,
        });
    };

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    onChange = (e) => {
        this.setState({
            placement: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <div onClick={this.showDrawer}>
                    Data Prediction
                </div>
                <Drawer
                    title="Data Prediction"
                    height={'100vh'}
                    placement={this.state.placement}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Workspace experiment={this.props.experiment} closed={this.state.visible} />
                </Drawer>
            </div>
        );
    }
}

export default DataPrediction;