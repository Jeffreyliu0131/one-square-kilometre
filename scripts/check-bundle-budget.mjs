import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";
import { gzipSync } from "node:zlib";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const limits = {
  ".js": 250 * 1024,
  ".css": 50 * 1024,
};

function filesUnder(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(path) : [path];
  });
}

const files = filesUnder(root);
let totalGzip = 0;
const report = [];

for (const path of files) {
  const raw = readFileSync(path);
  const compressed = gzipSync(raw).byteLength;
  totalGzip += compressed;
  report.push({ file: path.replace(root, ""), raw: statSync(path).size, gzip: compressed });
  for (const [extension, limit] of Object.entries(limits)) {
    if (path.endsWith(extension) && compressed > limit) {
      throw new Error(`${path} is ${compressed} gzip bytes, over the ${limit} byte ${extension} budget.`);
    }
  }
}

if (totalGzip > 600 * 1024) {
  throw new Error(`The complete shell is ${totalGzip} gzip bytes, over the 614400 byte budget.`);
}

process.stdout.write(`${JSON.stringify({ totalGzip, files: report }, null, 2)}\n`);
