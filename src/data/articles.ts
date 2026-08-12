import type { Article } from "./types";
import { issues } from "./issues";

type DirectoryArticle = Pick<
  Article,
  "title" | "author" | "disciplineSlug" | "summary" | "page"
> & { slug: string };

interface AnnualCatalog {
  sourceYear: number;
  entries: readonly DirectoryArticle[];
}

const directoryReviewNotes = (year: number, sourceYear: number) => [
  "当前书籍工程的对应学科正文仍是占位内容，网站首版只可发布目录导读。",
  "页码来自 TOC.tex 的人工录入，需在正式 PDF 完成后复核。",
  ...(year === sourceYear
    ? []
    : [`当前 ${year} 年目录临时复用已确认的 ${sourceYear} 年目录，待本年原始目录提供后替换。`]),
] as const;

const directoryArticle = (
  entry: DirectoryArticle,
  year: number,
  issueNumber: number,
  sourceYear: number,
): Article => ({
  ...entry,
  slug: `${year}-${entry.slug}`,
  catalogSlug: entry.slug,
  year,
  issueNumber,
  status: "directory-only",
  draft: true,
  availability: { summary: true, fullText: false, pdf: false },
  reviewNeeded: true,
  reviewStatus: "review-needed",
  reviewNotes: directoryReviewNotes(year, sourceYear),
  source: {
    repository: "Informal-Science-2026",
    path: "Resources/TOC/TOC.tex",
    locator:
      year === sourceYear
        ? `tocitem: ${entry.title}; assigned to ${year} issue`
        : `tocitem: ${entry.title}; ${sourceYear} catalog reused for ${year} issue`,
  },
});

