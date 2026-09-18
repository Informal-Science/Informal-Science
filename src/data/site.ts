import type { SiteMeta } from "./types";
import { catalog2026Source } from "./catalog2026";

const coverSource = { ...catalog2026Source, locator: "封面（PDF 第 1 页）" } as const;
const authorSource = { ...catalog2026Source, locator: "版权与制作团队（PDF 第 4 页）" } as const;
const afterwordSource = { ...catalog2026Source, locator: "后记（PDF 第 89 页）" } as const;

export const siteMeta = {
  title: "非正式科学",
  englishTitle: "Informal Science",
  edition: "2026年刊",
  issueNumber: 6,
  publisher: "福州第一中学基础科学社团联盟",
  tagline: {
    zh: "解所未曾释",
    en: "Solve the Unsolved",
  },
  description:
    "《非正式科学》2026 年刊（总第 6 期），收录天文、数学、地理、物理、工程、生物与化学七个学科方向的文章导读。",
  coverStory: {
    title: "「悟空号」：大圣在宇宙有工作的天",
    description: "当我们以为满天繁星就是宇宙的全部时，真正的宇宙可能正隐于那看不见的 95% 之中……悟空号，其实就是人类投向那片未知深渊的一束探照灯。或许，宇宙的法则本就藏于绝对的黑暗与寂静之中，而这只孤独的“大圣”正拼尽全力替我们捕捉那亿分之一秒的闪光。它或许要穷尽一生也无法窥见暗物质的真容，但人类为了突破认知边界而飞向深空的勇气，本身就是宇宙中最闪耀的能量。",
    reviewNeeded: false
  },
  coverFocusArticleSlugs: [
    "mercury-retrograde",
    "kakeya-conjecture",
    "el-nino-global-climate",
    "relativity-and-spacetime",
    "cpp-disassembly",
    "niallia-tiangongensis",
    "chemical-chains"
  ],
  editorialNote: {
    paragraphs: [
      "很荣幸，我当选了 2026-2027 学年基础学科社团联盟的盟主。",
      "去年，我还在惊叹于前几任主编、编辑们能够把这么多天马行空的文字和想法，精准地装进这方寸之间。而今年，当我也真正走到台前，去承担起属于我的那部分责任时，才更加深刻地体会到这背后的不易。",
      "把科学讲得引人入胜很难，把冷冰冰的理论变成有温度的文字更难。虽然我们不是专业的学术期刊，但这并不代表我们可以敷衍了事。相反，因为「非正式」，我们反而拥有了更自由的灵魂和更真诚的表达。",
      "在此，感谢每一位在背后辛勤付出的作者、审核和视觉同学，没有你们的打磨，就没有这本沉甸甸的成果。也感谢正在翻阅此书的你，你的停留，给了我们这群人继续坚持做下去的理由。",
      "我们深知这本刊物依然稚嫩，还有很多不足的地方。但正如科学探索本身一样，我们都在试错中慢慢成长。愿你也能在文字里，找到属于自己的那份顿悟与快乐。明年的《非正式科学》，我们依然在这里等你。"
    ],
    signature: "陈逸轩",
    dateLabel: "2026.9",
    reviewNeeded: false,
    reviewNotes: []
  },
  draft: true,
  availability: "preview",
  reviewNeeded: true,
  reviewStatus: "review-needed",
  reviewNotes: [
    "依据 Beta-B-2 校对版本整理；2026 年目录页码暂填 1，待最终排版确定。",
    "网站和封面视觉资产的公开发布权限需在上线前确认。",
  ],
  source: [coverSource, authorSource, afterwordSource],
} as const satisfies SiteMeta;
