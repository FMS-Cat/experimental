export const SMStepsType = {
  DanceSingle: 'dance-single',
  DanceDouble: 'dance-double',
} as const;

export type SMStepsType = typeof SMStepsType[keyof typeof SMStepsType];
