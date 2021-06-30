import axios from "axios";
axios.defaults.withCredentials = true;

export const makeGet = async (url: string) => {
    return axios({
        method: "get",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        withCredentials: true,
        url: url
    });
};

export const makePost = async (url: string, data: any) => {
    return axios({
        method: "post",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },

        url: url,
        data: data,
        withCredentials: true
    });
};

export const makePut = async (url: string, data: any) => {
    return axios({
        method: "put",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },

        url: url,
        data: data,
        withCredentials: true
    });
};

export const makeDelete = async (url: string, data: any) => {
    return axios({
        method: "delete",
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        url: url,
        data: data,
        withCredentials: true
    });
};

