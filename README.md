# datasite

Easily generate data-driven static sites.

## Usage

### Step 1: Set up a project

Start by initializing an NPM project:

```bash
npm init
# Follow the interactive prompts...
```

Next, add `datasite` as a dependency, and `http-server` as a development dependency:

```bash
npm install --save datasite
npm install --save-dev http-server
```

Add scripts to build your site and serve it locally:

```json
{
  "name": "my-cool-datasite",
  "scripts": {
    "start": "npm run build && npm run serve",
    "build": "datasite --config ./datasite.config.js",
    "serve": "http-server -p 3500 build/"
  },
  "dependencies": {
    "datasite": "^0.4.1"
  },
  "devDependencies": {
    "http-server": "^0.12.0"
  }
}
```

Create a file named `datasite.config.js`, and add this content to start:

```js
const SITE_DESCRIPTION = `
This is my cool Datasite.

Thank you for visiting!

## Datasite Features

- Easy configuration of datasets and dashboards
- Quick filtering
- Markdown support on site/dashboard descriptions (**bold**, _italics_, [links](https://www.youtube.com/watch?v=dQw4w9WgXcQ), etc.)
- And more!
`;

module.exports = {
  general: {
    title: 'My Cool Datasite',
    description: SITE_DESCRIPTION
  },
  datasets: [
    // Define datasets here
  ],
  dashboards: [
    // Define dashboards here
  ]
};
```

This will configure a datasite with no data yet, but with a Markdown-supported home page.

Run this script to build and serve your datasite:

```bash
npm start
```

Point your browser to http://localhost:3500 and you will see your new datasite!

### Step 2: Add data

Each dataset is a normalized list of headers and rows, ready to display in a table.

Datasets are generated from raw input files at build time.

Create an input file:

```bash
mkdir data
touch data/example-raw-data.json
```

And paste in some contents:

```json
{
  "data": [
    ["blue", "triangle", 87, false],
    ["red", "triangle", 60, true],
    ["blue", "square", 79, false],
    ["red", "circle", 65, false],
    ["green", "circle", 43, true]
  ]
}
```

Now, define a dataset that will transform this data into something that Datasite will understand:

**`datasite.config.js`**

```js
// ...

module.exports = {
  general: {
    title: 'My Cool Datasite',
    description: SITE_DESCRIPTION
  },
  datasets: [
    // Define datasets here
    {
      id: 'EXAMPLE_DATASET',
      inputFile: './data/example-raw-data.json',
      headers: [
        {
          id: 'color',
          title: 'Color'
        },
        {
          id: 'shape',
          title: 'Shape'
        },
        {
          id: 'size',
          title: 'Size'
        },
        {
          id: 'deluxe',
          title: 'Deluxe?'
        }
      ],
      inputToRows: (dataset) => {
        return dataset.data
          .map(inputRow => {
            const [color, shape, size, deluxe] = inputRow;

            // Each row is an object, containing keys that match `headers` above
            return {
              color,
              shape,
              size,
              deluxe
            };
          });
      }
    }
  ],
  dashboards: [
    // Define dashboards here
  ]
};
```

Datasets are referenced by dashboards, which also contain metadata like a title and description.

Define a dashboard:

**`datasite.config.js`**

```js
// ...

const EXAMPLE_DASHBOARD_DESCRIPTION = `
This shows data about a lot of shapes.

Read *all* about it.
`;

module.exports = {

  // ...

  dashboards: [
    // Define dashboards here
    {
      dataset: 'SHAPES',
      title: 'Data about Shapes',

      // Sets the URL for the dashboard
      slug: 'data-about-shapes',

      description: EXAMPLE_DASHBOARD_DESCRIPTION,
      filters: []
    }
  ]
};
```

Restart the script to build and serve your datasite:

```bash
npm start
```

And refresh your browser. Now there is a dashboard on the site!

### Step 3: Refactor as your datasite grows

Now that you know how to create datasets and dashboards, you can replace the examples with real content. As you add more data to your site, you may want to create new directories and files to organize everything. Then reference them from your config file.

Since Datasite acts on raw data files and converts them into normalized datasets, you will likely want to create bash scripts to generate or update these files.

Here is an example of how to organize a datasite:

```
my-project/
  config/
    datasets/
      animals.js
      people.js

  content/
    dashboards/
      animals.md
      people.md

    home.md

  data/
    raw-animal-data.json
    raw-people-data.json

  scripts/
    generate-animal-data.sh
    generate-people-data.sh

  datasite.config.js
  package.json
```
