import  React ,{Component} from 'react';
import {Axios_put} from '../../api/server';
import UploadFace from './UploadFace';
import { Drawer, Form, Button, Col, Row, Input,message as Message} from 'antd';

class DrawerForm extends Component {

    constructor(props){
        super(props);
        this.state={
            visible:props.visible,
            user_data:props.user_data,
            is_Upload:false
        };
    }

    handlerClose=()=>{
        if(this.state.is_Upload){
            Message.success('修改头像成功,刷新页面ing',1);
            window.location.href='/profile';
        }else{
            this.props.set_visible(false);
            this.props.history.push('/profile');
        }
    };
    set_isUpload = (Boolean) =>this.setState({is_Upload:Boolean});

    handleSubmit = (e) => {
        e.preventDefault();
        const callback = (that,res)=>{
            const {message} = res
            if (res.status===200){
                Message.success(message,3);
                window.location.href='/profile';
            };
            if(message!=="修改成功"&& !this.state.is_Upload){
                Message.error(message,1);
            };
            if(this.state.is_Upload){
                Message.success('修改头像成功,刷新页面ing',1);
                window.location.href='/profile';
            }
        };
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log(values);
            Axios_put('/profile/change',values,this,callback);
            };
        });
    };

    render() {
        const { getFieldDecorator  } = this.props.form;
        const {user_name,user_img,profile} = this.state.user_data;
        return (
        <div>
            <Drawer
            title="修改个人信息"
            width={720}
            onClose={this.handlerClose}
            visible={this.state.visible}
            >
            <Form layout="vertical" hideRequiredMark>
                <Row gutter={16}>
                <Col span={12}>
                    <Form.Item label="昵称">
                    {getFieldDecorator('user_name', {
                        rules: [{ 
                            required: true, 
                            message: 'Please enter user name' }],
                        initialValue:user_name,
                    })(<Input/>)}
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={16}>
                <Col span={24}>
                    <Form.Item label="简介">
                    {getFieldDecorator('profile', {
                        rules: [
                        {
                            required: true,
                            message: 'please enter profile',
                        },],
                        initialValue:profile,
                    })(<Input.TextArea rows={4}/>)}
                    </Form.Item>
                </Col>
                </Row>
                <Row gutter={16}>
                <Col span={24}>
                    <UploadFace user_img={user_img} set_isUpload={this.set_isUpload}/>
                </Col>
                </Row>
            </Form>
            <div style={{position: 'absolute',left: 0,bottom: 0,width: '100%',borderTop: '1px solid #e9e9e9',padding: '10px 16px',background: '#fff',textAlign: 'center',}}>
                <Button onClick={this.handlerClose} style={{ marginRight: 8 }}>
                    Cancel
                </Button>
                <Button onClick={this.handleSubmit} type="primary">
                    Submit
                </Button>
            </div>
            </Drawer>
        </div>
        );
    }
    }
const ChangeProfile = Form.create({name: 'change_profile'})(DrawerForm);

export default ChangeProfile;
