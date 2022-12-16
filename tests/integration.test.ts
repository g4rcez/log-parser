import { describe, expect, test } from "vitest";
import { parseLog } from "../src/actions/parse-log";
import path from "path";
import { main } from "../src/app";

describe("Integration test", () => {
  const file = path.join(process.cwd(), "tests", "partial-log");

  test("Should parse the file", async () => {
    const games = await parseLog(file);
    expect(games).instanceof(Map);
    expect(games.size).toBe(1);
  });

  test("Should parse the file", async () => {
    const logs = await main(file);
    const first = logs[0]["match-0"];

    expect(logs.length).toBe(1);
    expect(first.total_kills).toBe(2);
    expect(first.players.length).toBe(3);
    expect(first.kills.Isgalamido).toBe(1);
    expect(first.kills_by_means.MOD_ROCKET).toBe(1);
    expect(first.kills_by_means.MOD_TRIGGER_HURT).toBe(1);
  });
});
