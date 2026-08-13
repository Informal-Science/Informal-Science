# 《非正式科学》2026 网站

这是《非正式科学》2026 年刊（总第 6 期）的官方网站工程。网站使用 Astro 生成纯静态页面，以书籍排版工程 `Informal-Science-2026` 为编辑来源，经人工审核后发布到 Cloudflare Pages。

网站预期部署在：

`https://informal-science.org/`

> 书籍工程是编辑源，网站仓库是发布副本。网站构建不会在 CI 中读取相邻的书籍仓库，以保证任何人克隆本仓库后都能重现构建。

## 项目结构

```text
.
├── .github/workflows/deploy.yml  # GitHub Pages 构建与发布
├── Resources/                    # 原始设计素材（大文件由 Git LFS 管理）
├── docs/                         # 资源来源、授权与转换记录
├── public/
│   ├── images/                  # 已压缩、可直接发布的网页图片
│   └── fonts/                   # 网页字体的版权与许可声明
├── src/
│   ├── assets/fonts/            # 可子集化字体的 WOFF2 发布版
│   ├── components/              # 可复用的页面组件
│   ├── data/                    # 刊物、学科、文章、往期与贡献者数据
│   ├── layouts/                 # 共用页面骨架与 SEO 元数据
│   ├── pages/                   # Astro 路由入口
│   ├── styles/                  # 设计令牌、字体与全局样式
│   └── utils/paths.ts           # 兼容 GitHub Pages 子路径的 URL 工具
├── astro.config.mjs              # 静态输出与正式站点地址
├── package.json
└── pnpm-lock.yaml                # CI 可重现安装的依赖锁文件
```

`dist/`、`node_modules/`、`.astro/` 和所有 `.DS_Store` 都是本地或构建产物，已被 `.gitignore` 排除，不应提交。

## 本地开发

需要 Node.js `22.18.0`、pnpm `10.15.0` 和 Git LFS。克隆仓库后执行：

```bash
git lfs install
git lfs pull
pnpm install --frozen-lockfile
pnpm dev
```

开发服务启动后，访问终端显示的根地址。提交前至少运行：

```bash
pnpm check
pnpm build
pnpm preview
```

`pnpm build` 的输出位于 `dist/`，该目录只用于本地预览和部署，不纳入版本控制。

## 更新内容

刊物内容采用数据驱动，不要手工修改构建出来的 HTML。

1. 先在书籍工程中确认最终稿，再将审核过的文字转录到 `src/data/`。
2. 网站基本信息、封面故事与后记在 `src/data/site.ts` 维护；学科、文章、往期、贡献者和颜色规范分别在 `disciplines.ts`、`articles.ts`、`issues.ts`、`contributors.ts` 和 `colors.ts` 维护。`src/data/index.ts` 是统一导出入口，`types.ts` 定义共用数据约束。
3. 保留每条数据的 `source`、`reviewStatus`、`reviewNeeded` 和 `reviewNotes`；待核信息不得直接改成已核验。
4. 将 `draft` 或 `availability` 改为公开状态前，要同时确认文章、PDF、图片、引语和署名的发布授权。
5. 运行检查与构建，在本地逐页核对标题、作者、学科、摘要、链接和移动端版式。

### 年度文章资料

`src/data/articles.ts` 将“文章目录母版”与“年度记录”分开维护。当前已确认收到的 24 篇目录实际属于 2025 年；在 2021—2026 各期原始目录补齐前，网站按编辑要求将这份目录复用于六期，并为每条年度记录生成独立的 `year`、`issueNumber` 和 `slug`。不要在页面组件里复制文章数据。

- `/questions-answers/` 是跨年份检索入口，可同时按关键词、学科和年份（期次）筛选。
- `/history/YYYY/` 只读取对应年份的 24 篇记录。
- `/disciplines/<slug>/` 汇总该学科在六期中的年度记录；数学使用稳定路由 `/disciplines/math/`。
- `/disciplines/other/` 聚合 `historical-disciplines.ts` 中的历史板块及其文章；`content-disciplines.ts` 是现行与历史板块的统一检索表。
- `/2026/` 只承担本期定位和编辑方向，不再承载文章搜索。

取得某一年的真实目录后，应在数据层替换该年度的目录来源，并保留年份、期数、学科、来源和审核字段；脑神经科学与电子文章分别使用 `brain-neuroscience`、`electronic` 学科键。问题-答案、往期详情和“其他”页会自动收录，页面路由与组件无需改写。

站内路由和资源 URL 必须兼容正式站点根路径。在 Astro 代码中使用 `src/utils/paths.ts` 的 `withBase()` 或 `assetPath()`，不要硬编码以 `/images/...` 开头的站点根路径。

## 更新图片与其他资源

`Resources/` 用于保留必要的原始设计素材，`public/` 只放已经适配网页的发布版。更新时：

