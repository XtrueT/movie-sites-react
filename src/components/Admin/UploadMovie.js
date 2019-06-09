import  React ,{Component, Fragment} from 'react';
import axios from 'axios';
import { Upload, Icon, message as Message, Modal ,Button} from 'antd';

import {check_isImage} from '../../utils/utils';

class UploadMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible:false,
            cover_img:'',
            isUploadsuc:false,
            fileList: []
        }
    };

    //上传file
    handleOk = ()=>{
        const { fileList } = this.state;
        const formData = new FormData();
        const auth_token = " Flask " + window.sessionStorage.access_token;
        const upload_url = 'http://localhost:5555/admin/upload/cover_img';
        fileList.forEach((file)=>{
            formData.append('cover_img',file);
            // console.log(file);
            file.status = 'uploading';
            this.setState({
                fileList,
                loading:true,
            });
            const config = {
                headers:{
                    authorization: auth_token,
                    'Content-Type': 'multipart/form-data',
                },
                onUploadProgress:ProgressEvent=>{
                    const complete = (ProgressEvent.loaded/ ProgressEvent.total*100|0);
                    // console.log(complete);
                    file.percent = complete;
                    this.setState({
                        fileList,
                    });
                },
            }
            axios.post(
                upload_url,
                formData,
                config
            ).then(res=>{
                const {status,message,data} = res.data;
                const cover_img = data;
                if(status===200){
                    file.status = 'success';
                    file.thumbUrl = cover_img;
                    this.setState({
                        loading:false,
                        fileList,
                        isUploadsuc:true,
                    });
                    console.log(cover_img);
                    // this.props.set_isUpload(true);
                    this.props.form.setFieldsValue({cover_img: cover_img});
                    Message.success(message);
                }else{
                    file.status = 'error';
                    this.setState({
                        loading:false,
                        fileList,
                    });
                    Message.error(message,1);
                }
            }
            ).catch(e=>{
                Message.error(`${file.name}上传失败`);
                file.status = 'error'
                this.setState({
                    loading:true,
                    fileList,
                });
            }
            );
        });
    };

    handleCancel = () => {
        this.setState({ 
            previewVisible: false,
        }
        );
    };

    handleClick = () => this.setState({ previewVisible: true });
    
    render(){
        const  {cover_img,previewVisible,loading,fileList,isUploadsuc} = this.state;
        const upload_props = {
            onPreview: (file) => {
                this.setState({
                    cover_img: file.thumbUrl,
                    previewVisible: true,
                });
            },
            onRemove: file => {
                this.setState(state => {
                    const index = state.fileList.indexOf(file);
                    const newFileList = state.fileList.slice();
                    newFileList.splice(index, 1);
                    return {
                        fileList: newFileList,
                        loading:false,
                    };
                });
            },
            beforeUpload: file=> {
                if( check_isImage(file)){
                    // const r = new FileReader();
                    const url = URL.createObjectURL(file);
                    console.log(url);
                    // r.readAsDataURL(file);
                    // r.onload = e => {
                    //     file.thumbUrl = e.target.result;
                    //     this.setState(state => ({
                    //         fileList: [...state.fileList, file],
                    //         })
                    //     );
                    // };
                    file.thumbUrl = url;
                    this.setState(state => ({
                        fileList: [...state.fileList, file],
                        })
                    );
                }
                return false;
            },
            fileList,
            listType:"picture-card",
        };
        const uploadButton = (
            <div>
                <Icon type={loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const footer = (
            <p>
                <Button key="submit" type="primary" disabled={fileList.length === 0} loading={loading} onClick={this.handleOk}>
                {loading ? '正在上传' : '开始上传 '}
                </Button>
            </p>
        );
        return (
            <Fragment>
                <Upload {...upload_props}>
                        {fileList.length >= 1 ? null : uploadButton}
                </Upload> 
                {/* {footer} */}
                {fileList.length >= 1 && !isUploadsuc ? footer : null}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="cover_img" style={{ width: '100%' }} src={cover_img} />
                </Modal>
            </Fragment>
        );
    }
}
export default UploadMovie;
