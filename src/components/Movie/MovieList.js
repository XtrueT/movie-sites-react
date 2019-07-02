import React ,{useState} from 'react';
import {Link} from 'react-router-dom';

import { useDataApi } from '../../api/data_api';
import { formatSeconds } from '../../utils/utils';

import {Card,Col,Row,List,Button, Spin,Icon, Empty} from 'antd';

const {Meta}=Card;

function MovieList(props){

    const [query]=useState('1/4');
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
    );
    // console.log(state);
    const {data,isError,isLoading} = state;
    const {data:{total,page,page_size,list}}=data;

    if(isError){
        return (<Empty/>)
    }
    const onLoadMore =(
        !isLoading && total!==page? (
            <div style={{textAlign:'center',marginTop:30}}>
            <Button type='link' onClick={()=>{
                doFetch_url(`/movies/${page}/${page_size+page_size}`);
            }}>
                <Spin  indicator={<Icon type="loading" style={{ fontSize: 24 }} spin />} tip={`查看更多`}/>
            </Button>
            </div>
            ) :null
    )
    return(
    <Row gutter={{xs: 8, sm: 16, md: 24, lg: 32}}>
        <List
        loading={isLoading}
        loadMore={onLoadMore}
        dataSource={list}
        renderItem={item => (
        <Col  xs={24} sm={12} md={6} lg={6} xl={6} >
        <List.Item key={item.id} style={{textAlign:'center'}}>
            <Card
                className='card'
                hoverable
                style={{width:250,marginLeft:'auto',marginRight:'auto'}}
                loading={isLoading}
                key={item.id}
                cover={
                    <img
                    alt={item.title}
                    style={{width:'100%',height:360,marginLeft:'auto',marginRight:'auto'}}
                    src={item.cover_img}
                    />
                }
            >
            <Meta
            title={`《${item.title}》`}
            />
            <div className='p_text'>
            <Link to={`/movie/${item.id}`}>
                <p>
                <img alt='play' 
                style={{marginTop:"50%",width:'50%',height:"50%"}}
                src='http://localhost:5555/_uploads/photos/image_cDv7StYsKylcd9wNVsP9wdYeKcetwNs7.png'/>
                </p>
            </Link>
            <p>上映地区：{item.area}</p>
            <p>上映时间：{item.release_time}</p>
            <p><span style={{textAlign:'left'}}>所属分类：{item.tag_id} 片长：{formatSeconds(item.movie_length)}</span></p>
            </div>
        </Card>
        </List.Item>
        </Col>
        )}
    />
    </Row>
    )
}

export default MovieList;

