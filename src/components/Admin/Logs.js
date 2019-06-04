import React from 'react';
import {Redirect} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import { Table} from 'antd';

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
    if(role==='op_logs'){
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
    const {data,isError,isLoading} = useDataApi(
        '/admin/admin_logs/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );

    const {message} = data;
    const logs = data.data;
    if(isError){
        return (<div>{message}</div>)
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
        title={() => '管理员登录日志'}
        />
    )
}

function UserLogs(props){
    const {data,isError,isLoading} = useDataApi(
        '/admin/user_logs/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );

    const {message} = data;
    const logs = data.data;
    if(isError){
        return (<div>{message}</div>)
    }
    return (
        <Table
        columns={props.log_columns} 
        dataSource={logs}  
        rowKey={record => record.num} 
        loading={isLoading}
        showHeader={true}
        bordered
        title={() => '用户登录日志'}
        />
    )
}
function OpLogs(props){
    const {data,isError,isLoading} = useDataApi(
        '/admin/op_logs/logs',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );
    const {message} = data;
    const logs = data.data;
    if(isError){
        return (<div>{message}</div>)
    }
    return (
        <Table
        columns={props.log_columns} 
        dataSource={logs}  
        rowKey={record => record.num} 
        loading={isLoading}
        showHeader={true}
        bordered
        title={() => '管理员操作日志'}
        />
    )
}
function Logs(props){

    const {role} = props.match.params;
    const _columns = columns(role);
    if(role==='admin_logs'){
        return <AdminLogs log_columns={_columns}/>
    }else if(role==='user_logs'){
        return <UserLogs log_columns={_columns}/>
    }else if(role==='op_logs'){
        return <OpLogs log_columns={_columns}/>
    }else{
        return <Redirect to ='/admin'/>
    }
}


export default Logs;