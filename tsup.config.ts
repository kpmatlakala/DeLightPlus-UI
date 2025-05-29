import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: false,
  external: ['react', 'react-dom'],
  noExternal: ['clsx'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'copy',
    };
  },
}); 