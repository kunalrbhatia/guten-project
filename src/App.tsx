import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LanguageSwitcher from 'components/LanguageSwitcher/LanguageSwitcher';
import GenreSelector from 'components/GenreSelector/GenreSelector';
import DetailsPage from 'components/DetailsPage/DetailsPage';

function App() {
  return (
    <Router>
      <div className="App w-full p-6 bg-gutenLightGrey">
        <div className="flex justify-end w-full mb-4">
          <LanguageSwitcher />
        </div>
        <Routes>
          <Route path="/" element={<GenreSelector />} />
          <Route path="/details/:title" element={<DetailsPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
