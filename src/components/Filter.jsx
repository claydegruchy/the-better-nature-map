import { useState } from 'react';
import QueryBuilder from 'react-querybuilder';
import 'react-querybuilder/dist/query-builder.css';

const fields = [
  { name: 'firstName', label: 'First Name' },
  { name: 'lastName', label: 'Last Name' },
];

// const GetResults = query;

export default ({ dataset }) => {
  const [query, setQuery] = useState({
    combinator: 'and',
    rules: [
      { field: 'firstName', operator: '=', value: 'Steve' },
      { field: 'lastName', operator: '=', value: 'Vai' },
    ],
  });

  return (
    <QueryBuilder
      fields={fields}
      query={query}
      onQueryChange={(q) => {
        console.log({ q });
        setQuery(q);
      }}
    />
  );
};
