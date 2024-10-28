# SEO（搜索引擎优化）指南

- SEO（Search Engine Optimization）是通过优化网站内容、结构和外部链接，提升网页在搜索引擎结果中的排名，从而增加网站流量的过程。SEO 涉及多个层面，包括技术 SEO、内容优化、外部链接建设等。以下是 SEO 的核心优化策略。

### 搜索引擎的工作原理

1. ##### 网络爬虫（Crawling）

- 搜索引擎使用自动化程序（称为网络爬虫或蜘蛛）从互联网中抓取网页。爬虫会通过链接在不同的网站之间跳转，抓取网页的内容并存储到数据库中。这一过程类似于为互联网建立索引卡片。

2. ##### 索引（Indexing）

- 爬虫抓取到的网页内容被存储并进行索引处理。搜索引擎会解析网页中的文本、标题、图片等信息，并根据这些内容创建索引。索引是按关键词组织的数据库，帮助搜索引擎快速找到与用户查询相关的内容。

3. ##### 排名算法（Ranking Algorithm）

当用户输入搜索查询时，搜索引擎会根据预设的算法对所有与查询相关的网页进行排序。算法会考虑多个因素，比如：

- 键词匹配度：网页内容与搜索关键词的相关性。
- 页面质量：包括内容的独特性、权威性和结构等。
- 外部链接：从其他高质量网站链接到该页面的数量和质量。
- 用户体验：页面加载速度、移动设备兼容性等。

4. ##### 检索（Retrieval）

- 当用户提交查询后，搜索引擎会根据索引数据库和排名算法快速检索出与查询最相关的网页，并按照排名高低展示在搜索结果页面上。用户看到的搜索结果通常包括网页标题、简短描述和链接。

5. ##### 结果优化（Optimization）

- 为了不断提高搜索结果的质量，搜索引擎会使用机器学习和人工智能技术，根据用户的点击、停留时间、跳出率等行为数据，优化搜索算法，以提供更相关的结果。

6. 定期更新（Updating）

- 互联网是动态的，内容不断更新。搜索引擎会定期重新爬取网页，更新索引，并调整排名，确保用户能够看到最新、最相关的内容。

### seo 查询工具

