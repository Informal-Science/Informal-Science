import type { Article, SourceReference } from "./types";

export const catalog2026Source = {
  repository: "Informal-Science-2026",
  path: "Beta-Version/《非正式科学》2026年刊 Beta-B-2.pdf",
  locator: "目录（PDF 第 5–6 页）"
} as const satisfies SourceReference;

/** Beta-B-2 catalog; page numbers remain 1 until the final pagination is approved. */
export const catalog2026 = [
  {
    slug: "wukong-dark-matter",
    title: "“悟空”号：大圣在宇宙有工作的天",
    author: "林以祺",
    disciplineSlug: "astronomy",
    summary: "面对几乎无法观测的暗物质，大圣如何用“火眼金睛”令它“现出原形”？",
    page: 1
  },
  {
    slug: "black-hole-event-horizon",
    title: "快跑！不然就跑不掉了！",
    author: "卓乐晨",
    disciplineSlug: "astronomy",
    summary: "以瀑布类比事件视界，从恒星坍缩、奇点形成再到史瓦西半径的由来，剖析内外视角与信息囚笼，并展望人类科学的未来。",
    page: 1
  },
  {
    slug: "mercury-retrograde",
    title: "水星“倒退”之谜",
    author: "张泽方",
    disciplineSlug: "astronomy",
    summary: "水星会“逆行”？从本轮均轮的千年误读，到日心说“追及相遇”的真相，带你揭开行星“逆行”之谜。",
    page: 1
  },
  {
    slug: "big-dipper",
    title: "考前该拜哪颗星？——北斗七星趣谈",
    author: "郑思远、黄潇",
    disciplineSlug: "astronomy",
    summary: "重点介绍北斗七星中“文曲星”天权、 六聚星开阳；分光双星的概念及测定方法，以及三角视差法。",
    page: 1
  },
  {
    slug: "pizza-theorem",
    title: "披萨中的数学：歪着切也能平分吗？",
    author: "魏葳",
    disciplineSlug: "math",
    summary: "通过切披萨时的常见窘境，引出披萨定理的奇妙结论，面积平分中揭示几何直观与生活智慧的有趣碰撞。",
    page: 1
  },
  {
    slug: "kakeya-conjecture",
    title: "一名剑士的生存考验——挂谷猜想",
    author: "杨正玺",
    disciplineSlug: "math",
    summary: "关于一名剑士的“生存问题”，探索有关几何直觉与数学客观事实的不同之处。",
    page: 1
  },
  {
    slug: "rubiks-cube-group-theory",
    title: "魔方奥秘：转动间藏着群论的法则",
    author: "薛若羲",
    disciplineSlug: "math",
    summary: "魔方不仅是益智玩具，其复原逻辑与十九世纪伽罗瓦创立的群论有着深刻联系。“加法”“钟表”等日常概念作为解释群论的基本规则，揭示群论如何用寥寥数行定义描述数量庞大的魔方状态。",
    page: 1
  },
  {
    slug: "differential-privacy",
    title: "差分隐私：隐私保护的对抗演化",
    author: "张景涵",
    disciplineSlug: "math",
    summary: "本文以攻防博弈视角，解释差分隐私如何用数学噪声在保护个体隐私的同时保留数据统计价值。",
    page: 1
  },
  {
    slug: "dome-a-kunlun-station",
    title: "南极：冰穹之巅的足迹——南极冰穹 A 及昆仑站背后的地理因素",
    author: "姜弘毅、林云喆",
    disciplineSlug: "geography",
    summary: "探究冰穹 A 与昆仑站建立背后蕴藏在气候与地质中的地理因素。",
    page: 1
  },
  {
    slug: "el-nino-global-climate",
    title: "圣婴降临：厄尔尼诺如何撬动全球气候",
    author: "孙卓尔",
    disciplineSlug: "geography",
    summary: "探究与介绍厄尔尼诺现象的形成过程及影响。",
    page: 1
  },
  {
    slug: "sahara-greening",
    title: "撒哈拉：在暴雨倾沙中“复绿”？",
    author: "林渝深",
    disciplineSlug: "geography",
    summary: "撒哈拉：在暴雨倾沙中“复绿”？——藏在雨水绿化背后的气候真相。",
    page: 1
  },
  {
    slug: "xian-luoyang-geography",
    title: "西安、洛阳：十三朝古都背后的地理因素",
    author: "黄炜桐",
    disciplineSlug: "geography",
    summary: "探究西安与洛阳成为十三朝古都背后所蕴含在地势与河流之中的地理原因。",
    page: 1
  },
  {
    slug: "relativity-and-spacetime",
    title: "相对论与时空",
    author: "严臻彦",
    disciplineSlug: "physics",
    summary: "相关物理学史与实验简介。",
    page: 1
  },
  {
    slug: "straw-buckling-double-avalanche",
    title: "为什么空吸管一戳就折——从欧拉临界力到双重雪崩",
    author: "吴禄成",
    disciplineSlug: "physics",
    summary: "从欧拉临界力出发，追踪一根吸管弯折的动态过程——越过静态失稳，来看一场由力臂放大和截面扁塌共同驱动的双重雪崩。",
    page: 1
  },
  {
    slug: "straw-buckling-geometric-leverage",
    title: "为什么空吸管一戳就折——被几何杠杆放大的微小变化",
    author: "吴禄成",
    disciplineSlug: "physics",
    summary: "微小气压变化结合一个万倍放大杠杆，就能够遏制弯折的“雪崩”。",
    page: 1
  },
  {
    slug: "analytical-mechanics",
    title: "我不想做受力分析！——从矢量力学到分析力学",
    author: "林泓",
    disciplineSlug: "physics",
    summary: "分析力学隶属于四大力学，以变分，泛函分析为基础研究动力学问题，以最小作用量原理作为第一性原理。",
    page: 1
  },
  {
    slug: "cpp-disassembly",
    title: "对话人与计算机底层——C++ 反汇编",
    author: "吴懿桐",
    disciplineSlug: "engineering",
    summary: "涉及 C++ 反汇编技术的概念定义、工具链配置及 x86 汇编指令解析等内容，旨在普及计算机底层运行机制，阐明该技术在安全分析与实际运用中的核心价值。",
    page: 1
  },
  {
    slug: "inside-a-large-language-model",
    title: "DeepSeek 和 ChatGPT 到底怎么「想」的？深入拆解一个大语言模型",
    author: "吴昊哲、张子正",
    disciplineSlug: "engineering",
    summary: "用一张张图拆解 MiniMind 这个 0.1B 参数的小型 LLM，看清 DeepSeek 与 ChatGPT “思考”背后的流水线。",
    page: 1
  },
  {
    slug: "generative-ai",
    title: "为什么 AI 能够像人类一样创作？——生成式 AI 的过去、现在与未来",
    author: "曹桓源",
    disciplineSlug: "engineering",
    summary: "介绍生成式 AI 诞生的背景与未来发展，解析语言模型和扩散模型的基本运行原理。",
    page: 1
  },
  {
    slug: "niallia-tiangongensis",
    title: "天外来物？天宫尼尔菌的发现",
    author: "黄炜桐",
    disciplineSlug: "biology",
    summary: "叙述天宫尼尔菌的发现历程，分析天宫尼尔菌为新物种的依据以及天宫尼尔菌在空间生存的独特适应机制。",
    page: 1
  },
  {
    slug: "lightning-ecology",
    title: "闪电生态学：万象天引，劈死邻居",
    author: "陈宽",
    disciplineSlug: "biology",
    summary: "分析生命如何在看似险象环生的雷击中除掉竞争对手获取利益。",
    page: 1
  },
  {
    slug: "hybrid-rice",
    title: "方寸稻田里的遗传密码：杂交水稻原理简析",
    author: "黄炜桐",
    disciplineSlug: "biology",
    summary: "百万粉丝的农业博主造谣诋毁杂交水稻，以此事件引入，简单介绍杂交水稻雄性不育、三系法、两系法、一系法等相关概念，强化生物素养。",
    page: 1
  },
  {
    slug: "toxins-and-mechanisms",
    title: "毒素使用指北：知名毒药与毒素机制赏析",
    author: "唐元昊",
    disciplineSlug: "biology",
    summary: "对历史与生活中知名毒素与作用机理进行简单介绍并由此为切入口介绍生理学与细胞生物学内容，提供简单的中毒症状判断，普及生物学知识。",
    page: 1
  },
  {
    slug: "cockroach-endosymbiosis",
    title: "内共生如何造就不死般的生灵",
    author: "郭烨",
    disciplineSlug: "biology",
    summary: "综述蟑螂与蜚蠊杆菌内共生体系在代谢互作、垂直传递及基因水平转移方面的机制，为理解昆虫-微生物共生体系的演化适应提供了一种范例。",
    page: 1
  },
  {
    slug: "ammonite-shells",
    title: "菊石是如何被“掰弯”的？",
    author: "李嘉怡、林雨嘉",
    disciplineSlug: "biology",
    summary: "菊石的相关介绍以及其外壳形态变化的原因",
    page: 1
  },
  {
    slug: "utricularia",
    title: "狸藻：无根无叶的食虫植物",
    author: "林予晟",
    disciplineSlug: "biology",
    summary: "了解狸藻特殊而精妙的形态结构，捕虫机理，和其演化历程，以及如何成功地养一盆狸藻。",
    page: 1
  },
  {
    slug: "chinese-biological-names",
    title: "关于生物的中文正式名",
    author: "黄敬之",
    disciplineSlug: "biology",
    summary: "前言，作者简介，面临的问题，怎样使用中文正名，中文正名的拟定",
    page: 1
  },
  {
    slug: "molecular-shapes",
    title: "从“躺平”的孤对电子到“叛逆”的杂化：分子形状变形记",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary: "VSEPR 与杂化轨道理论能解释简单分子构型，却在面对高周期元素、过渡金属时频频失效。本文从孤对电子排斥、p 轨道“杂化缺陷”到配位多面体的丰富花样，带你一览那些教科书之外的“叛逆”分子形状",
    page: 1
  },
  {
    slug: "chemical-chains",
    title: "一根线的千面人生：从 CO₂ 到独居石的长链狂想曲",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary: "直线型结构，远不止 CO₂ 那么简单。从有机聚合物到无机配位链，从八面体共顶、共棱到晶体中的螺旋链与多面体长链，本文带你沿“线”而行，看化学结构如何用一维搭建出无穷花样。",
    page: 1
  },
  {
    slug: "chemical-triangles",
    title: "三角即宇宙：从 BF₃ 到 Cu₁₄₆Se₇₃ 的超三角形狂想",
    author: "江启深",
    disciplineSlug: "chemistry",
    summary: "三角形，化学中最简也最不简单的形状。从 BF₃、SO₃ 到硼酸盐晶体，从羰基簇合物的金属三角到纳米尺度的 Cu₁₄₆Se₇₃ 超三角形，本文带你遍历平面三角形结构的从“小”到“大”，看一个三边形如何撑起化学的半壁江山。",
    page: 1
  }
] as const satisfies readonly (Pick<Article, "title" | "author" | "disciplineSlug" | "summary" | "page"> & { slug: string })[];
