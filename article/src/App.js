// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ArticleList from './ArticleList';
import SingleArticle from './SingleArticle';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/articles" replace />} />
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:slug" element={<SingleArticle />} />
      </Routes>
    </Router>
  );
}

export default App;
