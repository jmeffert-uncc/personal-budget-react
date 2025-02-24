import './App.scss';
import { 
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Menu from './Menu/Menu';
import Hero from './Hero/Hero';
import LoginPage from './LoginPage/LoginPage';
import AboutPage from './AboutPage/AboutPage';
import HomePage from './HomePage/HomePage';
import Footer from './Footer/Footer';


function App() {
  return (
    <Router>
      <div className="App">
        <Menu/>
        <Hero/>
        <div className="mainContainer">
          <Routes>
            <Route path="/about" element={<AboutPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<HomePage/>} />
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
