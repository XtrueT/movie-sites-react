import React, { Component } from 'react';

import {Axios_delete} from '../api/server';
import Admin from '../components/Admin/Admin';
import AdminNav from '../components/Admin/AdminNav';

import {Layout,message as Message,Avatar,Button,Icon} from 'antd';



const {Content,Footer,Sider} = Layout;

const LogoutBtn = (
    <Button
        type="danger" 
        ghost
        onClick={()=>{
            const callback = (that,res)=>{
                const {message,status} = res
                if (status===200){
                    window.sessionStorage.removeItem('access_token');
                    Message.success(message,1);
                    window.location.href='/';
                };
                if(message!=="退出成功"&&status!==0){
                    Message.error(message,1);
                };
                if(status===0){
                    Message.error('连接服务器失败',1);
                }
            };
            Axios_delete('/admin/logout',{},this,callback);
        }
        }>
        <Icon type="poweroff"/>
    </Button>
)

class AdminLayout extends Component {
    constructor(){
        super();
        this.state={
            role:'admin'
        }
    }

    onCollapse = (collapsed) => {
        console.log(collapsed);
        this.setState({ collapsed });
    }

    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                    theme='light'
                    style={{height: '100vh', position: 'fixed',}}
                >
                    <div className="face">
                        <div>
                            <Avatar size={54} icon="user" src='http://localhost:5555/_uploads/photos/image_ylIdBn5WYztJEGeFESoSCNsJnhGvtlzi.jpg'/>
                        </div>
                        <span className={this.state.collapsed ? 'collapsed_true_face' : 'collapsed_false_face' }>
                            <span>{`你好!${window.sessionStorage.getItem('admin_name')}`}</span>
                            {LogoutBtn}
                        </span>
                    </div>
                    <AdminNav/>
                </Sider>
                <Layout  className={ this.state.collapsed ? 'collapsed_t' : 'collapsed_f ' } >
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24,  minHeight: '60vh' }}>
                            <Admin/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                    <hr></hr>
                        ©2018 Created by XRF
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default AdminLayout;