import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import axios from 'axios';
import { parseBggXmlApi2ThingResponse } from './board-game-geek-fixed';
import { BggThing } from '@code-bucket/board-game-geek';

const useThing = () => {
  const [thing, setThing] = useState<BggThing | null>();

  const getThing = async () => {
    const response = await axios.get("https://api.geekdo.com/xmlapi2/thing?id=170416&versions=1'");
    const bggResponse = parseBggXmlApi2ThingResponse(response);
    console.log('bggResponse', bggResponse);

    const thing = bggResponse?.item;
    setThing(thing);
  };

  useEffect(() => {
    getThing();
  }, []);

  return thing;
};

function App() {
  const [count, setCount] = useState(0);

  const thing = useThing();
  console.log('thing', thing);

  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </div>
  );
}

export default App;
