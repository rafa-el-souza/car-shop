module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "include": [
    "src/app/models",
    "src/app/services",
    "src/app/controllers",
    "src/app/helpers"
  ],
  "reporter": [
    "text",
    "text-summary",
    "json-summary",
    "html",
    "lcov"
  ],
}
