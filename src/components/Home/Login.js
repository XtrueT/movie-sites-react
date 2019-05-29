import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox,message as Message} from 'antd';
import {Axios_post} from '../../api/server';

class LoginForm extends Component {
    
    handleSubmit = (e) => {
        e.preventDefault();
        const callback = (that,res)=>{
            const {message,status} = res
            if (status===200){
                this.props.Set_isLogin(true);
                Message.success(message,1);
                this.props.history.push('/');
            };
            if(message!=="登录成功"&&status!==0){
                Message.error(message,1);
            };
            if(status===0){
                Message.error('连接服务器失败');
            };
        }
        this.props.form.validateFields((err, values) => {
            if (!err) {
            values['action']='login';
            Axios_post('/login',values,this,callback);
            };
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Fragment>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <Form.Item>
                {getFieldDecorator('user_name', {
                    rules: [{ required: true, message: 'Please input your username!' }],
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('password', {
                    rules: [{ required: true, message: 'Please input your Password!' }],
                })(
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                )}
                </Form.Item>
                <Form.Item>
                {getFieldDecorator('remember', {
                    valuePropName: 'checked',
                    initialValue: true,
                })(
                    <Checkbox>Remember me</Checkbox>
                )}
                <Link className="login-form-forgot" to="/forgot_password">Forgot password</Link>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    Log in
                </Button>
                Or <Link to="/register">register now!</Link>
                </Form.Item>
            </Form>
            </Fragment>
        );
    }
}
const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;


