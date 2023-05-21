module.exports = {
  title: '我的',
  description: '技术总结与分享',
  markdown: {
    plugins: ['task-lists'],
  },
  // base: '/blog/',
  themeConfig: {
    sidebarDepth: 2,
    logo: '/logo.jpg',
    // lastUpdated: 'Last Updated',
    head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
    nav: [
      { text: '首页', link: '/' },
      { text: 'React', link: '/react/introduce' },
      { text: 'Javascript', link: '/js/' },
      { text: 'CSS', link: '/css/' },
      { text: 'Typescript', link: '/ts/' },
      {
        text: '移动端',
        items: [
          { text: '小程序', link: '/mini-program/' },
          { text: 'flutter', link: '/flutter/' },
        ],
      },

      { text: '浏览器', link: '/browser/' },
      { text: '前端工程化', link: '/engineering/' },
      {
        text: 'Backend',
        items: [
          { text: 'Nodejs', link: '/node/' },
          { text: 'go', link: '/go/' },
          { text: 'nginx', link: '/nginx/' },
        ],
      },
      {
        text: '计算机基础',
        items: [
          { text: '计算机网络', link: '/network/' },
          { text: '数据库', link: '/database/' },
          { text: '设计模式', link: '/design-patterns/' },
          { text: '数据结构和算法', link: '/algorithms/' },
        ],
      },
      {
        text: '软件开发',
        items: [
          { text: '产品设计', link: '/product/' },
          { text: '项目管理', link: '/project-management/' },
        ],
      },
      {
        text: '工具',
        items: [
          { text: 'git', link: '/git/' },
          { text: 'linux', link: '/linux/' },
        ],
      },
      {
        text: '我的',
        items: [
          // { text: '掘金', link: 'https://juejin.cn/user/726107228492253' },
          { text: 'Github', link: 'https://github.com/weinibear' },
          { text: 'TODO', link: '/todo/' },
          { text: '知识点', link: '/interview/' },
        ],
      },
    ],
    sidebar: {
      '/react/': [
        {
          title: 'React',
          // path: '/react/',
          collapsable: false,
          children: [
            { title: '介绍', path: '/react/introduce' },
            { title: 'build-own-react', path: '/react/build-own-react' },
            { title: 'React版本历史', path: '/react/history' },
            { title: 'Api介绍', path: '/react/api' },
          ],
        },
      ],
      '/js/': [
        {
          title: 'Javascript',
          path: '/js/',
          collapsable: true,
          children: [
            { title: '基础', path: '/js/base' },
            { title: 'promise', path: '/js/promise' },
          ],
        },
      ],
      '/css/': [
        {
          title: 'Css',
          path: '/css/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/css/1' },
            { title: '第二章', path: '/css/2' },
          ],
        },
      ],
      '/mini-program/': [
        {
          title: '小程序',
          path: '/mini-program/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/mini-program/1' },
            { title: '第二章', path: '/mini-program/2' },
          ],
        },
      ],
      '/flutter/': [
        {
          title: 'Flutter',
          path: '/flutter/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/flutter/1' },
            { title: '第二章', path: '/flutter/2' },
          ],
        },
      ],
      '/browser/': [
        {
          title: '浏览器',
          path: '/browser/',
          collapsable: true,
          children: [
            { title: '浏览器渲染', path: '/browser/render' },
            { title: '浏览器进程与线程', path: '/browser/process' },
            { title: '事件循环eventloop', path: '/browser/eventloop' },
          ],
        },
      ],
      '/engineering/': [
        {
          title: '前端工程化',
          path: '/engineering/',
          collapsable: false,
          children: [
            {
              title: 'package.json',
              path: '/engineering/package.json',
            },
            { title: 'npm包管理', path: '/engineering/npm' },
          ],
        },
      ],
      '/node/': [
        {
          title: 'Nodejs',
          // path: '/node/',
          collapsable: false,
          children: [{ title: '第二章', path: '/node/2' }],
        },
      ],
      '/go/': [
        {
          title: 'Go',
          path: '/go/',
          collapsable: true,
          children: [
            { title: '基础', path: '/go/base' },
            { title: 'RPC', path: '/go/rpc' },
            { title: 'Gorm', path: '/go/gorm' },
            { title: 'protobuf', path: '/go/protobuf' },
            { title: 'twirp', path: '/go/twirp' },
            { title: 'api gateway', path: '/go/gateway' },
          ],
        },
      ],
      '/nginx/': [
        {
          title: 'nginx',
          // path: '/node/',
          collapsable: false,
          children: [{ title: '基础', path: '/nginx/base' }],
        },
      ],

      '/network/': [
        {
          title: '计算机网络',
          path: '/network/',
          collapsable: true,
          children: [
            { title: 'http缓存', path: '/network/http-cache' },
            { title: 'https', path: '/network/https' },
          ],
        },
      ],
      '/database/': [
        {
          title: '数据库',
          path: '/database/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/database/1' },
            { title: '第二章', path: '/database/2' },
          ],
        },
      ],
      '/design-patterns/': [
        {
          title: '设计模式',
          path: '/design-patterns/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/design-patterns/1' },
            { title: '第二章', path: '/design-patterns/2' },
          ],
        },
      ],
      '/algorithms/': [
        {
          title: '数据结构和算法',
          path: '/algorithms/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/algorithms/1' },
            { title: '第二章', path: '/algorithms/2' },
          ],
        },
      ],
      '/product/': [
        {
          title: '产品设计',
          path: '/product/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/product/1' },
            { title: '第二章', path: '/product/2' },
          ],
        },
      ],
      '/project-management/': [
        {
          title: '项目管理',
          path: '/project-management/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/project-management/1' },
            { title: '第二章', path: '/project-management/2' },
          ],
        },
      ],
      '/git/': [
        {
          title: 'Git',
          path: '/git/',
          collapsable: true,
          children: [
            { title: 'svn', path: '/git/svn' },
            { title: '第二章', path: '/git/2' },
          ],
        },
      ],
      '/linux/': [
        {
          title: 'Linux使用',
          path: '/linux/',
          collapsable: true,
          children: [
            { title: '第一章', path: '/linux/1' },
            { title: '第二章', path: '/linux/2' },
          ],
        },
      ],
      '/todo/': [
        {
          title: 'todo-list',
          path: '/todo/',
          collapsable: true,
          children: [{ title: '近期', path: '/todo/recent' }],
        },
      ],
      '/interview/': [
        {
          title: '知识点',
          path: '/interview/',
          collapsable: true,
        },
      ],
    },
  },
};
