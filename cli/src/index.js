const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);
const chalk = require('chalk');
const execa = require('execa');
const uuidv5 = require('uuid/v5');

const PREBUILT_DIRECTORY = path.resolve(__dirname, '..', '..', 'build');

// Just a UUIDv4, to serve as the namespace for rows, to avoid collisions
const DATASITE_NAMESPACE = 'b487fdcc-66d9-4f69-8c2c-01bce826d976';

const program = require('commander');

program
  .option('-c, --config <path>', 'config file location');

program.parse(process.argv);

run(program);

async function run(program) {
  try {
    console.log(chalk.bold('Loading config...'));
    const configPath = resolvePath(program.config);
    const config = require(configPath);

    console.log(chalk.bold('Processing build directory...'));
    await processBuildDirectory();

    for (let dataset of config.datasets) {
      console.log(chalk.bold(`Processing dataset ${chalk.cyan(dataset.id)}...`));
      await processDataset(dataset);
    }

    console.log(chalk.bold('Creating manifest file...'));
    await createManifestFile(config);

    console.log(chalk.bold.green('Done.'));
  } catch (err) {
    console.log(chalk.red('Error while generating datasite:'));
    console.log(err);
    process.exit(1);
  }
}

async function processBuildDirectory() {
  const buildDirPath = resolvePath('build');

  await execa('rm', ['-rf', buildDirPath]);
  await execa('mkdir', [buildDirPath]);
  await execa('cp', ['-R', `${PREBUILT_DIRECTORY}/`, `${buildDirPath}/`]);
}

async function processDataset(datasetConfig) {
  const inputPath = resolvePath(datasetConfig.inputFile);
  const inputContents = require(inputPath);

  const rawRows = datasetConfig.inputToRows(inputContents);
  const rows = addRowIds(rawRows, datasetConfig.id);

  const dataset = {
    id: datasetConfig.id,
    headers: datasetConfig.headers,
    rows: rows
  };

  const outputPath = resolvePath(`build/dataset-${datasetConfig.id}.json`);
  await writeJsonFile(dataset, outputPath);
}

function addRowIds(rawRows, datasetId) {
  return rawRows.map((rawRow, idx) => {
    const idInput = `${datasetId}*row*${idx}`;
    const rowId = uuidv5(idInput, DATASITE_NAMESPACE);
    return {
      id: rowId,
      cells: rawRow
    };
  });
}

async function createManifestFile(config) {
  const manifest = {
    general: {
      title: config.general.title,
      description: config.general.description
    },
    dashboards: config.dashboards
  };

  const outputPath = resolvePath('build/datasite.manifest.json');
  await writeJsonFile(manifest, outputPath);
}

// Filesystem Utilities

async function writeJsonFile(contents, outputPath) {
  const contentsJson = JSON.stringify(contents, null, 2);
  await writeFile(outputPath, contentsJson);
}

function resolvePath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}
