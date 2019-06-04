import  React ,{Component, Fragment} from 'react';
import {Axios_put} from '../../api/server';

import { Form, Button, Input,message as Message,Upload,Icon} from 'antd';

class AddMovieForm extends Component {

    constructor(props){
        super(props);
        this.state={
            is_Upload:false
        };
    }

    handlerClose=()=>{
        if(this.state.is_Upload){
            Message.success('修改头像成功,刷新页面ing',1);
            window.location.href='/profile';
        }else{
            this.props.set_visible(false);
            this.props.history.push('/admin/movies/list');
        }
    };

    set_isUpload = (Boolean) =>this.setState({is_Upload:Boolean});

    handleSubmit = (e) => {
        e.preventDefault();
        const callback = (that,res)=>{
            const {message} = res
            if (res.status===200){
                Message.success(message,3);
            };
            if(message!=="添加成功"&& !this.state.is_Upload){
                Message.error(message,1);
            };
            if(this.state.is_Upload){
                Message.success('修改头像成功,刷新页面ing',1);
            }
        };
        this.props.form.validateFields((err, values) => {
            if (!err) {
            console.log(values);
            Axios_put('/admin/add_movie',values,this,callback);
            };
        });
    };

    render() {
        const { getFieldDecorator  } = this.props.form;
        return (
        <Fragment>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input movie title!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('info', {
                    rules: [{ required: true, message: 'Please input movie info' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Info" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('release_time', {
                    rules: [{ required: true, message: 'Please input movie release_time!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="release_time" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('area', {
                    rules: [{ required: true, message: 'Please input movie area!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('title', {
                    rules: [{ required: true, message: 'Please input movie title!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Title" />
                )}
                </Form.Item>
                <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                </Form.Item>
            </Form>
        </Fragment>
        );
    }
    }
const AddMovie = Form.create({name: 'add_movie'})(AddMovieForm);

export default AddMovie;
