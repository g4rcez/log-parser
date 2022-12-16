import fs from "fs";
import readline from "readline";
import { Game } from "../types";

type Output = Map<string, Game.Struct[]>

export const parseLog = (path: string) => {
  const rl = readline.createInterface ({ input: fs.createReadStream (path) });
  return new Promise<Output> ((res) => {
    const games: Output = new Map ();
    let game = "";
    rl.on ("line", (row) => {
      const [time, ...text] = row.trim ().split (" ");
      const line = text.join (" ").trim ();
      if (line.startsWith ("InitGame:")) {
        game = line;
        games.set (line, []);
      } else if (line.endsWith ("ShutdownGame:")) {
        const arr = games.get (game) ?? [];
        arr.push ({ time, line });
        game = "";
      } else {
        const arr = games.get (game) ?? [];
        arr.push ({ time, line });
      }
    });
    rl.on ("close", () => {
      res (games);
    });
  });
};
