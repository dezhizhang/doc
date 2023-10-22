/*
 * :file description: 
 * :name: /dumi/.dumirc.ts
 * :author: 张德志
 * :copyright: (c) 2023, Tungee
 * :date created: 2023-10-21 21:31:50
 * :last editor: 张德志
 * :date last edited: 2023-10-22 20:22:26
 */
import path from 'path';
import { defineConfig } from 'dumi';

const { REACT_APP_ENV } = process.env;
const isProduction = process.env.NODE_ENV === 'production';
//获取package.json中的version变量,需要根据项目目录结构确认
const PKG = require(path.resolve(process.cwd(), 'package.json'));

// 静态文件路径前缀
const VER_PATH = REACT_APP_ENV === 'prod1' ? `http://cdn.xiaozhi.shop/${PKG.name}/` : `/`; // 获取编译环境配置

const publicPath = isProduction ? VER_PATH : '/';

export default defineConfig({
  themeConfig:{
    mode: 'site',
    name: '晓智文档',
    antd: {},
    base: '/',
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
  },
  publicPath: publicPath,
  outputPath: `${PKG.name}`,
  
});
