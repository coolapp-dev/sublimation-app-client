
// import { defineConfig } from "tsup";
// import tsconfig from "./tsconfig.json";

// export default defineConfig((options)=>({
//   entry: [
//     "src/index.ts",
//   ],
//   dts: true,
//   outDir:"dist",
//   format: ["esm", "cjs"],
//   name: "sublimation-app-client",
//   splitting: false,
//   outExtension({ format }) {
//     return {
//       js: `.${format}.js`,
//     };
//   },
//   sourcemap: true,
//   clean: true,
//   target: tsconfig.compilerOptions.target as "es2016",
//   minify: false,
//   // minify: !options.watch == Conditional config ==
// }));



import type { Options } from 'tsup'

const config: Options = {
    entry: ['src/index.ts'],
    dts: true,
    sourcemap: true,
    format: ['iife', 'cjs', 'esm'],
  }

export default config