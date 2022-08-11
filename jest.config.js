module.exports = {
  testMatch: [
    "<rootDir>/**/*.test.js",
    "<rootDir>/**/*.test.ts",
    "<rootDir>/test/**/*.test.js",
    "<rootDir>/test/**/*.test.ts"
  ],
  transform: {
    "^.+\\.ts?$": "ts-jest",
    "node_modules/round-to/.+\\.(j|t)s?$": "ts-jest"
  },
  transformIgnorePatterns: [
    "node_modules/(?!round-to/.*)"
  ],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/.next/",
    "<rootDir>/dist/",
    "<rootDir>/szamlazz/"
  ],
  moduleDirectories: [
    "node_modules",
    __dirname
  ],
  setupFiles: [
    "<rootDir>/test/dotenv-config.js"
  ]
}
