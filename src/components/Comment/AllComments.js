import React,{useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import {Axios_delete} from '../../api/server';
import {Avatar,Icon,Comment,List,message as Message,Button,Popconfirm, Empty} from 'antd';


function AllComments(props){
    const [base_url] = useState(props.url);
    const [state,doFetch_url] = useDataApi(
        base_url,//url
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
    );
    const {data,isError,isLoading} = state;
    const {data:{total,page,page_size,list}}=data;

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
                console.log(data)
                doFetch_url(`${base_url}`);
                if(Math.ceil(data/page_size) > 1 && page-1 <= Math.ceil(data/page_size)){
                    doFetch_url(`${base_url}/${page}/${page_size}`);
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
        <Fragment>
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
            ...props.paginationSetting,
            }}
            dataSource={list}
            renderItem={item => (
            <li className='comment-list'>
                <Comment
                    actions={[
                        <IconText type="star-o" text={item.comment_number||0} />,
                        <IconText type="play-square" text={item.play_number||0} />,
                        props.is_edit?
                        <Popconfirm 
                        title="确定删除?" 
                        onConfirm={() => {
                            handleDelete(`/delete/${item.id}/comment`);
                        }}>
                        <Button type="link" style={{top:30,right:20,position:"absolute"}}>                    
                            <Icon type="delete"/>删除
                        </Button>
                    </Popconfirm>:null
                    ]}
                    key={item.id}
                    author={item.name}
                    avatar={<Avatar size='large' src={item.user_img}/>}
                    content={<span><Link to={`/movie/${item.about_movie_id}`}>@{item.about_movie}</Link>
                    <p>{item.content}</p></span>}
                    datetime={<span>{item.add_time||0}</span>}
                />
            </li>
            )}
        />
        </Fragment>
    );
};
export default AllComments;

