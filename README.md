# nodejs
nodejs服务端

# mocha
测试使用mocha测试框架,并配合should中间件验证测试结果 <br>
使用`npm test`进行测试,测试前请确保全局按照了`mocha` <br>
全局安装 `npm install -g mocha` <br>

[参考](http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html)


# supervisor
supervisor能够监控nodejs的服务端代码变化,nodejs的文件变化后,supervisor自动重启服务,便于开发和调试 <br>
全局安装 `npm install -g supervisor`

# 请求转发
如果希望nodejs作为前端应用的资源服务器,其他web服务器提供RESTFUL风格接口,则可配置转发路由 <br>
> 修改config.js 配置web服务器地址 <br>
> 修改routes/forward.js配置转发策略 <br>
> 修改index.jsp配置转发路由的优先级(默认优先级最低) <br>


