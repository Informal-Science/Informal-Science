/** 页面学科色直接引用 Resources/color-parameter.md 的 RGB 标准 token。 */
export const disciplineUiColor = (colorKey: string) => `var(--${colorKey})`;

// 与 tokens.css 中的 RGB 标准保持一致，仅用于计算前景文字对比度。
const disciplineUiHex = {
  astronomy: '#00336F',
  math: '#C53E29',
  geography: '#9FC138',
  physics: '#1578BF',
  engineering: '#882E87',
  biology: '#53A54F',
  chemistry: '#E5B514',
  'brain-neuroscience': '#AA1159',
  electronic: '#0098DE',
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
