import apiClient from "./baseApi";

const apiServices = {
    getOrder: () =>
    apiClient.get(`orders`),

}