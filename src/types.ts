export namespace Game {
  export type Action = string;

  export type Struct = {
    time: string;
    line: Action;
  };

  export type Match = Game.Struct[];

  export type Log<T extends {} = {}> = {
    type: Action;
    killer: { name: string; score: number; gun: string };
    victim: { name: string; score: number; fault: number };
  } & T;
}

export namespace Report {
  export type Output = {
    total_kills: number;
    players: string[];
    kills: Record<string, number>;
    kills_by_means: Record<string, number>;
  };
}

export namespace Types {
  export type Nullable<T> = T | null;
}
