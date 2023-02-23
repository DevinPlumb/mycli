#!/usr/bin/env node

import yargs from 'yargs/yargs';
import { hideBin } from 'yargs/helpers';
import chalk from 'chalk';
import boxen from 'boxen';
import { translate } from '@vitalets/google-translate-api';

const usage = chalk.magenta("\nUsage: mycli -l <language>  -s <sentence> \n")
+ boxen(chalk.green("\n" + "Translates a sentence to specific language" + "\n"), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n";

const argv = yargs(hideBin(process.argv))
  .usage(usage)
  .option('l', {
    alias: 'language',
    type: 'string',
    description: 'Translate to language',
    demandOption: false
  })
  .option('s', {
    alias:'sentence',
    describe: 'Sentence to be translated',
    type: 'string',
    demandOption: false })
  .help(true)
  .argv;

const language =  argv.l  || argv.language;

const sentence =  argv.s  || argv.sentence;

const { text } = await translate(sentence, { to: language.toLowerCase() });
console.log("\n" + boxen(chalk.green(sentence + "\n\n" + text
), {padding: 1, borderColor: 'green', dimBorder: true}) + "\n");