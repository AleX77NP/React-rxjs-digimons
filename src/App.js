import { useEffect, useMemo, useState } from 'react';
import { fromFetch } from "rxjs/fetch";
import { of, timer, zip } from "rxjs";
import { map, switchMap, catchError, startWith, mergeMap } from "rxjs/operators";
import { render } from "react-dom";
import { $ } from "react-rxjs-elements";
import './App.css';

function App() {

const [digimons, setDigimons] = useState([]);


useEffect(() => {
  const subscription = fromFetch('https://digimon-api.vercel.app/api/digimon')
  .pipe(
    mergeMap(response => response.json())
  )
  .subscribe(data => setDigimons(data));

  return () => subscription.unsubscribe();
},[])

  return (
    <div className="App">
      <div class="container">
      <h1>Search Digimon by name:</h1>
      <div>
     {JSON.stringify(digimons)}
      </div>
      </div>
    </div>
  );
}

export default App;
