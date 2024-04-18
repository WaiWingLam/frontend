import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ArtsList from './item';

const App = () => (
    <div className='container'>
        <Routes>
            <Route path="/"  element={<ArtsList />} />
        </Routes>
    </div>
);

export default App;