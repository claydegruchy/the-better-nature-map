import { useState, useEffect } from 'react';
import './App.css';
import Select from 'react-select';
import { Map, PreProcessGeodata } from './components/Map';
import Filter from './components/Filter';

import initGeodata from './components/formattedsearch.json';

var defaultUiParams = { minLength: 0, maxLength: 99999 };

function App() {
  const [uiOptions, setUiOptions] = useState(defaultUiParams);

  // holds the geo data

  const [masterGeodata, setMasterGeodata] = useState(
    PreProcessGeodata(initGeodata.features)
  );

  useEffect(() => {}, []);



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
      <div className={'main-windows'}>
        <div className={'control-panel'}>
          <div className='box'>
            Min length
            <input
              name={'Min length'}
              type={'number'}
              onChange={(e) => {
                setUiOptions({
                  ...uiOptions,
                  minLength: e.target.value,
                });
              }}
              value={uiOptions.minLength}
              placeholder={'Min length'}
            />
          </div>
          <div className='box'>
            max length
            <input
              name={'max length'}
              type={'number'}
              onChange={(e) => {
                setUiOptions({
                  ...uiOptions,
                  maxLength: e.target.value,
                });
              }}
              value={uiOptions.maxLength}
              placeholder={'max length'}
            />
          </div>

          {/*  <Filter
            dataset={filterMap}
            setData={(e) => console.log('here we update the filter', e)}
          />*/}
        </div>
        <Map masterGeodata={masterGeodata} uiOptions={uiOptions} />
      </div>
    </div>
  );
}

export default App;
