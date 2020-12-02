import './App.css';
import Heading from './Components/header';
import Joblisting from './Components/job_listings';
import SearchBar from './Components/search_bar';

function App() {
  return (
    <div className="App">
     <Heading/>
     <SearchBar/>
     <Joblisting/>

    </div>
  );
}

export default App;
