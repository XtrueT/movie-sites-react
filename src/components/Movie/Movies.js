import React ,{Fragment,useState} from 'react';
import {useDataApi} from '../../api/data_api';
import {Tag, PageHeader,Empty} from 'antd';
import MovieList from './MovieList';

const {CheckableTag} = Tag;

function Movies({history}){
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
        const {num,tag_name} = tag;
        const nextSelectedTags = checked ? [num] : selectedTags.filter(t => t !== num);
        setSelect(nextSelectedTags);
        if(nextSelectedTags[0]){
            setQuery(nextSelectedTags[0]);
            window.location.hash=`#${tag_name}`;
        }else{
            setQuery('all');
            window.location.hash='#All';
        }
    };
    if(isError){
        return (<Empty/>)
    }
    return (
        <Fragment>
            <PageHeader 
                style={{textAlign:'left'}}  
                onBack={() =>history.push('/')}
                title={<h2 style={{marginRight:8,display:'inline'}}>分类</h2>}
                tags={tags.map(tag=>{
                    return (
                        <CheckableTag
                            style={{marginTop:10,marginLeft:20}}
                            key={tag.num}
                            checked={selectedTags.indexOf(tag.num)>-1}
                            onChange={checked=>(
                                handleChange(tag,checked,)
                            )}
                        >
                            {tag.tag_name}
                        </CheckableTag>
                    )
                })}
            >
            {query?<MovieList url={`/tag/${query}`}/>:<MovieList/>}
            </PageHeader>
        </Fragment>
    )
}
export default Movies;