import React from 'react';
import {Redirect} from 'react-router-dom';

import {useDataApi} from '../../api/data_api';

import { Spin } from 'antd';


const columns = (action) =>{
    let log_columns = [
        {
            title: '编号',
            dataIndex: 'num',
            key: 'num',
            sorter: (a, b) => a.num - b.num,
        },
        {
            title:'昵称',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
        },
        {
            title: '登录地址',
            dataIndex: 'ip',
            key: 'ip',
            sorter: (a, b) => a.ip.length - b.ip.length,
        },
        {
            title: '登录时间',
            key: 'add_time',
            dataIndex: 'add_time',
            sorter: (a, b) => (Date.parse(a.add_time) - Date.parse(b.add_time) ),
        },
    ];
    if(action==='op_logs'){
        log_columns.push({
            title: '操作',
            key: 'reason',
            dataIndex: 'reason',
        })
        return log_columns;
    }else{
        return log_columns;
    }
} 

function AdminUsers(props){
    return <div>Users</div>
}

function AdminRoles(props){
    return <div>Roles</div>
}
function AdminAdmins(props){
    return <div>Admins</div>
}

function Users(props){
    const {action} = props.match.params;
    const _columns = columns(action);
    if(action==='lists'){
        return <AdminUsers log_columns={_columns} />
    }else if(action==='roles'){
        return <AdminRoles log_columns={_columns}/>
    }else if(action ==='admins'){
        // return <AdminTags log_columns={_columns}{...props}/>
        return <AdminAdmins {...props}/>
    }else{
        return <Redirect to ='/admin/error'/>
    }
}
export default Users;
