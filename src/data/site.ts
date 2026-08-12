import type { SiteMeta } from "./types";

const coverSource = {
  repository: "Informal-Science-2026",
  path: "Resources/Cover/Cover.tex",
  locator: "version, slogan, cover focus and cover story",
} as const;

const authorSource = {
  repository: "Informal-Science-2026",
  path: "Resources/Author/Author.tex",
  locator: "edition, credits and copyright line",
} as const;

const afterwordSource = {
  repository: "Informal-Science-2026",
  path: "Resources/Afterword/Afterword.tex",
  locator: "afterword body, signature and date",
} as const;

export const siteMeta = {
  title: "非正式科学",
  englishTitle: "Informal Science",
  edition: "2026年刊",
  issueNumber: 6,
  publisher: "福州一中基础科学社团联盟",
  tagline: {
    zh: "解所未曾释",
    en: "Solve the Unsolved",
  },
  description:
    "《非正式科学》2026 年刊（总第 6 期），收录天文、数学、地理、物理、工程、生物与化学七个学科方向的文章导读。",
  coverStory: {
    title: "悟空号：大圣在宇宙有工作的一天",
    quote:
      "每一缕阳光都是万年前核反应的遗嘱，而地球生命正是解读这份遗嘱的精密仪器。",
    attribution: "天体生物学家 卡洛琳·波尔科",
    reviewNeeded: true,
  },
  coverFocusArticleSlugs: [
    "where-do-stars-come-from",
    "monty-hall-problem",
    "geography-through-tuxun",
    "water-jet-flow-on-wall",
    "identify-aircraft-types",
    "why-petting-cats-feels-good",
    "hypercoordinate-carbon",
  ],
  editorialNote: {
    paragraphs: [
      "身为 2024 级的学弟，我见证了《非正式科学》一次又一次的更新完善，优化规范。",
      "2022 年，林洪平学长首次对刊物进行了完整的 IP 设计，并编写了沿用至今的视觉设计规范；2023 年，高林熙学长换用了新的排版工具，也为我们现在的排版工作具有重要指导意义。",
      "我很幸运的当选了 2025-2026 学年基础学科社团联盟的盟主，并作为这期刊物的主编。这是对我的挑战，但我也很高兴，能以这样的身份将《非正式科学》继续传承。",
      "在此过程中，上一届的主编陈昊学长，也为我们提供了许多宝贵的帮助。",
      "《非正式科学》已走过整整五个年头，每年的撰写、编辑、设计、印刷直至宣发都曾出现过大大小小的不同意外。也正因如此，这本刊物历经五届一中人的经验和传承已更趋于完善，工作流程逐步标准化、规范化。五年以来，上百位作者为我们提供了宝贵的稿件，数十位幕后同学为组织协调、美工排版、市场销售而付出，从而成就了这本刊物，影响近万名读者。",
      "尽管「非正式」的本刊偶有一些小错误，但每一期青涩的《非正式科学》都伴随着我们所有人的成长和努力。",
      "感谢此时书本前的你对我们的包容与支持，若有机会也请看看我们的往届作品。愿明年的《非正式科学》仍能与你相伴！",
    ],
    signature: "赖科羽",
    dateLabel: "2025.11",
    reviewNeeded: true,
    reviewNotes: [
      "后记署名者在正文中自述为本期主编，但 Author.tex 的主编字段为陈逸轩，公开前需确认职务与署名。",
      "后记的时间为 2025.11，需确认是否为 2026 年刊的最终版。",
    ],
  },
  draft: true,
  availability: "preview",
  reviewNeeded: true,
  reviewStatus: "review-needed",
  reviewNotes: [
    "封面故事《悟空号：大圣在宇宙有工作的一天》未出现在 TOC.tex 的 24 篇目录中。",
    "封面引语的原始出处、中文译文与署名尚未核验。",
    "网站和封面视觉资产的公开发布权限需在上线前确认。",
  ],
  source: [coverSource, authorSource, afterwordSource],
} as const satisfies SiteMeta;
