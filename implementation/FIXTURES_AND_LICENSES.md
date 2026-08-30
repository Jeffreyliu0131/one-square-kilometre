# Fixtures and licences

## Synthetic fixture set

Fixture release: `synthetic-marshline-commons-r2`. Canonical content fingerprint: `fnv1a32:0dbad542`.

The following project-authored data files are dedicated under CC0-1.0:

- `src/fixtures/area-manifest.json`
- `src/fixtures/provenance-manifest.json`.

CC0 covers the synthetic names, prompts, metadata, dates, normalised map positions and provenance declarations inside those JSON files. `src/components/FieldMap.tsx`, including its schematic SVG renderer and path geometry, is source code under the repository MIT licence; it is not part of the CC0 fixture exception.

The fixture contains no real coordinates, NUS names or assets, OpenStreetMap data, Google Maps data, commercial tiles, photographs, audio, or personal data. “Verified” dates in the fixture demonstrate schema and expiry behaviour only; they are not field verification.

## Direct runtime dependencies

| Package | Declared version | Use | Licence |
|---|---|---|---|
| `react` | `^19.2.8` | UI projection | MIT |
| `react-dom` | `^19.2.8` | DOM projection | MIT |
| `react-aria-components` | `^1.20.0` | Accessible interaction primitives | Apache-2.0 |
| `@phosphor-icons/react` | `^2.1.10` | Functional icon family | MIT |
| `zod` | `^4.5.2` | Runtime schema validation | MIT |

`pnpm fixtures:validate` fails if direct runtime dependency name/version/licence notices drift, the area content changes without a new fingerprint, provenance does not bind to the release, or a declared fixture asset is missing. Runtime Zod schemas also reject unknown nested fixture fields. The fingerprint detects content drift; it is not an authenticity signature. Vite and the test toolchain are development dependencies under their respective package licences. Exact resolved versions are recorded in `pnpm-lock.yaml`; this file is the dependency source of truth. The full production baseline inventory is in [`THIRD_PARTY_NOTICES.md`](../THIRD_PARTY_NOTICES.md).

No remote font, image, media, map, analytics, or model asset is loaded at runtime.
