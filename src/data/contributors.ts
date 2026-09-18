import type { Contributor } from "./types";
import { catalog2026Source } from "./catalog2026";

type ContributorEntry = Omit<Contributor, "reviewNeeded" | "reviewStatus" | "reviewNotes" | "source"> & {
  source?: Contributor["source"];
};

const entries = [
  {
    id: "publisher-bsca",
    kind: "organization",
    name: "福州第一中学基础科学社团联盟",
    englishName: "Basic Science Club Alliance of Fuzhou NO.1 High School",
    role: "publisher"
  },
  {
    id: "org-fz1-astronomy",
    kind: "organization",
    name: "福州第一中学天文社",
    englishName: "Astronomy Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-mathematics",
    kind: "organization",
    name: "福州第一中学数学社",
    englishName: "Mathematics Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-geography",
    kind: "organization",
    name: "福州第一中学青藤地理社",
    englishName: "Ivy Geography Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-physics",
    kind: "organization",
    name: "福州第一中学物理社",
    englishName: "Physics Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-7hmakers",
    kind: "organization",
    name: "福州第一中学创客七户社",
    englishName: "7hMakers Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-biology",
    kind: "organization",
    name: "福州第一中学生物社",
    englishName: "Biology Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz1-chemistry",
    kind: "organization",
    name: "福州第一中学化学社",
    englishName: "Chemistry Club of Fuzhou NO.1 High School",
    role: "contributing-organization"
  },
  {
    id: "org-gezhi-astronomy",
    kind: "organization",
    name: "福州格致天文社",
    englishName: "Fuzhou Gezhi Astronomical Society",
    role: "contributing-organization"
  },
  {
    id: "org-fz2-mathematics",
    kind: "organization",
    name: "福州第二中学数学社",
    englishName: "Mathematics Club of Fuzhou NO.2 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz8-oi",
    kind: "organization",
    name: "福州第八中学 OI 社",
    englishName: "OI Club of Fuzhou NO.8 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz2-geography",
    kind: "organization",
    name: "福州第二中学沧海地理社",
    englishName: "Canghai Geography Club of Fuzhou NO.2 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz2-multimind",
    kind: "organization",
    name: "福州第二中学 Multimind 科技社",
    englishName: "Multimind Technology Club of Fuzhou NO.2 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz3-biology",
    kind: "organization",
    name: "福州第三中学生物社",
    englishName: "Biology Club of Fuzhou NO.3 High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz3-biology-competition",
    kind: "organization",
    name: "福州第三中学生物竞赛组",
    englishName: "Biology Competition Team of Fuzhou NO.3 High School",
    role: "contributing-organization"
  },
  {
    id: "org-senior-nature",
    kind: "organization",
    name: "福州高级中学自然社",
    englishName: "Nature Club of Fuzhou Senior High School",
    role: "contributing-organization"
  },
  {
    id: "org-fz2-biology",
    kind: "organization",
    name: "福州第二中学翎鸢生物社",
    englishName: "Lingyuan Biology Club of Fuzhou NO.2 High School",
    role: "contributing-organization"
  },
  {
    id: "person-chen-yixuan-chief-editor",
    kind: "person",
    name: "陈逸轩",
    role: "chief-editor",
    affiliation: "福州一中化学社"
  },
  {
    id: "author-01",
    kind: "person",
    name: "林以祺",
    role: "contributing-author",
    affiliation: "福州一中天文社"
  },
  {
    id: "author-02",
    kind: "person",
    name: "卓乐晨",
    role: "contributing-author",
    affiliation: "福州一中天文社"
  },
  {
    id: "author-03",
    kind: "person",
    name: "张泽方",
    role: "contributing-author",
    affiliation: "福州一中天文社"
  },
  {
    id: "author-04",
    kind: "person",
    name: "魏葳",
    role: "contributing-author",
    affiliation: "福州一中数学社"
  },
  {
    id: "author-05",
    kind: "person",
    name: "杨正玺",
    role: "contributing-author",
    affiliation: "福州一中数学社"
  },
  {
    id: "author-06",
    kind: "person",
    name: "孙卓尔",
    role: "contributing-author",
    affiliation: "福州一中青藤地理社"
  },
  {
    id: "author-07",
    kind: "person",
    name: "林渝深",
    role: "contributing-author",
    affiliation: "福州一中青藤地理社"
  },
  {
    id: "author-08",
    kind: "person",
    name: "黄炜桐",
    role: "contributing-author",
    affiliation: "福州一中青藤地理社、福州一中生物社"
  },
  {
    id: "author-09",
    kind: "person",
    name: "严臻彦",
    role: "contributing-author",
    affiliation: "福州一中物理社"
  },
  {
    id: "author-10",
    kind: "person",
    name: "吴禄成",
    role: "contributing-author",
    affiliation: "福州一中物理社"
  },
  {
    id: "author-11",
    kind: "person",
    name: "吴懿桐",
    role: "contributing-author",
    affiliation: "福州一中创客七户社"
  },
  {
    id: "author-12",
    kind: "person",
    name: "曹桓源",
    role: "contributing-author",
    affiliation: "福州一中创客七户社"
  },
  {
    id: "author-13",
    kind: "person",
    name: "唐元昊",
    role: "contributing-author",
    affiliation: "福州一中生物社"
  },
  {
    id: "author-14",
    kind: "person",
    name: "林予晟",
    role: "contributing-author",
    affiliation: "福州一中生物社"
  },
  {
    id: "author-15",
    kind: "person",
    name: "江启深",
    role: "contributing-author",
    affiliation: "福州一中化学社"
  },
  {
    id: "author-16",
    kind: "person",
    name: "郑思远",
    role: "contributing-author",
    affiliation: "福州格致天文社"
  },
  {
    id: "author-17",
    kind: "person",
    name: "黄潇",
    role: "contributing-author",
    affiliation: "福州格致天文社"
  },
  {
    id: "author-18",
    kind: "person",
    name: "薛若羲",
    role: "contributing-author",
    affiliation: "福州二中数学社"
  },
  {
    id: "author-19",
    kind: "person",
    name: "张景涵",
    role: "contributing-author",
    affiliation: "福州八中 OI 社"
  },
  {
    id: "author-20",
    kind: "person",
    name: "姜弘毅",
    role: "contributing-author",
    affiliation: "福州二中沧海地理社"
  },
  {
    id: "author-21",
    kind: "person",
    name: "林云喆",
    role: "contributing-author",
    affiliation: "福州二中沧海地理社"
  },
  {
    id: "author-22",
    kind: "person",
    name: "林泓",
    role: "contributing-author",
    affiliation: "原福州一中物理社"
  },
  {
    id: "author-23",
    kind: "person",
    name: "吴昊哲",
    role: "contributing-author",
    affiliation: "福州二中 Multimind 科技社"
  },
  {
    id: "author-24",
    kind: "person",
    name: "张子正",
    role: "contributing-author",
    affiliation: "福州二中 Multimind 科技社"
  },
  {
    id: "author-25",
    kind: "person",
    name: "陈宽",
    role: "contributing-author",
    affiliation: "福州三中生物社"
  },
  {
    id: "author-26",
    kind: "person",
    name: "郭烨",
    role: "contributing-author",
    affiliation: "福州三中生物竞赛组"
  },
  {
    id: "author-27",
    kind: "person",
    name: "李嘉怡",
    role: "contributing-author",
    affiliation: "福州高级中学自然社"
  },
  {
    id: "author-28",
    kind: "person",
    name: "林雨嘉",
    role: "contributing-author",
    affiliation: "福州高级中学自然社"
  },
  {
    id: "author-29",
    kind: "person",
    name: "黄敬之",
    role: "contributing-author",
    affiliation: "福州二中翎鸢生物社"
  },
  {
    id: "person-chen-guanzhong-visual",
    kind: "person",
    name: "陈冠中",
    role: "visual-designer",
    affiliation: "福州一中物理社"
  },
  {
    id: "person-shen-linwu-visual",
    kind: "person",
    name: "沈麟午",
    role: "visual-designer",
    affiliation: "福州一中数学社"
  },
  {
    id: "person-cao-huanyuan-visual",
    kind: "person",
    name: "曹桓源",
    role: "visual-designer",
    affiliation: "福州一中创客七户社"
  },
  {
    id: "person-chen-zhengyi-cover",
    kind: "person",
    name: "陈正一",
    role: "cover-designer",
    affiliation: "福州一中摄影社"
  },
  {
    id: "person-chen-yixuan-afterword",
    kind: "person",
    name: "陈逸轩",
    role: "afterword-author",
    source: [
      {
        repository: "Informal-Science-2026",
        path: "Beta-Version/《非正式科学》2026年刊 Beta-B-2.pdf",
        locator: "后记（PDF 第 89 页），署名与日期"
      }
    ]
  }
] satisfies readonly ContributorEntry[];

export const contributors: readonly Contributor[] = entries.map((entry) => ({
  ...entry,
  source: entry.source ?? [{ ...catalog2026Source, locator: "版权与制作团队（PDF 第 4 页）" }],
  reviewNeeded: false,
  reviewStatus: "verified-from-source",
  reviewNotes: [],
}));
