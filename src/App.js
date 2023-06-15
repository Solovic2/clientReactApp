import './App.css';
import FilterBox from './Components/FilterBox/FilterBox';
import FilterSearch from './Components/FilterSearch/FilterSearch';
import FilterCards from './Components/FilterCards/FilterCards';

function App() {
  return (
    <>
      <FilterBox>
        <FilterSearch/>
        <FilterCards/>
      </FilterBox>
    </>
  );
}
 
export default App;
