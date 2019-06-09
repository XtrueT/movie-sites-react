import React,{useState,useEffect} from 'react';
import {NavLink,Link} from 'react-router-dom';
import {Axios_delete} from '../../api/server';
import {navMenus} from '../../utils/utils';
import Face from '../User/Face';
import {Menu,message as Message,Icon} from 'antd';

const SubMenu = Menu.SubMenu;
const {user_menus,isLogged,notLogged} = navMenus();
function Navs(props){
    // console.log(props);
    const [selectedKeys,set_selectKey]=useState([props.history.location.pathname])

    useEffect(
        ()=>{
            window.addEventListener("popstate",set_selectKey([props.history.location.pathname]));
        },[props]
    )
    
    const {isLogin} = props.nav;
    return (
            <Menu
                selectedKeys={selectedKeys}
                theme={"light"}
                mode="horizontal"
                style={{ lineHeight: '64px',paddingLeft:50,paddingRight:50}}
                onClick={({ key })=>{set_selectKey([key])}}
            >
            {
                user_menus.map(v => {
                    return v.subMenu?
                        <SubMenu 
                            key={v.key} 
                            title={
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                            <Icon type={v.icon}/>
                            <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        }>
                        {
                            v.subMenu.map(k => 
                                <Menu.Item key={k.NavLinkTo}>
                                    <NavLink to={k.NavLinkTo} exact activeStyle={{color:'darkmagenta',fontSize:20}}>
                                        <span className="NavLink-text">{k.name}</span>
                                    </NavLink>
                                </Menu.Item>)
                        }
                        </SubMenu>
                        :
                        <Menu.Item key={v.NavLinkTo}>
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                                <Icon type={v.icon}/>
                                <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        </Menu.Item>
                })
            }
            {isLogin?(
                isLogged.map(v => {
                    return v.subMenu?
                        <SubMenu 
                            key={v.key} 
                            title={
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                            <Icon type={v.icon}/>
                            <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        }>
                        {
                            v.subMenu.map(k => 
                                <Menu.Item key={k.NavLinkTo}>
                                    <NavLink to={k.NavLinkTo} exact activeStyle={{color:'darkmagenta',fontSize:20}}>
                                        <span className="NavLink-text">{k.name}</span>
                                    </NavLink>
                                </Menu.Item>)
                        }
                        </SubMenu>
                        :
                        <Menu.Item key={v.NavLinkTo}>
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                                <Icon type={v.icon}/>
                                <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        </Menu.Item>
                }),
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
                                        // window.sessionStorage.removeItem('role');
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
                </SubMenu>):
                (notLogged.map(v => {
                    return v.subMenu?
                        <SubMenu 
                            key={v.key} 
                            title={
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                            <Icon type={v.icon}/>
                            <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        }>
                        {
                            v.subMenu.map(k => 
                                <Menu.Item key={k.NavLinkTo}>
                                    <NavLink to={k.NavLinkTo} exact activeStyle={{color:'darkmagenta',fontSize:20}}>
                                        <span className="NavLink-text">{k.name}</span>
                                    </NavLink>
                                </Menu.Item>)
                        }
                        </SubMenu>
                        :
                        <Menu.Item key={v.NavLinkTo}>
                            <NavLink to={v.NavLinkTo}exact  activeStyle={{color:'darkmagenta',fontSize:20}}>
                                <Icon type={v.icon}/>
                                <span className="NavLink-text">{v.name}</span>
                            </NavLink>
                        </Menu.Item>
                }))
            }
        </Menu>
    );
}
export default Navs;