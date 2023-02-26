#### 浏览器缓存机制

浏览器缓存其实就是浏览器保存通过 HTTP 获取的所有资源,是浏览器将网络资源存储在本地的一种行为。浏览器的缓存机制是根据 HTTP 报文的缓存标识进行的。

##### 强制缓存

当浏览器向服务器发起请求时，服务器会将缓存规则放入 HTTP 响应报文的 HTTP 头中和请求结果一起返回给浏览器，控制强制缓存的字段分别是`Expires`和`Cache-Control`，其中`Cache-Control`优先级比`Expires`高。

###### Expires

Expires 是 http1.0 的产物，Cache-Control 是 http1.1 的产物,Expires 其实是过时的产物，现阶段它的存在只是一种兼容性的写法

缓存过期时间，用来指定资源到期的时间，是服务器端的具体的时间点。也就是说，`Expires=max-age + 请求时间`，需要和`Last-modified`结合使用。`Expires`是 Web 服务器响应消息头字段，在响应 http 请求时告诉浏览器在过期时间前浏览器可以直接从浏览器缓存取数据，而无需再次请求。

###### Cache-Control

- 1. public：所有内容都将被缓存（客户端和代理服务器都可缓存）
  2. private： 客户端缓存，这个是默认值
  3. no-cache：客户端 缓存，但是是否使用还要经过协商缓存来决定
  4. no-store 都不会被缓存
  5. max-age 缓存内容在请求后多少秒失效

###### 缓存位置

##### 协商缓存

协商缓存就是强制缓存失效后，浏览器携带缓存标识向服务器发起请求，由服务器根据缓存标识决定是否使用缓存的过程，两种情况：

- 协商缓存生效，返回 304 和 Not Modified

  ![img](https://pic3.zhimg.com/80/v2-29af290eabb00d70fb015eeeccf16666_720w.jpg)

- 协商缓存失效，返回 200 和请求结果

  ![img](https://pic2.zhimg.com/80/v2-1683bb59b2f2dbc33cddb93de7acf791_720w.jpg)

###### Last-Modified 和 If-Modified-Since

1. 浏览器首先发送一个请求，让服务端在`response header`中返回请求的资源上次更新时间，就是`last-modified`，浏览器会缓存下这个时间。
2. 然后浏览器再下次请求中，`request header`中带上`if-modified-since`:`[保存的last-modified的值]`。根据浏览器发送的修改时间和服务端的修改时间进行比对，一致的话代表资源没有改变，服务端返回正文为空的响应，让浏览器中缓存中读取资源，

###### ETag 和 If-None-Match

​ 和`last-modified`一样. - 浏览器会先发送一个请求得到`etag`的值，然后再下一次请求在`request header`中 带上`if-none-match`:`[保存的etag的值]`。 - 通过发送的`etag`的值和服务端重新生成的`etag`的值进行比对，如 果一致代表资源没有改变，服务端返回正文为空的响应，告诉浏览器从缓存中读取资源。

##### 用户行为对浏览器缓存的控制

1. F5 刷新，浏览器会设置 max-age=0，跳过强缓存判断，会进行协商缓存判断；
2. ctrl+F5 刷新，跳过强缓存和协商缓存，直接从服务器拉取资源。

![image-20210617162847963](/home/weini/.config/Typora/typora-user-images/image-20210617162847963.png)
