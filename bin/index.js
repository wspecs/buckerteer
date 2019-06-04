#!/usr/bin/env node

const program = require('commander');
const log = require('great-logs');
const lib = require('./../dist/index');

program.version('0.0.1').option('-b --bucket [bucket]', 'bucket name');
program.parse(process.argv);

if (program.bucket) {
  log.info('Install app for bucket:', program.bucket);
  lib.fetchAndInstallApps(program.bucket);
} else {
  log.error('Please enter a bucket name');
}
