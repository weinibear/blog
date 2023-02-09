module.exports = {
  title: '我的',
  description: '技术总结与分享',
  base: '/blog/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      {
        text: 'weini 的',
        items: [
          { text: '掘金', link: 'https://juejin.cn/user/726107228492253' },
          { text: 'Github', link: 'https://github.com/coding-lin' },
        ],
      },
    ],
    sidebar: [
      {
        title: '欢迎学习',
        path: '/',
        collapsable: false, // 是否折叠
        children: [{ title: '简介', path: '/' }],
      },
      {
        title: '基础篇',
        path: '/handbook/1',
        collapsable: true,
        children: [
          { title: '第一篇', path: '/handbook/1' },
          { title: '第二篇', path: '/handbook/2' },
        ],
      },
    ],
  },
};
