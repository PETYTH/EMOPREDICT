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
        <div className="analyzer">
                <h1>Détecteur d'Émotions</h1>
            <textarea
                placeholder="Entrez un texte à analyser..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: '100%', height: '80px', marginBottom: '10px', padding: '10px' }}
            />
            <button
                onClick={analyzeEmotion}
                disabled={loading}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', marginRight: '10px' }}
            >
                {loading ? 'Analyse en cours...' : 'Analyser l\'émotion'}
            </button>
            <button
                onClick={() => navigate('/history')}
                style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
                Voir l'historique
            </button>
            {emotion && (
                <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>
                    Émotion détectée : <span style={{ color: 'blue' }}>{emotion}</span>
                </div>
            )}
        </div>
    );
}

export default EmotionAnalyzer;
