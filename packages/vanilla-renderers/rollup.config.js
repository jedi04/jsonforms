import typescript from 'rollup-plugin-typescript2';
import cleanup from 'rollup-plugin-cleanup';
import { visualizer } from 'rollup-plugin-visualizer';
import postcss from "rollup-plugin-postcss";


const packageJson = require('./package.json');

const baseConfig = {
  input: 'src/index.ts',
  external: [
    ...Object.keys(packageJson.dependencies ?? {}),
    ...Object.keys(packageJson.peerDependencies),
    'react',
    /^lodash\/.*/,
    /^@material-ui\/.*/,
    /^dayjs\/.*/,
  ],
};

export default [
  {
    ...baseConfig,
    output: {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      postcss({
        config: './postcss.config.js',
        extract: true,
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      cleanup({ extensions: ['js', 'ts', 'jsx', 'tsx'] }),
      visualizer({ open: false }),
    ],
  },
  {
    ...baseConfig,
    output: {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      typescript({
        tsconfigOverride: {
          compilerOptions: {
            target: 'ES5',
          },
        },
      }),
      postcss({
        config: './postcss.config.js',
        extract: true,
        extensions: ['.css'],
        minimize: true,
        inject: {
          insertAt: 'top',
        },
      }),
      cleanup({ extensions: ['js', 'ts', 'jsx', 'tsx'] }),
    ],
  },
];
