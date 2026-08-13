# 《非正式科学》网站：开发、维护与交接手册

本仓库是《非正式科学》学生科学年刊的官方网站源码。当前版本以 2026 年刊（总第 6 期）为首页主题，并整理了 2021—2026 六期刊物、现行七大学科、两个历史板块以及历年文章目录。

这份 README 面向后续开发者、内容编辑、视觉设计人员和发布维护者。它说明当前代码真实实现的页面、接口、数据逻辑、内容来源、资源规则、部署流程、审核边界和已知风险。修改项目前，请至少读完“项目边界”“接口说明”“数据层”和“常见维护任务”。

代码层面约定的正式站点地址是：`https://informal-science.org/`。

> 重要：仓库内可复现的发布流程是 **GitHub Pages**，不是 Cloudflare Pages。`astro.config.mjs` 已按自定义域名根路径配置，但 GitHub Pages 自定义域名、DNS、域名续费和可能存在的 Cloudflare 代理均属于仓库外状态，接手时必须向原维护者确认，不能只根据源码推断。

## 目录

- [一、先了解项目边界](#一先了解项目边界)
- [二、当前内容与发布状态](#二当前内容与发布状态)
- [三、技术架构与数据流](#三技术架构与数据流)
- [四、目录结构](#四目录结构)
- [五、网页与 HTTP 接口](#五网页与-http-接口)
- [六、组件接口](#六组件接口)
- [七、数据接口与生成逻辑](#七数据接口与生成逻辑)
- [八、网页交互逻辑](#八网页交互逻辑)
- [九、常见维护任务](#九常见维护任务)
- [十、样式、图片、字体和路径规范](#十样式图片字体和路径规范)
- [十一、本地开发](#十一本地开发)
- [十二、检查与验收](#十二检查与验收)
- [十三、部署、域名与发布](#十三部署域名与发布)
- [十四、Git LFS 与仓库存储](#十四git-lfs-与仓库存储)
- [十五、安全、隐私与可访问性](#十五安全隐私与可访问性)
- [十六、已知风险与技术债](#十六已知风险与技术债)
- [十七、故障排查](#十七故障排查)
- [十八、正式交接清单](#十八正式交接清单)

## 一、先了解项目边界

### 1.1 这个项目是什么

这是一个使用 Astro 生成的纯静态内容网站：

- 内容在仓库内的 TypeScript 数据文件和 Astro 页面中维护；
- 构建时生成 HTML、CSS、字体、图片和少量浏览器 JavaScript；
- 部署后静态主机只负责返回文件；
- Git 仓库是网站内容的实际持久化载体；
- 当前没有 CMS，修改线上内容需要修改源码、审核、构建并重新部署。

### 1.2 这个项目不包含什么

当前代码中没有：

- 后端服务、数据库或运行时文件写入；
- REST、GraphQL 或其他 JSON API；
- 登录、账号、权限、Session、Token 或管理后台；
- 投稿表单、订阅提交接口或邮件发送服务；
- 服务端搜索、分页或全文阅读接口；
- Cookie、统计 SDK、广告或第三方跟踪脚本；
- 自定义环境变量或构建 Secret；
- 单元测试、端到端测试、Lint、格式化、链接检查或视觉回归测试。

“立即订阅”区域目前只是展示仓库内的 QQ 空间二维码，不会向服务器提交任何信息。

### 1.3 网站仓库与书籍工程的关系

项目采用两个清晰边界：

- `Informal-Science-2026` 书籍排版工程是编辑来源；
- 本网站仓库是经人工审核后用于网页发布的副本。

`src/data/` 中的 `source` 字段会记录书籍工程的逻辑仓库名、相对路径和定位说明，但网站构建不会读取本机相邻的书籍目录。任何人只克隆本仓库并取得 Git LFS 文件后，都应能够完成构建。

不要把个人电脑的绝对路径写入数据，也不要让页面通过 `../Informal-Science-2026` 之类的路径读取外部工程。

## 二、当前内容与发布状态

### 2.1 当前网站内容快照

截至当前代码版本：

| 年份 | 总期号 | 目录记录数 | 目录来源状态 | 全文/PDF |
| --- | ---: | ---: | --- | --- |
| 2021 | 1 | 23 | 来自已提供的扫描目录；摘要均为空 | 未开放 |
| 2022 | 2 | 24 | 来自已提供的扫描目录；作者均为空 | 未开放 |
| 2023 | 3 | 22 | 来自已提供的扫描目录；3 条摘要为空 | 未开放 |
| 2024 | 4 | 24 | 来自已提供的扫描目录 | 未开放 |
| 2025 | 5 | 24 | 来自已确认的 2025 目录 | 未开放 |
| 2026 | 6 | 24 | **临时复用 2025 目录，待替换** | 未开放 |

网站合计生成 141 条“年度文章记录”。这里的“文章”是目录题名、作者、学科、摘要和页码，不代表网站已经提供文章全文。

### 2.2 发布前仍需人工确认的事项

代码中保留了明确的待核信息，主要包括：

- 2026 年真实目录尚未录入，目前展示的是 2025 目录的临时副本；
- 封面故事《悟空号：大圣在宇宙有工作的一天》未出现在当前目录中；
- 封面引语的原始出处、中文译文和署名尚未核验；
- `Author.tex` 与后记对本期主编的表述存在陈逸轩/赖科羽冲突；
- 后记时间为 `2025.11`，仍需确认是否为 2026 年刊最终版本；
- 历年封面、摄影、标志、二维码及部分素材缺少独立的网页发布许可记录；
- 2021—2023 的部分编辑署名、贡献者重复记录和单位归属仍需编辑确认；
- `issues.ts` 中第六期来源记录仍指向重复的 `Cover_Issue-6.png`，而实际网页封面据资源说明来自重新编译的书籍 PDF，来源记录需要统一。

这些事项分散记录在：

- `src/data/site.ts`
- `src/data/issues.ts`
- `src/data/contributors.ts`
- `src/data/articles.ts`
- `docs/asset-notes.md`

仓库根目录目前也没有统一的 `LICENSE`。如果要把项目交给校外开发者、公开征集贡献或允许第三方复用，应分别明确“网站源代码”和“刊物文字/图片/品牌素材”的许可；获得仓库访问权限不等于自动获得复制、修改或再分发内容素材的授权。

### 2.3 状态字段不是发布开关

`draft`、`availability`、`reviewNeeded`、`reviewStatus` 和 `reviewNotes` 目前只是编辑治理元数据，页面不会根据这些字段自动隐藏内容。

例如：

- `siteMeta.draft` 当前为 `true`，首页仍然会生成；
- 所有文章当前都是 `draft: true`，目录仍然会展示；
- 所有文章都是 `directory-only`，页面是否显示“全文未开放”仍有硬编码文案；
- 把 `availability.pdf` 改成 `true` 不会自动出现 PDF 按钮。

因此，“数据已进入导出数组”就意味着它可能被构建到公开 HTML 中。发布权限必须在合并和部署前人工把关，不能依赖状态字段实现访问控制。

## 三、技术架构与数据流

### 3.1 技术栈

| 项目 | 当前版本/方案 |
| --- | --- |
| 框架 | Astro `7.2.1` |
| 语言 | TypeScript `6.0.3`、Astro 模板、原生 JavaScript、CSS |
| 包管理器 | pnpm `10.15.0` |
| CI Node.js | `22.18.0` |
| 输出模式 | 纯静态 `output: 'static'` |
| 页面格式 | 正常内容页采用目录式构建并使用尾斜杠；404 单独输出为 `404.html` |
| UI 框架 | 无 React/Vue/Svelte |
| CSS 框架 | 无；使用全局 CSS、组件作用域 CSS 和自定义属性 |
| 状态管理 | 无集中式状态管理 |
| 部署工作流 | GitHub Actions → GitHub Pages |

`tsconfig.json` 继承 Astro 的 strict 配置。内容没有使用 Astro Content Collections 或 Markdown，而是普通 TypeScript 常量。

### 3.2 构建时数据流

```text
书籍工程中的已审核资料
        ↓ 人工转录/导出
src/data/*.ts + public/ + Resources/
        ↓ Astro 页面 frontmatter 筛选、映射、聚合
src/pages/*.astro
        ↓ 组件 Props
src/components/*.astro
        ↓ pnpm build
dist/（静态 HTML/CSS/JS/图片/字体）
        ↓ GitHub Pages
浏览器
```

构建完成后不会再请求内容接口。搜索数据、学科数据和年度目录都已经写入生成的 HTML。

### 3.3 浏览器运行时状态

浏览器中只有两类短期状态：

- 移动导航状态：保存在 `aria-expanded`、`hidden`、`body.menu-open` 和 `inert` 属性中；
- 文章筛选状态：保存在输入框、下拉框以及每一行的 `hidden` 属性中。

项目不会主动持久化这些状态；普通刷新时通常重置，但浏览器自身仍可能恢复表单值或历史页面状态。项目不使用 `localStorage`、`sessionStorage`、Cookie 或远程请求。

## 四、目录结构

```text
.
├── .github/workflows/deploy.yml     # GitHub Pages 构建与发布
├── Resources/                       # 原始/归档素材；其中四个 TTF 也是构建依赖
│   ├── 2024-2021年 目录.pdf
│   ├── Font_Resources/
│   └── Picture_Resources/
├── docs/
│   └── asset-notes.md               # 素材来源、转换、ICC、尺寸和许可记录
├── public/                           # 原样复制到 dist 的稳定公开资源
│   ├── favicon.ico                   # 浏览器兼容回退图标
│   ├── favicon.png                   # PNG 与 Apple Touch 图标
│   ├── favicon.svg
│   ├── fonts/NOTICE.txt
│   └── images/
│       ├── brand/
│       ├── hero/
│       ├── issues/
│       ├── subscribe/
│       └── textures/
├── src/
│   ├── assets/fonts/                # 由 Vite 处理、生成哈希 URL 的 WOFF2
│   ├── components/                  # 共用 Astro 组件
│   ├── data/                        # 网站内容、类型、审核和来源记录
│   ├── layouts/BaseLayout.astro     # HTML、SEO、全站头尾骨架
│   ├── pages/                       # 文件系统路由
│   ├── styles/                      # 字体、设计令牌和全局样式
│   ├── utils/colors.ts              # 界面学科色与文字对比度
│   └── utils/paths.ts               # base 路径和尾斜杠处理
├── astro.config.mjs                 # 域名、base、静态输出和构建格式
├── package.json                     # 依赖和四个开发脚本
├── pnpm-lock.yaml                   # 可重现安装锁文件
├── pnpm-workspace.yaml              # pnpm 构建许可配置
└── tsconfig.json                    # Astro strict TypeScript 配置
```

以下目录是本地或构建产物，不应提交：

- `node_modules/`
- `dist/`
- `.astro/`
- `.pnpm-store/`
- 所有 `.DS_Store`

不要直接修改 `dist/`：下次构建会覆盖它，而且线上内容应始终能从源码重现。

## 五、网页与 HTTP 接口

### 5.1 “接口”在本项目中的含义

本项目没有 JSON API。维护文档中的“接口”分为三类：

1. 对访客公开的静态 HTTP 页面和资源路径；
2. Astro 组件接收的 Props；
3. `src/data/types.ts` 定义的数据契约。

所有页面只需要 `GET`；静态主机通常也会响应 `HEAD`。其他 HTTP 方法、状态码和错误体由托管平台决定，本项目没有实现 405 或统一错误 JSON。

### 5.2 页面路由清单

| 公开路径 | 源文件 | 内容和逻辑 | 主要数据来源 |
| --- | --- | --- | --- |
| `/` | `src/pages/index.astro` | 2026 响应式主视觉、刊物定位、七大板块、本期 3 篇选读、2026 往期入口 | `siteMeta`、`articles`、`disciplines`、`issues` |
| `/2026/` | `src/pages/2026/index.astro` | 2026 专题 Hero、7 篇封面聚焦、封面故事、QQ 空间订阅二维码；不承载完整目录搜索 | `siteMeta`、2026 年文章、学科、2026 issue |
| `/questions-answers/` | `src/pages/questions-answers/index.astro` | 141 条年度文章的浏览器端关键词、学科、年份/期次组合筛选 | `articles`、`contentDisciplines`、`issues` |
| `/disciplines/` | `src/pages/disciplines/index.astro` | 七个现行板块和“其他”入口；链接视觉规范 | 学科组件内部读取数据 |
| `/disciplines/:slug/` | `src/pages/disciplines/[slug].astro` | 单一现行学科的跨年文章聚合、统计和下一学科导航 | `disciplines`、`articles` |
| `/disciplines/other/` | `src/pages/disciplines/other/index.astro` | 脑神经科学、电子两个历史板块的颜色档案和文章聚合 | `historicalDisciplines`、`articles` |
| `/history/` | `src/pages/history/index.astro` | 2021—2026 封面、期号和文章数总览 | `issues`、`articles` |
| `/history/:year/` | `src/pages/history/[year].astro` | 年度封面、版本信息、文章目录和前后期导航 | `issues`、`articles` |
| `/standards/` | `src/pages/standards/index.astro` | 权威 CMYK、屏幕近似 HEX、颜色用途和字体分工 | `colorStandards` |
| `/about/` | `src/pages/about.astro` | 刊物定位、发展时间线、组织和已公开的编辑/设计人员 | `contributors` |
| 未匹配路径 | `src/pages/404.astro` | 自定义 404，带 `noindex` | 无 |

当前构建共生成 22 个 HTML 页面：8 个固定内容页、7 个现行学科页、6 个年度页和 1 个 404 页。

### 5.3 各页面的实际区块

**首页 `/`**

1. `home-intro`：2026 横/竖屏响应式背景、刊名、口号、期号和“进入本期/立即订阅”按钮；
2. `home-statement`：学生科学年刊定位和本期简介；
3. `home-section--disciplines`：七个现行学科的紧凑卡片；紧凑模式不显示“其他”；
4. `home-featured`：从 `coverFocusArticleSlugs` 命中的 2026 记录中取前三篇；
5. `home-history`：2026 封面和往期入口。

首页刊名、2026、总第 6 期、“二十四篇”等多处文字是页面硬编码，不会全部跟随 `siteMeta` 自动变化。

**本期页 `/2026/`**

1. `annual-hero`：本期刊名、口号、期号、订阅入口和快捷链接；统计数字 `7 / 24 / 06` 当前硬编码；
2. `cover-focus`：显示 `coverFocusArticleSlugs` 命中的全部文章，并链接到年度目录锚点；
3. `cover-story`：显示 `siteMeta.coverStory` 的标题、引语和署名；
4. `SubscriptionPanel`：QQ 空间二维码和“更多订阅方式”占位。

`siteMeta.editorialNote` 目前没有在本期页或其他页面渲染。若要展示后记，需要新增页面区块并先解决署名与日期审核问题。

**问题-答案 `/questions-answers/`**

1. `PageIntro`：说明检索范围，并动态显示 `issues.length` 和 `articles.length`；
2. `ArticleDirectory`：一次性输出全部文章，启用关键词、学科和年份/期次筛选；
3. 页面没有文章详情、分页、URL 查询参数或服务器请求。

**板块总览 `/disciplines/`**

1. `PageIntro`：说明七大现行板块与历史板块关系；
2. 完整 `DisciplineGrid`：七个现行学科加“其他”；
3. 视觉规范引导区：链接 `/standards/`。

**现行学科页 `/disciplines/:slug/`**

1. `DisciplineHero`：学科名称、摘要、跨年文章数和“6 期年刊”统计；
2. `ArticleDirectory`：该学科 2021—2026 的全部目录记录；
3. 下一板块入口：顺序取决于 `disciplines` 数组，化学之后进入“其他”。

**历史板块页 `/disciplines/other/`**

1. 灰色 `DisciplineHero` 和历史记录统计；
2. 脑神经科学、电子的 CMYK/HEX 色彩档案；
3. 两个历史学科的文章聚合目录；
4. 末尾返回天文板块，形成板块循环。

**往期总览 `/history/`**

1. `PageIntro`：六期概览和 2026 临时目录提示；
2. 封面网格：由 `issues` 顺序生成封面、年份、期号和文章数；
3. 刊物传承引语区。

**年度页 `/history/:year/`**

1. 年度封面、年份、总期号和主编/设计署名；
2. “目录已开放、全文/PDF 未开放”等状态说明；这些文案目前没有完全由 availability 驱动；
3. 对应年份的 `ArticleDirectory`，锚点根节点为 `#directory`；
4. 上一期/下一期导航，顺序取决于 `issues` 数组。

**视觉规范 `/standards/`**

1. 颜色系统说明；
2. `colorStandards` 中纸色、主题色和七个现行学科色的 CMYK/HEX 色卡；
3. HarmonyOS Sans SC、Noto Serif CJK SC、STIX Two Math 的职责和示例。

**关于页 `/about/`**

1. 刊物定位与宣言；
2. 2021—2026 发展时间线；
3. 主办/供稿组织；
4. 当前仅公开主编、视觉设计和封面设计人员；
5. 前往 2026 目录的行动入口。

**404**

自定义提示、返回首页按钮和 `noindex`。页面文件是否最终以正确 HTTP 404 状态返回，仍取决于 GitHub Pages 的静态托管行为。

### 5.4 动态路由允许值

`/disciplines/:slug/` 不是运行时参数接口，而是 `getStaticPaths()` 在构建时生成以下七个路径：

```text
/disciplines/astronomy/
/disciplines/math/
/disciplines/geography/
/disciplines/physics/
/disciplines/engineering/
/disciplines/biology/
/disciplines/chemistry/
```

脑神经科学与电子没有独立公开 slug 页面，统一进入 `/disciplines/other/`。

`/history/:year/` 当前只生成：

```text
/history/2021/
/history/2022/
/history/2023/
/history/2024/
/history/2025/
/history/2026/
```

未知学科或年份不会命中运行时代码，而是由静态托管返回 404。

### 5.5 URL 参数、锚点和静态资源

- 当前页面没有约定 URL 查询参数；
- “问题-答案”的筛选状态不会写入 URL，无法分享某组筛选结果；
- 年度目录锚点为 `#directory`；
- 单篇目录记录锚点为 `#${year}-${catalogSlug}`，例如：

```text
/history/2026/#2026-where-do-stars-come-from
```

公开资源接口来自 `public/`，例如：

```text
/favicon.svg
/favicon.png
/favicon.ico
/images/hero/hero-2026-1920.webp
/images/issues/issue-2026.webp
/images/brand/logo-lockup.svg
/images/subscribe/qq-space-qr.jpg
```

`src/assets/` 中的资源由 Astro/Vite 生成哈希文件名，不应把构建后的哈希 URL 写进数据。

### 5.6 尾斜杠和 base 路径

`astro.config.mjs` 使用：

```js
base: '/'
trailingSlash: 'always'
build: { format: 'directory' }
```

站内路由和 `public/` 资源必须通过 `src/utils/paths.ts` 的 `withBase()` 或 `assetPath()` 生成，不要在组件里散落硬编码的根路径。

`withBase()` 会：

- 保留 `http:`、`https:`、`mailto:`、`tel:` 和纯 `#anchor`；
- 给内部路径加上 `BASE_URL`；
- 给页面路径规范化尾斜杠；
- 保留带扩展名的静态资源路径；
- 可保留单独的 query 或 hash 后缀；当前实现不支持一个 URL 同时携带二者，`/path?x=1#part` 会丢失 hash。

它只应接收代码内可信路径，不要把未来的用户输入直接传入。

## 六、组件接口

### 6.1 `BaseLayout`

文件：`src/layouts/BaseLayout.astro`

```ts
interface Props {
  title?: string;
  description?: string;
  image?: string;
  noIndex?: boolean;
}
```

职责：

- 输出完整 HTML 文档和 `lang="zh-CN"`；
- 生成页面标题、description、canonical；
- 生成 Open Graph 与 Twitter Card 元数据；
- 接入 favicon、跳到正文链接、全站 Header 和 Footer；
- 从 `Astro.site` 读取正式域名；
- 将 `image` 解释为站点根相对图片；
- `noIndex` 为真时添加 robots `noindex`。

如果修改域名、base 或社交分享图片规则，必须同时验证这里生成的 canonical 和 OG URL。

### 6.2 共用组件 Props

| 组件 | Props | 职责与注意事项 |
| --- | --- | --- |
| `SiteHeader.astro` | `currentPath?: string` | 桌面/移动导航、当前页标识、菜单焦点管理；导航数组是硬编码的 |
| `ArticleDirectory.astro` | `entries`、`disciplines`、`searchable?`、`showFilter?`、`showIssueFilter?`、`emptyMessage?` | 文章目录、关键词/学科/期次筛选和空状态 |
| `DisciplineGrid.astro` | `compact?: boolean` | 学科卡片；自行读取学科和文章数据；完整模式增加“其他” |
| `DisciplineHero.astro` | `name`、`summary`、`sequence`、`articleCount`、`articleLabel?`、`secondaryCount`、`secondaryLabel`、`color`、`ink` | 学科页大标题和两个统计值 |
| `PageIntro.astro` | `eyebrow`、`title`、`description`、`aside?`、`editorial?` | 通用内页开场区域 |
| `IssueHeroBackground.astro` | `eager?: boolean` | 按横/竖屏输出 2026 Hero WebP `srcset`；当前年份硬编码 |
| `BookMarker.astro` | `kind`、`value`、`size`、`foreground?`、`background?`、`decorative?` | 还原书籍 iS 方标和目录页码标记比例 |
| `SubscriptionPanel.astro` | 无 | 固定 QQ 空间二维码和未来渠道占位，不是订阅接口 |
| `SiteFooter.astro` | 无 | 页脚导航与版权文字；链接数组是硬编码的 |

`ArticleDirectory` 的完整接口为：

```ts
interface Props {
  entries: readonly Article[];
  disciplines: readonly (Discipline | HistoricalDiscipline)[];
  searchable?: boolean;
  showFilter?: boolean;
  showIssueFilter?: boolean;
  emptyMessage?: string;
}
```

`BookMarker` 的完整接口为：

```ts
interface Props {
  kind: 'logo' | 'toc-number';
  value: string;
  size: string;
  foreground?: string;
  background?: string;
  decorative?: boolean;
}
```

修改组件 Props 时，要同步所有调用页面并运行 `pnpm check`。Astro 构建本身不能替代完整类型检查。

## 七、数据接口与生成逻辑

### 7.1 统一出口

- 类型定义：`src/data/types.ts`
- 数据统一导出：`src/data/index.ts`

页面应优先从 `src/data/index.ts` 导入，减少未来文件调整时的耦合。不要在页面或组件中复制一份文章、期刊或学科数据。

### 7.2 数据文件职责

| 文件 | 维护内容 |
| --- | --- |
| `site.ts` | 站名、版次、期号、发布方、口号、描述、封面故事、封面焦点、后记、审核状态 |
| `articles.ts` | 2021—2025 目录母版、年度目录映射、年度文章记录生成逻辑；2026 临时回退逻辑 |
| `issues.ts` | 2021—2026 年份、期号、封面、编辑署名、开放能力和来源 |
| `disciplines.ts` | 七个现行学科的 slug、名称、颜色、摘要和顺序 |
| `historical-disciplines.ts` | 脑神经科学、电子两个历史板块及其 CMYK/HEX |
| `content-disciplines.ts` | 将现行学科和历史学科合并，供目录显示和筛选 |
| `contributors.ts` | 主办/供稿组织、作者、编辑、设计和审核说明 |
| `colors.ts` | 印刷权威 CMYK、屏幕近似 HEX、用途和审核记录 |

### 7.3 核心类型

| 类型 | 关键字段与语义 |
| --- | --- |
| `SiteMeta` | 站点与当前期刊元数据；含 `coverStory`、`coverFocusArticleSlugs`、`editorialNote`、发布和审核字段 |
| `Discipline` | `slug` 是数据键，`routeSlug` 是公开 URL，另含中英名、色彩键、摘要、顺序和来源 |
| `HistoricalDiscipline` | 历史学科；在学科数据上增加权威 CMYK 与网页 HEX |
| `Article` | 年度唯一 `slug`、跨年稳定 `catalogSlug`、年份、期号、题名、作者、学科、摘要、页码、状态、可用性、来源和审核信息 |
| `Issue` | 年份、总期号、封面、主编/设计署名、状态、可用性、来源和审核信息 |
| `Contributor` | 组织/个人、角色、单位、英文名、来源和审核信息 |
| `ColorStandard` | 权威 CMYK、屏幕近似 HEX、用途、来源和审核信息 |
| `Reviewable` | `reviewNeeded`、`reviewStatus`、`reviewNotes` |
| `SourceReference` | 逻辑源仓库、仓库相对路径、可选定位说明 |

重要联合类型：

```ts
type ReviewStatus = 'verified-from-source' | 'review-needed';
type ArticleStatus = 'directory-only' | 'full-text';
type IssueStatus = 'cover-only' | 'published';
```

当前 `SourceReference.repository` 只允许逻辑值 `Informal-Science-2026`。如果以后迁移编辑源仓库，需要同步更新类型和既有记录。

### 7.4 学科标识

可赋给文章的 `DisciplineSlug`：

```text
astronomy
math
geography
physics
engineering
biology
chemistry
brain-neuroscience
electronic
```

前七项是现行板块，后两项是历史板块。公开现行路由使用与数据键相同的 slug；历史板块统一使用公开路由 `other`。

新增学科时只改 `disciplines.ts` 不够，详见“增加或调整学科”。

### 7.5 文章目录母版与年度记录

`src/data/articles.ts` 把“目录母版”与页面最终使用的“年度记录”分开：

```ts
type DirectoryArticle = {
  slug: string;
  title: string;
  author: string;
  disciplineSlug: DisciplineSlug;
  summary: string;
  page: number;
};
```

每个 `AnnualCatalog` 保存：

- `sourceYear`：这份目录真正属于哪一年；
- `source`：编辑来源；
- `entries`：该年目录母版。

`directoryArticle()` 会为母版记录补齐最终 `Article`：

```text
slug          = `${year}-${entry.slug}`
catalogSlug   = entry.slug
year          = 当前生成年份
issueNumber   = 对应总期号
status        = directory-only
draft         = true
availability  = 仅 summary 为 true，fullText/pdf 为 false
reviewStatus  = 仅 sourceYear 与 year 相同时为 verified-from-source
```

`Article.slug` 是年度内唯一标识，也是 HTML `id`；`catalogSlug` 是跨年度稳定的目录项标识，首页和 2026 封面焦点用它查找文章。`catalogSlug` 不是全站唯一主键，也没有自动唯一性校验；引用具体年度记录时必须同时带上 `year`。

同一年不能出现重复 `slug`，否则会产生重复 HTML id 和不可靠锚点。修改既有 slug 也会使旧链接失效，应尽量保持稳定。

### 7.6 文章聚合顺序

最终 `articles` 由 `issues` 反转后逐期展开：

```text
2026 → 2025 → 2024 → 2023 → 2022 → 2021
```

每期内部保留目录数组顺序。`issues` 数组本身必须按年份升序维护，因为：

- 年度详情页依赖它计算上一期/下一期；
- `articles` 再对它执行 `reverse()` 生成新到旧的文章顺序。

`disciplines` 数组位置会决定卡片顺序和“下一个板块”；数据中的 `order` 决定详情 Hero 显示的编号。只改 `order` 不会重排页面。

### 7.7 2026 回退逻辑

当前 `annualCatalogs` 只登记 2021—2025。`catalogForYear()` 对所有未登记年份都回退到 2025 目录，所以 2026 生成了 24 条临时记录。

这是当前最危险的维护逻辑之一：如果未来只在 `issues.ts` 增加 2027 而忘记增加 `annualCatalogs[2027]`，网站会静默生成一套假的 2025 目录，而不是构建失败。

维护规则：**增加任何年份时，必须同时登记真实年度目录。** 后续建议把回退限制为明确的 2026 临时分支，并让其他未知年份直接抛错。

### 7.8 页面派生逻辑

- `siteMeta` 当前真正被页面读取的主要字段只有 `tagline`、`coverStory` 和 `coverFocusArticleSlugs`；`title`、`englishTitle`、`edition`、`issueNumber`、`publisher`、`description`、`editorialNote` 以及状态/来源字段目前主要用于数据留档，不会自动替换页面中的同类硬编码文字；
- 首页按 `siteMeta.coverFocusArticleSlugs` 在 2026 年记录中查找，然后只取前三篇；
- `/2026/` 按同一组 slug 显示全部封面焦点；
- 找不到的焦点 slug 会被 `filter(Boolean)` 静默丢弃，不会提示编辑者；
- 学科页通过 `disciplineSlug` 过滤全部年份；
- “其他”页通过两个历史学科 slug 聚合文章；
- 年度页通过 `year` 过滤文章；
- “问题-答案”把全部文章一次性渲染到 HTML；
- 首页和 2026 页使用非空断言假定 2026 issue 一定存在，删除或改年可能导致构建阶段失败。

### 7.9 数据不变量

修改数据后至少确认：

- `Issue.year` 唯一，`Issue.number` 与年份对应；
- `issues` 按年份升序；
- 现行 `Discipline.slug` 和 `routeSlug` 唯一；
- `Discipline.order` 唯一，且与数组位置所表达的页面顺序一致；
- 每个年度内 `Article.slug` 唯一；
- `disciplineSlug` 在 `contentDisciplines` 中存在；
- `coverFocusArticleSlugs` 能在当前年份通过 `catalogSlug` 找到；
- `coverAsset` 和所有图片路径真实存在；
- 页码、题名、作者、摘要和来源与审核稿一致；
- `reviewStatus`、`reviewNeeded`、`reviewNotes` 彼此不矛盾；
- 数据中的来源路径是书籍仓库相对路径，不是个人绝对路径。

## 八、网页交互逻辑

### 8.1 文章搜索与筛选

`ArticleDirectory.astro` 为每条文章记录写入：

```text
data-search      = 题名 + 作者 + 摘要 + 年份 + 总第 N 期（转小写）
data-discipline  = disciplineSlug
data-issue       = `${year}-${issueNumber}`
```

启用搜索工具栏后：

1. 关键词使用 `String.includes()` 做连续子串匹配；
2. 学科选择使用精确 slug 匹配；
3. 年份/期次使用精确 `${year}-${issueNumber}` 匹配；
4. 三类条件按 AND 叠加；
5. 不匹配的行设置 `hidden`；
6. 命中数通过 `aria-live` 更新；
7. 结果为 0 时显示空状态。

当前不支持：

- 中文分词、拼音、错别字或模糊搜索；
- 多学科并选；
- URL 查询参数同步；
- 搜索状态持久化；
- 服务端索引、分页或排序。

关闭 JavaScript 时全部文章仍可阅读，但不能筛选。当前 141 行适合浏览器线性过滤；数据规模明显增长后，应评估分页、静态索引或 URL 状态。

### 8.2 移动导航

`SiteHeader.astro` 的原生脚本负责：

- 切换 `aria-expanded` 和按钮标签；
- 打开/关闭移动菜单；
- 锁定 body 滚动；
- 给正文和页脚添加/移除 `inert`；
- 打开后聚焦第一个菜单链接；
- 在菜单与切换按钮之间循环 Tab 焦点；
- Escape 关闭并归还焦点；
- 视口达到桌面宽度时自动关闭菜单。

桌面链接、移动端链接、页脚链接和学科数据目前不是同一个数据源。新增页面或学科时要逐一检查 Header 和 Footer。

小屏幕下桌面导航会隐藏；如果 JavaScript 加载失败，移动菜单无法打开。这是当前渐进增强上的已知限制。

## 九、常见维护任务

### 9.1 修改普通文字

先判断文字属于数据还是页面结构：

- 站名、口号、封面故事、后记：`src/data/site.ts`；
- 学科名称和摘要：`src/data/disciplines.ts` 或 `historical-disciplines.ts`；
- 年份、期号、封面和编辑署名：`src/data/issues.ts`；
- 团队名单：`src/data/contributors.ts`；
- 页面说明、时间线、按钮：对应的 `src/pages/*.astro` 或组件；
- Header/Footer 导航：`SiteHeader.astro` 和 `SiteFooter.astro`。

不要修改生成后的 HTML。文字修改后检查移动端换行、标题长度和 Noto Serif 字体子集缺字。

### 9.2 新增或修订文章目录

1. 在书籍工程中确认最终目录和发布权限。
2. 找到 `src/data/articles.ts` 中对应年度目录数组。
3. 每条记录填写稳定且唯一的英文 kebab-case `slug`、题名、作者、学科、摘要和页码。
4. 更新年度 `AnnualCatalog.source`，保留仓库相对来源和定位说明。
5. 逐项核验目录后，再确认该年度已经以相同的 `sourceYear` 登记在 `annualCatalogs`。当前生成函数会把 `sourceYear === year` 的全部记录自动标为 `verified-from-source`；若要录入“同年但尚未核验”的目录，必须先扩展 `AnnualCatalog`/`directoryArticle()` 以显式携带审核状态。
6. 若文章用于封面焦点，更新 `src/data/site.ts` 中的 `coverFocusArticleSlugs`。
7. 运行检查和构建。
8. 在年度页、学科页、“其他”页和“问题-答案”中交叉核对。

文章数据会自动进入：

- 对应 `/history/YYYY/`；
- 对应 `/disciplines/<slug>/` 或 `/disciplines/other/`；
- `/questions-answers/`；
- 与封面焦点 slug 匹配时进入 `/2026/`；按配置顺序命中的前三条进入首页。

### 9.3 用真实目录替换 2026 临时目录

1. 在 `articles.ts` 新增独立的 `catalog2026` 数组，不要继续复用 `suppliedCatalog2025`。
2. 逐项核验题名、作者、摘要、学科和页码，并新增指向 2026 审核稿的 `SourceReference`。
3. 只有完成逐项核验后，才在 `annualCatalogs` 中加入 `2026: { sourceYear: 2026, ... }`；该设置会让生成函数自动标记整份目录为 `verified-from-source`。若要先录入未核版本，必须先改造审核模型。
4. 再次核对每条 `disciplineSlug` 和页码。
5. 更新 `siteMeta.coverFocusArticleSlugs`，保证七个 slug 都存在于 2026 目录。
6. 更新首页“二十四篇”等可能变化的文案。
7. 更新 `/2026/` 中硬编码的目录数量 `24`。
8. 删除各页面中“2026 暂复用 2025”的说明。
9. 更新来源说明，并确认自动生成的审核状态符合实际核验结果。
10. 逐条检查 2026 年度锚点、搜索、学科统计和封面焦点链接。

### 9.4 增加新年刊

新增年度不是数据层的一处改动。至少执行以下清单：

1. 在 `src/data/issues.ts` 增加期刊，保持数组按年份升序。
2. 修复 `currentDraft = number === 6` 的硬编码，否则第 7 期会被错误标为非草稿。
3. 在 `src/data/articles.ts` 增加真实目录和 `annualCatalogs` 映射，禁止依赖 2025 回退。
4. 增加 `public/images/issues/issue-YYYY.webp`。
5. 更新 `src/data/site.ts` 的版次、期号、描述、封面故事、焦点和来源。
6. 决定是否新增 `/YYYY/` 专题页；当前 `/2026/` 是硬编码页面，不会自动变成新年度。
7. 如果更换首页视觉，更新/泛化 `IssueHeroBackground.astro` 及横竖屏资源。
8. 更新 `src/pages/index.astro` 对当前 issue、当前文章、链接和图片的所有 2026 假设。
9. 更新 Header、Footer、About 时间线、SEO 描述、历史页提示、学科页“六期”、统计数字和所有年度范围文案。
10. 更新 `/history/[year].astro` 中按 2021—2024、2025、2026 分支的目录说明。
11. 更新 `docs/asset-notes.md`、版权和素材许可记录。
12. 检查新增文字是否在字体子集中。
13. 完成全站构建、视觉、链接和线上直达验收。

可先用以下命令查找年度硬编码，再逐项判断，不要机械替换 CSS 数字：

```bash
rg -n "2026|2021—2026|六期|6 期|总第.?6|Issue No. 06" src README.md
```

当前明确含年度假设的文件包括：

- `src/pages/index.astro`
- `src/pages/2026/index.astro`
- `src/pages/history/index.astro`
- `src/pages/history/[year].astro`
- `src/pages/questions-answers/index.astro`
- `src/pages/disciplines/[slug].astro`
- `src/pages/about.astro`
- `src/pages/standards/index.astro`
- `src/layouts/BaseLayout.astro`
- `src/components/IssueHeroBackground.astro`
- `src/components/DisciplineGrid.astro`
- `src/components/SiteHeader.astro`
- `src/components/SiteFooter.astro`

### 9.5 增加或调整学科

需要同步检查：

1. `src/data/types.ts` 的 `DisciplineSlug` 和 `DisciplineRouteSlug`；
2. `src/data/disciplines.ts` 或 `historical-disciplines.ts`；
3. `src/data/colors.ts` 的印刷标准；
4. `src/styles/tokens.css` 的界面 token；
5. `src/utils/colors.ts` 的高对比界面 HEX 映射；
6. `SiteHeader.astro` 的桌面和移动学科导航；
7. 所有文章的 `disciplineSlug`；
8. 学科顺序、统计、下一学科跳转和公开 URL。

现行学科详情路由和 `DisciplineGrid` 会从数据生成，但 Header 不会自动同步。`routeSlug` 重复可能产生构建路径冲突。

### 9.6 修改贡献者

`contributors.ts` 使用 `verified()` 和 `needsReview()` 工厂补齐审核元数据。

关于页当前只显示：

- 所有 `kind === 'organization'` 的记录；
- `chief-editor`、`visual-designer`、`cover-designer` 三类人员。

`contributing-author` 和 `afterword-author` 即使存在于数据中，也不会自动出现在关于页。如果要公开完整名单，需要先确认隐私、署名与来源，再修改页面筛选和版式。

### 9.7 开放文章全文或 PDF

当前数据模型只有可用性布尔值，没有全文正文、详情路由或 PDF URL。仅修改 `status`/`availability` 不会完成上线。

实现全文或 PDF 至少需要：

1. 确认文章、插图、公式、作者信息和 PDF 的网页发布授权；
2. 决定内容格式和稳定 URL，例如新增 `src/pages/articles/[slug].astro`；
3. 扩展 `Article` 类型，增加正文来源或 `pdfAsset`/`fullTextPath`；
4. 使用 `getStaticPaths()` 生成详情页；
5. 让目录组件根据 `availability` 渲染链接或按钮；
6. 将年度详情页中的“全文/PDF 未开放”硬编码改为真实数据驱动；
7. 为缺失内容、草稿和下线内容设计明确行为；
8. 评估 PDF 文件大小、Git LFS 配额、移动端阅读和无障碍；
9. 增加链接检查、权限审核和线上直达测试。

在这些步骤完成前，不要把布尔字段当作已经实现的功能。

## 十、样式、图片、字体和路径规范

### 10.1 样式分层

- `src/styles/fonts.css`：`@font-face`；
- `src/styles/tokens.css`：字体栈、纸色、文字色、界面学科色、尺寸和安全区变量；
- `src/styles/global.css`：reset、全局排版、容器、链接、按钮、焦点、跳到正文、响应式和 reduced-motion；
- 各 `.astro` 文件中的 `<style>`：页面或组件局部样式，由 Astro 作用域化。

首页和 2026 页面体量较大，并包含普通断点、手机断点及低高度横屏规则。调整布局时要同时检查宽屏、竖屏手机和横屏手机，不能只看桌面。

### 10.2 四套颜色来源不要混用

项目中有多处颜色，它们职责不同：

| 位置 | 用途 |
| --- | --- |
| `src/data/colors.ts` | 印刷权威 CMYK 和用于规范页展示的屏幕近似 HEX |
| `src/data/disciplines.ts` | 学科编辑数据中的识别色 |
| `src/styles/tokens.css` | 为大色块和白字可读性调整过的实际界面色 |
| `src/utils/colors.ts` | 与 CSS token 对应的 JS HEX，用于计算应使用深色还是白色文字 |

网页界面色经过对比度调整，不应覆盖印刷权威 CMYK。新增学科色时需要同步界面 token 和 JS 映射，否则 CSS 显示、卡片背景和文字对比度可能不一致。

### 10.3 图片目录职责

- `Resources/Picture_Resources/`：权威原图或归档素材；
- `public/images/`：已经裁切、压缩、转色并可公开发布的网页副本；
- 页面必须引用发布副本，不应把 20 MB 级印刷原图直接发给访客。

稳定命名约定：

```text
public/images/hero/hero-2026-{640,1280,1920,3840}.webp
public/images/hero/cover-2026-{640,1280,1920,2880}.webp
public/images/issues/issue-YYYY.webp
public/images/brand/logo-mark.svg
public/images/brand/logo-lockup.svg
public/images/textures/history-collage.webp
public/images/subscribe/qq-space-qr.jpg
```

2026 横屏源图是 `Background-2026.jpg`，竖屏源图是 `Cover-2026.jpg`。两者原始色彩空间为 Adobe RGB (1998)，必须按内嵌 ICC 转换到 sRGB 后再编码，不能只删除或误改颜色标签。完整尺寸、编码质量、误差、来源和授权记录见 `docs/asset-notes.md`。

当前仓库存在 `hero-2026-{640,1280,1920}.avif`，但 `IssueHeroBackground.astro` 只输出 WebP，AVIF 目前没有被浏览器引用。如果要启用，需新增 AVIF `<source>` 并验证兼容回退和实际体积收益。

### 10.4 网站图标（favicon）兼容性

标签页图标统一由 `BaseLayout.astro` 声明为 ICO，避免不同浏览器对 SVG favicon 的兼容差异：

- `public/favicon.ico`：所有浏览器标签页使用的站点图标；
- `public/favicon.png`：iOS 的 Apple Touch Icon；
- `public/favicon.svg`：保留的品牌矢量源，不作为标签页图标引用。

更新品牌图标时，应从权威源图 `Resources/Picture_Resources/logo/logo1.png` 同步更新 PNG，并重新生成包含 256×256 PNG 图层的 ICO；随后在本地构建，确认 `dist/` 中 ICO 和 PNG 均存在、首页只引用 ICO 作为 `rel="icon"` 后再部署。

### 10.5 新增或替换资源

1. 从审核后的书籍工程导出，不覆盖权威原图。
2. 确认作者、来源、网页发布许可和署名方式。
3. 按页面比例裁切，去除不需要的隐私/元数据。
4. 正确执行 ICC 色彩转换。
5. 输出适合网页的 WebP/AVIF/SVG；二维码避免重采样。
6. 使用稳定文件名放入 `public/`。
7. 更新数据或组件引用。
8. 在 `docs/asset-notes.md` 记录源位置、工具版本、处理参数、尺寸、credit 和 license。
9. 检查宽屏、手机、高像素密度、懒加载和 404。

仓库目前没有可执行的图片转换或字体子集脚本，只有处理记录。后续若重做资源，必须记录实际命令，最好把可复现脚本提交到仓库。

### 10.6 字体分工

| 字体 | 用途 | 文件位置 |
| --- | --- | --- |
| HarmonyOS Sans SC Light/Regular/Medium/Bold | 正文、导航、目录、摘要和界面 | `Resources/Font_Resources/HarmonyOS_Sans_SC/` |
| Noto Serif CJK SC Medium/SemiBold/Black | 刊名、封面式大标题、引语 | `src/assets/fonts/` |
| STIX Two Math | 公式、变量、运算符 | `src/assets/fonts/` |

四个 HarmonyOS TTF 是未修改原文件，每个约 8 MB。它们虽然在 `Resources/` 下，但被 `fonts.css` 直接引用，是实际构建依赖，不是可随意删除的纯归档。当前 `dist/` 体积主要受这约 31 MB 字体影响。

Noto Serif CJK SC 和 STIX Two Math 是 WOFF2 子集。新增姓名或正文字符后要检查缺字和系统字体回退，必要时按许可重新生成子集。不得对子集化受限的 HarmonyOS 文件做未经许可的修改。

字体版权和许可声明必须保留：

- `public/fonts/NOTICE.txt`
- `docs/asset-notes.md`

## 十一、本地开发

### 11.1 环境要求

为与 CI 一致，使用：

- Node.js `22.18.0`
- pnpm `10.15.0`
- Git
- Git LFS

仓库没有 `.nvmrc`、`.node-version` 或 `engines` 字段，因此版本约束主要来自本 README、`packageManager` 和 GitHub Actions。不要因为本机有更新版本就无意更新锁文件。

`package.json` 的脚本使用 POSIX 风格的 `ASTRO_TELEMETRY_DISABLED=1` 前缀。Windows 原生 cmd/PowerShell 可能无法直接运行，建议使用 WSL 或 Git Bash，或者未来引入跨平台环境变量工具。

### 11.2 首次安装

```bash
git clone <repository-url>
cd Informal-Science

git lfs install
git lfs pull

corepack enable
corepack prepare pnpm@10.15.0 --activate
pnpm install --frozen-lockfile
```

当前远程仓库地址为：

```text
ssh://git@ssh.github.com:443/Informal-Science/Informal-Science.git
```

使用 SSH 443 是为了兼容禁止 SSH 22 端口的网络。新维护者也可以使用组织允许的 HTTPS 地址，但不要把个人凭证写入仓库。

### 11.3 可用脚本

| 命令 | 作用 | 输出/说明 |
| --- | --- | --- |
| `pnpm dev` | 启动 Astro 开发服务器 | 用于实时开发；访问终端显示的地址 |
| `pnpm check` | Astro/TypeScript 类型和模板检查 | 提交前必须运行 |
| `pnpm build` | 生成正式静态站点 | 输出到 `dist/` |
| `pnpm preview` | 本地预览 `dist/` | 必须先成功 build |

所有脚本都禁用了 Astro telemetry。

### 11.4 依赖变更

修改依赖时：

1. 使用项目规定的 pnpm 版本；
2. 同时提交 `package.json` 和 `pnpm-lock.yaml`；
3. 不要手工编辑锁文件；
4. 运行 `pnpm check` 和 `pnpm build`；
5. 检查 GitHub Actions 是否仍能 `--frozen-lockfile` 安装；
6. 对 Astro 大版本升级单独审阅路由、资源、CSS 和构建行为。

`pnpm-workspace.yaml` 允许 `esbuild` 执行构建脚本，并对当前 Astro 版本设置发布年龄例外。升级构建依赖时也要检查这个文件。

### 11.5 环境变量

项目当前没有自定义环境变量，也不需要 `.env`。唯一读取的是 Astro 内建的 `import.meta.env.BASE_URL`。

`.gitignore` 已忽略 `.env` 和 `.env.*`。如果未来增加 Secret：

- 不要提交真实值；
- 区分仅构建期可见值和 `PUBLIC_` 前缀的公开浏览器值；
- 记住纯静态构建中的公开变量最终会进入文件，不能当秘密；
- 增加不含真实凭证的 `.env.example` 和部署平台说明。

## 十二、检查与验收

### 12.1 提交前最低检查

```bash
pnpm check
pnpm build
pnpm preview
```

当前 CI 只执行 `pnpm build`，不会执行 `pnpm check`。Astro build 不能替代完整类型检查，所以本地 check 是维护者责任。后续建议把 `pnpm check` 加入 GitHub Actions，并为 Pull Request 增加独立校验。

### 12.2 内容验收

- 核对年份、总期号、标题、作者、学科、摘要和页码；
- 核对封面焦点 slug 是否全部命中；
- 核对来源、审核状态和待核备注；
- 确认没有把未授权或待审核内容误公开；
- 确认新增文章出现在正确年度和学科页；
- 确认 2026 不再错误复用 2025 目录后再删除临时提示；
- 检查 about 中实际展示的人员范围；
- 检查封面故事、引语、署名和后记冲突是否已解决。

### 12.3 页面与交互验收

至少检查：

- 首页和 `/2026/` 的横屏、竖屏主视觉；
- 7 个现行学科页和“其他”页；
- 6 个年度页、前后期导航和目录锚点；
- “问题-答案”的关键词、学科、年份/期次单独及组合筛选；
- 无结果时的数量和空状态；
- Header/Footer 全部链接；
- 手机菜单打开、Tab、Shift+Tab、Escape、焦点归还和滚动锁定；
- 404 页面及 `noindex`；
- 直接打开子页和刷新子页；
- 二维码清晰度和可扫码性；
- 图片 alt、键盘焦点、跳到正文和 reduced-motion；
- Chrome、Safari、Firefox 的当前稳定版本；
- 低高度横屏手机，尤其首页和年度专题 Hero。

### 12.4 SEO 与资源验收

- canonical 域名与实际线上域名一致；
- 页面 title 和 description 正确；
- OG 图片使用绝对正式 URL；
- 所有 `public/` 图片和字体线上返回成功；
- 页面 URL 与资源路径在根路径/子路径配置下都正确；
- 没有 Git LFS 指针被当作图片或字体发布；
- 没有引用 `src/assets/` 的过期哈希文件名；
- 首屏没有意外下载印刷原图。

当前没有 sitemap、RSS、结构化数据、自动链接检查或分析监控；README 不应声称这些能力已经存在。

## 十三、部署、域名与发布

### 13.1 仓库内的真实部署流程

`.github/workflows/deploy.yml` 是唯一被版本控制的部署实现。

触发条件：

- 推送到 `main`；
- 在 Actions 页面手动运行 `Deploy to GitHub Pages`。

构建 job：

1. `actions/checkout`，并启用 Git LFS；
2. 安装 pnpm `10.15.0`；
3. 安装 Node.js `22.18.0`；
4. 配置 GitHub Pages；
5. `pnpm install --frozen-lockfile`；
6. `pnpm build`；
7. 上传 `./dist` Pages artifact。

部署 job 把 artifact 发布到 `github-pages` environment。工作流权限为：

```text
contents: read
pages: write
id-token: write
```

这里的 OIDC 仅用于 GitHub Pages 部署，不是网站用户认证。

### 13.2 Cloudflare 说明

旧文档曾写“发布到 Cloudflare Pages”，但当前仓库没有：

- Cloudflare Pages 配置；
- Wrangler 配置；
- Cloudflare adapter；
- 对应部署工作流。

因此可复现的事实是 GitHub Pages。如果实际架构使用 Cloudflare DNS/代理，或另有仓库外 Cloudflare Pages 项目，交接人必须补充账号归属、项目名、构建命令、输出目录、环境变量、域名和 DNS 记录；在这些信息确认前，不要把 Cloudflare Pages 写成现有代码能力。

### 13.3 自定义域名

`astro.config.mjs` 当前为：

```js
site: 'https://informal-science.org'
base: '/'
```

这表示代码假设网站部署在自定义域名根路径。仓库当前没有 `public/CNAME`，所以仍需在 GitHub 仓库、域名服务商或 DNS/Cloudflare 控制台确认：

- GitHub Pages Source 是否为 GitHub Actions；
- Pages 自定义域名是否为 `informal-science.org`；
- DNS 记录是否正确；
- HTTPS 证书是否生效；
- 域名续费账号、负责人和到期提醒；
- 是否存在 `www` 跳转或 Cloudflare 代理；
- canonical 与实际访问域名是否一致。

不要把账号、API Token、私钥或恢复码写入 README。

### 13.4 改为 GitHub 项目子路径

如果不使用自定义域名，而部署到类似：

```text
https://informal-science.github.io/Informal-Science/
```

配置通常应拆成域名和子路径，而不是把两者都写进 `site`：

```js
site: 'https://informal-science.github.io'
base: '/Informal-Science'
```

修改后必须完整验收：

- Header/Footer；
- 图片、字体、favicon；
- canonical 和 OG；
- 动态生成的年度/学科子页；
- 页面锚点；
- 404；
- 线上直达子页与刷新。

站内链接应继续使用 `withBase()`，不要通过批量硬编码 `/Informal-Science/` 修复。

### 13.5 标准发布步骤

1. 拉取最新 `main` 和 LFS 文件。
2. 确认工作区只含本次变更。
3. 完成内容、来源、权限和署名审核。
4. 运行 `pnpm check`、`pnpm build`、`pnpm preview`。
5. 按本 README 的人工清单验收。
6. 通过 Pull Request 或约定流程合并到 `main`。
7. 查看 GitHub Actions 的 build 和 deploy job。
8. 确认 `github-pages` environment 发布成功。
9. 在线验收首页、子页直达、资源、字体、二维码、HTTPS 和 canonical。
10. 记录本次发布内容、审核人和仍未解决的问题。

当前没有 staging、PR Preview 或自动回滚。若线上故障，通常需要回退有问题的提交并重新部署；执行前应保留审计记录，不要使用破坏性 Git 命令覆盖他人工作。

## 十四、Git LFS 与仓库存储

### 14.1 当前 LFS 范围

`.gitattributes` 将以下类型纳入 Git LFS：

```text
*.pdf *.png *.jpg *.svg *.doc *.zip *.ttf *.otf
Resources/Picture_Resources/**
```

WebP、AVIF 和 WOFF2 当前不在 LFS。改变已跟踪文件的 LFS 规则可能需要迁移历史，不能只改 `.gitattributes`。

### 14.2 常用命令

```bash
git lfs install
git lfs pull
git lfs ls-files
git lfs env
```

克隆后如果没有 `git lfs pull`，工作区可能只有几行文本指针。字体或图片构建失败、浏览器显示损坏文件时，首先检查 LFS。

### 14.3 存储和性能注意事项

- `Resources/` 当前约 100 MB，主要由原图、PDF 和字体组成；
- 四个 HarmonyOS TTF 合计约 31 MB，并会进入构建产物；
- `public/` 约 4 MB；
- 当前 `dist/` 约 38 MB；
- Git LFS 能减轻普通 Git 历史体积，但不会减少访客下载量；
- 新增大文件前必须确认 LFS 配额、授权和网页是否真的需要；
- 不要把整套印刷字体、完整投稿源文件或未使用原图复制到网站；
- 网页优先使用压缩后的 WebP/AVIF/WOFF2。

## 十五、安全、隐私与可访问性

### 15.1 当前安全与隐私边界

当前没有用户账号、表单、远程搜索、Cookie、分析 SDK 或第三方脚本。搜索词只在本地用于字符串比较，不上传、不持久化，也不会作为 HTML 注入。

Astro 普通模板插值会转义内容；项目没有使用 `set:html`。当前数据均来自受版本控制的可信编辑输入。

仓库没有配置 CSP、Referrer-Policy、Permissions-Policy 等响应头，这些由托管平台决定。如果未来增加表单、统计、视频、第三方脚本或外部 API，需要重新设计：

- 内容安全策略；
- 隐私告知和同意；
- 数据保留与删除；
- 垃圾提交与限流；
- CORS/CSRF；
- Secret 管理；
- 第三方依赖和供应链审查。

### 15.2 已实现的可访问性措施

- 中文文档语言标记；
- 跳到正文链接；
- `:focus-visible` 焦点样式；
- 移动菜单的键盘循环、Escape、焦点回收和 `inert`；
- 搜索结果数 `aria-live`；
- 装饰图片/标记使用适当的 `aria-hidden` 或空 alt；
- `prefers-reduced-motion`；
- `forced-colors` 焦点兼容；
- iOS safe-area 变量；
- 为界面学科色选择较高对比度文字。

重构 Header、目录、颜色或全局 CSS 时要保留这些行为。新增交互必须支持键盘、可见焦点、正确标签和无脚本下的基本内容访问。

## 十六、已知风险与技术债

### 16.1 发布前优先处理

1. 录入真实 2026 目录，停止复用 2025 内容。
2. 核验封面故事、引语来源和译文。
3. 解决主编/后记署名冲突与贡献者重复记录。
4. 补齐封面、摄影、Logo、二维码等网页发布许可和署名。
5. 统一 2026 封面在 `issues.ts` 与 `asset-notes.md` 中的来源记录。
6. 确认 GitHub Pages、自定义域名、DNS、HTTPS 和域名所有权。

### 16.2 容易产生错误数据的代码

1. 未登记年份会静默回退到 2025 目录。
2. `issues.ts` 用 `number === 6` 判断当前草稿，新增第 7 期会错误。
3. 审核/草稿字段不会阻止公开渲染。
4. 封面焦点 slug 缺失会静默少显示，不会构建失败。
5. 多处非空断言假设 2026 issue 和学科映射存在。
6. 数据中的资源路径没有构建期存在性校验，错名可能线上才 404。
7. `issues`、`disciplines` 数组顺序参与业务逻辑，随意重排会改变前后导航。
8. 同一年重复文章 slug 会产生重复锚点，但当前没有自动唯一性检查。

### 16.3 架构与维护成本

1. 当前年份、六期、七板块、24 篇和 2021—2026 范围大量硬编码。
2. Header、Footer、学科数据和页面入口存在多套导航数据。
3. 首页约 600 行、2026 专题页约 550 行，结构和大量响应式 CSS 共处一文件。
4. 图片转换、字体子集和内容一致性没有可执行脚本。
5. CI 只有 build，没有 check、测试、链接检查或 PR 校验。
6. 移动导航依赖 JavaScript。
7. 搜索一次性渲染全部记录，规模增长后会增加 HTML 和 DOM 负担。
8. `Issue.status`、`Article.status` 和 availability 没有真正驱动 UI。
9. AVIF 文件存在但未被页面使用。
10. 没有自动监控、分析、sitemap、RSS 或结构化数据。

建议后续优先增加：

- 数据唯一性、来源和资源存在性检查脚本；
- CI 中的 `pnpm check`；
- 链接/可访问性/视觉回归检查；
- 明确的“当前年度”配置，减少硬编码；
- 单一导航数据源；
- 对未知年度直接失败的目录生成逻辑；
- 可复现的图片和字体处理脚本。

## 十七、故障排查

### 17.1 图片或字体显示为损坏文件

可能原因：Git LFS 只有指针、文件名不匹配或资源路径绕过 base。

```bash
git lfs pull
git lfs ls-files
git lfs env
```

再检查：

- `public/` 文件是否真实存在；
- `Resources/Font_Resources/` 的四个 TTF 是否为实际二进制文件；
- 页面是否使用 `withBase()`；
- GitHub LFS 配额和 Actions checkout 的 `lfs: true`。

### 17.2 `pnpm install --frozen-lockfile` 失败

1. 确认 pnpm 为 `10.15.0`；
2. 确认 `package.json` 与 `pnpm-lock.yaml` 来自同一提交；
3. 不要为了绕过错误随意刷新锁文件；
4. 如果确实修改依赖，用规定版本重新安装并审阅锁文件差异。

### 17.3 类型问题没有在 build 中出现

GitHub Actions 当前只运行 `pnpm build`。请单独运行：

```bash
pnpm check
```

不要用“build 成功”判断 TypeScript 契约完全正确。

### 17.4 页面或资源线上 404

检查：

- `astro.config.mjs` 的 `site`、`base` 和实际部署路径；
- 页面链接是否走 `withBase()`；
- 页面是否使用尾斜杠；
- 动态年份/学科是否已进入对应数据数组；
- `public/` 大小写和文件扩展名；
- Pages 是否部署了最新 artifact；
- 子页直达和刷新是否由 GitHub Pages 正常返回目录式 `index.html`。

### 17.5 canonical 或 OG 链接错误

- 检查 `astro.config.mjs` 的 `site`；
- 检查 `BaseLayout.astro`；
- `image` 应传站点根相对路径，例如 `/images/hero/hero-2026-1920.webp`；
- 域名、`www` 跳转和实际访问协议必须一致。

### 17.6 修改目录后页面没有更新

检查：

- 修改的是源码而不是 `dist/`；
- 年份已在 `issues.ts`；
- 年度目录已在 `annualCatalogs` 映射；
- 数据从 `src/data/index.ts` 正确导出；
- slug 和学科联合类型有效；
- 页面是不是仍在展示旧年度硬编码；
- 重新运行 build，而不是只看旧 preview。

### 17.7 搜索结果不符合预期

当前是连续子串匹配，不会分词或拼音转换。确认：

- `data-search` 是否包含目标字段；
- 作者/摘要是否本来就是空字符串；
- 学科和年份筛选是否同时生效；
- 搜索词中是否包含不同空格、全角/半角标点；
- 浏览器 JavaScript 是否正常加载。

### 17.8 GitHub Pages 工作流失败

检查：

- Settings → Pages → Source 是否为 GitHub Actions；
- 组织是否允许 Actions 和 Pages；
- workflow 权限是否足够；
- LFS 配额和权限；
- Node/pnpm 版本与锁文件；
- artifact 路径是否仍为 `./dist`；
- `main` 是否是正确发布分支。

### 17.9 SSH 443 推送失败

```bash
ssh -T -p 443 git@ssh.github.com
git remote -v
```

- `Permission denied (publickey)`：检查 SSH 公钥、仓库写权限和组织 SSO 授权；
- 超时/拒绝：检查网络是否允许 `ssh.github.com:443`；
- remote 错误：重新设置为组织确认的地址；
- SSH 成功但 LFS 上传失败：检查 `git lfs env`、LFS 权限和配额。

## 十八、正式交接清单

源码交给新维护者并不等于完成交接。原维护者和接手者应共同确认以下信息。

### 18.1 账号与基础设施

- GitHub 组织和仓库的管理员/写权限；
- Branch protection、Pull Request 和发布审批规则；
- GitHub Pages 设置及 `github-pages` environment；
- Git LFS 配额、账单和负责人；
- 域名注册商、续费账号、到期时间和通知人；
- DNS/Cloudflare 账号、记录和代理方式；
- HTTPS 和 `www`/裸域跳转规则；
- QQ 空间账号及二维码更新负责人。

凭证应通过安全的密码管理工具交接，不得写入仓库或聊天记录。

### 18.2 内容与版权

- 书籍工程 `Informal-Science-2026` 的访问权限和维护位置；
- 2026 最终目录、正文、封面和后记的确认版本；
- 谁可以把 `review-needed` 改为已核验；
- 封面、摄影、Logo、字体、二维码、文章和引语的授权文件；
- 作者/编辑/设计署名的最终确认人；
- 错误更正、撤稿和版权投诉的联系人；
- 是否以及何时开放全文/PDF。
- 网站源代码与文字、图片、品牌素材各自适用的许可；当前仓库没有根 `LICENSE`。

### 18.3 技术交接

- Node、pnpm、Git LFS 安装并完成一次干净克隆构建；
- 新维护者能够运行 dev/check/build/preview；
- 新维护者能够解释 `issues → annualCatalogs → articles → pages` 数据链；
- 新维护者能够修改一条测试数据并确认年度页、学科页和搜索同步变化；
- 新维护者能够完成一次 Pull Request、GitHub Pages 发布和线上验收；
- 新维护者知道 `draft/review/availability` 不是访问控制；
- 新维护者知道新增年度不能依赖 2025 fallback；
- 已记录所有仓库外部署和素材处理步骤。

### 18.4 每次交付应留下的记录

建议在 Pull Request 或发布记录中写清：

- 修改了哪些页面、数据和资源；
- 内容来源及审核人；
- 哪些待核事项仍未解决；
- 执行了哪些检查；
- 线上验收地址和结果；
- 是否涉及授权、署名、域名、依赖或 LFS 配额变化。

当路由、组件 Props、数据类型、年度维护流程、部署平台或资源规则发生变化时，必须同步更新本 README。交接文档只有与当前代码一致时才有价值。
