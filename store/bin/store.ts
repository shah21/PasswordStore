#!/usr/bin/env node


import pkg from '../package.json';
import program from 'commander';


program
    .version(pkg.version)
    .command('apps','Manage Apps and Passwords')
    .command('login','Login to password store')
    .parse(process.argv);
