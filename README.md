
# ahk64

A lightweight **AutoHotkey 64-bit toolchain** for Windows.
This package bundles the official AutoHotkey runtime, compiler, and mpress packer so you can **run or compile AHK scripts inside a Node.js build pipeline** (e.g. from `npm scripts`, CI/CD jobs, or other automation).

## ✨ Features

* **Run** `.ahk` scripts via the 64-bit AutoHotkey interpreter.
* **Compile** `.ahk` scripts into standalone `.exe` files using `Ahk2Exe`.
* Works seamlessly inside `npm`/`yarn`/`pnpm` scripts—no separate installer needed.

## 📦 Installation

```bash
npm install --save-dev ahk64
```

> Only Windows x64 is supported (`"os": ["win32"]`, `"cpu": ["x64"]`).


## 🚀 Usage in package.json scripts

Example `package.json`:

```jsonc
{
  "scripts": {
    "run:ahk": "ahk64 run src/my-script.ahk",
    "build:ahk": "ahk64 compile src/my-script.ahk /out dist/my-script.exe"
  }
}
```

Run from the command line:

```bash
npm run run:ahk
npm run build:ahk
```

or directly with `npx`:

```bash
npx ahk64 compile src/my-script.ahk
```

---

## 🛠 CLI Syntax

```
ahk64 <command> [args...]
```

### Commands

| Command   | Underlying binary       | Typical use                                                                                       |
| --------- | ----------------------- | ------------------------------------------------------------------------------------------------- |
| `run`     | `AutoHotkey64.exe`      | Run a `.ahk` script.                                                                              |
| `compile` | `Ahk2Exe.exe`           | Compile a `.ahk` script to `.exe`. Automatically sets `/base` to the included `AutoHotkey64.exe`. |

All remaining arguments are passed straight to the underlying tool.

**Examples**

```bash
# Compile with custom output path
npx ahk64 compile src/hotkeys.ahk /out dist/hotkeys.exe

# Run a script directly
npx ahk64 run src/hotkeys.ahk

# Compress an existing exe
npx ahk64 mpress dist/hotkeys.exe
```

## 📁 Included Binaries

The package ships these files inside `bin/`:

* `AutoHotkey64.exe`
* `Ahk2Exe.exe`
* `mpress.exe`

---

## 🔄 Maintainer automation

This repository includes two GitHub Actions workflows:

* `.github/workflows/sync-ahk-release.yml`
  * Runs weekly (and via manual dispatch).
  * Checks the latest AutoHotkey release.
  * If a new version is found, it downloads `AutoHotkey_<version>.zip`, extracts only `AutoHotkey64.exe`, bumps `package.json` version, and pushes to the default branch.
  * It also creates and pushes a matching git tag (`vX.Y.Z`) after the sync commit.
* `.github/workflows/publish-npm.yml`
  * Runs on pushes that change `bin/**` or `package.json`.
  * Publishes with npm Trusted Publisher (`id-token: write` + `npm publish --provenance`).
  * Safely skips when the exact version is already published.

### One-time setup checklist

1. In npm package settings, enable **Trusted Publisher** for this GitHub repository.
2. Bind the publisher to the workflow file `.github/workflows/publish-npm.yml` on your default branch.
3. In GitHub repository settings, ensure Actions can write to the default branch (or adjust branch protection to allow workflow bot pushes).
4. Manually run `Sync AutoHotkey Release` once from the Actions tab to verify end-to-end behavior.

---

## ⚠ Notes

* The package is intended for automated **build scripts**, not for interactive editing.
* Requires **Node.js 16+** (ESM support).
* Windows x64 only.

---

## 📜 License

This npm package is distributed under the **GPL-2.0** license.
AutoHotkey binaries are redistributed under their respective licenses.

---

**Repository:** [https://github.com/Nigh/AHK-npm](https://github.com/Nigh/AHK-npm)

> Tip: If you commit your `package-lock.json` or `pnpm-lock.yaml`, your CI builds will always use the exact same AutoHotkey binaries for reproducible results.
