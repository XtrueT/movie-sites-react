import React ,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import {Card,Col,Row,List,Button} from 'antd';
import { useDataApi } from '../../api/data_api';
import { formatSeconds } from '../../utils/utils';

const {Meta}=Card;

function MovieList(){
    const [get_movie,set_get_movie]=useState('1/6');
    const [state,doFetch_url] = useDataApi(
        `/movies/${get_movie}`,
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
    const {data:{total,page,page_size,list}}=data;
    const {message} = data;
    if(isError){
        return (<div>{message}</div>)
    }
    return(
    <Fragment>
    <Row gutter={24}>
        <List
        loading={isLoading}
        // itemLayout='horizontal'
        size="large"
        pagination={{
        onChange: page => {
            console.log(page);
            set_get_movie(`page.current/page.pageSize`);
        },
        pageSize: page_size,
        total:total,
        hideOnSinglePage:true,
        current:page,
        }}
        // loadMore={()=>{set_get_movie(`${page}/${page_size+3}`)}}
        dataSource={list}
        renderItem={item => (
        <Col span={8}>
        <List.Item key={item.id}>
            <Card
                className='card'
                hoverable
                style={{marginTop:30,width:250}}
                loading={isLoading}
                key={item.id}
                cover={
                    <img
                    alt={item.title}
                    style={{width:'100%',height:400}}
                    src={item.cover_img}
                    />
                }
            >
            <Meta
            title={<Button type='link'>电影《{item.title}》</Button>}
            description={<span style={{}}>所属分类：{item.tag_id} 片长：{formatSeconds(item.movie_length)}</span>}
            />
            <div className='p_text'>
            <Link to={`/movies/${item.id}`}>
                <p>
                <img alt='play' 
                style={{marginTop:"50%",width:'50%',height:"50%"}}
                src='http://localhost:5555/_uploads/photos/image_cDv7StYsKylcd9wNVsP9wdYeKcetwNs7.png'/>
                </p>
            <p>上映地区：{item.area}</p>
            <p>上映时间：{item.release_time}</p>
            </Link>
            </div>
        </Card>
        </List.Item>
        </Col>
            
        )}
    />
    </Row>
    </Fragment>)
}

export default MovieList;

