import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import {isLogin} from '../utils/utils';

import AuthRouter from '../components/Auth/AuthRouter';
import Home  from '../components/Home/Home';
import Navs  from '../components/Home/Navs';
import Error from '../components/Home/Error';
import About from '../components/Home/About';
import Login from '../components/Home/Login';
import Register from '../components/Home/Register';
import Movie from '../components/Movie/Movie';
import Profile from '../components/User/Profile';

import {Layout} from 'antd';

const {Content} = Layout;

class UserLayout extends Component {
    constructor(){
        super();
        this.state={
            isLogin:isLogin(),
        }
    }
    Set_isLogin=(boolean)=>{
        this.setState({
            isLogin:boolean,
        })
    }
    render() {
        return (
            <Layout>
                <nav style={{ position: 'fixed', zIndex: 99, width: '100%' }}>
                    <Route component={
                                (props)=>{
                                    const {history} = props;
                                    return <Navs history={history} nav={{...this.state}} Set_isLogin={this.Set_isLogin}/>
                                }
                    }/>
                </nav>
                <Content style={{ paddingTop:70 ,marginLeft:120 ,marginRight:120,marginBottom:50,minHeight:'100vh'}}>
                    <div style={{ padding: 24, background: '#fff', textAlign: 'center',minHeight:'30vh'}}>
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/login" exact component={
                                (props)=>{
                                    const {history} = props;
                                    return <Login history={history} Set_isLogin={this.Set_isLogin}/>
                                }
                            }/>
                            <Route path="/movie"  component ={Movie}/>
                            <Route path="/about" exact component ={About}/>
                            <Route path="/register" exact component ={Register}/>
                            <Route path="/forgot_password" exact component ={Register}/>
                            {/* 登录权限控制组件 */}
                            <AuthRouter path="/profile"  component ={Profile}/>
                            <AuthRouter path="/change_password" exact component={()=>(<div>change_password</div>)}/>
                            <AuthRouter path="/:user_id/change_password" exact component={()=>(<div>change_password</div>)}/>
                            <Route path="/error" component={Error} />
                            <Route path="*" render={() => <Redirect to="/error"/> }/>
                        </Switch>
                    </div>
                </Content>
            </Layout>
        );
    }
}
export default UserLayout;