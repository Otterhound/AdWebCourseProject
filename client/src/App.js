import './App.css';
import Heade from './components/Header';
import Login from "./components/Login";
import Register from './components/Register';
import Profile from './components/Profile';
import Snippets from './components/Snippests';
import Post from './components/Postsnippet';
import SnippedAndComment from './components/Commentsnippet';
import PostComment from './components/PostComment';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<div><Heade></Heade><Snippets></Snippets></div>}> </Route>
          <Route path='/register' element={<div><Heade></Heade><Register></Register></div>}> </Route>
          <Route path='/login' element={<div><Heade></Heade><Login></Login></div>}> </Route>
          <Route path='/profile' element={<div><Heade></Heade><Profile></Profile></div>}> </Route>
          <Route path='/post' element={<div><Heade></Heade><Post></Post></div>}> </Route>
          <Route path='/snippet' element={<div><Heade></Heade><SnippedAndComment></SnippedAndComment></div>}> </Route>
          <Route path='/comment' element={<div><Heade></Heade><PostComment></PostComment></div>}> </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
