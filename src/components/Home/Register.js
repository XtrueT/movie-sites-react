import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Axios_post} from '../../api/server';
import {Form,Input,Icon,Checkbox,Button,message as Message} from 'antd';

class RegistrationForm extends Component {

        state = {
        confirmDirty: false,
        };
    
        handleSubmit = e => {
        e.preventDefault();
        const callback = (that,res)=>{
            console.log(res);
            const {message,status} = res
            if (status===200){
                Message.success(message,1);
                this.props.history.push('/login');
            };
            if(message!=="注册成功"){
                Message.error(message,1);
            }
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values['action']='register';
                Axios_post('/register',values,this,callback);
            }
        });
    };
    
        handleConfirmBlur = e => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
        };
    
        compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
        };
    
        validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
        };
    
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
                {getFieldDecorator('email', {
                rules: [
                    {
                    type: 'email',
                    message: 'The input is not valid E-mail!',
                    },
                    {
                    required: true,
                    message: 'Please input your E-mail!',
                    },
                ],
                })(<Input prefix={<Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" />)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('password', {
                rules: [
                    {
                    required: true,
                    message: 'Please input your password!',
                    },
                    {
                    validator: this.validateToNextPassword,
                    },
                ],
                })(<Input.Password prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password"/>)}
            </Form.Item>
            <Form.Item hasFeedback>
                {getFieldDecorator('confirm', {
                rules: [
                    {
                    required: true,
                    message: 'Please confirm your password!',
                    },
                    {
                    validator: this.compareToFirstPassword,
                    },
                ],
                })(<Input.Password onBlur={this.handleConfirmBlur} prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Confirm Password"/>)}
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('user_name', {
                rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                })(<Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />)}
            </Form.Item>
            <Form.Item >
                {getFieldDecorator('agreement', {
                valuePropName: 'checked',
                })(
                <Checkbox>
                    I have read the <Link to="/about">agreement</Link>
                </Checkbox>,
                )}
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                Register
                </Button>
            </Form.Item>
            </Form>
        );
        }
    }
const Register = Form.create({ name: 'register' })(RegistrationForm);
export default Register;