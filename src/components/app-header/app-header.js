import SearchPanel from '../search-panel';
import './app-header.css'

const AppHeader = () => {
    return (
      <header className='header '>
        <h1>todos</h1>
        <SearchPanel />
      </header>
    );
  };
  
  export default AppHeader;