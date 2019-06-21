import React from 'react';
import {Redirect} from 'react-router-dom';
import UserComments from '../Comment/UserComments';

function AboutYou({match}){
    const {action} = match.params;
    if(action ==='history'){
        return  <div>观看记录</div>
    }else if(action==='favorites'){
        return  <div>我的收藏</div>
    }else if(action==='comments'){
        return  <UserComments/>
    }else{
        return <Redirect to='/error'/>
    }
}

export default AboutYou;