import Api from './Api';

const url = "/user";

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

// export
const UserApi = { getAll, getByID, create, updateByID, deleteByID }
export default UserApi;