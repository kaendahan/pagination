import pkg from "./package.json" assert { type: "json" };
import { dts } from "rollup-plugin-dts";
import typescript from "rollup-plugin-typescript2";
// import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import filesize from "rollup-plugin-filesize";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import generatePackageJson from "rollup-plugin-generate-package-json";
import copy from "rollup-plugin-copy";

const DIST_PATH = "./dist";
const external = Object.keys(pkg.peerDependencies);
/**
 * @type {import('rollup').RollupOptions}
 */

export default [
  {
    input: "./src/index.ts",
    output: [
      {
        file: `${DIST_PATH}/index.cjs.js`,
        format: "cjs",
        // sourcemap: true,
      },
      {
        file: `${DIST_PATH}/index.esm.js`,
        format: "esm",
        // sourcemap: true,
      },
    ],
    external,
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        useTsconfigDeclarationDir: true,
      }),
      terser(),
      generatePackageJson({
        baseContents: {
          name: pkg.name,
          author: pkg.author,
          version: pkg.version,
          description: pkg.description,
          keywords: pkg.keywords,
          license: pkg.license,
          repository: pkg.repository,
          homepage: pkg.homepage,
          bugs: pkg.bugs,
          publishConfig: pkg.publishConfig,
          peerDependencies: pkg.peerDependencies,
          main: "./index.cjs.js",
          module: "./index.esm.js",
          types: "./index.d.ts",
          scripts: {
            test: 'echo "Error: no test specified" && exit 1',
          },
        },
      }),
      copy({
        targets: [
          {
            src: "./LICENSE",
            dest: `${DIST_PATH}`,
          },
          {
            src: "./README.md",
            dest: `${DIST_PATH}`,
          },
        ],
      }),
      filesize(),
    ],
  },
  {
    input: "./types/index.d.ts",
    output: [
      {
        file: `${DIST_PATH}/index.d.ts`,
        format: "esm",
      },
    ],
    plugins: [dts()],
    external,
  },
];
