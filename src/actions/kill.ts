import { Action } from "./action";
import { Game } from "../types";

const KILL = "Kill";

const regex = /^(\w+): (\d+) (\d+) (\d+): (?<killer><world>|[a-zA-z0-9 ]+) killed (?<victim>[a-zA-z0-9 ]+) by (?<gun>[A-Z_]+)/gm;

type Group = {
  killer: string;
  gun: string;
  victim: string;
};

export const WORLD = "<world>";

export class Kill extends Action<Group> {

  public constructor () {
    super ("Kill");
  }

  public valid (action: Game.Action) {
    const result = regex.exec (action);
    return (result?.groups as Group) ?? null;
  }

  public parse (group: Group): Game.Log {
    const worldIsKiller = group.killer === WORLD;
    return {
      type: KILL,
      killer: { name: group.killer, score: 1, gun: group.gun },
      victim: { name: group.victim, score: -1, fault: worldIsKiller ? 1 : 0 },
    };
  }
}
