/*
 * :file description: 
 * :name: /dumi/.dumirc.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-10-21 21:31:50
 * :last editor: 张德志
 * :date last edited: 2023-10-22 15:09:14
 */
import { defineConfig } from 'dumi';

export default defineConfig({
  themeConfig:{
    mode: 'site',
    name: '晓智文档',
    outputPath: 'doc',
    antd: {},
    base: '/',
    publicPath: '/',
    history: { type: 'hash' },
    nav: [
      {
        title: '前端',
        link: '/frontend',
      },
      {
        title: '移动端',
        link: '/mobile',
      },
      {
        title: '后台',
        link: '/backend',
      },
    ],
  }
});
