export const SMDifficulty = {
  Beginner: 'Beginner',
  Easy: 'Easy',
  Medium: 'Medium',
  Hard: 'Hard',
  Challenge: 'Challenge',
  Edit: 'Edit',
} as const;

export type SMDifficulty = typeof SMDifficulty[keyof typeof SMDifficulty];
