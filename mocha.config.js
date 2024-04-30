module.exports = {
  require: '@babel/register', // for Babel integration
  spec: "test/**/*.test.js', // pattern to find test files",
  timeout: 5000, // set default test timeout
  reporter: 'spec', // use the "spec" reporter
}
