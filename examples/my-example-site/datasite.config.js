module.exports = {
  general: {
    title: 'My Example Site',
    description: 'This is a site all about **shapes** and **org charts**.\n\nIt is fun!\n\nRead all about it.'
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
    },
    {
      id: 'PEOPLE',
      inputFile: './raw-data/org.json',
      headers: [
        {
          id: 'id',
          title: 'ID'
        },
        {
          id: 'name',
          title: 'Name'
        },
        {
          id: 'role',
          title: 'Role'
        }
      ],
      inputToRows: (dataset) => {
        const rootPerson = dataset.org;

        return getPeople(rootPerson);
      }
    }
  ],
  dashboards: [
    {
      title: 'Data about Shapes',
      slug: 'data-about-shapes',
      description: 'This shows data about a lot of shapes.\n\nRead *all* about it.',
      dataset: 'SHAPES',
      filters: [
        {
          id: 1,
          column: 'shape',
          filterValue: 'triangle',
          enabled: false
        },
        {
          id: 2,
          column: 'deluxe',
          filterValue: 'true',
          enabled: false
        }
      ]
    },
    {
      title: 'Org Chart',
      slug: 'org-chart',
      description: 'This shows flattened data about people in an org chart.',
      dataset: 'PEOPLE',
      filters: []
    }
  ]
};

function getPeople(rootPerson) {
  const people = [];

  const convertedRootPerson = makePerson(
    rootPerson.id,
    rootPerson.name,
    rootPerson.role,
  );
  people.push(convertedRootPerson);

  for (let reportPerson of rootPerson.reports || []) {
    people.push(...getPeople(reportPerson));
  }

  return people;
}

function makePerson(id, name, role) {
  return {
    id,
    name,
    role
  };
}
