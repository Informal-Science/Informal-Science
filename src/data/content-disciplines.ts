import { disciplines } from './disciplines';
import { historicalDisciplines } from './historical-disciplines';

/** All categories that may be assigned to an article, active or historical. */
export const contentDisciplines = [...disciplines, ...historicalDisciplines] as const;
