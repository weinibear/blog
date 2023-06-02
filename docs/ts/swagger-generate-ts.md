### 背景
前端项目使用typescript开发，后端使用RESTful风格API，当进行接口联调时，不借用任何工具的情况下，每一个接口，前端都需要手写接口参数和返回值类型，如果返回值接口很复杂，前端开发所需要写的类型就非常繁琐。并且，当后端接口变化时，前端也要重新根据接口变化
写类型定义。其实，后端制定接口时，一般都会写接口文档（如swagger），其中会写清各个接口的参数及返回值定义。寻找一种解决方案，可以实现自动根据后端提供的swagger文档,生成前端所需要的类型文件及封装好的接口调用方法。

### 使用swagger-typescript-api三方库实现

1.安装包

```bash
pnpm install swagger-typescript-api -D
```

2.新增swagger-ts.js生成配置文件函数

```js
const { generateApi } = require('swagger-typescript-api');
const path = require('path');
const outputDir = path.resolve(process.cwd(), './src/__generated__');

/* NOTE: all fields are optional expect one of `output`, `url`, `spec` */
generateApi({
  // input: path.resolve(process.cwd(), "./schemas.json"),
  url: 'http://api.com/swagger.json',
  output: outputDir,
  modular: true,
  templates: path.resolve(process.cwd(), './templates'),
  axios: true,
  routeTypes: true,
});
```

3.提供模板
  1）拷贝https://github.com/acacode/swagger-typescript-api/tree/master/templates文件夹作为默认模板。
  2）可以根据个人开发需求修改模板，主要是http-client.ejs这个文件
  3）拷贝base/http-client文件到default或modular目录
  
4.执行swagger-ts文件，即可快速生成类型文件，前端项目中直接可以使用
