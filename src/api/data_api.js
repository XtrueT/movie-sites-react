import { useState,useEffect} from 'react';
import {Axios_server} from './serverConfig';

const useDataApi = (initialUrl,initialData,initialMethod) =>{
    const [data,set_data] = useState(initialData);
    const [url,set_url] = useState(initialUrl);
    const [method,set_method] = useState(initialMethod);
    const [isLoading,set_isLoading] = useState(false);
    const [isError,set_isError] = useState(false);


    useEffect(()=>{
        const fetch_data = async ()=>{
                set_isError(false);
                set_isLoading(true);
                try {
                        // let result=data;
                        let result;
                        switch (method){
                            case 'post':
                                {
                                    result = await Axios_server.post(url,data);
                                    console.log(result);
                                    break;
                                }
                                case 'put':
                                {
                                    result = await Axios_server.put(url,data);
                                    break;
                                }
                                case 'patch':
                                {
                                    result = await Axios_server.patch(url,data);
                                    break;
                                }
                                case 'get':
                                {
                                    result = await Axios_server.get(url,data);
                                    break;
                                }
                                case 'delete':
                                {
                                    result = await Axios_server.delete(url,data);
                                    break;
                                }
                                default:{
                                    alert("method error");
                                    break;
                                }
                        };
                        const {status,message} = result;
                        if(status===200)
                        {
                            set_data(result);
                        }else{
                            set_data(data=>({...data,message:message}));
                            set_isError(true);
                        };
                    } 
                catch (error) {
                    set_isError(true);
                }
                set_isLoading(false);
            };
        fetch_data();
        },
        [url]
    );//当url,data,method改变才会执行第一个参数，函数
    const doFetch_url = (url) =>{
        set_url(url);
    };
    const doFetch_method = method=>{
        set_method(method);
    }
    const doFetch_data = data =>{
        set_data(data);
    };
    return {data,isLoading,isError,doFetch_url,doFetch_method,doFetch_data};
};
export {useDataApi};