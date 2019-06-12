import React, {Fragment,useState} from 'react';
import {Route,Link} from 'react-router-dom';
import {useDataApi} from '../../api/data_api';
import ChangeProfile from './ChangeProfile';
import {Avatar,Icon,Card,Button,Spin} from 'antd';

const {Meta} =Card;

function Profile(){
    const [visible,setVisible] = useState(false)
    const [{data,isError,isLoading}]=useDataApi(
        '/profile',
        {
            'data':{
                'user_name':'',
                'user_img':'',
                'email':'',
                'profile':''
            },
            'message':'something error'
        },
        'get'
    )
    const {data:{user_name,user_img,email,profile}}=data;
    if(isError){
        return(
            <div>
                <p>{data.message}</p>
                <a href='/profile'>重新加载</a>
            </div>
        )
    }else{
    return(
        <Fragment>
        {isLoading ? (
            <Spin className='login-form'/>
            ) : (
            <Fragment>
                <Route path='/profile/change'  component={
                        (props)=>{
                            const {history} = props;
                            // console.log(props);
                            if(props.match.path==='/profile/change'){
                                setVisible(true);
                            };
                            return <ChangeProfile 
                                set_visible={setVisible} 
                                visible={visible} 
                                user_data={{user_name,user_img,profile}}
                                history = {history}
                            />
                        }
                }/>
                <Card
                    style={{width:860,marginLeft:'auto',marginRight:'auto',textAlign:'left'}}
                    title={user_name +" 的个人信息"}
                    extra={
                        <Link to='/profile/change' onClick={()=>(setVisible(true))}>
                            <Button><Icon type="edit" /> Edit</Button>
                        </Link>
                    }
                    hoverable
                >
                    <Meta
                        avatar={<Avatar size={100} icon="user" src={user_img}/>}
                    />
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="昵称"
                    >
                        <Meta
                        title={user_name}
                        />
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="邮箱"
                    >
                        <Meta
                        title={email}
                        />
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title="简介"
                    >
                        <Meta
                        title={profile?profile:'无'}
                        />
                    </Card>
                </Card>
            </Fragment>
            )}
        </Fragment>
    );
}
}

export default Profile;