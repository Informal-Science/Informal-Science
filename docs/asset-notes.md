# 网站素材说明

本文记录《非正式科学》2026 网站交付素材的来源、处理方式和发布前检查项。原始书籍工程与网站仓库中的 `Resources/` 素材均未被覆盖；`public/` 下文件是网页交付副本。

## 2026 主视觉

- 桌面端权威原图：`Resources/Picture_Resources/Backgrounds/Background-2026.jpg`，8640 × 5760，约 19 MB，内嵌 Adobe RGB (1998) 配置文件。
- 竖屏权威原图：`Resources/Picture_Resources/Backgrounds/Cover-2026.jpg`，4060 × 5742，从书籍工程 `Resources/Cover/Cover_A4.jpg` 原样复制。
- 首页不再直接传输印刷原图。横屏由 `Background-2026.jpg` 输出 640、1280、1920、3840 像素宽的响应式 WebP；竖屏由 `Cover-2026.jpg` 输出 640、1280、1920、2880 像素宽的响应式 WebP。浏览器根据方向、视口和像素密度选择合适文件。
- 两张权威源图都内嵌 Adobe RGB (1998)。转换先通过 macOS ColorSync 按源 ICC 将像素变换到 sRGB IEC61966-2.1，再编码 WebP，并通过 `webpmux` 为交付文件重新嵌入 sRGB ICC；没有直接丢弃或误标源色彩空间。
- 原图元数据含摄影者姓名与权利字段；正式公开前应由项目负责人确认摄影作品的网页发布许可和展示署名。本文不复制元数据中的个人联系方式。

| 文件 | 像素 | 大小 | 用途 |
| --- | ---: | ---: | --- |
| `hero-2026-640.webp` | 640 × 426 | 26 KB | 横屏小视口 |
| `hero-2026-1280.webp` | 1280 × 853 | 93 KB | 横屏普通屏幕 |
| `hero-2026-1920.webp` | 1920 × 1280 | 287 KB | 横屏高密度屏幕 |
| `hero-2026-3840.webp` | 3840 × 2560 | 915 KB | 横屏 4K 上限 |
| `cover-2026-640.webp` | 640 × 905 | 50 KB | 竖屏小视口 |
| `cover-2026-1280.webp` | 1280 × 1810 | 163 KB | 竖屏普通屏幕 |
| `cover-2026-1920.webp` | 1920 × 2715 | 408 KB | 竖屏高密度屏幕 |
| `cover-2026-2880.webp` | 2880 × 4073 | 826 KB | 竖屏高分辨率上限 |

响应式 WebP 使用 libwebp 1.6.0，质量 86（640/1280）或 90（1920 及以上），并启用 Sharp YUV。色彩质量复核将 WebP 解码结果与同尺寸 ColorSync sRGB 参考图比较：横屏 RGB 通道均值偏差不超过 0.19，平均绝对误差不超过 1.68/255；竖屏均值偏差不超过 0.19，平均绝对误差不超过 1.47/255，未出现整体亮度或饱和度下降。

## 历年封面与历史纹理

稳定访问路径为 `/images/issues/issue-YYYY.webp`。2021–2025 来自网站仓库 `Resources/Picture_Resources/History/Cover_Issue-{1..5}`；未使用重复的 `Cover_Issue-6.png`。2026 封面直接取自书籍工程 2026-08-12 重新编译的 `main.pdf` 第一页；该版本已在 `main.tex` 中关闭 `\showpagemarginlines` 与 `\showboxdebuglines`，网站封面因此不含页边距或 TikZ 节点参考线。

| 文件 | 像素 | 大小 | 色彩处理 |
| --- | ---: | ---: | --- |
| `issue-2021.webp` | 720 × 1017 | 56 KB | sRGB |
| `issue-2022.webp` | 720 × 1018 | 118 KB | sRGB |
| `issue-2023.webp` | 720 × 989 | 55 KB | CMYK/Japan Color 2001 Coated → sRGB |
| `issue-2024.webp` | 595 × 842 | 98 KB | Adobe RGB (1998) → sRGB；不放大原图 |
| `issue-2025.webp` | 720 × 1018 | 85 KB | sRGB |
| `issue-2026.webp` | 1200 × 1698 | 300 KB | 最新 `main.pdf` 第 1 页 → sRGB |
| `textures/history-collage.webp` | 794 × 1123 | 90 KB | sRGB；来自 `History_Background.png` |

封面 WebP 使用质量 82；2026 完整封面因含较多小字号文字以 1200 像素宽、质量 90 输出。历史封面、拼贴图与 2026 封面的照片/版面目前没有单独的网页发布许可文件，上线前需要补齐来源、作者、许可与署名记录。

## 品牌标志

