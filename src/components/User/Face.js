import React from 'react';
import {useDataApi} from '../../api/data_api';
import {Avatar} from 'antd';
import { isLogin } from '../../utils/utils';

function Face(props){
    const {data,isError}=useDataApi(
        '/profile',
        {
            'data':{
                'user_name':'',
                'user_img':'',
            },
        },
        'get'
    )
    if(isError&&isLogin()){
        return <span>something wrong...</span>;
    }else{
        const {data:{user_name,user_img}} = data;
        return(
            <div>
                <Avatar size='large' icon="user" src={user_img}/>
                <span style={{marginLeft:45,textAlign:'right'}}>
                    {user_name}
                </span>
            </div>
        )
    }
}
export default Face;