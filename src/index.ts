import axios, { Axios } from "axios";
import request, { API_PREFIX } from "./request";
import myAxios from "./request/MyAxios";

(async () => {
  const { success, data } = await request.get<any>(`${API_PREFIX}/users/list`);
  if (success) {
    // alert(data)
    console.log(data);
  }
  // console.log(await request.get(`${API_PREFIX}/users/info`));
})();

(async () => {
  const myAxiosInstance = myAxios.create({});
  myAxiosInstance.interceptors.requests.use(
    (config) => {
      return Promise.resolve({
        ...config,
        header: {
          "Cache-Control": "no-store",
          Authorization: `Bearer UHDIUWOPWKOPWKWPKOPWKPWKWOKPW.IUWIDWIOWJOWKDWOK.WDIUdjowijiowdjowjoW`,
        },
      });
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  myAxiosInstance.interceptors.response.use(
    ({ response }) => {
      return Promise.resolve({
        success: true,
        data: response,
      });
    },
    ({ statusText }) => {
      return Promise.resolve({
        success: false,
        message: statusText,
      });
    }
  );
  const { success, data } = await myAxiosInstance.get<{
    success: boolean;
    data: any;
  }>(`${API_PREFIX}/users/list`);
  if (success) {
    // alert(data)
    console.log(data);
  }
})();
