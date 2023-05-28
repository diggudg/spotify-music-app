import {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

const onRequest = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
  const { method } = config;

  if (method === "get") {
    config.timeout = 15000;
  }
  return config;
};
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

export function setupInterceptorsTo(
  axiosInstance: AxiosInstance
): AxiosInstance {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
}
