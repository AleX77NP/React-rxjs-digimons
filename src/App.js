import { useEffect, useMemo, useState } from 'react';
import { fromFetch } from "rxjs/fetch";
import { of, timer, zip } from "rxjs";
import { map, switchMap, catchError, startWith, mergeMap } from "rxjs/operators";
import { render } from "react-dom";
import { $ } from "react-rxjs-elements";
import './App.css';

function App() {

  const stream$ = useMemo(() => 
     fromFetch('https://digimon-api.vercel.app/api/digimon').pipe(
       mergeMap(response => response.json()),
       map(data => <div className="digi-grid">{data.map(elem => renderDigimon(elem))}</div>),
       catchError(() => of(<div><h2>ERROR...</h2></div>)),
       startWith(<div><h2>Loading...</h2></div>)
     )
  ,[]);


  const renderDigimon = (digimon) => {
    return <div className="digimon">
      <h3>{digimon.name}</h3>
      <img src={digimon.img} alt="" />
      <h4>{digimon.level}</h4>
    </div>
  }

  return (
    <div className="App">
      <div className="container">
      <h1>Fetched Digimons</h1>
        <$>{ stream$ }</$>
      </div>
    </div>
  );
}

export default App;