const suppliedCatalog2025 = [
  {
    slug: "sun-our-star",
    title: "太阳：我们的恒星，生命的源泉",
    author: "江彦烺",
    disciplineSlug: "astronomy",
    summary:
      "探索太阳的基本结构、能量来源核聚变、活动周期及生命历程，从诞生到白矮星归宿，揭示这颗恒星对地球生命的核心意义。",
    page: 1,
  },
  {
    slug: "where-do-stars-come-from",
    title: "天上的星星哪里来",
    author: "游若东",
    disciplineSlug: "astronomy",
    summary:
      "追溯恒星的起源与演化，从分子云坍缩到原恒星形成，分析小质量、中等质量和大质量恒星的不同命运，诠释宇宙元素循环的壮丽史诗。",
    page: 4,
  },
  {
    slug: "alicpt-cosmic-first-light",
    title: "中国科学家在高原聆听宇宙的初啼",
    author: "罗楚涵",
    disciplineSlug: "astronomy",
    summary:
      "报道阿里原初引力波探测实验（AliCPT-1）的首光观测突破，介绍青藏高原站点如何捕捉宇宙暴胀的涟漪，推动我国宇宙学研究进入国际前沿。",
    page: 6,
  },
  {
    slug: "monty-hall-problem",
    title: "三门问题：概率里的「反直觉」陷阱",
    author: "杨正玺",
    disciplineSlug: "math",
    summary:
      "通过经典的三门选择游戏，揭示条件概率的反直觉本质，用贝叶斯公式分析换门策略的合理性，挑战人们对随机性的直观认知。",
    page: 7,
  },
  {
    slug: "topology-donut-and-coffee-cup",
    title: "拓扑趣谈：为什么甜甜圈和咖啡杯是一样的",
    author: "杨正玺",
    disciplineSlug: "math",
    summary:
      "以橡皮泥变形比喻引入拓扑学核心概念，如亏格和同胚，解释洞的数量如何定义物体本质，并简述其在生物、物理等领域的应用。",
    page: 9,
  },
  {
    slug: "recreational-mathematics",
    title: "不止于娱乐的「娱乐数学」",
    author: "沈卓毅",
    disciplineSlug: "math",
    summary:
      "以魔方、幻方等为例，探讨娱乐数学如何激发严肃数学发展，从柯尼斯堡的图论工作到概率论起源，展现游戏背后的深层数学逻辑。",
    page: 11,
  },
  {
    slug: "fuzhou-historic-city",
    title: "福州：历史性城市的保护与发展",
    author: "林子杰",
    disciplineSlug: "geography",
    summary:
      "分析福州从汉代冶城到现代滨江滨海城市的空间演变，探讨三坊七巷修复、内河治理与数字经济如何平衡历史保护与城市更新。",
    page: 14,
  },
  {
    slug: "fuzhou-volcanic-geology",
    title: "福州地区火山地质构造演变史",
    author: "陈楷",
    disciplineSlug: "geography",
    summary:
      "揭秘福州晚侏罗世至早白垩世的火山岩形成过程，通过鼓山、旗山等案例，展现火山活动对当地温泉、地貌的深远影响。",
    page: 17,
  },
  {
    slug: "geography-through-tuxun",
    title: "在图寻中学地理",
    author: "齐逸",
    disciplineSlug: "geography",
    summary:
      "介绍图寻（Tuxun）游戏的娱乐化学习机制，如何通过街景细节推断位置，结合气候、地形、岩石分布等地理知识提升实践能力。",
    page: 19,
  },
  {
    slug: "china-busiest-metro-stations",
    title: "中国客流量十大地铁站发展区位因素之异同",
    author: "江昀霖",
    disciplineSlug: "geography",
    summary:
      "对比广州体育西路、南京新街口等十大地铁站的客流驱动因素，总结城市中心区位、换乘枢纽与商业集聚在轨交网络中的核心作用。",
    page: 22,
  },
  {
    slug: "fermat-principle",
    title: "光的传播密码——大自然的最速传说",
    author: "陈冠中",
    disciplineSlug: "physics",
    summary:
      "从费马原理出发，分析光传播的用时最短路径规律，并类比解决最速降线问题，揭示自然现象背后统一的最小作用量原理。",
    page: 25,
  },
  {
    slug: "water-jet-flow-on-wall",
    title: "水柱喷向墙面，墙上的水流是什么形状？",
    author: "陈冠中",
    disciplineSlug: "physics",
    summary:
      "通过抛物线轨迹族与包络线模型，推导细水柱冲击墙面时水流形状的数学方程，展现日常现象中的物理建模魅力。",
    page: 27,
  },
  {
    slug: "noether-theorem",
    title: "上帝具有两只左手——诺特定理",
    author: "林泓",
    disciplineSlug: "physics",
    summary:
      "探讨对称性如何通过诺特定理对应物理守恒律，如动量、能量守恒，揭示宇宙定律背后的统一性与深层数学结构。",
    page: 29,
  },
  {
    slug: "cpt-transformation",
    title: "上帝具有两只左手——CPT 变换",
    author: "林泓",
    disciplineSlug: "physics",
    summary:
      "分析电荷共轭、宇称和时间反演对称性及其破缺，解释 CPT 定理在粒子物理中的核心地位，探讨弱力导致的宇宙物质-反物质不对称。",
    page: 30,
  },
  {
    slug: "vt-fuze",
    title: "VT 引信如何让「擦肩而过」的炮弹和飞机「碰出」火花",
    author: "倪睿",
    disciplineSlug: "engineering",
    summary:
      "解析可变时引信的多普勒效应工作原理，及其在二战防空炮弹中的实战优势，展现精密电子设计对军事科技的推动。",
    page: 31,
  },
  {
    slug: "helicopter-swashplate",
    title: "直升机凭啥能「想飞哪就飞哪」？秘密藏在斜盘里！",
    author: "魏雅睿",
    disciplineSlug: "engineering",
    summary:
      "深入斜盘结构的总距与周期变距控制机制，阐述直升机如何通过机械连杆与液压系统实现灵活飞行姿态调整。",
    page: 33,
  },
  {
    slug: "identify-aircraft-types",
    title: "别再只会说「大飞机」！教你辨别机场里的不同机型",
    author: "林子睿",
    disciplineSlug: "engineering",
    summary:
      "从支线客机到超大型宽体机，详解波音、空客等主流机型的辨识技巧，如起落架、翼梢小翼特征，传递航空工业美学。",
    page: 36,
  },
  {
    slug: "lichen-symbiosis",
    title: "地衣：如何理解藻菌共生体",
    author: "陈语凝",
    disciplineSlug: "biology",
    summary:
      "探讨地衣中真菌与藻类的微妙共生关系，从形态控制到环境适应性，分析其繁殖策略及对共生理论研究的挑战。",
    page: 41,
  },
  {
    slug: "why-petting-cats-feels-good",
    title: "撸猫为什么能带来快乐",
    author: "林若晗",
    disciplineSlug: "biology",
    summary:
      "从多巴胺、内啡肽等神经递质角度，解释抚摸猫咪的视觉、听觉与触觉刺激如何激活脑区犒赏通路，缓解压力。",
    page: 43,
  },
  {
    slug: "smartphone-addiction",
    title: "手机成瘾：为何我们像被施了魔法一样停不下来？",
    author: "廖宇辉",
    disciplineSlug: "biology",
    summary:
      "基于间歇性强化与多巴胺机制，剖析 APP 设计如何利用无限滚动、通知色彩诱导依赖，并提出正念冥想等破解策略。",
    page: 46,
  },
  {
    slug: "human-impact-on-birds",
    title: "一窥人类对鸟类不一样的影响",
    author: "陈语凝",
    disciplineSlug: "biology",
    summary:
      "从城市化巢材变化、光声污染到鸟塘经济，探讨人类活动对鸟类行为、群落同质化的多维影响，反思生态平衡。",
    page: 48,
  },
  {
    slug: "hypercoordinate-carbon",
    title: "多价碳：让碳不只成四根键",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary:
      "通过 Lewis 酸碱理论，分析碳原子如何突破四键限制，形成五配位结构，展望此类化合物在材料科学中的潜力。",
    page: 50,
  },
  {
    slug: "rethinking-solubility",
    title: "溶解性的再认识",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary:
      "结合软硬酸碱理论与晶格能模型，定性定量探讨盐类溶解规律，揭示钾盐、硝酸盐易溶背后的电荷密度原理。",
    page: 52,
  },
  {
    slug: "interesting-double-salts",
    title: "有趣的复盐",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary:
      "介绍明矾、摩尔盐等复盐的晶体结构与化学性质，阐述其在分析化学、工业除杂中的应用与稳定性优势。",
    page: 54,
  },
] as const satisfies readonly DirectoryArticle[];

/**
 * Add a year's verified catalog here as soon as its source material arrives.
 * Missing years deliberately fall back to the supplied 2025 catalog below.
 */
const annualCatalogs: Partial<Record<number, AnnualCatalog>> = {
  2025: { sourceYear: 2025, entries: suppliedCatalog2025 },
};

const catalogForYear = (year: number): AnnualCatalog =>
  annualCatalogs[year] ?? { sourceYear: 2025, entries: suppliedCatalog2025 };

/**
 * Until the original annual tables of contents are available, every issue
 * intentionally reuses the supplied 2025 catalog. New annual source data can
 * replace one issue at a time without changing any page component.
 */
export const articles = [...issues]
  .reverse()
  .flatMap((issue) => {
    const catalog = catalogForYear(issue.year);
    return catalog.entries.map((entry) =>
      directoryArticle(entry, issue.year, issue.number, catalog.sourceYear),
    );
  }) satisfies readonly Article[];
