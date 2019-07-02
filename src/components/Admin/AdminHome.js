import React from 'react';
import {Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import {Statistic,Card,Row,Col,Icon,Spin} from 'antd';

const cardStyle={
    marginTop:20,
    marginBottom:20
}

function AdminHome(){

    const [state] = useDataApi(
        '/admin/home',
        {  
            
            'message':'',
            'status':0,
            'data':{}
        },
    );
    // console.log(state.data.data);
    const {data,isError,isLoading} = state;
    const {data:{admin_logs,user_logs,comments,users,op_logs,movies,tags}} = data;
    if(isError){
        return(
            <div>Something Error...</div>
        )
    }
    return (
            isLoading?<Spin className='login-form'/>:(
                <Row gutter={16}>
                    <Col span={8}>
                        <Card  hoverable style={cardStyle}>
                            <Statistic
                            title={<Link to='/admin/admin/logs'>管理员日志数据</Link>}
                            value={admin_logs}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<Icon type="arrow-up" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable style={cardStyle}>
                            <Statistic
                            title={<Link to='/admin/user/logs'>用户日志数据</Link>}
                            value={user_logs}
                            precision={2}
                            valueStyle={{ color: '#3f8600' }}
                            prefix={<Icon type="arrow-up" />}
                            />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable style={cardStyle}>
                        <Statistic
                        title={<Link to='/admin/op/logs'>操作日志数据</Link>}
                        value={op_logs}
                        precision={2}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<Icon type="arrow-up" />}
                        />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable style={cardStyle}>
                        <Statistic
                            title={<Link to='/admin/users/users'>用户数</Link>}
                            value={users}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<Icon type="arrow-up" />}
                        />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card hoverable style={cardStyle}>
                        <Statistic
                            title={<Link to='/admin/users/users'>评论数据</Link>}
                            value={comments}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<Icon type="arrow-up" />}
                        />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card  hoverable style={cardStyle}>
                        <Statistic
                            title={<Link to='/admin/resources/movies'>电影资源</Link>}
                            value={movies}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<Icon type="arrow-up" />}
                        />
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card  hoverable style={cardStyle}>
                        <Statistic
                            title={<Link to='/admin/resources/tags'>电影标签资源</Link>}
                            value={tags}
                            valueStyle={{ color: '#cf1322' }}
                            prefix={<Icon type="arrow-up" />}
                        />
                        </Card>
                    </Col>
                </Row>
            )
    )
}
export default AdminHome;