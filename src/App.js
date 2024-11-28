import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmotionAnalyzer from './components/EmotionAnalyzer';
import EmotionHistory from './components/EmotionHistory';
import './styles.css';

function App() {
    return (
        <Router>
            <div className="container">
                <Routes>
                    <Route path="/" element={<EmotionAnalyzer />} />
                    <Route path="/history" element={<EmotionHistory />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
