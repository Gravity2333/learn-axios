const Koa = require('koa')
const KoaRouter = require('@koa/router')

const cors = require('koa2-cors')



const app = new Koa()
app.use(cors({
    origin:"*", // 允许来自指定域名请求
    maxAge: 5, // 本次预检请求的有效期，单位为秒。
    methods:['GET','POST'],  // 所允许的HTTP请求方法
    alloweHeaders:['Conten-Type'], // 服务器支持的所有头信息字段
    credentials: true // 是否允许发送Cookie
  }))
const userRoute = new KoaRouter({prefix:'/api/users'})
function delay(t){
    const n = +(new Date())
    while(+(new Date()) - n <= t){}
}
userRoute.get('/list',(ctx,next)=>{
    console.log(ctx.headers)
    delay(1000)
    ctx.body = [
        {name: 'why',age:18,score:100},
        {name: 'Tom',age:22,score:23},
        {name: 'Jack',age:23,score:32},
        {name: 'Bill',age:43,score:13},
        {name: 'why',age:18,score:100},
        {name: 'Tom',age:22,score:23},
        {name: 'Jack',age:23,score:32},
        {name: 'Bill',age:43,score:13},
        {name: 'why',age:18,score:100},
        {name: 'Tom',age:22,score:23},
        {name: 'Jack',age:23,score:32},
        {name: 'Bill',age:43,score:13},
        {name: 'why',age:18,score:100},
        {name: 'Tom',age:22,score:23},
        {name: 'Jack',age:23,score:32},
        {name: 'Bill',age:43,score:13},
    ]


})

userRoute.get('/info',(ctx,next)=>{
    console.log(ctx.headers)
    ctx.body = [
        {name: '1',age:18,score:100},
        {name: '2',age:18,score:100},
        {name: '3',age:18,score:100},
        {name: '4',age:18,score:100},
        {name: '1',age:18,score:100},
        {name: '2',age:18,score:100},
        {name: '3',age:18,score:100},
        {name: '4',age:18,score:100},
    ]
       ctx.status = 500
       ctx.message='231243546456757'
       ctx.body = {
        message: 'err 123123'
       }
})

userRoute.post('/upload-test', async (ctx, next) => {
    console.log('收到上传请求:', ctx.headers);
  
    // 模拟 10 秒延迟
    function delay(t) {
      return new Promise(resolve => setTimeout(resolve, t));
    }
    await delay(10000); // 等 10 秒
  
    ctx.body = {
      code: 0,
      message: '上传成功',
      data: {
        url: 'http://127.0.0.1:9000/uploads/test.jpg'
      }
    };
  });

app.use(userRoute.routes())

app.listen(9000,()=>{
    console.log('api server init!');
})