1. 从书籍工程导出经编辑确认的图片，不要让网站构建直接依赖本机上的相邻目录。
2. 裁切到正确比例，去除不需要的元数据，并优先导出 WebP/AVIF。不得将 20 MB 级的印刷原图直接作为网页图片。
3. 公共路径按约定命名：横屏主视觉使用 `public/images/hero/hero-2026-{640,1280,1920,3840}.webp`，竖屏主视觉使用 `cover-2026-{640,1280,1920,2880}.webp`，往期封面使用 `public/images/issues/issue-YYYY.webp`，品牌标志使用 `public/images/brand/logo-{mark,lockup}.svg`。
4. 在对应数据文件中更新引用，并在 `docs/asset-notes.md` 记录原始位置、转换方式、credit 和 license。
5. 在宽屏、手机宽度和正式站点根路径下检查图片是否正确显示。

### 2026 首页主视觉

首页按设备方向选择两张权威源图：横屏源为 `Background-2026.jpg`（`8640×5760`），网页最大输出到 `3840×2560`；竖屏源为 `Cover-2026.jpg`（`4060×5742`），网页最大输出到 `2880×4073`。两套 `srcset` 让浏览器按视口和像素密度加载合适尺寸，普通电脑和手机不再下载印刷原图。

两张源图都是 Adobe RGB (1998)。生成网页图时必须读取源 ICC，经 ColorSync 转换为 sRGB，再编码 WebP 并嵌入 sRGB ICC；禁止只删除 Adobe RGB 标签或把像素直接误标为 sRGB，以免照片发灰。完整处理参数与色彩差异测试记录在 `docs/asset-notes.md`。

### 字体分工

- 正文和界面：HarmonyOS Sans SC。Light 用于正文，Regular 用于常规界面，Medium 用于层级强调，Bold 用于需要强强调的短标题；加载失败时使用系统中文无衬线回退。
- 刊名和展示大标题：Noto Serif CJK SC，用于刊名、封面式大标题和编辑性引语。
- 数学公式：STIX Two Math，仅在页面确实需要数学排版时加载。

书籍工程的字体目录约 210 MB，因此不得整包复制到网站。`Resources/Font_Resources/` 仅保留并实际映射书籍使用的四个未修改 HarmonyOS Sans TTF 字重；Noto Serif CJK SC 与 STIX Two Math 的 WOFF2 子集放在 `src/assets/fonts/`。来源、版本、子集范围、许可核查与 `public/fonts/NOTICE.txt` 的声明均记录在 `docs/asset-notes.md`。新增人名或正文字符后，需重新生成可修改字体的子集或检查系统字体回退；不得对 HarmonyOS Sans 文件做格式转换或子集化。

## Git LFS

`.gitattributes` 使用 Git LFS 管理 PDF、PNG、JPG、SVG、DOC、ZIP、TTF、OTF 以及 `Resources/Picture_Resources/` 下的文件。使用时请注意：

- 克隆后执行 `git lfs pull`，否则工作区可能只有小型指针文件。
- GitHub Pages 工作流已在 checkout 时显式启用 LFS，构建产物中会包含实际资源，而不是 LFS 指针。
- 新增大文件前先检查授权和仓库 LFS 配额。对已纳入版本控制的文件改变 LFS 规则需要迁移历史，不要只改 `.gitattributes`。
- 网页端优先使用已压缩的 WebP/AVIF/WOFF2。Git LFS 解决的是仓库存储问题，不会降低访客的下载体积。

## 部署

`.github/workflows/deploy.yml` 使用 GitHub 官方 Pages Actions。每次推送到 `main` 后，GitHub 会用锁文件安装依赖、生成 `dist/` 并发布；也可在 Actions 页面手动运行 `Deploy to GitHub Pages`。

首次发布前需要：

1. 确认 GitHub 组织中的远程仓库名为 `Informal-Science`，并将本地 `origin` 指向 SSH 443 端口：

   ```bash
   git remote set-url origin ssh://git@ssh.github.com:443/Informal-Science/Informal-Science.git
   ```

2. 在仓库 **Settings → Pages → Build and deployment** 中将 Source 设为 **GitHub Actions**。
3. 确认组织允许 Pages 和 Actions，推送 `main`，等待 `Deploy to GitHub Pages` 工作流完成。
4. 验收首页、站内导航、直达子页、404、图片、字体和 PDF 链接。

当前没有配置自定义域名。若仓库名或域名变更，需要同时更新 `astro.config.mjs` 的 `site`/`base`、站内完整 URL、GitHub Pages 设置与 DNS，然后重新做一次子路径验收。

### SSH 443 故障排查

该项目使用 `ssh.github.com:443` 推送，以兼容限制 SSH 22 端口的网络。无法连接时先测试：

```bash
ssh -T -p 443 git@ssh.github.com
git remote -v
```

- 若显示 `Permission denied (publickey)`，检查本机 SSH 公钥是否已添加到有仓库写权限的 GitHub 账号；组织启用 SSO 时还需为该密钥授权。
- 若显示超时或连接拒绝，检查当前网络是否允许访问 `ssh.github.com` 的 443 端口。
- 若 `git remote -v` 仍显示旧仓库名 `Web-of-Informal-Science`，重新执行上述 `git remote set-url` 命令后再推送。
- SSH 连接成功但 LFS 上传失败时，运行 `git lfs env` 检查 LFS 端点，并确认组织的 Git LFS 配额与权限。
