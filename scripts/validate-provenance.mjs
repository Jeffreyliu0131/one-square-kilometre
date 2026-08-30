import { existsSync, readFileSync } from "node:fs";

const packageJson = JSON.parse(readFileSync(new URL("../package.json", import.meta.url), "utf8"));
const provenance = JSON.parse(
  readFileSync(new URL("../src/fixtures/provenance-manifest.json", import.meta.url), "utf8"),
);
const area = JSON.parse(
  readFileSync(new URL("../src/fixtures/area-manifest.json", import.meta.url), "utf8"),
);

const declared = new Map(
  provenance.dependencyNotices.map((notice) => [notice.name, notice]),
);
const runtimeEntries = Object.entries(packageJson.dependencies);
const issues = [];
const expectedRuntimeLicences = new Map([
  ["@phosphor-icons/react", "MIT"],
  ["react", "MIT"],
  ["react-aria-components", "Apache-2.0"],
  ["react-dom", "MIT"],
  ["zod", "MIT"],
]);

function canonicalJson(value) {
  if (Array.isArray(value)) return `[${value.map((item) => canonicalJson(item)).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${canonicalJson(value[key])}`)
      .join(",")}}`;
  }
  return JSON.stringify(value);
}

function contentFingerprint(value) {
  const content = { ...value };
  delete content.contentFingerprint;
  let hash = 0x811c9dc5;
  for (const byte of new TextEncoder().encode(canonicalJson(content))) {
    hash ^= byte;
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return `fnv1a32:${hash.toString(16).padStart(8, "0")}`;
}

for (const [name, version] of runtimeEntries) {
  const notice = declared.get(name);
  if (!notice) issues.push(`Missing runtime dependency notice: ${name}`);
  else if (notice.version !== version) {
    issues.push(`Version mismatch for ${name}: package=${version}, provenance=${notice.version}`);
  } else if (notice.license !== expectedRuntimeLicences.get(name)) {
    issues.push(
      `Licence mismatch for ${name}: expected=${expectedRuntimeLicences.get(name)}, provenance=${notice.license}`,
    );
  }
}

for (const name of declared.keys()) {
  if (!(name in packageJson.dependencies)) issues.push(`Extra non-runtime dependency notice: ${name}`);
}

const expectedFingerprint = contentFingerprint(area);
if (area.contentFingerprint !== expectedFingerprint) {
  issues.push(`Area fingerprint mismatch: declared=${area.contentFingerprint}, actual=${expectedFingerprint}`);
}
if (provenance.fixtureSet !== area.releaseId) {
  issues.push(`Fixture identity mismatch: provenance=${provenance.fixtureSet}, area=${area.releaseId}`);
}
for (const asset of provenance.assets) {
  const assetUrl = new URL(`../${asset.path}`, import.meta.url);
  if (!existsSync(assetUrl)) issues.push(`Missing declared fixture asset: ${asset.path}`);
}

if (issues.length) throw new Error(issues.join("\n"));
process.stdout.write(
  `Validated ${runtimeEntries.length} runtime dependency notices and fixture identity ${expectedFingerprint}.\n`,
);
