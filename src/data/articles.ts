import type { Article, SourceReference } from "./types";
import { issues } from "./issues";
import { catalog2026, catalog2026Source } from "./catalog2026";

type DirectoryArticle = Pick<
  Article,
  "title" | "author" | "disciplineSlug" | "summary" | "page"
> & { slug: string };

interface AnnualCatalog {
  sourceYear: number;
  source: SourceReference;
  entries: readonly DirectoryArticle[];
}

const directoryReviewNotes = (year: number, catalog: AnnualCatalog) => [
  "当前网站仅发布目录信息，全文尚未开放。",
  ...(year === 2026 ? ["依据 Beta-B-2 目录录入；页码暂填 1，待最终排版确定后更新。"] : []),
  ...(year === catalog.sourceYear
    ? ["目录已依据本期提供的原始资料逐项录入。"]
    : [`当前 ${year} 年目录临时复用已确认的 ${catalog.sourceYear} 年目录，待本年原始目录提供后替换。`]),
] as const;

const directoryArticle = (
  entry: DirectoryArticle,
  year: number,
  issueNumber: number,
  catalog: AnnualCatalog,
): Article => ({
  ...entry,
  slug: `${year}-${entry.slug}`,
  catalogSlug: entry.slug,
  year,
  issueNumber,
  status: "directory-only",
  draft: true,
  availability: { summary: true, fullText: false, pdf: false },
  reviewNeeded: year !== catalog.sourceYear,
  reviewStatus: year === catalog.sourceYear ? "verified-from-source" : "review-needed",
  reviewNotes: directoryReviewNotes(year, catalog),
  source: {
    ...catalog.source,
    locator: `${catalog.source.locator}；${entry.title}`,
  },
});

const catalogScanSource = (year: number, page: string): SourceReference => ({
  repository: "Informal-Science-2026",
  path: "Resources/2024-2021年 目录.pdf",
  locator: `第 ${page} 页：${year} 年刊目录`,
});

const catalog2022Source: SourceReference = {
  repository: "Informal-Science-2026",
  path: "Resources/2024-2021年 目录.pdf",
  locator: "第 4 页：2022 年刊目录；作者依据用户提供的《[四稿] 非正式科学 2022年.pdf》各篇首页核对",
};

const catalog2025Source: SourceReference = {
  repository: "Informal-Science-2026",
  path: "Resources/TOC/TOC.tex",
  locator: "已确认的 2025 年目录",
};

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

