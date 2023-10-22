/*
 * :file description: 
 * :name: /dumi/.dumirc.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-10-21 21:31:50
 * :last editor: 张德志
 * :date last edited: 2023-10-22 15:16:19
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
        title: '前端文档',
        link: '/frontend',
      },
      {
        title: '移动文档',
        link: '/mobile',
      },
      {
        title: '后台文档',
        link: '/backend',
      },
      {
        title:'人工智能',
        link:'/ntelligence'
      }
    ],
  }
});
