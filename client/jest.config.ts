// jest.config.ts
import type { JestConfigWithTsJest } from "ts-jest";

const config: JestConfigWithTsJest = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  extensionsToTreatAsEsm: ['.ts', '.tsx', ],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      // ts-jest config options here, e.g.:
      useESM: true,
      tsconfig: 'tsconfig.json',
    }],
  },
  
  globals: {
    'ts-jest': {
      useESM: true,
    },
  }
}

export default config;