const catalog2021 = [
  {
    slug: "fermat-last-theorem-history",
    title: "费马大定理背后的数学史",
    author: "付嘉辰",
    disciplineSlug: "math",
    summary: "",
    page: 1,
  },
  {
    slug: "rubber-geometry",
    title: "橡皮几何学",
    author: "肖佳翎",
    disciplineSlug: "math",
    summary: "",
    page: 3,
  },
  {
    slug: "relativity",
    title: "一切都是相对的——来说说相对论",
    author: "郭珈",
    disciplineSlug: "physics",
    summary: "",
    page: 5,
  },
  {
    slug: "semiconductor-with-personality",
    title: "芯片世界——有个性的半导体",
    author: "林安诗、郭珈伊",
    disciplineSlug: "physics",
    summary: "",
    page: 10,
  },
  {
    slug: "quantum-mechanics-schrodingers-cat",
    title: "量子力学——从薛定谔的猫说起",
    author: "卫天翔",
    disciplineSlug: "physics",
    summary: "",
    page: 12,
  },
  {
    slug: "nobel-chemistry-prize-facts",
    title: "诺贝尔化学奖小知识",
    author: "福州一中化学社",
    disciplineSlug: "chemistry",
    summary: "",
    page: 15,
  },
  {
    slug: "chemistry-in-daily-life",
    title: "生活中的化学",
    author: "福州一中化学社",
    disciplineSlug: "chemistry",
    summary: "",
    page: 16,
  },
  {
    slug: "elephant-toothpaste",
    title: "实验栏目——大象牙膏",
    author: "福州一中化学社",
    disciplineSlug: "chemistry",
    summary: "",
    page: 17,
  },
  {
    slug: "why-am-i-getting-fatter",
    title: "为什么我会越来越胖",
    author: "陈晗",
    disciplineSlug: "biology",
    summary: "",
    page: 18,
  },
  {
    slug: "biology-weight-loss",
    title: "生物减肥，秤表倒转",
    author: "陈昱鑫",
    disciplineSlug: "biology",
    summary: "",
    page: 20,
  },
  {
    slug: "vaccination-upper-arm",
    title: "接种疫苗为什么选择上臂",
    author: "陈晗",
    disciplineSlug: "biology",
    summary: "",
    page: 21,
  },
  {
    slug: "fluorescent-lake",
    title: "地理科普-荧光湖",
    author: "赵文昊",
    disciplineSlug: "geography",
    summary: "",
    page: 23,
  },
  {
    slug: "club-president-talks-qingteng-geography",
    title: "社长谈青藤地理社",
    author: "王博森",
    disciplineSlug: "geography",
    summary: "",
    page: 24,
  },
  {
    slug: "first-person-geography-club",
    title: "第一人称看懂地理社活动",
    author: "刘新、池骋、林翔烨",
    disciplineSlug: "geography",
    summary: "",
    page: 25,
  },
  {
    slug: "ai-history-and-outlook",
    title: "科学探索之路——人工智能发展历程与前景",
    author: "张亦驰、吴尔轩",
    disciplineSlug: "electronic",
    summary: "",
    page: 26,
  },
  {
    slug: "spark-gap-tesla-coil",
    title: "人造闪电——火花间隙特斯拉线圈",
    author: "吴尔轩",
    disciplineSlug: "electronic",
    summary: "",
    page: 28,
  },
  {
    slug: "smart-iot-home-assistant",
    title: "智联生活——家庭智能物联网助手",
    author: "吴尔轩",
    disciplineSlug: "electronic",
    summary: "",
    page: 30,
  },
  {
    slug: "neuroscience-of-learning",
    title: "学习中的脑神经科学",
    author: "李妍雅",
    disciplineSlug: "brain-neuroscience",
    summary: "",
    page: 31,
  },
  {
    slug: "connecting-virtual-and-reality",
    title: "连接虚拟与现实",
    author: "李妍雅",
    disciplineSlug: "brain-neuroscience",
    summary: "",
    page: 33,
  },
  {
    slug: "mind-uploading",
    title: "意识上传是否可行？",
    author: "林安诗、李妍雅",
    disciplineSlug: "brain-neuroscience",
    summary: "",
    page: 35,
  },
  {
    slug: "brown-dwarfs",
    title: "探寻褐矮星",
    author: "陈尚楷",
    disciplineSlug: "astronomy",
    summary: "",
    page: 38,
  },
  {
    slug: "astronomy-in-harry-potter",
    title: "《哈利波特》中的天文梗",
    author: "陈尚楷",
    disciplineSlug: "astronomy",
    summary: "",
    page: 40,
  },
  {
    slug: "stars-near-horizon",
    title: "地平线附近的星星都去哪了？",
    author: "陈尚楷",
    disciplineSlug: "astronomy",
    summary: "",
    page: 42,
  },
] as const satisfies readonly DirectoryArticle[];

