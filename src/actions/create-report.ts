import { Game } from "../types";
import { Report } from "../types";
import { Kill, WORLD } from "./kill";

type LogPool = {
  countKills: number;
  players: Set<string>;
  kills: Map<string, number>;
  faults: Map<string, number>;
  gunKills: Map<string, number>;
};

const mapper = <T extends Map<any, any>> (map: T) =>
  [...map.entries ()].reduce (
    (acc, [key, data]) => ({
      ...acc,
      [key]: data,
    }),
    {},
  );

export const createReport = (logs: Game.Log[]): Report.Output => {
  const log = logs.reduce<LogPool> (
    (acc, log) => {
      const players = new Set (acc.players);
      players.add (log.killer.name);
      players.add (log.victim.name);

      const kills = new Map (acc.kills);
      const killerKillCalculus = (kills.get (log.killer.name) ?? 0) + log.killer.score;
      kills.set (log.killer.name, killerKillCalculus);

      const gunKills = new Map (acc.gunKills);
      gunKills.set (log.killer.gun, (gunKills.get (log.killer.gun) ?? 0) + 1);

      const faults = new Map (acc.faults);
      if (log.killer.name === WORLD) {
        faults.set (log.victim.name, (faults.get (log.victim.name) ?? 0) + log.victim.fault);
      }

      return {
        kills,
        faults,
        players,
        gunKills,
        countKills: log.type === Kill.name ? acc.countKills + 1 : acc.countKills,
      };
    },
    {
      kills: new Map (),
      gunKills: new Map (),
      players: new Set (),
      countKills: 0,
    } as LogPool,
  );

  const killFaultCompensation = [...log.kills.entries ()].reduce ((acc, [killer, kills]) => {
    if (killer === WORLD) return acc;
    if (!log.faults.has (killer)) return { ...acc, [killer]: kills };
    return {
      ...acc,
      [killer]: kills - log.faults.get (killer)!,
    };
  }, {});

  return {
    total_kills: log.countKills,
    players: [...log.players].filter (x => x !== WORLD),
    kills: killFaultCompensation,
    kills_by_means: mapper (log.gunKills),
  } as Report.Output;
};
