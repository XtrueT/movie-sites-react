import React,{useState,useEffect,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import {Avatar,Icon,Comment,List} from 'antd';


function AllComments(props){
    const [query,set_query] = useState(props.url);
    const [base_url] = useState(props.url);
    const [isChange,set_change] = useState(false);
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
        'get'
    );
    const {data,isError,isLoading} = state;
    const {message} = data;
    const {data:{total,page,page_size,list}}=data;
    
    useEffect(() => {
        if(isChange){
            doFetch_url(`${base_url}/${query}`);
        }
    },[query,doFetch_url,isChange,base_url]);

    const IconText = ({ type, text }) => (
        <span>
            <Icon type={type} style={{ marginRight: 8 }}/>
            {text}
        </span>
    );

    if(isError){
            return (
                <div>
                    {message}
                </div>
            )
        }
        return(
        <Fragment>
        <List
            loading={isLoading}
            itemLayout="horizontal"
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
            <li className='comment-list'>
                <Comment
                    actions={[
                        <IconText type="star-o" text={item.comment_number||0} />,
                        <IconText type="play-square" text={item.play_number||0} />,
                    ]}
                    key={item.id}
                    author={item.name}
                    avatar={<Avatar src={item.user_img}/>}
                    content={<span><Link to={`/movies/${item.about_movie_id}`}>@{item.about_movie}</Link>
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

