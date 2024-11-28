import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function EmotionAnalyzer() {
    const [text, setText] = useState('');
    const [emotion, setEmotion] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const analyzeEmotion = async () => {
        if (!text.trim()) {
            alert('Veuillez entrer un texte à analyser.');
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/detect`, { text });
            setEmotion(response.data.emotion);
        } catch (error) {
            console.error('Erreur lors de l\'analyse :', error);
            setEmotion('Erreur lors de l\'analyse');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="analyzer-container">
            <div className="analyzer-card">
                <h1>Emotions Predict</h1>
                <textarea
                    placeholder="Entrez un texte à analyser..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="analyzer-textarea"
                />
                <div className="analyzer-buttons">
                    <button onClick={analyzeEmotion} disabled={loading} className="analyzer-button">
                        {loading ? 'Analyse en cours...' : 'Analyser l\'émotion'}
                    </button>
                    <button onClick={() => navigate('/history')} className="analyzer-button secondary">
                        Voir l'historique
                    </button>
                </div>
                {emotion && (
                    <div className="emotion-result">
                        Émotion détectée : <span>{emotion}</span>
                    </div>
                )}
            </div>
        </div>
    );
}

export default EmotionAnalyzer;
