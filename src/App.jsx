import { useFacts } from "./hooks/useFacts";

import "./App.css";

function App() {
  const {
    error: factsError,
    factOfTheDay,
    loading: factsLoading,
    randomFacts,
  } = useFacts();

  console.log(factOfTheDay);

  return <div>{/* <p>{factOfTheDay}</p> */}</div>;
}

export default App;
