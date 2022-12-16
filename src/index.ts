import path from "path";
import { main } from "./app";
import fs from "fs";
import crypto from "crypto";

const file = process.argv[3] || path.join(process.cwd(), "logs", "quake.log");

main(file)
  .then((logs) => {
    const content = JSON.stringify(logs, null, 4);
    fs.writeFileSync(path.join(process.cwd(), "logs", `${crypto.randomUUID()}.json`), content, "utf-8");
    console.log(content);
  })
  .catch(console.error);
