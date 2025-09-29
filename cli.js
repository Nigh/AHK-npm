#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cmds = {
  compile: join(__dirname, 'bin', 'Ahk2Exe.exe'),
  run: join(__dirname, 'bin', 'AutoHotkey64.exe'),
  mpress: join(__dirname, 'bin', 'mpress.exe')
};

// CLI args: first arg = which tool to run, rest = its arguments
const [cmd, ...args] = process.argv.slice(2);

if (!cmds[cmd]) {
  console.error(`Usage: ahk <compile|run> [args...]`);
  process.exit(1);
}

// Example: if user wants to run toolA, still pass --base toolB
let finalArgs = args;
if (cmd === 'compile') {
  finalArgs = ['/base', cmds.run, ...args];
}

const child = spawn(cmds[cmd], finalArgs, { stdio: 'inherit' });
child.on('exit', code => process.exit(code));
