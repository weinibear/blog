webpack

## 安装

```bash
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev

// 可以使用--config指定配置文件，默认就是webpack.config.js
npx webpack --config webpack.config.js

package.json中配置
"build": "webpack"

```

## html-webpack-plugin 插件

自动生成 index.html，并添加打包后文件，不用手动新增 index.html

```bash
const HtmlWebpackPlugin = require('html-webpack-plugin');
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
```

## webpack-dev-server

当文件有改动时自动编译

```js
 devServer: {
    static: './dist',
  },

 "start": "webpack serve --open",
```

会在 8080 端口启动一个 web 服务，并监听文件改动，会自动在内存中生成 index.html 和 bundle.js

## Code Splitting

当两个入口文件中都有引用相同包时，在打包后输出文件中都会包含这个包

### 1.公共包分离

```js
  index: {
      import: './src/index.js',
      dependOn: 'shared',
    },
    another: {
      import: './src/another-module.js',
      dependOn: 'shared',
    },
    shared: 'lodash',

// 单页面应用中要使用多个入口文件时，建议配置
 optimization: {
    runtimeChunk: 'single',
  },
```

### 2.使用 `SplitChunksPlugin`插件

```js
  optimization: {
     splitChunks: {
       chunks: 'all',
     },
   },
```

### 3.使用动态导入

```js
// 除了index.bundle.js外，另有lodash的bundle
async function getComponent() {
  const element = document.createElement('div');
  const { default: _ } = await import('lodash');

  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

getComponent().then((component) => {
  document.body.appendChild(component);
});
```

### 4.使用 prefetching/preloading

Webpack v4.6.0+ 增加了对预获取和预加载的支持

**prefetch** 将来某些导航页面可能需要的资源

**preloading** 当前导航页面下将会用到的资源

**比较：**  
preload chunk 会在父 chunk 加载时，以并行方式开始加载。prefetch chunk 会在父 chunk 加载结束后开始加载。  
preload chunk 具有中等优先级，并立即下载。prefetch chunk 在浏览器闲置时下载。  
preload chunk 会在父 chunk 中立即请求，用于当下时刻。prefetch chunk 会用于未来的某个时刻。  
浏览器支持程度不同。

prefetch 例子：有一个 HomePage 组件，其内部渲染一个 LoginButton 组件，然后在点击后按需加载 LoginModal 组件。

LoginButton.js

```js
import(/* webpackPrefetch: true */ './path/to/LoginModal.js');
```

这会生成 <link rel="prefetch" href="login-modal-chunk.js"> 并追加到页面头部，指示着浏览器在闲置时间预取 login-modal-chunk.js 文件。

preload 例子：  
有图表组件 ChartComponent 组件需要依赖一个体积巨大的 ChartingLibrary 库。它会在渲染时显示一个 LoadingIndicator(加载进度条) 组件，然后立即按需导入 ChartingLibrary

ChartComponent.js

```js
import(/* webpackPreload: true */ 'ChartingLibrary');
```

### 5.bundle 分析

1.打包内容分析工具 webpack-bundle-analyzer

```js
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

plugins: [new BundleAnalyzerPlugin()];
```

## 缓存

### 1.配置输出 bundle name

只有当输出 bundle 改变时，文件名才会变化

```js
 output: {
   filename: '[name].[contenthash].js',
 },
```

### 2.使用 code splitling 将 bundle 分开输出

```js
// 1.将runtime code分离成一个runtime chunk
 optimization: {
     runtimeChunk: 'single',
   },

// 2.使用SplitChunksPlugin插件将一些三方库如loadsh或react，分离成一个vendor chunk
 optimization: {
     runtimeChunk: 'single',
     splitChunks: {
       cacheGroups: {
         vendor: {
           test: /[\\/]node_modules[\\/]/,
           name: 'vendors',
           chunks: 'all',
         },
       },
     },
    },
```

### 3.Module Identifiers

新建一个 print.js,在 index.js 中引入，这种涉及到一个包引入另一个包，重新 build 后，bundle name 会改变，因为 module.id 变化.
配置使得不因 module.id 变化而改变 bundle name

```js
 optimization: {
     moduleIds: 'deterministic',
 }

```

## build performance

### 1. 使用最新的 webpack 和 nodejs

### 2. loaders

```js
 rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],

//换成
rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],

```

### 3.减少启动时间

每一个额外的 loader/plugin 都有 bootup time，尽可能少用多的工具

### 4.resolving

提高解析速度：

1. 减少如`resolve.modules`,`resolve.extensions`,`resolve.mainFiles`等里面条目的数量，因为他们会增加文件系统的调用次数
2. 如果没有使用 symlinks 像`npm link`,`yarn link`, 可以设置 resolve.symlinks: false
3. 如果使用自定义 resolve plugin 规则，并没有指定 context 上下文，可以设置 resolve.cacheWithContext: false

### 5.Dlls

使用`DllPlugin`插件将那些不是经常变化的 code 输出为单独的编译结果，这会提高应用编译的速度，尽管它会加大打包过程的复杂度

### 6.小就是快

减小编译输出的总大小以提高 build performance，试着保持 chunks small

1. 使用小的三分库
2. 在多页面应用中使用`SplitChunksPlugin`
3. 在多页面应用中使用`SplitChunksPlugin`，并开启并发模式
4. 移除无用的代码
5. 只编译当前你正在开发的那些代码部分

### 7.worker 池

`thread-loader`将非常耗资源的 loaders 分配给一个 worker 池，但也不应使用太多的 worker 池

### 8.持久化缓存

在 webpack 配置中使用 cache 选项，使用 package.json 中的`postinstall`来清除缓存目录

### 9.自定义 plugins/loaders 的使用

使用时要进行概要分析，以确保不会引入性能相关问题

### 10.Progress 插件的使用

将`ProgressPlugin`从 webpack 配置中移除可以缩短打包时间（`rogressPlugin`插件可能对快速 build 并不能提供太多价值，所以使用时要注意权衡利弊）

### 11.【for dev】

1. Incremental Builds
2. Compile in Memory
3. stats.toJson speed

### 12.【for prod】
