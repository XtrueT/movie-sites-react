import React from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Axios_delete} from '../../api/server';
import Face from '../User/Face';
import {Menu,message as Message} from 'antd';

const SubMenu = Menu.SubMenu;

function Navs(props){
    // console.log(props);
    const {isLogin} = props.nav;
    if(isLogin){
        return (
            <Menu
                theme={"light"}
                mode="horizontal"
                style={{ lineHeight: '64px',paddingLeft:50,paddingRight:50}}
                >
                <Menu.Item key="1">
                    <NavLink to='/' exact  activeStyle={{color:'red',fontSize:20}}>
                        <span className="NavLink-text">Home</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="2">
                    <NavLink to='/movie' exact  activeStyle={{color:'red',fontSize:20}}>
                        <span className="NavLink-text">Movie</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="3">
                    <NavLink to='/profile' exact  activeStyle={{color:'red',fontSize:20}}>
                        <span className="NavLink-text">Profile</span>
                    </NavLink>
                </Menu.Item>
                <Menu.Item key="4">
                    <NavLink to='/about' exact  activeStyle={{color:'red',fontSize:20}}>
                        <span className="NavLink-text">About</span>
                    </NavLink>
                </Menu.Item>
                <SubMenu
                    title={
                        <Face/>
                    }
                    style={{width:100,right:100,display:'inline-block',position:'fixed'}}
                >
                    <Menu.Item key="setting:1">
                    <Link
                        to=''
                        onClick={()=>{
                                const callback = (that,res)=>{
                                    const {message,status} = res
                                    if (status===200){
                                        window.sessionStorage.removeItem('access_token');
                                        Message.success(message,1);
                                        // window.location.href='/';
                                        props.Set_isLogin(false);
                                        props.history.push('/');
                                        
                                    };
                                    if(message!=="退出成功"&&status!==0){
                                        Message.error(message,1);
                                    };
                                    if(status===0){
                                        Message.error('连接服务器失败',1);
                                    }
                                };
                                Axios_delete('/logout',{},this,callback);
                            }
                            }>
                                Logout
                            </Link>
                    </Menu.Item>
                </SubMenu>
        </Menu>
        );
    }else{
        return (
            <Menu
            theme={"light"}
            mode="horizontal"
            style={{ lineHeight: '64px',paddingLeft:50,paddingRight:50}}
            >
            <Menu.Item key="1">
                <NavLink to='/' exact  activeStyle={{color:'red',fontSize:20}}>
                    <span className="NavLink-text">Home</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
                <NavLink to='/movie' exact  activeStyle={{color:'red',fontSize:20}}>
                    <span className="NavLink-text">Movie</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
                <NavLink to='/login' exact  activeStyle={{color:'red',fontSize:20}}>
                    <span className="NavLink-text">Login</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
                <NavLink to='/register' exact  activeStyle={{color:'red',fontSize:20}}>
                    <span className="NavLink-text">Register</span>
                </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
                <NavLink to='/about' exact  activeStyle={{color:'red',fontSize:20}}>
                    <span className="NavLink-text">About</span>
                </NavLink>
            </Menu.Item>
        </Menu>
        );
    }
}
export default Navs;