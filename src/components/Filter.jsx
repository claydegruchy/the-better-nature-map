import React, { useState } from 'react';
import ReactFilterBox, { SimpleResultProcessing } from 'react-filter-box';
import 'react-filter-box/lib/react-filter-box.css';

 const options = [
  {
    columnField: 'Name',
    type: 'number',
  },
  {
    columnField: 'Description',
    type: 'text',
  },
  {
    columnField: 'Status',
    type: 'selection', // when using type selection, it will automatically suggest all possible values
  },
  {
    columnText: 'Email @',
    columnField: 'Email',
    type: 'text',
  },
];

function Filter({ dataset }) {
  const [data, setData] = useState(dataset); // pass your data in here instead of empty array

  const onParseOk = (expressions) => {
    console.log({expressions})
    const newData = new SimpleResultProcessing(options).process(
      data,
      expressions
    );
    // your new data here, which is filtered out of the box by SimpleResultProcessing
    setData(newData);
  };

  return (
    <>
      <div className='main-container' style={{width:'60vw'}}>
        <h2>React Filter Box</h2>
        <ReactFilterBox data={data} options={options} onParseOk={onParseOk} />
      </div>
    </>
  );
}

export default Filter;
