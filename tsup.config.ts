import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/components/index.ts',
    'src/icons/index.ts',
  ],
  format: ['esm', 'cjs'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  outDir: 'dist',
  shims: false,
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  noExternal: ['clsx'],
  esbuildOptions(options) {
    options.loader = {
      ...options.loader,
      '.css': 'copy',
    };
  },
}); 