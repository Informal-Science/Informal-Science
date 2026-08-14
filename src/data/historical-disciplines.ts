import type { HistoricalDiscipline } from './types';

/** Historical discipline colors from Resources/color-parameter.md. */
export const historicalDisciplines = [
  {
    slug: 'brain-neuroscience',
    routeSlug: 'other',
    name: '脑神经科学',
    en: 'Brain Neuroscience',
    color: '#AA1159',
    colorKey: 'brain-neuroscience',
    cmyk: { c: 0.14, m: 0.98, y: 0.38, k: 0.08 },
    rgb: [170, 17, 89],
    webHex: '#AA1159',
    summary: '曾作为独立板块收录脑与神经系统方向的科学内容。',
    order: 8,
  },
  {
    slug: 'electronic',
    routeSlug: 'other',
    name: '电子',
    en: 'Electronic',
    color: '#0098DE',
    colorKey: 'electronic',
    cmyk: { c: 0.97, m: 0.09, y: 0, k: 0 },
    rgb: [0, 152, 222],
    webHex: '#0098DE',
    summary: '曾收录计算机软件、硬件、人工智能与机器学习等电子与信息技术方向内容。',
    order: 9,
  },
] as const satisfies readonly HistoricalDiscipline[];
