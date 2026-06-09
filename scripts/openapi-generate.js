const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const openApiToolsPath = path.resolve(__dirname, "../openapitools.json");
const { "generator-cli": generatorCli } = JSON.parse(fs.readFileSync(openApiToolsPath, "utf8"));
const version = generatorCli.version;
const jarPath = path.resolve(
  __dirname,
  `../node_modules/@openapitools/openapi-generator-cli/versions/${version}.jar`
);

if (!fs.existsSync(jarPath)) {
  console.error(`OpenAPI Generator jar not found at ${jarPath}`);
  console.error("Download it with:");
  console.error(
    `curl -fsSL -o "${jarPath}" "https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/${version}/openapi-generator-cli-${version}.jar"`
  );
  process.exit(1);
}

const command = [
  "java",
  "-jar",
  jarPath,
  "generate",
  "--enable-post-process-file",
  "-i",
  "api.yml",
  "-g",
  "typescript-axios",
  "-o",
  "src/generated/axios/",
].join(" ");

execSync(command, {
  cwd: path.resolve(__dirname, ".."),
  stdio: "inherit",
});
