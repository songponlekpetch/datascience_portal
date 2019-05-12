import React from 'react'
import { Upload, Button, Icon, } from 'antd';

class UploadFile extends React.Component {

    handleupload = (file, fileList) => {
        this.props.uploadFile(file)

        return false
    }

    render() {
        return (
            <div style={{ textAlign: 'center' }}>
                <Upload beforeUpload={this.handleupload}
                    showUploadList={false}
                    multiple={false}
                    accept=".csv">
                    <Button>
                        <Icon type="upload" /> Click to Upload
                    </Button>
                </Upload>
            </div>

        )
    }
}

export default UploadFile;

