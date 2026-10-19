import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import ts from "typescript";

const root = process.cwd();
const sourceRoots = ["app", "src"];
const styleExtensions = new Set([".css", ".scss"]);
const sourceExtensions = new Set([".ts", ".tsx"]);
const prohibitedElements = new Set([
  "a",
  "button",
  "input",
  "select",
  "textarea",
  "option",
  "dialog",
  "details",
  "summary",
]);
const violations = [];

function normalized(filePath) {
  return path.relative(root, filePath).split(path.sep).join("/");
}

async function walk(directory) {
  let entries;
  try {
    entries = await readdir(directory, { withFileTypes: true });
  } catch {
    return [];
  }

  const files = [];
  for (const entry of entries) {
    if (entry.name === "node_modules" || entry.name === ".next" || entry.name.startsWith(".")) {
      continue;
    }
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(fullPath)));
    } else {
      files.push(fullPath);
    }
  }
  return files;
}

let exceptions = [];
try {
  exceptions = JSON.parse(
    await readFile(path.join(root, "docs/design-system/exceptions.json"), "utf8"),
  );
} catch {
  violations.push({
    file: "docs/design-system/exceptions.json",
    rule: "exceptions-file",
    value: "missing or invalid JSON",
  });
}

function hasApprovedException(file, rule, value) {
  const today = new Date().toISOString().slice(0, 10);
  return exceptions.some(
    (entry) =>
      entry.file === file &&
      entry.rule === rule &&
      entry.value === value &&
      typeof entry.reason === "string" &&
      entry.reason.trim().length > 0 &&
      typeof entry.approvedBy === "string" &&
      entry.approvedBy.trim().length > 0 &&
      typeof entry.expiresOn === "string" &&
      entry.expiresOn >= today,
  );
}

function report(file, rule, value) {
  if (!hasApprovedException(file, rule, value)) {
    violations.push({ file, rule, value });
  }
}

for (const sourceRoot of sourceRoots) {
  for (const filePath of await walk(path.join(root, sourceRoot))) {
    const file = normalized(filePath);
    const extension = path.extname(filePath).toLowerCase();
    const content = await readFile(filePath, "utf8");

    if (sourceExtensions.has(extension) && extension === ".tsx") {
      const sourceFile = ts.createSourceFile(
        filePath,
        content,
        ts.ScriptTarget.Latest,
        true,
        ts.ScriptKind.TSX,
      );

      function visit(node) {
        if (ts.isJsxOpeningElement(node) || ts.isJsxSelfClosingElement(node)) {
          const tag = ts.isIdentifier(node.tagName) ? node.tagName.text : null;
          if (tag && prohibitedElements.has(tag.toLowerCase())) {
            report(file, "native-interactive-element", tag.toLowerCase());
          }
          const jsxAttributes = node.attributes.properties.filter(
            (attribute) => ts.isJsxAttribute(attribute) && ts.isIdentifier(attribute.name),
          );
          for (const attribute of jsxAttributes) {
            if (ts.isJsxAttribute(attribute) && ts.isIdentifier(attribute.name)) {
              if (attribute.name.text === "style") {
                report(file, "inline-style", "style");
              }
            }
          }
          const isIntrinsic = tag !== null && /^[a-z]/.test(tag);
          const hasInteraction = jsxAttributes.some((attribute) =>
            ts.isJsxAttribute(attribute) &&
            ts.isIdentifier(attribute.name) &&
            ["onClick", "onKeyDown", "onKeyUp", "onPointerDown", "onPointerUp"].includes(attribute.name.text),
          );
          const hasButtonRole = jsxAttributes.some((attribute) =>
            ts.isJsxAttribute(attribute) &&
            ts.isIdentifier(attribute.name) &&
            attribute.name.text === "role" &&
            attribute.initializer !== undefined &&
            ts.isStringLiteral(attribute.initializer) &&
            attribute.initializer.text === "button",
          );
          if (tag !== null && /^[a-z]/.test(tag) && (hasInteraction || hasButtonRole) && !prohibitedElements.has(tag.toLowerCase())) {
            report(file, "custom-interactive-element", tag.toLowerCase());
          }
        }
        ts.forEachChild(node, visit);
      }

      visit(sourceFile);
    }

    if (styleExtensions.has(extension)) {
      const patterns = [
        ["hard-coded-color", /#[0-9a-fA-F]{3,8}\b/g],
        ["hard-coded-color", /\b(?:rgba?|hsla?)\s*\(/gi],
        ["hard-coded-font", /\bfont-family\s*:/gi],
        [
          "hard-coded-spacing-or-type",
          /\b(?:margin|padding|gap|border-radius|font-size|line-height)\s*:\s*[^;]*(?:\b\d+(?:\.\d+)?(?:px|rem|em)\b)/gi,
        ],
      ];

      for (const [rule, pattern] of patterns) {
        for (const match of content.matchAll(pattern)) {
          report(file, rule, match[0].trim());
        }
      }
    }
  }
}

if (violations.length > 0) {
  console.error("Carbon design-system policy check failed:");
  for (const violation of violations) {
    console.error(
      `- ${violation.file}: [${violation.rule}] ${violation.value}`,
    );
  }
  process.exitCode = 1;
} else {
  console.log("Carbon design-system policy check passed.");
}
