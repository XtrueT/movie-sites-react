import  React ,{Component, Fragment} from 'react';
import axios from 'axios';
import { Upload, Icon, message as Message, Modal ,Button} from 'antd';

function check_isImage(file) {
    let isImage = false;
    const file_type = ['image/jpeg','image/png'];
    if(file.type){
        if (file_type.includes(file.type) ){
            isImage = true;
        };
    };
    if (!isImage) {
        Message.error('只能上传图片');
    };
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        Message.error('图片最大为 5MB!');
    };
    return isImage && isLt5M ;
}

class UploadFace extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible:false,
            user_img:props.user_img,
            fileList: []
        }
    };

    //上传file
    handleOk = ()=>{
        const { fileList } = this.state;
        const formData = new FormData();
        const auth_token = " Flask " + window.sessionStorage.access_token;
        const upload_url = 'http://localhost:5555/profile/change';
        fileList.forEach((file)=>{
            formData.append('user_img',file);
            console.log(file);
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
                    console.log(complete);
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
                const {status,message} = res.data;
                const {data:{user_img}} = res.data;
                if(status===200){
                    file.status = 'success';
                    file.thumbUrl = user_img;
                    this.setState({
                        loading:false,
                        fileList,
                    });
                    this.props.set_isUpload(true);
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
        const  {user_img,previewVisible,loading,fileList} = this.state;
        const upload_props = {
            onPreview: (file) => {
                this.setState({
                    user_img: file.thumbUrl,
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
                    const r = new FileReader();
                    r.readAsDataURL(file);
                    r.onload = e => {
                        file.thumbUrl = e.target.result;
                        this.setState(state => ({
                            fileList: [...state.fileList, file],
                            })
                        );
                    };
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
            <Button key="submit" type="primary" disabled={fileList.length === 0} loading={loading} onClick={this.handleOk}>
                {loading ? '正在上传' : '开始上传 '}
            </Button>
        );
        return (
            <Fragment>
                <Upload {...upload_props}>
                        {fileList.length >= 1 ? null : uploadButton}
                </Upload> 
                {footer}
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="user_img" style={{ width: '100%' }} src={user_img} />
                </Modal>
            </Fragment>
        );
    }
}
export default UploadFace;