const catalog2022 = [
  {
    slug: "star-colors",
    title: "为什么恒星有不同的颜色",
    author: "潘朵",
    disciplineSlug: "astronomy",
    summary:
      "天狼星是白色的，心宿二是红色的，老人星是黄色的……为什么恒星有不同的颜色？人们对夜空中闪烁着的不同颜色的恒星的认识，经历了一个漫长而深刻的过程。",
    page: 1,
  },
  {
    slug: "deep-space-asteroid-defense",
    title: "深空探测助力小行星防御",
    author: "潘朵",
    disciplineSlug: "astronomy",
    summary:
      "很多新闻很可能存在夸大和误传，往往还造成了不必要的恐慌。我们还是应该相信靠谱的新闻媒体，通过翔实、准确的数据去了解小行星撞击地球的风险。",
    page: 2,
  },
  {
    slug: "why-is-space-black",
    title: "为什么太空是黑的",
    author: "潘朵",
    disciplineSlug: "astronomy",
    summary:
      "太空的黑暗与宇宙的结构有什么关系呢？这要从牛顿的宇宙模型谈起。太空的黑暗说明牛顿的宇宙学说并不成立，而大爆炸宇宙学是更加合理的。",
    page: 3,
  },
  {
    slug: "iron-wire-oxygen-products",
    title: "为什么铁丝在充满氧气的广口瓶里燃烧的产物是 Fe₃O₄ 而不是 Fe₂O₃ 或 FeO?",
    author: "吴懿洋",
    disciplineSlug: "chemistry",
    summary:
      "初中化学一开始有一实验——铁丝在充满氧气的广口瓶里燃烧，火花四溅，激动人心。本文是利用大一化学水平的化学热力学基础知识对同时存在几个反应的系统进行分析的典型例子，具普遍意义。",
    page: 4,
  },
  {
    slug: "synthetic-starch",
    title: "人类终于开始和植物「抢生意」了",
    author: "黄洪悦、卢天宇",
    disciplineSlug: "chemistry",
    summary:
      "一条消息引爆了社交网络：中国科学家首次实现了用二氧化碳人工合成淀粉的重大实验成果。该成果目前尚处于实验室阶段，离实际应用还有相当长的距离。",
    page: 6,
  },
  {
    slug: "chemistry-behind-memes",
    title: "表情包背后的化学知识",
    author: "陈涵绅",
    disciplineSlug: "chemistry",
    summary:
      "学术表情包千千万，化学表情包独树一帜。怀着科普的精神，笔者就和大家聊聊化学表情包背后的化学原理。毕竟能从表情包里获得知识，多是一件美事啊。",
    page: 7,
  },
  {
    slug: "lucid-dream",
    title: "意识到自己在做梦",
    author: "林贲缘",
    disciplineSlug: "brain-neuroscience",
    summary:
      "事实表明，有许多人在他们一生中至少经历过一次意识到自己在做梦，我们称它为「清醒梦」。研究仍在继续，有些方法可以在家里尝试，但要小心，它们不一定有科学依据支撑。",
    page: 8,
  },
  {
    slug: "chronic-sleep-deprivation",
    title: "长期睡眠不足可不是一件小事",
    author: "林贲缘",
    disciplineSlug: "brain-neuroscience",
    summary:
      "如今的学生在繁重学业的压力下，熬夜成为常态，难以保证充足的睡眠。熬夜可能让时间充裕了，但长期压缩睡眠时间，对身体有极大的影响，其中对大脑的影响更是不可忽视的。",
    page: 9,
  },
  {
    slug: "exercise-your-brain",
    title: "你的大脑需要你锻炼一下",
    author: "林贲缘",
    disciplineSlug: "brain-neuroscience",
    summary:
      "研究人员宣布了一系列颠覆神经科学原则的发现。锻炼对人类的大脑有一定的积极影响，特别是随着年龄的增长，锻炼甚至可能有助于降低阿尔茨海默氏症和其他退行性疾病的风险。",
    page: 13,
  },
  {
    slug: "fuzhou-teacher-residence-distribution",
    title: "探究福州一中教师住址分布及其影响因素",
    author: "肖涵林、卢晨宁",
    disciplineSlug: "geography",
    summary:
      "本世纪初以来，不少中学、大学建设新校区，教师的居住问题成了新校区建设不可避免的问题。对于当今福州市「东进南扩」的发展战略，加强新区的基础设施建设，发展第三产业是必要之举。",
    page: 14,
  },
  {
    slug: "little-girl-big-energy",
    title: "「小女孩」有大能量：今年为什么这么热",
    author: "郭妍霏",
    disciplineSlug: "geography",
    summary:
      "相信今年大家定对「酷暑难耐」深有体会。笔者将从中间态入手解释厄尔尼诺，再讲本次高温的背后大佬拉尼娜，阐述其对西太副高的影响机制，并对未来三拉尼娜进行展望。",
    page: 16,
  },
  {
    slug: "tonga-volcano-eruption",
    title: "汤加火山爆发的威力到底有多大",
    author: "郭可豪",
    disciplineSlug: "geography",
    summary:
      "当地时间1月14日上午开始，位于汤加的洪阿哈阿帕伊岛发生火山喷发，这次事件被认为是最近30年来最大的一次火山爆发。据有关专家估计，这一次火山爆发的威力约等于1000颗原子弹同时爆炸。",
    page: 18,
  },
  {
    slug: "ice-avalanche",
    title: "冰崩：全球气候变暖的缩影",
    author: "卢晨宁",
    disciplineSlug: "geography",
    summary:
      "当今世界上几乎所有冰川几乎都在加速消融……冰崩，其实就是冰川消融的一个缩影。或许，大自然自有其残酷又美丽的规则，下至蜉蝣，上至苍穹，万事万物随着时间的绵延终究难逃消亡的命运。",
    page: 19,
  },
  {
    slug: "honeycomb-mystery",
    title: "蜂窝的奥秘",
    author: "唐琪越",
    disciplineSlug: "math",
    summary:
      "大自然是神奇的，奥秘无穷，蜂房的构造便是一个很好的例证。蜂房的底部并非正六棱柱，而是3个菱形拼成的。我们猜想：这样的翻折可以更省材料，让我们一同通过计算得到答案。",
    page: 23,
  },
  {
    slug: "yang-hui-triangle-to-stacking",
    title: "从杨辉三角到堆垛术",
    author: "唐琪越",
    disciplineSlug: "math",
    summary:
      "有杨辉三角出发，我们可以推出一些公式，由此我们就可以研究高阶等差级数的问题了，而高阶等差级数的一个重要应用就是「堆垛问题」。",
    page: 24,
  },
  {
    slug: "conic-sections-on-paper",
    title: "白纸上的圆锥曲线",
    author: "唐琪越",
    disciplineSlug: "math",
    summary:
      "可能很多人以为，折纸只能折出直线的图形，因为折痕是一条直线段。但其实，足够多的折痕，有时也能围出优美的曲线。椭圆、双曲线和抛物线均可由折纸得到。",
    page: 25,
  },
  {
    slug: "gyroscope-physics",
    title: "转 转 转：陀螺仪的物理学原理",
    author: "方心琳",
    disciplineSlug: "physics",
    summary:
      "旋转手机，屏幕上的画面随之旋转。为什么手机能「感知」到外界环境的变化？这就不得不提到现代日常生活、科学研究乃至国防军工领域都极为重要的仪器——陀螺仪了。",
    page: 26,
  },
  {
    slug: "f1-aerodynamics",
    title: "空气动力学及其在 F1 中的应用",
    author: "董彦涵",
    disciplineSlug: "physics",
    summary:
      "2022赛季 F1 锦标赛作为规则大改的第一年，赛车空气动力学设计成为了极为热门的话题。本次规则大改就是针对赛车空气动力学部件更改以减少下压力损失，制造精彩的镜头来吸引观众。",
    page: 31,
  },
  {
    slug: "laser-fusion",
    title: "激光核聚变：核以光之名",
    author: "林睿菲",
    disciplineSlug: "physics",
    summary:
      "激光核聚变装置是一个效果绚烂、运作高效，但是耗能大、材料要求高的反应装置。它可以在实验室内模拟核武器爆炸的物理过程及爆炸效应，为中华民族的伟大复兴提供强大动力。",
    page: 34,
  },
  {
    slug: "pid-control",
    title: "PID 控制算法入门",
    author: "黄天睿",
    disciplineSlug: "electronic",
    summary:
      "计算机代替人类完成各种工作从20世纪70年代开始并一直延续至现在。现代工厂中，计算机对机械的控制算法有80%是 PID 控制算法及其变种，本文就以一个故事简单说明一下 PID 控制的原理。",
    page: 36,
  },
  {
    slug: "https-primer",
    title: "HTTPS 技术浅析",
    author: "张舒腾",
    disciplineSlug: "electronic",
    summary:
      "HTTP 并没有考虑过传输的安全相关问题，于是 HTTPS 应运而生。常见的「证书错误」产生的原因是什么？HTTPS 协议又是如何保护我们的通信不被监听与篡改的？本文就来讨论一下网址前面的那把小锁。",
    page: 38,
  },
  {
    slug: "information-theory",
    title: "浅谈信息论",
    author: "郭志翔",
    disciplineSlug: "electronic",
    summary:
      "信息论是运用概率论与数理统计的方法研究信息、信息熵、通信系统、数据传输、密码学、数据压缩等问题的应用数学学科，十分实用。希望本文能让读者对于信息论有一个初步的认识。",
    page: 40,
  },
  {
    slug: "do-you-really-understand-exercise",
    title: "你真的了解运动吗",
    author: "林哲同",
    disciplineSlug: "biology",
    summary:
      "众所周知，生命在于运动。运动不仅让骨骼肌暴露在急性应激下增加了耐受性，还能诱导骨骼肌中的 NOX4 表达，从而促进活性氧介导的适应性反应和肌肉功能，维持氧化还原平衡。",
    page: 42,
  },
  {
    slug: "b-cell-cancer",
    title: "免疫 B 细胞癌变后怎么办",
    author: "周聿萱",
    disciplineSlug: "biology",
    summary:
      "淋巴细胞是免疫系统的基本成分，在体内分布很广。但是，当 B 细胞也罢工时会发生什么呢？弥漫大 B 细胞淋巴瘤正是 B 细胞癌变后的结果，这类淋巴瘤在临床病例中占了很大一部分。",
    page: 43,
  },
] as const satisfies readonly DirectoryArticle[];

