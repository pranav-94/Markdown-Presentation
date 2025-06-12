const { createDefaultPreset } = require("ts-jest");

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(test).[tj]s?(x)'], // ✅ catches *.test.ts
  testPathIgnorePatterns: ['/node_modules/'], // ✅ Unix-style paths
};
