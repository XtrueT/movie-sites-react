import React,{useState} from 'react';
import {Axios_get} from '../../api/server';
import { Input, Empty,Dropdown} from 'antd';
const Search = Input.Search;

function SearchForm(){
    const [data, setData] = useState({
        data:{
            list:[]
        },
        message:''
    });
    const handlerSearch = (v)=>{
        //匹配中英文数字组合
        const pattern = /^[\u4e00-\u9fa5a-zA-Z-z0-9]+$/;
        if(!pattern.test(v)){
            const rs = {
                data:{
                    list:[]
                },
                message:'请输入正确的电影名'
            };
            setData(rs);
        }
        if(v!==''&& pattern.test(v)){
            Axios_get(`/search/${v}`,this,(that,rs)=>{
                setData(rs);
            });
        }
    };
    return (
        <Dropdown 
            overlay={
            <main className='search-ol'>
            {data.data.list.length!==0&&data.data.message!==''?
                    data.data.list.map(item=>(
                        <a href={`/movie/${item.id}`} key={item.id}>
                            <li key={item.id}>
                                <span style={{marginLeft:30}}>{item.title}</span>
                            </li>
                        </a>
                    ))
                    :
                    <Empty description={data.message}/>}
            </main>
            }
        >
        <Search  
            placeholder="电影名"
            onSearch ={value=>handlerSearch(value)}
            onChange={value =>handlerSearch(value.target.value)}
        />
        </Dropdown>
    );
}
export default SearchForm;

