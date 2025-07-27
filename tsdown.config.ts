import { defineConfig, type UserConfig } from 'tsdown/config';

export default defineConfig({
  entry: ['src/index.ts'],
  fixedExtension: true,
  format: ['esm', 'cjs'],
  sourcemap: true
}) as UserConfig;
