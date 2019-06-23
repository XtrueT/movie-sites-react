import React, { Fragment,useState,useEffect} from 'react';
import {Link} from 'react-router-dom';

import {useDataApi} from '../../api/data_api';
import {Axios_delete} from '../../api/server';
import {formatSeconds} from '../../utils/utils';

import { List, Icon,Button,message as Message,Popconfirm,Modal, PageHeader} from 'antd';

function MovieListTable(props){

    const [previewVisible,set_previewVisible]=useState(false);
    const [movie_url,set_movie_url] = useState('');
    const [isChange,set_change] = useState(false);
    const [query,set_query] = useState('1/3');

    const [state,doFetch_url] = useDataApi(
        `/movies/${query}`,
        {
            'message':'',
            'status':0,
            'data':{
                'total':0,//movies.pages,//总页数
                'page':0,//movies.page,//当前页
                'page_size':0,//page_size,//每页总数
                'list':[] //movies_list[] //数据列表
            }
        },
        'get'
    );

    const {data,isError,isLoading} = state;
    const {message} = data;
    const {data:{total,page,page_size,list}}=data;

    useEffect(() => {
        if(isChange){
            doFetch_url(`/movies/${query}`);
        }
    },[query,doFetch_url,isChange]);


    const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }}/>
        {text}
    </span>
    );

    const handleDelete = url=>{
        // console.log(url);
        const callback = (that,res)=>{
            const {message,status,data} = res
            if (status===200){
                let PageSize = page_size;
                set_query(`${page}/${PageSize-1}`);
                set_change(true);
                set_query(`${Math.ceil(data/page_size)}/${page_size}`);
                set_change(true);
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
            <div>
            {message}
            <br/>
            <Link to='/admin/resources/movies/add'>
                    <Button 
                            style={{ marginBottom: 16}}>
                            <Icon type="plus-circle" />去添加一个电影资源
                    </Button>
                </Link>
            </div>
        )
    }
    return(
    <Fragment>
        <PageHeader>
        <Modal visible={previewVisible} style={{width:760,hight:480}} footer={null} destroyOnClose={true} onCancel={()=>set_previewVisible(false)}>
            <video alt="movie" style={{ width: '100%' }} src={movie_url} controls="controls"/>
        </Modal>
    <List
        loading={isLoading}
        itemLayout="vertical"
        pagination={{
        onChange: (page,pageSize) => {
            // console.log(page,pageSize);
            set_query(`${page}/${pageSize}`);
            set_change(true);
        },
        pageSize: page_size,
        total:total*page_size,
        hideOnSinglePage:true,
        current:page,
        }}
        dataSource={list}
        header={
            <Link to='/admin/resources/movies/add'>
                <Button 
                        style={{ marginBottom: 16}}>
                        <Icon type="plus-circle" />新建一个电影资源
                </Button>
            </Link>
        }
        renderItem={item => (
        <List.Item
            key={item.id}
            actions={[
                <IconText type="star-o" text={item.comment_number||0} />,
                <IconText type="play-square" text={item.play_number||0} />,
                <IconText type="clock-circle" text={item.add_time||0} />,
                <span> 
                    <Popconfirm 
                        title="确定删除?" 
                        onConfirm={() => {
                            handleDelete(`/admin/delete/movie/${item.id}`);
                        }}>
                        <Button type="link">                    
                        <Icon type="delete"/>删除
                        </Button>
                    </Popconfirm>
                    <Button type="link">
                        <Icon type="edit"/>编辑
                    </Button>
            </span>
            ]}
            extra={
                <img
                alt={item.title}
                style={{ width:200, hight:150}}
                src={item.cover_img}
                />
            }
        >
            <List.Item.Meta
            title={<Button type='link' onClick={()=>{set_movie_url(item.url);set_previewVisible(true)}}>电影《{item.title}》</Button>}
            description={<span>所属分类：{item.tag_id} 片长：{formatSeconds(item.movie_length)}</span>}
            />
            <p>简介：{item.info}</p>
            <p>上映地区：{item.area}</p>
            <p>上映时间：{item.release_time}</p>
        </List.Item>
        )}
    />
    </PageHeader>
    </Fragment>
    );
}
export default MovieListTable;