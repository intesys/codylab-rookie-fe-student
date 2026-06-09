const fs = require("fs");
const path = require("path");

const srcDir = path.resolve(__dirname, "../src");

function walk(dir, files = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, files);
    } else if (/\.tsx$/.test(entry.name)) {
      files.push(fullPath);
    }
  }
  return files;
}

function migrateContent(content) {
  let updated = content;

  updated = updated.replaceAll(
    '@mui/icons-material/MailOutline"',
    '@mui/icons-material/MailOutlined"'
  );

  updated = updated.replace(
    /<Grid([^>]*?)\s+xs=\{([^}]+)\}\s+item/g,
    "<Grid$1 size={$2}"
  );
  updated = updated.replace(
    /<Grid([^>]*?)\s+item\s+xs=\{([^}]+)\}/g,
    "<Grid$1 size={$2}"
  );
  updated = updated.replace(/<Grid\s+item\s+/g, "<Grid ");
  updated = updated.replace(/\s+item(?=\s|>)/g, "");

  return updated;
}

const files = walk(srcDir);
let changed = 0;

for (const file of files) {
  const original = fs.readFileSync(file, "utf8");
  const migrated = migrateContent(original);

  if (migrated !== original) {
    fs.writeFileSync(file, migrated);
    changed += 1;
    console.log(`Updated ${path.relative(srcDir, file)}`);
  }
}

console.log(`Migrated ${changed} files.`);
