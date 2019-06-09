import React ,{Fragment,useState} from 'react';
import {Tag} from 'antd';

const {CheckableTag} = Tag;

const tagsFromServer = [
    '武侠',
    '科幻',
    '悬疑',
    '恐怖'
]

function Tags({match}){
    
    const [selectedTags,setSelect]=useState([]);
    const handleChange = (tag, checked)=>{
        const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        setSelect(nextSelectedTags);
        };
    return (
        <Fragment>
            <h3 style={{marginRight:8,display:'inline'}}>分类</h3>
                {tagsFromServer.map(
                    tag=>(
                        <CheckableTag
                            key={tag}
                            checked={selectedTags.indexOf(tag)>-1}
                            onChange={checked=>(
                                handleChange(tag,checked)
                            )}
                        >
                            {tag}
                        </CheckableTag>
                    )
                )}
        </Fragment>
    )
}
export default Tags;