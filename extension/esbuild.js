const esbuild = require("esbuild");

const production = process.argv.includes("--production");

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
    console.log("Build complete!");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
