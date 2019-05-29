import React ,{Fragment,useState} from 'react';
import {Link} from 'react-router-dom';
import {Card,Col,Row} from 'antd';

const {Meta}=Card;

function MovieList(){

    const [movies,setMovies] = useState([
        {
            'id':1,
            'title':'武侠',
            'url':'/wx',
            'comment_number':20,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-20',
            'length':'180分钟'
        },
        {
            'id':2,
            'title':'影',
            'url':'/wx',
            'comment_number':110,
            'play_number':100,
            'info':'',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-21',
            'length':'148分钟'
        },
        {
            'id':3,
            'title':'三少爷的剑',
            'url':'/wx',
            'comment_number':30,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-23',
            'length':'150分钟'
        },
        {
            'id':4,
            'title':'绣春刀',
            'url':'/wx',
            'comment_number':0,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-25',
            'length':'140分钟'
        },
        {
            'id':5,
            'title':'武侠',
            'url':'/wx',
            'comment_number':20,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-20',
            'length':'180分钟'
        },
        {
            'id':6,
            'title':'影',
            'url':'/wx',
            'comment_number':110,
            'play_number':100,
            'info':'',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-21',
            'length':'148分钟'
        },
        {
            'id':7,
            'title':'三少爷的剑',
            'url':'/wx',
            'comment_number':30,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-23',
            'length':'150分钟'
        },
        {
            'id':8,
            'title':'绣春刀',
            'url':'/wx',
            'comment_number':0,
            'play_number':100,
            'info':'...........',
            'cover_img':'https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png',
            'area':'中国',
            'time':'2016-5-25',
            'length':'140分钟'
        },
    ]);

    return (
        <Fragment>
            <Row gutter={48}>
                {movies.map(
                    movie=>{
                        let {title,url,comment_number,play_number,id,cover_img,area,time,length} = movie;
                        return(
                            <Link to={url} key={id}>
                                <Col span={6} style={{marginTop:30}}>
                                    <Card
                                        key={id}
                                        hoverable
                                        style={{ width: 240}}
                                        cover={<img alt="example" src={cover_img} />}
                                        actions={[<span>评论数：{comment_number}</span>,<span>播放数：{play_number}</span>]}
                                    >
                                        <Meta key={id} title={title} description={
                                            <div>
                                                <p>上映地区：{area}</p>
                                                <p>上映时间：{time}</p>
                                                <p>片长：{length}</p>
                                            </div>
                                        }/>
                                    </Card>
                                </Col>
                            </Link>
                        );
                    }
                )}
            </Row>
        </Fragment>
    )
}

export default MovieList;

