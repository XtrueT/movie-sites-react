import React from 'react';
import {Redirect} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import { Table ,message as Message} from 'antd';
import { set_pagination } from '../../utils/utils';

const columns = (role) =>{
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
    if(role==='op'){
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

function AdminLogs(props){
    const [state] = useDataApi(
        '/admin/admin/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );
    const {data,isError,isLoading} = state;
    const {message} = data;
    const logs = data.data;
    if(isError){
        return (Message.error(message))
    }
    return (
        <Table
        // onChange={(sorter,pagination,filters)=>{return console.log(sorter,pagination,filters)}} 
        columns={props.log_columns} 
        dataSource={logs}  
        rowKey={record => record.num} 
        loading={isLoading}
        showHeader={true}
        bordered
        pagination={set_pagination()}
        title={() => '管理员登录日志'}
        />
    )
}

function UserLogs(props){
    const [state] = useDataApi(
        '/admin/user/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );
    const {data,isError,isLoading} = state
    const {message} = data;
    const logs = data.data;
    if(isError){
        return (Message.error(message))
    }
    return (
        <Table
        columns={props.log_columns} 
        dataSource={logs}  
        rowKey={record => record.num} 
        loading={isLoading}
        showHeader={true}
        pagination={set_pagination()}
        bordered
        title={() => '用户登录日志'}
        />
    )
}
function OpLogs(props){
    const [state] = useDataApi(
        '/admin/op/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );
    const {data,isError,isLoading} = state;
    const {message} = data;
    const logs = data.data;
    if(isError){
        return (Message.error(message))
    }
    return (
        <Table
        columns={props.log_columns} 
        dataSource={logs}  
        rowKey={record => record.num} 
        loading={isLoading}
        showHeader={true}
        pagination={set_pagination()}
        bordered
        title={() => '管理员操作日志'}
        />
    )
}
function Logs(props){
    const {role} = props.match.params;
    const _columns = columns(role);
    if(role==='admin'){
        return <AdminLogs log_columns={_columns}/>
    }else if(role==='user'){
        return <UserLogs log_columns={_columns}/>
    }else if(role==='op'){
        return <OpLogs log_columns={_columns}/>
    }else{
        return <Redirect to ='/admin'/>
    }
}

export default Logs;