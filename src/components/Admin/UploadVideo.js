import  React ,{Component, Fragment} from 'react';
import axios from 'axios';
import { Upload, Icon, message as Message, Modal ,Button} from 'antd';

import {check_isVideo} from '../../utils/utils';

class UploadMovie extends Component {
    constructor(props){
        super(props);
        this.state = {
            loading: false,
            previewVisible:false,
            movie:'',
            movie_length:'',
            isUploadsuc:false,
            fileList: []
        }
    };

    //上传file
    handleOk = ()=>{
        const { fileList,movie_length} = this.state;
        const formData = new FormData();
        const auth_token = " Flask " + window.sessionStorage.access_token;
        const upload_url = 'http://localhost:5555/admin/upload/movie';
        fileList.forEach((file)=>{
            formData.append('movie',file);
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
                const movie = data;
                if(status===200){
                    file.status = 'success';
                    file.thumbUrl = movie;
                    this.setState({
                        loading:false,
                        fileList,
                        isUploadsuc:true,
                    });
                    console.log(movie);
                    // this.props.set_isUpload(true);
                    this.props.form.setFieldsValue({movie: movie});
                    console.log(movie_length);
                    this.props.form.setFieldsValue({movie_length:movie_length});
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
        const  {movie,previewVisible,loading,fileList,isUploadsuc} = this.state;
        const upload_props = {
            onPreview: (file) => {
                this.setState({
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
                if( check_isVideo(file)){
                    // const r = new FileReader();
                    const url = URL.createObjectURL(file);
                    console.log(url);
                    const audioElement = new Audio(url);
                    let duration;
                    const callback=(time)=>{
                        // formatSeconds(time);
                        this.setState({
                            movie_length:time,
                            movie: file.thumbUrl,
                        })
                    }
                    audioElement.addEventListener("loadedmetadata", function (_event) {
                        duration = audioElement.duration;
                        //length
                        console.log(duration);
                        callback(duration);
                    });
                    file.thumbUrl = url;
                    // console.log(file);
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
                {fileList.length >= 1 && !isUploadsuc? footer : null}
                <Modal visible={previewVisible} footer={null} destroyOnClose={true} onCancel={this.handleCancel}>
                    <video alt="movie" style={{ width: '100%' }} src={movie} controls="controls"/>
                </Modal>
            </Fragment>
        );
    }
}
export default UploadMovie;
