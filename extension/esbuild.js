const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");
const JavaScriptObfuscator = require("javascript-obfuscator");

const production = process.argv.includes("--production");

// Настройки обфускатора (только для продакшена)
const obfuscatorOptions = {
  compact: true,
  controlFlowFlattening: true,
  controlFlowFlatteningThreshold: 0.75,
  deadCodeInjection: true,
  deadCodeInjectionThreshold: 0.4,
  debugProtection: false,
  disableConsoleOutput: true,
  identifierNamesGenerator: "hexadecimal",
  log: false,
  numbersToExpressions: true,
  renameGlobals: false,
  selfDefending: true,
  simplify: true,
  splitStrings: true,
  splitStringsChunkLength: 10,
  stringArray: true,
  stringArrayCallsTransform: true,
  stringArrayCallsTransformThreshold: 0.5,
  stringArrayEncoding: ["base64"],
  stringArrayIndexesType: ["hexadecimal-number"],
  stringArrayIndexShift: true,
  stringArrayRotate: true,
  stringArrayShuffle: true,
  stringArrayWrappersCount: 1,
  stringArrayWrappersChainedCalls: true,
  stringArrayWrappersParametersMaxCount: 2,
  stringArrayWrappersType: "variable",
  stringArrayThreshold: 0.75,
  unicodeEscapeSequence: false,
};

async function obfuscateFile(filePath) {
  console.log(`🔒 Obfuscating ${filePath}...`);
  const code = fs.readFileSync(filePath, "utf8");
  const obfuscationResult = JavaScriptObfuscator.obfuscate(
    code,
    obfuscatorOptions
  );
  fs.writeFileSync(filePath, obfuscationResult.getObfuscatedCode(), "utf8");
  console.log(`✅ Obfuscation complete for ${filePath}`);
}

async function main() {
  const ctxs = [];

  // Конфигурация для Клиента
  const clientConfig = {
    entryPoints: ["client/src/main.ts"],
    bundle: true,
    outfile: "client/out/main.js",
    external: ["vscode"],
    format: "cjs",
    platform: "node",
    target: "node20", // Соответствует VS Code engines.vscode >= 1.85.0
    minify: production, // Минификация (обфускация) только в продакшн режиме
    sourcemap: !production,
    sourcesContent: false,
  };

  // Конфигурация для Сервера
  const serverConfig = {
    entryPoints: ["server/src/core.ts"],
    bundle: true,
    outfile: "server/out/core.js",
    external: ["vscode"],
    format: "cjs",
    platform: "node",
    target: "node20",
    minify: production, // Минификация (обфускация) только в продакшн режиме
    sourcemap: !production,
    sourcesContent: false,
  };

  if (process.argv.includes("--watch")) {
    console.log("Watching for changes...");
    const clientCtx = await esbuild.context(clientConfig);
    const serverCtx = await esbuild.context(serverConfig);
    await clientCtx.watch();
    await serverCtx.watch();
  } else {
    console.log("Building extension...");
    await esbuild.build(clientConfig);
    await esbuild.build(serverConfig);
    
    // Применяем обфускацию, если это production билд
    if (production) {
      await obfuscateFile(path.join(__dirname, clientConfig.outfile));
      await obfuscateFile(path.join(__dirname, serverConfig.outfile));
    }
    
    console.log("Build complete!");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
