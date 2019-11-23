const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const writeFile = promisify(fs.writeFile);

const program = require('commander');

program
  .option('-c, --config <path>', 'config file location');

program.parse(process.argv);

run(program);

async function run(program) {
  const configPath = resolvePath(program.config);
  const config = require(configPath);

  handleConfig(config);
}

async function handleConfig(config) {

  console.log('config:', config);

  const datasetConfig = config.datasets[0];

  await handleDataset(datasetConfig);
}

async function handleDataset(datasetConfig) {
  console.log('dataset', datasetConfig);

  const inputPath = resolvePath(datasetConfig.input);

  const contents = require(inputPath);

  const rows = datasetConfig.datasetToRows(contents);

  console.log('rows:', rows);

  const outputPath = resolvePath(`datasets-output/dataset-${datasetConfig.id}.json`);

  console.log('output path:', outputPath);

  const dataset = {
    id: datasetConfig.id,
    headers: datasetConfig.headers,
    rows: rows
  };

  const outputJson = JSON.stringify(dataset, null, 2);

  await writeFile(outputPath, outputJson);

  console.log('Saved output file.');
}

function resolvePath(relativePath) {
  return path.resolve(process.cwd(), relativePath);
}
