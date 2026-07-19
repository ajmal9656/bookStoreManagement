export default {
  testEnvironment: "node",

  roots: ["<rootDir>/tests"],

  testMatch: ["**/*.test.js"],

  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],

  verbose: true,

  detectOpenHandles: true,

  forceExit: true,
};