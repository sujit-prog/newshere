import './App.css';
import React, { useState } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

const App = () => {
  const pageSize = 5;
  const apiKey = process.env.REACT_APP_NEWS_API; // Ensure this matches the variable in your .env file
  const [progress, setProgress] = useState(0); // Initialize with a default value

  return (
    <div>
      <NavBar />
      <LoadingBar height={3} color='#f11946' progress={progress} />
      <Routes>
        <Route exact path="/" element={<News key="home" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/newsHERE" element={<News key="newsHERE" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/general" element={<News key="general" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="general" />} />
        <Route exact path="/business" element={<News key="business" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="business" />} />
        <Route exact path="/entertainment" element={<News key="entertainment" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="in" category="entertainment" />} />
        <Route exact path="/health" element={<News key="health" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="health" />} />
        <Route exact path="/science" element={<News key="science" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="science" />} />
        <Route exact path="/sports" element={<News key="sports" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="sports" />} />
        <Route exact path="/technology" element={<News key="technology" setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="technology" />} />
      </Routes>
    </div>
  );
};

export default App;