const catalog2024 = [
  {
    slug: "beyond-the-planets",
    title: "太阳系的行星之外",
    author: "杨博涵",
    disciplineSlug: "astronomy",
    summary:
      "太阳系的边界究竟在哪？在八大行星之外，柯伊伯带、离散盘和奥尔特云环绕着太阳，数十亿颗小冰质星球构成了太阳系的边缘。",
    page: 1,
  },
  {
    slug: "celestial-bodies-on-scratch-paper",
    title: "写在草稿纸上的天体",
    author: "李铭宸",
    disciplineSlug: "astronomy",
    summary:
      "天文学的发展不仅需要借助望远镜，还有精密的科学计算。海王星、冥王星、小行星带的发现，揭示了天文学家们利用数学与数据追踪天体踪迹的历程。人类对宇宙的探索，始于星空，也超越星空。",
    page: 2,
  },
  {
    slug: "observing-the-universe-from-earth",
    title: "坐地观天：我们看到的究竟是个怎样的宇宙",
    author: "吴奕多",
    disciplineSlug: "astronomy",
    summary:
      "夜空中的星星离我们有多远？天球模型是理解宇宙的重要工具。天赤道、天极、天穹等概念，描绘出一个直观的宇宙。天球无法揭示宇宙的全部真相，但它为天文观测提供了清晰的框架。",
    page: 3,
  },
  {
    slug: "rubiks-cube-formulas",
    title: "魔方公式是怎么来的",
    author: "林博文、严楚宸",
    disciplineSlug: "math",
    summary:
      "群论、共轭和交换子的概念，揭示出魔方的旋转和变化规律。探索公式的推导，感受魔方世界的无限魅力，以及数学的深邃。",
    page: 5,
  },
  {
    slug: "english-cloze-guessing",
    title: "英语七选五如何自飘考分",
    author: "沈麟午",
    disciplineSlug: "math",
    summary:
      "七选五不会做也能骗分！本文详细计算三种蒙题策略下从全错到全对的概率，直观展示不同策略的风险与收益。想稳妥应对考试，还是豪赌冲刺满分？概率分析助你选择最优策略。",
    page: 8,
  },
  {
    slug: "random-is-not-random",
    title: "随机 ≠ 随机？",
    author: "林可燚",
    disciplineSlug: "math",
    summary:
      "「随机」是否真的随机？伯特兰悖论中令人困惑的随机性问题，揭示了概率论中无差别原则的局限。探究随机的本质，思考数学中的矛盾与反直觉现象，或许随机并非我们想象中的那样简单。",
    page: 10,
  },
  {
    slug: "hilberts-hotel-infinity",
    title: "从希尔伯特的旅馆到有趣的无穷世界",
    author: "周可桓",
    disciplineSlug: "math",
    summary:
      "希尔伯特的旅馆拥有无限多的房间，来客再多也能安排。无限世界中，自然数、整数、有理数间的关系展现出奇妙的奥秘。无限集合的悖论，为数学世界带来颠覆性的思考和探索。",
    page: 13,
  },
  {
    slug: "history-of-weather-forecasting",
    title: "天气预报小史",
    author: "肖涵林",
    disciplineSlug: "geography",
    summary:
      "天气预报的发展历程反映了科技的进步。从古人根据经验制定历法，到现代气象学引入热力学与流体力学，再到气象卫星与数值预报，天气预报不断改进，成为我们日常生活的重要工具。",
    page: 14,
  },
  {
    slug: "yantai-hill-urban-renewal",
    title: "旧城新改，烟山再生",
    author: "张佑嘉",
    disciplineSlug: "geography",
    summary:
      "烟台山周边现代化的推进与传统风貌的保留，在城市复兴中显得尤为重要。历史街区的改造如何平衡古老城市风貌与现代发展？",
    page: 15,
  },
  {
    slug: "wildfire-response",
    title: "山火肆虐，如何破局？",
    author: "张佑嘉",
    disciplineSlug: "geography",
    summary:
      "山火为何难以扑灭？贵州山火引发了人们对山火救灾的反思。在科技助力下，借助从电磁炮灭火系统到消防无人机，探讨科技破局山火的新型救灾体系，构建更高效的山火防控策略。",
    page: 19,
  },
  {
    slug: "falling-cat-problem",
    title: "落猫问题：角动量守恒定律的至高运用",
    author: "林泓",
    disciplineSlug: "physics",
    summary:
      "角动量守恒在猫身上得到了完美运用。猫的两部分身体能独立协调完成姿态调整，展现自然界中存在的灵活与平衡的科学原理。",
    page: 22,
  },
  {
    slug: "describing-electricity",
    title: "我描述电学，真的假的？",
    author: "林泓、陈冠中",
    disciplineSlug: "physics",
    summary:
      "电学问题总是令人头疼？不妨尝试将力学与电学进行类比，构建一个更直观的模型，或许能带来别样的学习体验。",
    page: 23,
  },
  {
    slug: "ac-circuits",
    title: "交流电路",
    author: "陈冠中",
    disciplineSlug: "physics",
    summary:
      "电动势随时间周期变化，就能形成简谐交流电。如果我们用复数表示法呈现出电压、电流的频率、峰值、相位等特征，或许能感受到课本外的交流电路，深入了解电阻、复阻抗、复导纳，感受其中的科学之美。",
    page: 26,
  },
  {
    slug: "muon-imaging",
    title: "缪子成像",
    author: "许睿哲",
    disciplineSlug: "physics",
    summary:
      "μ子成像技术近年来发展迅速，利用 μ 子穿透物质的能力，可以获取物质内部的密度分布。未来，技术装备和反演算法的改进将进一步拓展 μ 子成像的应用范围。",
    page: 29,
  },
  {
    slug: "multisensor-information-fusion",
    title: "多传感器信息融合（MSIFS）让机器像侦探一样思考",
    author: "许睿哲",
    disciplineSlug: "engineering",
    summary:
      "多传感器信息融合技术整合多源数据，集中、分布、混合式三大结构各具优势。通过预处理与降维，简化数据复杂性，为自动驾驶、智慧家居等应用提供支持，展现智能化发展的潜力。",
    page: 31,
  },
  {
    slug: "halting-problem",
    title: "停还是不停，这是个问题",
    author: "陈昊",
    disciplineSlug: "engineering",
    summary:
      "图灵机能预见自己的命运吗？本文以图灵机的构造为引，探究停机问题的不可判定性，揭示了人类思维中无限追问的困境。停与不停之间，正是计算机科学和哲学相交的迷人地带。",
    page: 33,
  },
  {
    slug: "mountain-bike-suspension",
    title: "全地形山地车避震结构浅谈",
    author: "赵若愚",
    disciplineSlug: "engineering",
    summary:
      "独特的避震结构与机械连杆技术，使山地车能过滤绝大部分地面震动。探究避震器的内部设计、阻尼调节与车架结构的选择，了解全地形山地车的设计奥秘。",
    page: 35,
  },
  {
    slug: "fpv-pid-tuning",
    title: "浅谈 PID 穿越机调参的理论",
    author: "陈禹赫",
    disciplineSlug: "engineering",
    summary:
      "“PID”是什么？在穿越机的调参中，比例、微分和积分共同构成了控制算法的基础。本文以穿越机为例，详细讲解了“PID”的原理及调参方法，揭示了在实际应用中的操作要点。",
    page: 38,
  },
  {
    slug: "coffee-and-reading",
    title: "从科学角度看「读书万卷 咖啡千杯」",
    author: "林子祺",
    disciplineSlug: "biology",
    summary:
      "喝咖啡真能提神吗？咖啡因通过抑制腺苷，暂时提高肾上腺素水平，助力燃脂。适量摄入咖啡能发挥益处，但过量可能引发头晕、失眠等问题。健康饮用咖啡的方法，正是利用其功效的关键。",
    page: 39,
  },
  {
    slug: "blue-race-hoax",
    title: "蓝色人种的骗局",
    author: "苏晴",
    disciplineSlug: "biology",
    summary:
      "蓝色人种是否真的存在？智利奥坎基尔族、欧洲蓝血贵族、福盖特家族的蓝皮肤之谜，到底是人为炒作，还是另有原因？蓝色人种的传说背后，隐藏着科学和医学的真实解答。",
    page: 40,
  },
  {
    slug: "internet-addiction",
    title: "为什么我会沉迷于网络",
    author: "王梓旭",
    disciplineSlug: "biology",
    summary:
      "你是否曾经一边刷手机，一边对自己说“再刷一会儿”？多巴胺是让你沉迷网络的幕后黑手。本文揭示多巴胺的奖励机制及其导致的网络依赖，并探讨如何通过内啡肽来平衡，让生活回归健康节奏。",
    page: 41,
  },
  {
    slug: "electrons-as-anions",
    title: "最小的「阴离子」：电子",
    author: "曾上嘉",
    disciplineSlug: "chemistry",
    summary:
      "电子盐带来了独特的化学性质，展现零维到二维电子的自由度与稳定性之间的平衡。Na₂He 等奇特化合物中的电子，以一种全新的方式存在，揭示化学世界中的非凡与未知。",
    page: 42,
  },
  {
    slug: "upper-limit-of-valence",
    title: "化合价的上限",
    author: "曾上嘉",
    disciplineSlug: "chemistry",
    summary:
      "化合价最高能达到多少？+8 价锇、+9 价铱等元素的发现，挑战了化学常识，引发对化合价边界的深入思考。化学世界的未知领域正等待进一步探索，揭示化合价的真正极限。",
    page: 43,
  },
  {
    slug: "how-many-hydroxyl-groups-on-carbon",
    title: "碳上能连几个羟基？",
    author: "曾上嘉",
    disciplineSlug: "chemistry",
    summary:
      "一个碳原子只能连一个羟基？事实并非如此。水合醋三酮、二水合十二羟基环己烷，以及最新制得的甲三醇，打破了传统认知。化学规律并非绝对，科学探索始终在推陈出新。",
    page: 44,
  },
] as const satisfies readonly DirectoryArticle[];

