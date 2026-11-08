import {
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
  mkdirSync,
  symlinkSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import ts from "typescript";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const output = mkdtempSync(path.join(tmpdir(), "soundspace-test-"));
function compile(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const input = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      compile(input);
      continue;
    }
    if (!/\.tsx?$/.test(entry.name)) continue;
    const target = path
      .join(output, path.relative(path.join(root, "src"), input))
      .replace(/\.tsx?$/, ".js");
    mkdirSync(path.dirname(target), { recursive: true });
    const result = ts.transpileModule(readFileSync(input, "utf8"), {
      fileName: input,
      compilerOptions: {
        target: ts.ScriptTarget.ES2020,
        module: ts.ModuleKind.CommonJS,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    writeFileSync(target, result.outputText);
  }
}
let status = 1;
try {
  writeFileSync(path.join(output, "package.json"), '{"type":"commonjs"}');
  symlinkSync(
    path.join(root, "node_modules"),
    path.join(output, "node_modules"),
    "dir",
  );
  compile(path.join(root, "src"));
  const result = spawnSync(
    process.execPath,
    ["--test", path.join(root, "tests/app.test.cjs")],
    {
      stdio: "inherit",
      env: {
        ...process.env,
        NODE_ENV: "production",
        SOUNDSPACE_TEST_BUILD: output,
      },
    },
  );
  status = result.status ?? 1;
} finally {
  rmSync(output, { recursive: true, force: true });
}
process.exitCode = status;
