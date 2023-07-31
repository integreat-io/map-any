module.exports = {
  extensions: ['ts'],
  require: ['ts-node/register/transpile-only'],
  ignoredByWatcher: ['{coverage,dist,media}/**', '**/*.md'],
  files: ['src/**/*.test.ts'],
}
