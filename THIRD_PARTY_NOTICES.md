# Third-party notices

This baseline inventory covers the production dependency graph resolved by `pnpm-lock.yaml` on 2026-08-30. It is not a legal opinion or a substitute for regenerating notices when dependencies or distribution form change.

## Apache-2.0

The full licence is in [`LICENSES/Apache-2.0.txt`](LICENSES/Apache-2.0.txt).

| Package | Version | Notice |
|---|---:|---|
| `@internationalized/date` | 3.12.3 | Copyright 2019 Adobe |
| `@internationalized/number` | 3.6.7 | Copyright 2019 Adobe |
| `@internationalized/string` | 3.2.10 | Copyright 2019 Adobe |
| `@react-types/shared` | 3.36.1 | Copyright 2019 Adobe |
| `@swc/helpers` | 0.5.23 | Copyright 2024 SWC contributors |
| `react-aria` | 3.51.0 | Copyright 2019 Adobe |
| `react-aria-components` | 1.20.0 | Copyright 2019 Adobe |
| `react-stately` | 3.49.0 | Copyright 2019 Adobe |

No separate upstream `NOTICE` file was present in the installed React Aria packages reviewed for this baseline.

## MIT

The MIT text is reproduced in the applicable upstream packages. The repository's own MIT licence is in [`LICENSE`](LICENSE).

| Package | Version | Notice or source |
|---|---:|---|
| `@phosphor-icons/react` | 2.1.10 | Copyright 2020 Phosphor Icons |
| `aria-hidden` | 1.2.6 | Copyright 2017 Anton Korzunov |
| `client-only` | 0.0.1 | MIT declared by package metadata/upstream; the installed package contains no standalone licence file |
| `clsx` | 2.1.1 | Copyright Luke Edwards |
| `react` | 19.2.8 | Copyright Meta Platforms, Inc. and affiliates |
| `react-dom` | 19.2.8 | Copyright Meta Platforms, Inc. and affiliates |
| `scheduler` | 0.27.0 | Copyright Meta Platforms, Inc. and affiliates |
| `use-sync-external-store` | 1.6.0 | Copyright Meta Platforms, Inc. and affiliates |
| `zod` | 4.5.2 | Copyright 2025 Colin McDonnell |

## 0BSD

The full licence is in [`LICENSES/0BSD.txt`](LICENSES/0BSD.txt).

| Package | Version | Notice |
|---|---:|---|
| `tslib` | 2.8.1 | Copyright Microsoft Corporation |

## Scope and maintenance

`pnpm fixtures:validate` checks direct runtime dependency names/version declarations plus fixture provenance and fingerprint. It is not a complete licence scanner or SBOM generator.

Before distributing a bundled application or browser binary, regenerate a complete dependency inventory from a clean frozen install, retain all applicable upstream licence and NOTICE files, and review new transitive packages.