const catalog2023 = [
  {
    slug: "stellar-fireworks",
    title: "恒星送别的「烟花秀」",
    author: "林毅豪",
    disciplineSlug: "astronomy",
    summary: "恒星生命尽头的绽放",
    page: 1,
  },
  {
    slug: "what-does-space-smell-like",
    title: "太空间起来什么味儿",
    author: "张健熙",
    disciplineSlug: "astronomy",
    summary: "",
    page: 3,
  },
  {
    slug: "solar-system-origins",
    title: "太阳系是怎么变成今天这样的",
    author: "张其锴",
    disciplineSlug: "astronomy",
    summary: "太阳系的前世今生",
    page: 4,
  },
  {
    slug: "derivatives-to-taylor",
    title: "从求导到泰勒公式",
    author: "雷锐",
    disciplineSlug: "math",
    summary: "",
    page: 6,
  },
  {
    slug: "english-cloze-guessing",
    title: "英语七选五如何自飘考分",
    author: "刘书扬",
    disciplineSlug: "math",
    summary: "从概率角度出发探究考试技巧",
    page: 7,
  },
  {
    slug: "crow-and-hexagonal-packing",
    title: "从乌鸦喝水到六方最密堆积",
    author: "宋鸿冰",
    disciplineSlug: "math",
    summary: "高利用率堆积方式的理想化运用",
    page: 9,
  },
  {
    slug: "puroganga-ri-global-warming",
    title: "全球变暖中的普若岗日",
    author: "余悦",
    disciplineSlug: "geography",
    summary: "看全球变暖下的世界第三大冰川",
    page: 10,
  },
  {
    slug: "yushan-island-entrepreneurship",
    title: "嵛山岛自主创业品质提升策略研究",
    author: "朱植祺、黄雅茹、陈奕阳、蒋雨哲、刘力文、赵子雍",
    disciplineSlug: "geography",
    summary:
      "联合团队实地探访中国十大最美岛屿之一的嵛山岛，走访调查提出产业优化升级策略",
    page: 12,
  },
  {
    slug: "particle-engine",
    title: "超强的“粒子引擎”",
    author: "卞宸淇",
    disciplineSlug: "physics",
    summary: "深入了解粒子加速器这一粒子引擎的发展、作用、结构以及应用",
    page: 24,
  },
  {
    slug: "superconductivity-principles-value",
    title: "超导的原理与价值",
    author: "郭鸿瑞",
    disciplineSlug: "physics",
    summary: "什么是超导体？超导材料要怎样才能找到？室温超导的价值又是什么？",
    page: 28,
  },
  {
    slug: "linear-regression-model",
    title: "线性回归模型的简单演绎",
    author: "池明锐",
    disciplineSlug: "electronic",
    summary: "通俗讲解入门机器学习",
    page: 31,
  },
  {
    slug: "how-memory-stores-data",
    title: "内存是怎么存储数据的？",
    author: "高林熙",
    disciplineSlug: "electronic",
    summary: "硬件角度认识内存工作原理",
    page: 34,
  },
  {
    slug: "memory-garbage-collection",
    title: "简单谈谈内存回收原理",
    author: "王凯诺",
    disciplineSlug: "electronic",
    summary: "认识内存回收机制",
    page: 35,
  },
  {
    slug: "about-cancer",
    title: "说说“癌症”",
    author: "王靖韬",
    disciplineSlug: "biology",
    summary: "癌的产生及治疗方法的发展",
    page: 37,
  },
  {
    slug: "late-night-study-research",
    title: "关于熬夜对高中生群体学习生活质量影响的研究",
    author: "陈祺涵",
    disciplineSlug: "biology",
    summary: "统计调查反应熬夜群体现状；你还在熬夜内卷吗？",
    page: 39,
  },
  {
    slug: "sturgeon-egg-crab",
    title: "鲟卵蟹",
    author: "姚苏杭",
    disciplineSlug: "biology",
    summary: "地球上最诡异的动物——癌细胞“成精”？",
    page: 43,
  },
  {
    slug: "perucetus-colossus",
    title: "巨像秘鲁鲸",
    author: "姚苏杭",
    disciplineSlug: "biology",
    summary: "今年古生物学最大发现，或将超越蓝鲸成为有史以来最大动物",
    page: 45,
  },
  {
    slug: "carbon-dioxide-fixation",
    title: "CO2 固定：不止于淀粉",
    author: "刘辰盾",
    disciplineSlug: "chemistry",
    summary: "",
    page: 48,
  },
  {
    slug: "acid-base-theory",
    title: "酸碱理论 – 从狭义到广义",
    author: "余抒锐",
    disciplineSlug: "chemistry",
    summary: "带你看人类是如何由浅到深认识酸碱的",
    page: 49,
  },
  {
    slug: "will-ai-replace-humans",
    title: "人工智能是否会取代人类？",
    author: "张铭宸、黄逸竹",
    disciplineSlug: "brain-neuroscience",
    summary: "从不同的角度看 AI 风波",
    page: 51,
  },
  {
    slug: "brief-history-of-brain-neuroscience",
    title: "大脑神经科学简史",
    author: "张铭宸、黄逸竹",
    disciplineSlug: "brain-neuroscience",
    summary: "从古至今人类研究世界最复杂的结构之一的大脑的关键节点",
    page: 53,
  },
  {
    slug: "neuroscience-and-philosophy",
    title: "脑神经科学与哲学的不解之缘",
    author: "张铭宸、黄逸竹",
    disciplineSlug: "brain-neuroscience",
    summary: "意识、脑、生命的定义与争议、自由意志、灵魂的本质，探秘哲学与科学的交融。",
    page: 55,
  },
] as const satisfies readonly DirectoryArticle[];

