import React,{useState,Fragment} from 'react';
import {Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import {Avatar,Icon,Card,message as Message,Tooltip,Comment} from 'antd';
// /user/<int:page>/<int:page_size>/comments
const {Meta} = Card;
function Comments(){
    const [query,set_query] = useState('/user/'+1+'/'+5+'/comments');
    const [comment_state,set_comment]=useState(
        {
            likes: 0,
            dislikes: 0,
            action: null,
        }
    );
    const {data,doFetch_url,isLoading,isError} = useDataApi(
        query,//url
        {//初始值
            data:{
                list:[
                    {
                        id:0,name:'',movie:0,add_time:'',agaist:'',content:'',support:''
                    }
                ],
                total:null,
                page:0,
                page_size:0
            },
            message:null,
            status:0
        },
        'get'//
    );
    // console.log(data);
    const {data:{list,total,page,page_size}} = data;
    // console.log(total);
    const {message,status}=data;
    console.log(status);
    const {action,likes,dislikes}=comment_state;
    if(message!==null)
    {   
        if(status===200){
            Message.success(message,1);            
            const actions=[
                <span>
                    <Tooltip title="Like">
                    <Icon
                        type="like"
                        theme={action === 'liked' ? 'filled' : 'outlined'}
                        onClick={()=>{
                            set_comment(comment_state=>({...comment_state,action:'liked',likes:likes+1}));
                        }}
                    />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {likes}
                    </span>
                </span>,
                <span>
                    <Tooltip title="Dislike">
                    <Icon
                        type="dislike"
                        theme={action === 'disliked' ? 'filled' : 'outlined'}
                        onClick={()=>{
                            set_comment(comment_state=>({...comment_state,action:'disliked',dislikes:dislikes+1}));
                        }}
                    />
                    </Tooltip>
                    <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                    {dislikes}
                    </span>
                </span>,
                <span>Reply to</span>,
            ];
            const li_number=()=>{
                let li ='';
                console.log(total);
                for(let i=1;i<=total;i++){
                    li += `<li><span onClick={()=>{
                        set_query('/user/'+${i}+'/'+${page_size}+'/comments');
                        doFetch_url(query);
                    }} >${i}</span></li>`;
                }
                return li;
            }
            li_number();
            if(total){
                return(
                <Fragment>
                    {isError && <div>Something wrong...</div>}
                    {isLoading?(
                            <div>Loading...</div>
                        ):
                        (
                        <Fragment>
                        <Card
                            title={list[0].name+":评论记录"}
                            extra={
                                <Link to='/movie' 
                                // onClick={()=>{
                                //     doFetch_url(query);
                                // }}
                                >
                                    More
                                </Link>
                            }
                            hoverable
                            actions={[<Icon type="edit"/>, <Icon type="ellipsis"/>]}
                        >
                            <Meta
                                avatar={<Avatar size='large' icon="user" src="1"/>}
                            />
                            {list.map(item=>(
                                <Card
                                    key = {item.id} 
                                    style={{ marginTop: 16 }}
                                    type="inner"
                                    title={item.movie}
                                >
                                <Comment
                                    actions={actions}
                                    content={
                                        (<p>{item.content}</p>)
                                    }
                                    datetime={item.add_time}
                                />
                                </Card>
                            ))}
                        </Card>
                        <ul>
                            {li_number}
                        </ul>
                        </Fragment>              
                        )
                    }
                </Fragment>
            );
            }else{
                return(
                    <Fragment>
                        {isError && <div>Something wrong...</div>}
                        {isLoading?(
                                <div>Loading...</div>
                            ):
                            (
                                <div>{message}</div>
                            )
                        }
                    </Fragment>
                );
            }
        } 
    }else{
            return Message.error(message,1);
    }
};
export default Comments;

