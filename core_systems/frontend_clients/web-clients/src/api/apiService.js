import axios from "axios";
import axiosInstance from "./axiosInstance";
import { data } from "react-router-dom";


export const createData = (endpoint, data) => {
    return axiosInstance.post(endpoint,data);
};

export const getAllData = (endpoint) => {
    return axiosInstance.get(endpoint);
};

export const getDataById = (endpoint, id) => {
    return axiosInstance.get(`${endpoint}/${id}`);
};

export const updateData = (endpoint, id, data) => {
    return axiosInstance.put(`${endpoint}/${id}`, data)
};

export const deleteData = (endpoint, id) => {
  return axiosInstance.delete(`${endpoint}/${id}`);
};

export const loginUser = (data) =>{
    return axiosInstance.post("/auth/token/", data);
};