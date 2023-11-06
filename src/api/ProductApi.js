import Api from './Api';

const url = "/product";

const getAll = (body) => {
    return Api.get(url,body);
};

const getByID = (id) => {
    return Api.get(`${url}/${id}`);
};

const create = (body) => {
    return Api.post(url, body);
};

const updateByID = (id, body) => {
    return Api.put(`${url}/${id}`, body);
}

const deleteByID = (id) => {
    return Api.delete(`${url}/${id}`);
}

const getPaging = (limit,page,...rest) => {
    const nameFilter = rest[0];
    const restObj = Object.assign({},...rest)
    console.log('name',nameFilter);
    return Api.get(url,{
        params: {
            _limit:limit,
            _page:page,
            ...restObj
        }
    })
}

// export
const ProductApi = { getAll, getByID, create, updateByID, deleteByID,getPaging }
export default ProductApi;

