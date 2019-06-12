import React from 'react';
import {Redirect} from 'react-router-dom';

import {useDataApi} from '../../api/data_api';

import TagsTable from './TagsTable';

import MovieListTable from './MoviesListTable';

import { Spin,PageHeader} from 'antd';





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

function AdminMovies(props){
    // console.log(props);
    return (
        <>
        <PageHeader onBack={() =>props.history.push('/admin/resources/lists')} title="Movies" subTitle="所有电影页" />
        <MovieListTable {...props}/>
        </>
    )
}


function AdminTrailers(props){
    return <div>Trailers</div>
}

function AdminTags(props){
    // console.log(props);
    const [{data,isError,isLoading}] = useDataApi(
        '/admin/tags',
        {  
            
                'message':'',
                'status':0,
                'data':[]
        },
        'get'
    );
    
    const {message} = data;
    const tags = data.data;
    if(isError){
        return (<div>{message}</div>)
    }
    return (isLoading?<Spin size="large" className='login-form' />:<TagsTable tags_data={tags} message={message} {...props}/>)
}

function Resources(props){
    const {action} = props.match.params;
    const _columns = columns(action);
    if(action==='movies'){
        return <AdminMovies {...props}/>
    }else if(action==='trailers'){
        return <AdminTrailers log_columns={_columns} {...props}/>
    }else if(action ==='tags'){
        return <AdminTags {...props}/>
    }else{
        return <Redirect to ='/admin'/>
    }
}

export default Resources;
