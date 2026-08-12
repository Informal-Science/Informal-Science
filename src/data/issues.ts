import type { Issue } from "./types";

const historySource = {
  repository: "Informal-Science-2026",
  path: "Resources/History/History.tex",
  locator: "year and issue-number labels",
} as const;

const historyAssetSource = (number: number) =>
  ({
    repository: "Informal-Science-2026",
    path: "Resources/History/Cover_Issue-" + number + (number === 2 || number >= 5 ? ".png" : ".jpg"),
    locator: "archival cover image",
  }) as const;

const rightsReviewNote =
  "封面图片未附单独的网页发布许可记录；上线前应补齐来源、作者、许可与署名信息。";

const issue = (year: number, number: number): Issue => {
  const currentDraft = number === 6;
  const duplicateCover =
    number === 6
      ? ["书籍工程中的第 6 期历史封面与第 5 期文件内容完全相同，需替换为确认后的第 6 期封面。"]
      : [];

  return {
    year,
    number,
    slug: "issue-" + year,
    coverAsset: "/images/issues/issue-" + year + ".webp",
    status: "cover-only",
    description: "《非正式科学》" + year + " 年刊，总第 " + number + " 期。",
    draft: currentDraft,
    availability: {
      cover: true,
      pdf: false,
      onlineReading: false,
    },
    reviewNeeded: true,
    reviewStatus: "review-needed",
    reviewNotes: [rightsReviewNote, ...duplicateCover],
    source: [historySource, historyAssetSource(number)],
  };
};

export const issues = [
  issue(2021, 1),
  issue(2022, 2),
  issue(2023, 3),
  issue(2024, 4),
  issue(2025, 5),
  issue(2026, 6),
] as const satisfies readonly Issue[];
