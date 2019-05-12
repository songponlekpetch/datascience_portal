import React from 'react'
import { Upload, Icon, } from 'antd';

class UploadFile extends React.Component {

    handleupload = (file, fileList) => {
        this.props.uploadFile(file, this.props.type)

        return false
    }

    render() {
        return (
            <div style={{ textAlign: 'left' }}>
                <Upload
                    beforeUpload={this.handleupload}
                    showUploadList={false}
                    multiple={false}
                    accept={this.props.accept}
                >
                    <div>
                        <Icon type="upload" /> {this.props.type}
                    </div>
                </Upload>
            </div>
        )
    }
}

export default UploadFile;

