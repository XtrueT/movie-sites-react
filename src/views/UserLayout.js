import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';

import {isLogin} from '../utils/utils';

import AuthRouter from '../components/Auth/AuthRouter';
import Home  from '../components/Home/Home';
import Navs  from '../components/Home/Navs';
import Error from '../components/Home/Error';
import Login from '../components/Home/Login';
import Register from '../components/Home/Register';
import Profile from '../components/User/Profile';
import AboutYou from '../components/User/AboutYou';
import Movies from '../components/Movie/Movies';
import PlayMovie from '../components/Movie/PlayMovie';

import {Layout} from 'antd';


const {Content} = Layout;

const {isLogged} = isLogin();

class UserLayout extends Component {
    constructor(){
        super();
        this.state={
            isLogin:isLogged,
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
                <Content style={{ paddingTop:70 }}>
                    <div className='User_main' >
                        <Switch>
                            <Route path="/" exact component={Home}/>
                            <Route path="/login" exact component={
                                (props)=>{
                                    const {history} = props;
                                    return <Login history={history} Set_isLogin={this.Set_isLogin}/>
                                }
                            }/>
                            <Route path="/admin/login" exact component={
                                (props)=>{
                                    const {history} = props;
                                    return <Login history={history} Set_isLogin={this.Set_isLogin}/>
                                }
                            }/>
                            <Route path="/movies" exact component ={Movies}/>
                            <Route path="/register" exact component ={Register}/>
                            <Route path="/admin/register" exact component ={Register}/>
                            <Route path="/forgot_password" exact component ={()=>(<div>forgot_password</div>)}/>
                            <Route path="/movie/:id" exact component ={PlayMovie}/>
                            {/* 登录权限控制组件 */}
                            <AuthRouter path="/profile" exact  component ={Profile}/>
                            <AuthRouter path="/about/:action" exact  component ={AboutYou}/>
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