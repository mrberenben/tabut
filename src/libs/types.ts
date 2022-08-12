export interface IPerson {
  id: number;
  name: string;
  image: string;
  stats: IStats;
}

export interface IStats {
  id: string;
  personId: number;
  strength: number;
  intelligent: number;
  charisma: number;
  dexterity: number;
  durability: number;
}

export type AsyncReturnType<T> = T extends (...args: any[]) => Promise<infer U>
  ? U
  : never;
