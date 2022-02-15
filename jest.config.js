/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleFileExtensions: ["ts", "js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/*.test.(ts)", "**/*.it.(ts)", "**/*.pact.(ts)"],
  watchPathIgnorePatterns: ["pact/logs/*", "pact/pacts/*"],
};
