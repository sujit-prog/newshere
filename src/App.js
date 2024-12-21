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
        {/* General News Route */}
        <Route
          path="/"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="general" />}
        />
        {/* Business News Route */}
        <Route
          path="/business"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="business" />}
        />
        {/* Entertainment News Route */}
        <Route
          path="/entertainment"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="entertainment" />}
        />
        {/* Health News Route */}
        <Route
          path="/health"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="health" />}
        />
        {/* Science News Route */}
        <Route
          path="/science"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="science" />}
        />
        {/* Sports News Route */}
        <Route
          path="/sports"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="sports" />}
        />
        {/* Technology News Route */}
        <Route
          path="/technology"
          element={<News setProgress={setProgress} apiKey={apiKey} pageSize={pageSize} country="us" category="technology" />}
        />
      </Routes>
    </div>
  );
};

export default App;
