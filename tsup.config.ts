import type { Options } from "tsup";

// const config: Options = {
// 	entry: ["src/index.ts"],
// 	dts: true,
// 	sourcemap: true,
// 	format: ["iife", "cjs", "esm"],
// };

// export default config;

import { defineConfig } from 'tsup'

export default defineConfig({
  target: 'es2020',
  format: ['cjs', 'esm'],
  splitting: true,
  minify: true,
  sourcemap: true,
  clean: true,
  dts: true
})