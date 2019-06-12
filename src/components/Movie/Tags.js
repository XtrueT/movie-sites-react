import React ,{Fragment,useState,useEffect} from 'react';
import {useDataApi} from '../../api/data_api';
import {Tag} from 'antd';
import MovieList from './MovieList';

const {CheckableTag} = Tag;

function Tags(match){
    const [selectedTags,setSelect]=useState([]);
    const [query,setQuery]=useState(null);
    const [state]=useDataApi(
        '/tags',
        {  
                
                    'message':'',
                    'status':0,
                    'data':[]
        },
        'get'
    );
    const {data,isError} = state;
    const tags = data.data;

    const handleChange = (tag, checked)=>{
        const nextSelectedTags = checked ? [tag] : selectedTags.filter(t => t !== tag);
        setSelect(nextSelectedTags);
        if(nextSelectedTags[0]){
            setQuery(nextSelectedTags[0]);
        }else{
            setQuery('all');
        }
    };
    if(isError){
        return <div>something error</div>
    }
    return (
        <Fragment>
            <h3 style={{marginRight:8,display:'inline'}}>分类</h3>
                {tags.map(tag=>{
                    return (
                        <CheckableTag
                            key={tag.num}
                            checked={selectedTags.indexOf(tag.num)>-1}
                            onChange={checked=>(
                                handleChange(tag.num,checked)
                            )}
                        >
                            {tag.tag_name}
                        </CheckableTag>
                    )
                }
                )}
            {query?<MovieList url={`/tag/${query}`}/>:<MovieList/>}
        </Fragment>
    )
}
export default Tags;