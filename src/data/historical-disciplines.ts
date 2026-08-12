import type { HistoricalDiscipline } from './types';

/**
 * Historical fields supplied by the editorial team. CMYK is authoritative;
 * webHex is a basic screen approximation and must not be used for print.
 */
export const historicalDisciplines = [
  {
    slug: 'brain-neuroscience',
    routeSlug: 'other',
    name: '脑神经科学',
    en: 'Brain Neuroscience',
    color: '#CA0591',
    colorKey: 'brain-neuroscience',
    cmyk: { c: 0.14, m: 0.98, y: 0.38, k: 0.08 },
    webHex: '#CA0591',
    summary: '曾作为独立板块收录脑与神经系统方向的科学内容。',
    order: 8,
  },
  {
    slug: 'electronic',
    routeSlug: 'other',
    name: '电子',
    en: 'Electronic',
    color: '#08E8FF',
    colorKey: 'electronic',
    cmyk: { c: 0.97, m: 0.09, y: 0, k: 0 },
    webHex: '#08E8FF',
    summary: '曾收录计算机软件、硬件、人工智能与机器学习等电子与信息技术方向内容。',
    order: 9,
  },
] as const satisfies readonly HistoricalDiscipline[];
