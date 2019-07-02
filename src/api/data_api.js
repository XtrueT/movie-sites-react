import { useState,useEffect,useReducer} from 'react';
import {Axios_server} from './serverConfig';

const useDataApi = (initialUrl,initialData) =>{
    const [url,set_url] = useState(initialUrl);

    const dataFetchReducer = (state,action)=>{
        switch(action.type){
            case 'INIT':{
                return {
                    ...state,
                    isLoading:true,
                    isError:false
                };
            }
            case 'SUCCESS':{
                return {
                    ...state,
                    isLoading:false,
                    isError:false,
                    data:action.payload,
                };
            }
            case 'ERROR':{
                return {
                    ...state,
                    isLoading:false,
                    isError:true,
                };
            }
            default:
                throw new Error();
        }
    };

    const [state,dispatch] = useReducer(dataFetchReducer,{
        isLoading:false,
        isError:false,
        data:initialData,
    });

    useEffect(()=>{
        let didCancel = false;
        const fetch_data = async ()=>{
            dispatch({type:'INIT'})
            try {
                    let result;
                    result = await Axios_server.get(url);
                    // console.log(result);
                    if(result==='Unauthorized Access'){
                        return dispatch({type:'ERROR',payload:result});
                    }
                    if(!didCancel){
                        dispatch({type:'SUCCESS',payload:result});
                    }
            } 
            catch (error) {
                if(!didCancel){
                    dispatch({type:'ERROR'});
                }
            }
        };
        fetch_data();
        return () => {
            didCancel = true;
        };
    },
    [url] 
    );
// eslint-disable-next-line

    const doFetch_url = (url) =>set_url(url);

    return [state, doFetch_url];
};
export {useDataApi};