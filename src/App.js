import Search from './components/Search'
import CustomNav from './components/CustomNav'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <CustomNav/>
      <header className="App-header">
        <div className="row">
          <div className="col-sm-6"><Search label="Enter your first ticker"/></div>
          <div className="col-sm-6"><Search label="Enter another ticker"/></div>
        </div>
      </header>
    </div>
  );
}

export default App;
