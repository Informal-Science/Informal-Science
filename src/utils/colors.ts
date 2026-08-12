/**
 * 书籍中的 CMYK/sRGB 近似值保存在 data 中；界面大色块使用经过对比度调整的 CSS token。
 * 这样既不改写印刷标准，也能让白色正文在学科色背景上保持可读。
 */
export const disciplineUiColor = (colorKey: string) => `var(--${colorKey})`;

// 与 tokens.css 中的屏幕界面色保持一致；印刷权威值仍只保存在 data/colors.ts。
const disciplineUiHex = {
  astronomy: '#183b78',
  math: '#ad2e36',
  geography: '#467822',
  physics: '#0d709e',
  engineering: '#752d7a',
  biology: '#217943',
  chemistry: '#916000',
} as const;

const relativeLuminance = (hex: string) => {
  const channels = hex
    .replace('#', '')
    .match(/.{2}/g)
    ?.map((value) => Number.parseInt(value, 16) / 255)
    .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));

  if (!channels || channels.length !== 3) return 0;
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
};

const contrastRatio = (first: string, second: string) => {
  const firstLuminance = relativeLuminance(first);
  const secondLuminance = relativeLuminance(second);
  const lighter = Math.max(firstLuminance, secondLuminance);
  const darker = Math.min(firstLuminance, secondLuminance);
  return (lighter + 0.05) / (darker + 0.05);
};

/** 为标准色样自动选择白字或墨色字，数据新增颜色后无需补写 CSS 例外。 */
export const shouldUseDarkText = (background: string) =>
  contrastRatio(background, '#111214') >= contrastRatio(background, '#ffffff');

/** 为学科界面色上的文字选择对比度更高的前景色。 */
export const disciplineUiTextColor = (colorKey: string) => {
  const background = disciplineUiHex[colorKey as keyof typeof disciplineUiHex];
  return background && shouldUseDarkText(background) ? '#111214' : '#ffffff';
};
