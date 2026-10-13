import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, unlinkSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const groups = ["1-4", "5-8", "9-12", "13-16", "17-20", "21-24"];
const outputDirectory = join(process.cwd(), "screenshots");
mkdirSync(outputDirectory, { recursive: true });

for (const file of readdirSync(outputDirectory)) {
  if (/^tasks-.*\.(txt|svg|png)$/.test(file)) {
    unlinkSync(join(outputDirectory, file));
  }
}

function escapeXml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

for (const group of groups) {
  const command = `node app.js ${group}`;
  const output = execFileSync("node", ["app.js", group], { encoding: "utf8" }).trimEnd();
  const lines = [`$ ${command}`, "", ...output.split("\n")];
  const lineHeight = 23;
  const width = 1500;
  const height = 86 + lines.length * lineHeight + 30;

  const text = lines.map((line, index) => {
    const y = 82 + index * lineHeight;
    let color = "#d8dee9";
    if (line.startsWith("$ ")) color = "#a3e635";
    if (line.includes("ЗАДАНИЕ ")) color = "#67e8f9";
    if (line.includes("завершено успешно")) color = "#86efac";
    return `<text x="32" y="${y}" fill="${color}">${escapeXml(line || " ")}</text>`;
  }).join("\n");

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" rx="18" fill="#111318"/>
  <rect width="100%" height="48" rx="18" fill="#252932"/>
  <rect y="30" width="100%" height="18" fill="#252932"/>
  <circle cx="25" cy="24" r="7" fill="#ff5f57"/>
  <circle cx="49" cy="24" r="7" fill="#febc2e"/>
  <circle cx="73" cy="24" r="7" fill="#28c840"/>
  <text x="750" y="30" text-anchor="middle" fill="#9ca3af" font-family="Menlo, Monaco, monospace" font-size="14">typescript-tasks — ${group}</text>
  <g font-family="Menlo, Monaco, 'Courier New', monospace" font-size="16">${text}</g>
</svg>`;

  writeFileSync(join(outputDirectory, `tasks-${group}.txt`), `$ ${command}\n\n${output}\n`);
  writeFileSync(join(outputDirectory, `tasks-${group}.svg`), svg);
}

console.log("Созданы SVG-снимки и текстовые логи для диапазонов:", groups.join(", "));
