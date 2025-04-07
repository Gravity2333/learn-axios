import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:9000/api";
console.dir(axios);

const abortController = new AbortController()


setTimeout(() => {
  abortController.abort()
}, 2000);

// axios({
//   url: "/users/list",
//   responseType: "json",
//   signal: abortController.signal,
// }).then((res) => {
//   console.log("res", res);
// }).catch(()=>{})

axios({
  method:'post',
  url:'/users/upload-test',
  onUploadProgress: (e)=>{
    console.log("upld",e)
  },
  data: 'sdhadhuais'
}).then((res) => {
  console.log("upload res", res);
}).catch(()=>{})