import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Menu,Avatar} from 'antd';
const {SubMenu} = Menu;

class Face extends Component{

    state={
        username:this.props.username,
        user_img:'http://www.ghost64.com/qqtupian/zixunImg/local/2017/03/21/1490075256655.jpg'
    }
    render(){
        return(
        <Menu theme="light" mode="vertical">
            <SubMenu 
                key="sub1" 
                title={
                    <Link to='/profile'>
                        <Avatar size='large' icon="user" src={this.state.user_img}/>
                        <span className="Link-face-text">{this.state.username}</span>
                    </Link>
                    }
                className='face'
            >
            <Menu.Item key="1">
                <Link to='/logout'>
                    <span className="Link-text">Logout</span>
                </Link>
            </Menu.Item>
            <Menu.Item key="2">ChangeFaceImage</Menu.Item>
            </SubMenu>
            </Menu>
        );
    }
}
export default Face;