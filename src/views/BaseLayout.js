import React, { Component } from 'react';
import { Route ,Link} from 'react-router-dom';

import About from '../components/About';
import Login from '../components/Login';
import Home from '../components/Home';
import Register from '../components/Register';
import Movie from '../components/Movie';
import Profile from '../components/Profile';
import Face from '../components/Face';

import {Layout,Menu,Icon} from 'antd';

const {Header,Content,Footer,Sider} = Layout;

class BaseLayout extends Component {
    state = {
        collapsed: false,
        username:'一眼离花'
    };
    
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
                    style={{
                        height: '100vh', position: 'fixed',
                    }}
                >
                    <Face username={this.state.username} ></Face>
                    <Menu theme="dark" mode="vertical" defaultSelectedKeys={['1']}>
                        <Menu.Item key="1">
                            <Link to='/'>
                                <Icon type="user" />
                                <span className="Link-text">Home</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to='/movie'>
                                <Icon type="video-camera" />
                                <span className="Link-text">Movie</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to='/login'>
                                <Icon type="upload" />
                                <span className="Link-text">Login</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <Link to='/register'>
                                <Icon type="user" />
                                <span className="Link-text">Register</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <Link to='/profile'>
                                <Icon type="user" />
                                <span className="Link-text">Profile</span>
                            </Link>
                        </Menu.Item>
                        <Menu.Item key="6">
                            <Link to='/about'>
                                <Icon type="user" />
                                <span className="Link-text">About</span>
                            </Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout  className={ this.state.collapsed ? 'collapsed_t' : 'collapsed_f ' } >
                    <Header style={{ background: '#fee',width:'100%',height: 60, position: 'fixed', zIndex:1}}>
                    </Header>
                    <Content style={{ margin: '76px 16px' }}>
                        <div style={{ padding: 24, background: '#fff', minHeight: '76vh' }}>
                        <Route path="/" exact component ={Home}/>
                        <Route path="/movie" exact component ={Movie}/>
                        <Route path="/profile" exact component ={Profile}/>
                        <Route path="/about" exact component ={About}/>
                        <Route path="/login" exact component ={Login}/>
                        <Route path="/register" exact component ={Register}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center'}}>
                    <hr></hr>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
        );
    }
}
export default BaseLayout;