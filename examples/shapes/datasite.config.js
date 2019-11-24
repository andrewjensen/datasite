module.exports = {
  general: {
    title: 'My Shapes Datasite',
    description: 'This is a site all about shapes.\n\nIt is fun!\n\nRead all about it.'
  },
  datasets: [
    {
      id: 'SHAPES',
      inputFile: './raw-data/shapes.json',
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
        return dataset;
      }
    }
  ],
  dashboards: [
    {
      title: 'Data about Shapes',
      description: 'This shows data about a lot of shapes.\n\nRead *all* about it.',
      dataset: 'SHAPES',
      filters: []
    }
  ]
};
