import React, { Component } from 'react'
import { Checkbox, Row } from 'antd';

class Test extends Component {
    onChange = (checkedValues) => {
        console.log('checked = ', checkedValues);
    }
    render() {
        return (
            <div>
                <Checkbox.Group style={{ width: '100%' }} onChange={this.onChange}>
                    <Row>
                        <Checkbox value="A">A</Checkbox>
                        <Checkbox value="B">B</Checkbox>
                        <Checkbox value="C">C</Checkbox>
                        <Checkbox value="D">D</Checkbox>
                        <Checkbox value="E">E</Checkbox>
                    </Row>
                </Checkbox.Group>
            </div>
        )
    }
}

export default Test;