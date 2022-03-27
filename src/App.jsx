import { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import { Map, PreProcessGeodata } from './components/Map';
import Filter from './components/Filter';

import initGeodata from './components/formattedsearch.json';

var defaultUiParams = {};

function App() {
  const [uiOptions, setUiOptions] = useState(defaultUiParams);

  // holds the geo data
  const [geodata, setGeodata] = useState(initGeodata);
  // holds a simple version used for filtering
  const [filterMap, setFilterMap] = useState();

  useEffect(() => {
    var processedGeodata = PreProcessGeodata(geodata.features);
    setFilterMap(processedGeodata.map((feature) => feature.properties));
    setGeodata(processedGeodata);
  }, []);

  useEffect(() => {
    console.log('update the geo data ehre');
  }, [filterMap]);

  console.log({ filterMap });

  const SearchableDropdown = ({ label, options, selectParams }) => {
    const set = (e) => setUiOptions({ ...uiOptions, [label]: e });
    return (
      <div>
        {/*this select package really fucking sucks ass, the style application
         system is garbo and akin to banging rocks together */}
        <Select
          // isClearable
          {...selectParams}
          // placeholder={''}
          value={uiOptions[label]}
          onChange={set}
          // theme={themes[uiOptions.selectedTheme.value]}
          // styles={dropDownStyles}
          options={options}
        />
      </div>
    );
  };
  const Checkbox = ({ label, secretMessage }) => {
    const set = (e) =>
      setUiOptions({ ...uiOptions, [label]: !uiOptions[label] });
    return (
      <div title={secretMessage}>
        <input
          name={label}
          type='checkbox'
          checked={uiOptions[label]}
          onChange={set}
        />
        <div>{label}</div>
      </div>
    );
  };
  return (
    <div className='App'>
      <Filter
        dataset={filterMap}
        setData={(e) => console.log('here we update the filter', e)}
      />
      <div className={'main-windows'}>
        <div className={'control-panel'}></div>
        <Map geodata={geodata} />
      </div>
    </div>
  );
}

export default App;