- `public/images/brand/logo-mark.svg` 与 `public/favicon.svg`：从 `Resources/Picture_Resources/logo/logo1.pdf` 直接导出。
- `public/images/brand/logo-lockup.svg`：从 `Resources/Picture_Resources/logo/logo2.pdf` 直接导出。
- 转换由 Poppler `pdftocairo` 完成，文字已保留为矢量轮廓；没有手绘、替换字体或重构标志。
- `.ai` 文件实质为包含 Illustrator 元数据的 PDF 容器，网页交付无需再复制一份。

品牌标志的公开使用范围也应由刊物团队确认。

## 网页字体

HarmonyOS 原始字体位于 `Resources/Font_Resources/HarmonyOS_Sans_SC/`，其余网页字体位于 `src/assets/fonts/`；`public/fonts/NOTICE.txt` 保留显著的版权与许可声明。网站与书籍保持相同分工，并直接打包未修改的四个 HarmonyOS 字重，避免子集或转换触碰其字体协议中的修改限制：

| CSS 文件 | 原始字体 | 字重 | 大小 |
| --- | --- | ---: | ---: |
| `HarmonyOS_Sans_SC_Light.ttf` | HarmonyOS Sans SC Light 1.0 | 300 | 7.9 MB |
| `HarmonyOS_Sans_SC_Regular.ttf` | HarmonyOS Sans SC Regular 1.0 | 400 | 7.9 MB |
| `HarmonyOS_Sans_SC_Medium.ttf` | HarmonyOS Sans SC Medium 1.0 | 500 | 7.8 MB |
| `HarmonyOS_Sans_SC_Bold.ttf` | HarmonyOS Sans SC Bold 1.0 | 700 | 7.8 MB |
| `noto-serif-cjk-sc-medium.woff2` | Noto Serif CJK SC Medium 2.003 | 500 | 533 KB |
| `noto-serif-cjk-sc-semibold.woff2` | Noto Serif CJK SC SemiBold 2.003 | 600 | 366 KB |
| `noto-serif-cjk-sc-black.woff2` | Noto Serif CJK SC Black 2.003 | 900 | 532 KB |
| `stix-two-math-regular.woff2` | STIX Two Math 2.12 b168 | 400 | 356 KB |

来源均为书籍仓库 `Fonts/`。HarmonyOS Sans 直接复制四个原始、未修改 TTF 字重，避免公开发布字体子集是否属于“修改”的许可争议；这些文件由 Git LFS 管理。Noto Serif CJK SC 与 STIX Two Math 使用 FontTools 4.63.0 输出 WOFF2，并保留名称、版权与许可元数据。Noto Serif 子集覆盖生成时 `src/` 中全部中英文字符，并额外纳入 Latin-1、常用标点、货币、箭头、CJK 标点和全角字符；STIX Two Math 覆盖常用数学运算符、箭头、数学字母数字与技术符号。

增加新的姓名、文章或正文后，必须重新生成字体子集，或确认缺字时能接受系统字体回退。不要把完整投稿、文章 PDF 或整套字体复制进网站仓库。

### 字体许可检查

- HarmonyOS Sans：Copyright 2021 Huawei Device Co., Ltd. 官方字体下载页见 [华为开发者联盟](https://developer.huawei.com/consumer/cn/design/resource-V1/)，协议文本见 [OpenHarmony LICENSE_Fonts](https://github.com/openharmony/global_system_resources/blob/master/LICENSE_Fonts)。协议允许在软件中嵌入、捆绑及分发未修改副本，要求保留协议和版权声明并显著声明使用该字体，同时写明不得修改字体组件。网站因此使用书籍工程中的原始、未修改 TTF，而不发布生成过的 HarmonyOS WOFF2 子集。
- Noto Serif CJK SC：Copyright 2017–2024 Adobe；字体元数据声明采用 SIL Open Font License 1.1，完整许可见 [Noto CJK Serif LICENSE](https://github.com/notofonts/noto-cjk/blob/main/Serif/LICENSE)。
- STIX Two Math：Copyright 2001–2021 The STIX Fonts Project Authors；采用 SIL Open Font License 1.1，许可见 [STIX Fonts OFL](https://github.com/stipub/stixfonts/blob/master/OFL.txt)。

以上仅为素材追踪与发布检查记录，不构成法律意见。

## 未交付素材

- `History/QR-code.jpg`：编辑方确认为 QQ 空间订阅二维码，原样复制到 `public/images/subscribe/qq-space-qr.jpg`；二维码图像不重采样，避免影响识别。
- `History/Cover_Issue-6.png`：与第五期文件逐字节相同，且图面标注“2025 年刊 总第 5 期”，因此没有作为第六期封面使用。
- `.ai` 源、整套字体、投稿文件和整本 PDF：网页不需要，未复制。
