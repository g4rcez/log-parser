import { mapGameActions } from "./actions/map-game-actions";
import { parseLog } from "./actions/parse-log";
import { createReport } from "./actions/create-report";

export async function main(file: string) {
  const games = await parseLog(file);
  return Array.from(games).map(([name, actions], index) => {
    const result = mapGameActions({ name, actions });
    return { [`match-${index}`]: createReport(result) };
  });
}
