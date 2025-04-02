import axios, { Axios } from "axios";

axios.defaults.baseURL = "http://127.0.0.1:9000/api";

axios
  .get("/users/list", {
    url: "/dasda",
    method: "post",
  })
  .then((res) => {
    console.log(res);
  });

axios.interceptors.request.use(
  (config) => {
    console.log("before success");
    return config;
  },
  (err) => {
    console.log(err);
  }
);

axios.interceptors.response.use((res)=>{
  console.log(res)
  return res
})

console.log(axios.interceptors);
const a = new Axios()


console.dir(axios.getAdapter(['fetch','http']))
