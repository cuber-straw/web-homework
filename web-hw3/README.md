# 2020 WEB 前端开发第一次作业

## 项目结构

.  
├── assets                    
├── font-awesome-4.7.0        
├── footer.css                
├── header.css                
├── index.html                
├── main.css                  
├── my-login.html             
├── my-signup.html            
├── README.md                 
├── subpage.css               
└── subpage.html              

其中：
- assets 文件夹：包含项目中用到的图片、视频资源
- font-awesome-4.7.0 文件夹：包含font-awesome图表样式
- 层叠样式表
    - footer.css 描述底部页角样式
    - header.css 描述顶部样式
    - main.css   描述一级页面样式
    - subpage.css 描述二级页面样式
- HTML
    - my-login.html 登录页面
    - my-signup.html 注册页面
    - index.html 主页面
    - subpage.html 二级页面


## 打开方式
推荐使用 Chrome、Firefox 浏览器

## BI 第一道大题
举例子，什么是多维模型，什么是层、怎么是上钻、下探

### 关于 xhr 对象的 readyState 一直为 1 的问题
在这个登录的例子中，输入不存在的用户名，有的时候能提示用户名不存在，通过检查知这时 readyState 为 4，正常。也有的时候就没有反应，尤其当输入存在的用户名时，完全就没有反应，通过检查知这时 readyState 为 1，反正就是一直到不了4，但是服务端的逻辑仍然正常执行了，就是客户端这边的 readyState 始终到不了 4.
原因可能是采用了异步的操作，即 `xhr.open('get', url, true)` ，在异步的情况下客户端不会刻意等待服务端的相应，有可能服务端还没有把数据传过来，客户端就GG了。

解决方法：把异步操作改为同步 `xhr.open('get', url, true)`.
