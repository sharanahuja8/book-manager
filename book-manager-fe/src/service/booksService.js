import axios from 'axios';
import { URL } from '../contants/constants'; 

export const getBooksList = async (name,author) => {
    return await axios({
        method:'get',
        url:`${URL}?name=${name}&author=${author}`
    })
}

export const saveBook = async (id,name,description,author,copies,method) => {
    let data = {
        id:id,
        name:name,
        description:description,
        author:author,
        copies:copies
    }
    return await axios({
        data:data,
        method:method,
        url:`${URL}`
    })

}

export const deleteBook = async (id) => {
    return await axios({
        method:'delete',
        url:`${URL}/${id}`
    })
}