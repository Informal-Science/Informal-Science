import type { Contributor } from "./types";

type ContributorEntry = Omit<
  Contributor,
  "reviewNeeded" | "reviewStatus" | "reviewNotes" | "source"
> & {
  source?: Contributor["source"];
};

const authorSource = {
  repository: "Informal-Science-2026",
  path: "Resources/Author/Author.tex",
  locator: "credits and contributor declarations",
} as const;

const afterwordSource = {
  repository: "Informal-Science-2026",
  path: "Resources/Afterword/Afterword.tex",
  locator: "afterword signature and first-person role description",
} as const;

const verified = (entry: ContributorEntry): Contributor => ({
  ...entry,
  source: entry.source ?? [authorSource],
  reviewNeeded: false,
  reviewStatus: "verified-from-source",
  reviewNotes: [],
});

const needsReview = (
  entry: ContributorEntry,
  ...reviewNotes: readonly string[]
): Contributor => ({
  ...entry,
  source: entry.source ?? [authorSource],
  reviewNeeded: true,
  reviewStatus: "review-needed",
  reviewNotes,
});

const duplicateCredit = (name: string) =>
  name +
  "以相同姓名和单位在 Author.tex 的供稿人员列表中重复出现；此处已合并，正式发布前需核对是否为误录。";

export const contributors = [
  verified({
    id: "publisher-bsca",
    kind: "organization",
    name: "福州一中基础科学社团联盟",
    role: "publisher",
  }),
  verified({
    id: "org-fz1-astronomy",
    kind: "organization",
    name: "福州第一中学 天文社",
    englishName: "Astronomy Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-mathematics",
    kind: "organization",
    name: "福州第一中学 数学社",
    englishName: "Math Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-geography",
    kind: "organization",
    name: "福州第一中学 青藤地理社",
    englishName: "Ivy Geography Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-physics",
    kind: "organization",
    name: "福州第一中学 物理社",
    englishName: "Physics Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-7hmakers",
    kind: "organization",
    name: "福州第一中学 创客七户社",
    englishName: "7hMakers Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-biology",
    kind: "organization",
    name: "福州第一中学 生物社",
    englishName: "Biology Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz1-chemistry",
    kind: "organization",
    name: "福州第一中学 化学社",
    englishName: "Chemistry Club of Fuzhou NO.1 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "org-fz3-mathematics",
    kind: "organization",
    name: "福州第三中学 数学社",
    englishName: "Math Club of Fuzhou NO.3 High School",
    role: "contributing-organization",
  }),
  verified({
    id: "person-chen-yixuan-chief-editor",
    kind: "person",
    name: "陈逸轩",
    role: "chief-editor",
    affiliation: "福州一中化学社",
  }),
  needsReview(
    {
      id: "person-jiang-yanlang-author",
      kind: "person",
      name: "江彦烺",
      role: "contributing-author",
      affiliation: "福州一中天文社",
    },
    duplicateCredit("江彦烺"),
  ),
  needsReview(
    {
      id: "person-you-ruodong-author",
      kind: "person",
      name: "游若东",
      role: "contributing-author",
      affiliation: "福州一中天文社",
    },
    duplicateCredit("游若东"),
  ),
  needsReview(
    {
      id: "person-luo-chuhan-author",
      kind: "person",
      name: "罗楚涵",
      role: "contributing-author",
      affiliation: "福州一中天文社",
    },
    duplicateCredit("罗楚涵"),
  ),
  needsReview(
    {
      id: "person-yang-zhengxi-author",
      kind: "person",
      name: "杨正玺",
      role: "contributing-author",
      affiliation: "福州一中数学社",
    },
    duplicateCredit("杨正玺"),
  ),
  needsReview(
    {
      id: "person-shen-zhuoyi-author",
      kind: "person",
      name: "沈卓毅",
      role: "contributing-author",
      affiliation: "福州三中数学社",
    },
    duplicateCredit("沈卓毅"),
  ),
  needsReview(
    {
      id: "person-lin-zijie-author",
      kind: "person",
      name: "林子杰",
      role: "contributing-author",
      affiliation: "福州一中青藤地理社",
    },
    duplicateCredit("林子杰"),
  ),
  needsReview(
    {
      id: "person-chen-kai-author",
      kind: "person",
      name: "陈楷",
      role: "contributing-author",
      affiliation: "福州一中青藤地理社",
    },
    duplicateCredit("陈楷"),
  ),
  needsReview(
    {
      id: "person-qi-yi-author",
      kind: "person",
      name: "齐逸",
      role: "contributing-author",
      affiliation: "福州一中青藤地理社",
    },
    duplicateCredit("齐逸"),
  ),
  needsReview(
    {
      id: "person-jiang-yunlin-fz1-author",
      kind: "person",
      name: "江昀霖",
      role: "contributing-author",
      affiliation: "福州一中青藤地理社",
    },
    duplicateCredit("江昀霖（福州一中青藤地理社）"),
  ),
  verified({
    id: "person-lin-bowen-author",
    kind: "person",
    name: "林博文",
    role: "contributing-author",
    affiliation: "福州格致中学数学社",
  }),
  verified({
    id: "person-xu-ruizhe-author",
    kind: "person",
    name: "许睿哲",
    role: "contributing-author",
    affiliation: "福建师大附中天文社",
  }),
  needsReview(
    {
      id: "person-jiang-yunlin-feuav-author",
      kind: "person",
      name: "江昀霖",
      role: "contributing-author",
      affiliation: "福建师大附中FEUAV无人机社",
    },
    "与另一条“江昀霖／福州一中青藤地理社”是否为同一人、是否应同时列出两个单位，需由编辑确认。",
  ),
  verified({
    id: "person-chen-guanzhong-visual",
    kind: "person",
    name: "陈冠中",
    role: "visual-designer",
    affiliation: "福州一中物理社",
  }),
  verified({
    id: "person-shen-linwu-visual",
    kind: "person",
    name: "沈麟午",
    role: "visual-designer",
    affiliation: "福州一中数学社",
  }),
  verified({
    id: "person-chen-zhengyi-cover",
    kind: "person",
    name: "陈正一",
    role: "cover-designer",
    affiliation: "福州一中摄影社",
  }),
  needsReview(
    {
      id: "person-lai-keyu-afterword",
      kind: "person",
      name: "赖科羽",
      role: "afterword-author",
      source: [afterwordSource],
    },
    "后记署名为赖科羽，且正文自述为本期主编；Author.tex 的主编字段则为陈逸轩，需确认两人的准确职务。",
  ),
] as const satisfies readonly Contributor[];
