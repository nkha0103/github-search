import axiosClient from "./axiosClient";

const rateLimitApi = {
    getRateLimit: () => {
        return axiosClient.get(`/rate_limit`)
    }
};

export default rateLimitApi;