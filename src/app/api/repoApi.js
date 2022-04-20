import axiosClient from "./axiosClient";

const repoApi = {
    getUserRepos: (username) => {
        return axiosClient.get(`/users/${username}/repos`)
    },

    getOrgRepos: (orgName) => {
        return axiosClient.get(`/orgs/${orgName}/repos`)
    }
};

export default repoApi;