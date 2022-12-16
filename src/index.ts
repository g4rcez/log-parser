import path from "path";
import { mapGameActions } from "./actions/map-game-actions";
import { parseLog } from "./actions/parse-log";
import { createReport } from "./actions/create-report";
import fs from "fs";
import * as crypto from "crypto";

async function main () {
  const games = await parseLog (path.join (process.cwd (), "logs", "quake.log"));
  const logs = Array.from (games)
    .map (([name, actions], index) => {
      const result = mapGameActions ({ name, actions });
      return { [`match-${index}`]: createReport (result) };
    });
  const content = JSON.stringify (logs, null, 4);
  fs.writeFileSync (
    path.join (
      process.cwd (),
      `${crypto.randomUUID ()}.json`,
    ),
    content,
    "utf-8",
  );
  console.log (content);
}

main ();
