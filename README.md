# ahk64

[![npm version](https://img.shields.io/npm/v/ahk64.svg)](https://www.npmjs.com/package/ahk64)
[![npm downloads](https://img.shields.io/npm/dm/ahk64.svg)](https://www.npmjs.com/package/ahk64)
[![license](https://img.shields.io/npm/l/ahk64.svg)](LICENSE)

`ahk64` packages a ready-to-use AutoHotkey toolchain for Windows x64 so you can run and compile `.ahk` scripts directly from Node.js workflows, npm scripts, and CI pipelines.

## Why this package

- No separate AutoHotkey installer required in CI.
- Reproducible builds by pinning package versions in your lockfile.
- Includes runtime, compiler, and packer binaries under a single npm package.
- Friendly CLI wrapper (`ahk64`) plus direct binary commands (`autohotkey`, `ahk2exe`).

## Requirements

- OS: Windows (`win32`)
- CPU: x64
- Node.js: 16+

`package.json` also enforces these platform constraints via `os` and `cpu`.

## Installation

```bash
npm install --save-dev ahk64
```

For one-off usage without installing:

```bash
npx ahk64 run path/to/script.ahk
```

## Quick start

Add scripts to your project:

```json
{
  "scripts": {
    "ahk:run": "ahk64 run scripts/main.ahk",
    "ahk:build": "ahk64 compile scripts/main.ahk /out dist/main.exe"
  }
}
```

Then run:

```bash
npm run ahk:run
npm run ahk:build
```

## CLI reference

Syntax:

```bash
ahk64 <command> [args...]
```

| Command | Binary | Description |
| --- | --- | --- |
| `run` | `AutoHotkey64.exe` | Run a script with AutoHotkey runtime. |
| `compile` | `Ahk2Exe.exe` | Compile a script to `.exe`; wrapper automatically injects `/base` with bundled `AutoHotkey64.exe`. |
| `mpress` | `mpress.exe` | Compress an existing executable. |

All additional arguments are passed through to the underlying binary.

Examples:

```bash
# Run script
npx ahk64 run scripts/hotkeys.ahk

# Compile script
npx ahk64 compile scripts/hotkeys.ahk /out dist/hotkeys.exe

# Compress compiled exe
npx ahk64 mpress dist/hotkeys.exe
```

## Included binaries

The package publishes:

- `bin/AutoHotkey64.exe`
- `bin/Ahk2Exe.exe`
- `bin/mpress.exe`
- `cli.js`

## CI/CD and release automation (maintainers)

This repository includes automated release workflows:

- `.github/workflows/sync-ahk-release.yml`
  - Runs weekly and by manual dispatch.
  - Fetches latest release from `AutoHotkey/AutoHotkey`.
  - Downloads `AutoHotkey_<version>.zip`, extracts `AutoHotkey64.exe`, updates `package.json` version, commits, and pushes.
  - Creates and pushes a matching git tag: `vX.Y.Z`.

- `.github/workflows/publish-npm.yml`
  - Triggered by pushed tags matching `v*` (or manual dispatch).
  - Publishes using npm Trusted Publisher + provenance (`npm publish --provenance --access public`).
  - Skips publish if the target version already exists on npm.

One-time maintainer setup:

1. Enable npm Trusted Publisher for this repository.
2. Bind publisher to `.github/workflows/publish-npm.yml` on default branch.
3. Ensure GitHub Actions can push commits/tags (or adjust branch protection rules).
4. Manually trigger sync workflow once to verify end-to-end behavior.

## FAQ

### Why is installation blocked on macOS/Linux?

This package is intentionally Windows x64 only because it ships Windows executables. npm will skip install on unsupported platforms due to package `os/cpu` constraints.

### How do I make builds reproducible?

Commit your lockfile (`package-lock.json`, `pnpm-lock.yaml`, or `yarn.lock`) so CI always resolves the same `ahk64` version and bundled binaries.

## License

- Package license: GPL-2.0
- Bundled AutoHotkey binaries remain under their respective upstream licenses

## Links

- npm: [https://www.npmjs.com/package/ahk64](https://www.npmjs.com/package/ahk64)
- repository: [https://github.com/Nigh/AHK-npm](https://github.com/Nigh/AHK-npm)
