import React,{useState} from 'react';

import AllComments from './AllComments';

import {PageHeader,Button} from 'antd';

function UserComments(){
    const [edit,set_edit] = useState(false);
    return(
        <PageHeader 
            title="评论历史"
            extra={[
                !edit?<Button key="1" onClick={()=>set_edit(true)}>编辑</Button>:
                <Button key="2" onClick={()=>set_edit(false)}>取消</Button>
            ]}
        >
            <AllComments url={`/user/comments`} is_edit={edit}/>
        </PageHeader>
    );
}

export default UserComments; 