export const RoomTag = {
  OFFICE: 'OFFICE',
  HOME: 'HOME',
  EDUCATION: 'EDUCATION',
  BUSINESS: 'BUSINESS',
} as const;
export type RoomTag = keyof typeof RoomTag;