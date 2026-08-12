export type DisciplineSlug =
  | "astronomy"
  | "math"
  | "geography"
  | "physics"
  | "engineering"
  | "biology"
  | "chemistry";

export type ReviewStatus = "verified-from-source" | "review-needed";

export interface SourceReference {
  /** Logical repository name. Do not expose a contributor's local file path. */
  repository: "Informal-Science-2026";
  /** Repository-relative path to the editorial source. */
  path: string;
  /** Human-readable description of the source fragment. */
  locator?: string;
}

export interface Reviewable {
  reviewNeeded: boolean;
  reviewStatus: ReviewStatus;
  reviewNotes: readonly string[];
}

export type DisciplineRouteSlug =
  | "astronomy"
  | "mathematics"
  | "geography"
  | "physics"
  | "engineering"
  | "biology"
  | "chemistry";

export interface SiteMeta extends Reviewable {
  title: string;
  englishTitle: string;
  edition: string;
  issueNumber: number;
  publisher: string;
  tagline: {
    zh: string;
    en: string;
  };
  description: string;
  coverStory: {
    title: string;
    quote: string;
    attribution: string;
    reviewNeeded: boolean;
  };
  featuredArticleSlugs: readonly string[];
  editorialNote: {
    paragraphs: readonly string[];
    signature: string;
    dateLabel: string;
    reviewNeeded: boolean;
    reviewNotes: readonly string[];
  };
  draft: boolean;
  availability: "preview" | "published";
  source: readonly SourceReference[];
}

export interface Discipline {
  slug: DisciplineSlug;
  /** Public URL segment; differs from the LaTeX key only for math → mathematics. */
  routeSlug: DisciplineRouteSlug;
  name: string;
  en: string;
  color: string;
  colorKey: string;
  summary: string;
  order: number;
  source: SourceReference;
}

export type ArticleStatus = "directory-only" | "full-text";

export interface ArticleAvailability {
  summary: true;
  fullText: boolean;
  pdf: boolean;
}

export interface Article extends Reviewable {
  slug: string;
  title: string;
  author: string;
  disciplineSlug: DisciplineSlug;
  summary: string;
  page: number;
  status: ArticleStatus;
  draft: boolean;
  availability: ArticleAvailability;
  source: SourceReference;
}

export type IssueStatus = "cover-only" | "published";

export interface Issue extends Reviewable {
  year: number;
  number: number;
  slug: string;
  coverAsset: string;
  status: IssueStatus;
  description: string;
  draft: boolean;
  availability: {
    cover: boolean;
    pdf: boolean;
    onlineReading: boolean;
  };
  source: readonly SourceReference[];
}

export type ContributorKind = "organization" | "person";

export type ContributorRole =
  | "publisher"
  | "contributing-organization"
  | "chief-editor"
  | "contributing-author"
  | "visual-designer"
  | "cover-designer"
  | "afterword-author";

export interface Contributor extends Reviewable {
  id: string;
  kind: ContributorKind;
  name: string;
  englishName?: string;
  role: ContributorRole;
  affiliation?: string;
  source: readonly SourceReference[];
}

export interface CmykColor {
  c: number;
  m: number;
  y: number;
  k: number;
}

export interface ColorStandard extends Reviewable {
  key: string;
  name: string;
  cmyk: CmykColor;
  /** Approximate sRGB value for screen use; the CMYK tuple remains authoritative. */
  webHex: string;
  usage: string;
  source: SourceReference;
}
