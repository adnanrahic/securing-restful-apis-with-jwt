/* eslint-env mocha */

const path = require('path')
const Mocha = require('mocha')
const mocha = new Mocha()
const chai = require('chai')
chai.use(require('chai-http'))
chai.use(require('chai-as-promised'))
const testDir = 'test'

// Add test files
var files = Mocha.utils.lookupFiles(testDir, ['js'], true)
files.forEach(function (file) {
  mocha.addFile(file)
})

global.__root = path.join(__dirname)

// Start server
require('./server')

// Run tests
mocha.ui('bdd').run(code => {
  process.exit(code)
}) // exit the node process on test end
