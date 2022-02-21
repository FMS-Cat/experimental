import { SMStepsType } from './SMStepsType';

export const stepsTypeColumnsMap: { [ stepsType in SMStepsType ]: number } = {
  [ SMStepsType.DanceSingle ]: 4,
  [ SMStepsType.DanceDouble ]: 8,
};
