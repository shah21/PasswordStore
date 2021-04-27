#!/usr/bin/env node


import pkg from '../package.json';
import program from 'commander';


program
    .version(pkg.version)
    .command('apps','Manage Apps and Passwords')
    .command('user','Manage user and Login to password store')
    .parse(process.argv);
