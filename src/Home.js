import Search from './components/Search'
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  return (
    <div className="Home">
      <header className="App-header">
        <p>Home</p>
        <div className="row">
          <div className="col-sm-6"><Search label="Enter your first ticker"/></div>
          <div className="col-sm-6"><Search label="Enter another ticker"/></div>
        </div>
      </header>
    </div>
  );
}

export default Home;