const annualCatalogs: Partial<Record<number, AnnualCatalog>> = {
  2021: {
    sourceYear: 2021,
    source: catalogScanSource(2021, "5"),
    entries: catalog2021,
  },
  2022: {
    sourceYear: 2022,
    source: catalog2022Source,
    entries: catalog2022,
  },
  2023: {
    sourceYear: 2023,
    source: catalogScanSource(2023, "2–3"),
    entries: catalog2023,
  },
  2024: {
    sourceYear: 2024,
    source: catalogScanSource(2024, "1"),
    entries: catalog2024,
  },
  2026: {
    sourceYear: 2026,
    source: catalog2026Source,
    entries: catalog2026,
  },
  2025: {
    sourceYear: 2025,
    source: catalog2025Source,
    entries: suppliedCatalog2025,
  },
};

const catalogForYear = (year: number): AnnualCatalog => {
  const catalog = annualCatalogs[year];
  if (!catalog) throw new Error(`Missing annual catalog for ${year}`);
  return catalog;
};

/** Each annual issue uses its own source catalog; 2026 pagination is provisional. */
export const articles = [...issues]
  .reverse()
  .flatMap((issue) => {
    const catalog = catalogForYear(issue.year);
    return catalog.entries.map((entry) =>
      directoryArticle(entry, issue.year, issue.number, catalog),
    );
  }) satisfies readonly Article[];