[chinaz](https://seo.chinaz.com/)  
[爱站网](https://www.aizhan.com/cha/)

### 关键词定义及分类

1. ##### 关键词定义

- 关键词是指用户在搜索引擎中输入的词汇或短语，或者网页内容中最能反映其主题的词语。在 SEO 中，关键词是内容与用户搜索意图之间的桥梁。通过优化网页内容中的关键词，可以提升该网页在搜索引擎中的排名，从而吸引更多的自然流量。

2. ##### 关键词分类

- 1. 按关键词长度分类
     a. 短尾关键词（Short-Tail Keywords）
     定义：通常由 1-2 个词组成，涵盖广泛的主题。
     特点：搜索量大，竞争激烈，转换率较低。
     例子：鞋子、笔记本电脑。
- 2. 按用户搜索意图分类
     a. 导航型关键词（Navigational Keywords）
     定义：用户使用这些关键词来寻找特定的网站或品牌。
     特点：通常是品牌名称、产品名称或网址等。
     例子：Facebook 登录、Apple 官网。
- 3. 按竞争程度分类
     a. 高竞争关键词
     定义：搜索量大，多个网站争相优化这些关键词。
     特点：竞争激烈，通常需要大量的 SEO 工作或预算投入。
     例子：信用卡、SEO 工具。
- 4. 按品牌相关性分类
     a. 品牌关键词（Branded Keywords）
     定义：包含特定品牌名称的关键词。
     特点：搜索这些词的用户通常是特定品牌的忠实用户或有购买意图。
     例子：Nike 跑鞋、iPhone 15 Pro Max。
- 5. 其他分类
     a. 地理关键词（Geographical Keywords）
     定义：包含地理位置或地域特定的关键词。
     特点：用户意图寻找本地服务或产品。
     例子：上海餐厅推荐、附近的牙医。
     应用场景：适用于本地化营销策略，特别是餐饮、服务业等需要吸引本地客户的行业。

### 关键词挖掘工的使用

[百度指数](https://index.baidu.com/v2/index.html#/)
[爱站网](https://www.aizhan.com/)

### TDK 优化

- TDK 是 Title(页面标题)、Meta Description（页面描述）和 Meta Keywords（页面关键词）的缩写，对网站的这三个信息的提炼是网站 SEO 的重要环节。
- 但是由于一些原因，各大主流搜索引擎基本都已经大大降低甚至移除了 <keywords> 对排名的影响。例如：

百度：几乎放弃了对<keyword>标签的参考价值。参考：百度官方称：keywords 这个 meta 标签已经被丢进历史垃圾堆了；
谷歌：目前几乎已经不考虑这个标签对于 SEO 的作用了，它可能更侧重于内容的相关性以及反向链接的考量。参考：# Google 不会将关键字元标记用于网页排名
必应：目前 keywords 标签仍然对排名有一定影响；

### HTML 语义化

语义化是指内容的结构化（内容语义化），选择合适的标签（代码语义化）。
杜绝通篇 div，HTML 语义化不仅便于开发者阅读，还有利于浏览器爬虫的解析，对 seo 优化很有帮助。
所以我们在开发时要遵循语义化的开发规范，根据页面内容，选择合适的标签，优化代码，使得网页结构更加清晰。
下面介绍几种标签的使用：

1. ##### h 标签

- h 标签一种有六个，分别是 h1，h2...h6。h1-h6 文字由大到小，权重也逐渐降低。相比其他标签而言，h 标签在页面中的权重非常高，所以不要滥用 h 标签。要利用 h 标签告诉浏览器网页的核心内容！例如：
  h1 写主标题，通常与网页 title 标签一致，可以在页面展示，一个页面最好只有一个 h1 标签。
  h2 写次级标题，h3-h6 以此类推，细分网页结构。

2. ##### strong、em 标签

- b和strong标签都是加粗文字的标签，其二者的区别就在于：b是为了加粗而加粗的，strong是为了强调而加粗的。
- 同样斜体标签  i  和  em  也有着相同的区别，em有强调效果。
- 推荐使用strong em，而不是  b i 等，单纯修改加粗等样式可以用 css 实现。

3. ##### ul ol li 标签
   这三个都是列表标签，ul 表示无序列表（unordered list），ol 表示有序列表(oredr list), li 表示列表项（list item）。从网站优化的角度来说，在罗列多个词条的时候，最好使用列表标签，例如
   使用 ul li 布局网站导航条对搜索引擎蜘蛛更加友好，也是影响搜索引擎排名的因素之一。
   img 标签
   img 图片标签的 alt 属性是图片的替换文字。
   alt 属性可以帮助蜘蛛快速理解图片的具体内容，并且在网络故障时，仍然能够爬取到图片的内容信息。
4. ##### 其他标签

- nav 标签定义导航链接的部分；
- aside 标签定义侧边栏内容、引述内容；
- header 标签定义网站头部，介绍信息。它通常是一组介绍性描述 (搜索框 / logo / …)，网络爬虫知道诸如与之类的部分后可以非常简单的跳过它们，更好的定位网页内容；
- article 标签定义网站的内容部分。搜索引擎通过这个标签可以正确知道页面中哪些是正文内容；
- section 标签定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分；
- footer 标签定义文档或节的页脚。它对网站首页的排名将会增加，而对于内页来说搜索引擎将有可能会视而不见。不建议每个 web 的 footer 信息都是独立的，这或许意味着新的黑帽手段将会出现。

### 使用 HTTPS

- 谷歌曾发公告表示，使用安全加密协议（HTTPS），是搜索引擎排名的一项参考因素。
- 所以，在域名相同情况下，HTTPS 站点比 HTTP 站点，能获得更好的排名。

### SSR 服务端渲染（ Server-Side Rendering）

- 当下 SPA 应用盛行，虽然它有用户体验好，服务器压力小等优点，但是同时也暴露出很多问题。例如首屏加载较慢，不利于 SEO 等（因为这些 spa 应用内容是由 js 动态更新的，蜘蛛无法爬取网页内容）。
  而 ssr 的出现，很好的解决了 seo 的问题。因为服务端渲染是指指客户端向服务器发出请求，然后运行时动态生成 html 内容并返回给客户端。所以客户端可以获取到完整的页面内容。
  目前流行的 Vue/React 前端框架，都有 SSR 的解决方案：
  Vue 的 nuxt.js
  React 的 next.js
  对于 Vue/React 来说，对于它们的 SSR/SSG 框架出现的原因就是主要就是 SEO 和首屏加载速度。

### 预渲染 prerender-spa-plugin

- 如果你只想改善部分页面的 SEO，可以不采用 SSR 的解决方案，毕竟无论是 next.js，还是 nuxt.js，都是有一定学习成本的。那么你可以使用 prerender-spa-plugin 等插件来实现预渲染页面，在构建时就针对特定的路有生成静态的 html 文件。

[演示地址](https://www.shuqin.cc/market/design-component)  
[获取更多](https://www.xiaozhi.shop/)  
[源码地址](https://github.com/dezhizhang/interview/tree/main/desigin)  

### 
<img src="https://cdn.xiaozhi.shop/digitwin/assets/weixin.jpg" width = 300 height = 300 />


<!-- [last](https://www.bilibili.com/video/BV1m4411A79a/?p=2&spm_id_from=pageDriver&vd_source=10257e657caa8b54111087a9329462e8) -->
<!-- https://juejin.cn/post/7241813423460581435?searchId=20241008173209AEE3A841D62ABE56EFD5 -->