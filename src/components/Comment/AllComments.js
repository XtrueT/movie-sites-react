import React,{useState,useEffect,Fragment} from 'react';
// import {Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import {Avatar,Icon,message as Message,Comment,List} from 'antd';


function AllComments(){

    const [query,set_query] = useState('/comments');
    const [isChange,set_change] = useState(false);
    const [state,doFetch_url] = useDataApi(
        query,//url
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
            doFetch_url(`/comments/${query}`);
        }
    },[query,doFetch_url,isChange]);

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }}/>
            {text}
        </span>
    );

    if(isError){
            return (
                <div>{message}
                    {Message.error(message)}
                </div>
            )
        }
        return(
        <Fragment>
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
            renderItem={item => (
            <List.Item
                key={item.id}
                actions={[
                    <IconText type="star-o" text={item.comment_number||0} />,
                    <IconText type="play-square" text={item.play_number||0} />,
                    <IconText type="clock-circle" text={item.add_time||0} />,
                ]}
            >
                <Comment
                    // actions={item.actions}
                    key={item.id}
                    author={item.name}
                    avatar={<Avatar src={item.user_img}/>}
                    content={item.content}
                    datetime={<IconText type="clock-circle" text={item.add_time||0} />}
                />
            </List.Item>
            )}
        />
        </Fragment>
        );
};
export default AllComments;

