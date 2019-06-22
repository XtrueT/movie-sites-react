import React, { Component ,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {Form, Icon, Input, Button, Checkbox,message as Message} from 'antd';
import {Axios_post} from '../../api/server';
import {isLogin} from '../../utils/utils';

class LoginForm extends Component {

    pathname = window.location.pathname;
    
    handleSubmit = (e) => {
        e.preventDefault();
        const callback = (that,res)=>{
            const {message,status} = res;
            const {isLogged,role} = isLogin();
            if (status===200){
                Message.success(message,1);
                if(role ==="admin"){
                    window.location.href="/admin";
                }else{
                    this.props.Set_isLogin(isLogged);
                    const {hash} = this.props.history.location;
                    if(hash!==''){
                        this.props.history.push(hash.substr(hash.indexOf("#")+1));
                    }else{
                        this.props.history.push('/');
                    }
                }
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
            if(this.pathname==="/login"){
                Axios_post('/login',values,this,callback);
            }else if(this.pathname ==="/admin/login"){
                values['action'] ='login';
                Axios_post('/admin/login',values,this,callback);
            }
            };
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        // console.log(this.pathname);
        
        // const {hash} = this.props.history.location;
        // console.log(hash.substr(hash.indexOf("#")+1));
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
                Or <Link to = {this.pathname==="/admin/login"?"/admin/register":"/register"}>register now!</Link>
                </Form.Item>
            </Form>
            </Fragment>
        );
    }
}
const Login = Form.create({ name: 'login' })(LoginForm);

export default Login;


