import React from 'react';
import './App.css';
import Homepage from './Pages/Homepage/homepage';
import Menu from './Pages/Menu/Menu';
import FAQ from './Pages/FAQ/FAQ';
import Chat from './Pages/Chat/Chat'
import {Route, Routes } from 'react-router-dom';


function App() {
  return (
  <>
  <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/FAQs" element={<FAQ />} />
          <Route path="/Chat" element={<Chat />} />
  </Routes>

  </>
    

    
  );
}

export default App;
