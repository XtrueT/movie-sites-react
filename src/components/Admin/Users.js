import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

import {useDataApi} from '../../api/data_api';
import {Axios_delete} from '../../api/server';

import {List,Avatar,Icon,Empty,message as Message ,Button,Popconfirm, PageHeader} from 'antd';
import { set_defaultData } from '../../utils/utils';

function AdminUsers(props){
    const [base_url] = useState('/admin/users')
    const [state,doFetch_url] = useDataApi(
        base_url,
        set_defaultData(),
    )
    console.log(state);
    const {data,isError,isLoading} = state;
    const {data:{total,page,page_size,list}}=data;
    
    const handleDelete = url=>{
        // console.log(url);
        const callback = (that,res)=>{
            const {message,status,data} = res
            if (status===200){
                console.log(data)
                doFetch_url(`${base_url}`);
                if(Math.ceil(data/page_size) >= 1 && page-1 <= Math.ceil(data/page_size)){
                    doFetch_url(`${base_url}/${page}/${page_size}`);
                }
                if(data===0){
                    window.location.reload();
                }
                Message.success(message,1);
            };
            if(message!=="删除成功"&&status!==0){
                Message.error(message,1);
            };
            if(status===0){
                Message.error('连接服务器失败',1);
            }
        };
        Axios_delete(url,{},this,callback);
    }
    if(isError){
            return (
                <Empty/>
            );
    }
    return(
        <PageHeader  title="Users" subTitle="所有用户">
        <List
            loading={isLoading}
            itemLayout="horizontal"
            pagination={{
            onChange: (page,pageSize) => {
                console.log(`${base_url}/${page}/${pageSize}`);
                doFetch_url(`${base_url}/${page}/${pageSize}`)
            },
            pageSize: page_size,
            total:total*page_size,
            hideOnSinglePage:true,
            current:page,
            }}
            dataSource={list}
            renderItem={item => (
                <List.Item actions={[
                    <span> 
                    <Popconfirm 
                        title="确定删除?" 
                        onConfirm={() => {
                            handleDelete(`/admin/delete/user/${item.id}`);
                        }}>
                        <Button type="link">                    
                        <Icon type="delete"/>删除
                        </Button>
                    </Popconfirm>
                    <Button type="link">
                        <Icon type="edit"/>编辑
                    </Button>
                    </span>
                ]}>
                    <List.Item.Meta
                        avatar={
                        <Avatar src={item.user_img}/>
                        }
                        title={item.name}
                        description={item.profile}
                    />
                    <div>{item.email}</div>
                </List.Item>
            )}
        />
        </PageHeader>
    );
}

function AdminRoles(props){
    return <div>Roles</div>
}
function AdminAdmins(props){
    return <div>Admins</div>
}

function Users(props){
    const {action} = props.match.params;
    if(action==='users'){
        return <AdminUsers/>
    }else if(action==='roles'){
        return <AdminRoles/>
    }else if(action ==='admins'){
        return <AdminAdmins {...props}/>
    }else{
        return <Redirect to ='/admin/error'/>
    }
}
export default Users;
