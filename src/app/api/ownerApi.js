import axiosClient from "./axiosClient";

const ownerApi = {
    getOwner: (username) => {
        return axiosClient.get(`/users/${username}`)
    }
};

export default ownerApi;