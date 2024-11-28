const express = require('express');
const Emotion = require('../models/Emotion');
const { HfInference } = require('@huggingface/inference');

const router = express.Router();

// Initialiser Hugging Face avec votre clé API
const hf = new HfInference(process.env.HUGGINGFACE_API_KEY || '');

// Fonction pour analyser les émotions
const detectEmotion = async (text) => {
    try {
        // Appel au modèle Hugging Face pour l'analyse des émotions
        const result = await hf.textClassification({
            model: 'j-hartmann/emotion-english-distilroberta-base',
            inputs: text,
        });

        // Tri des résultats par score décroissant
        const sortedResults = result.sort((a, b) => b.score - a.score);

        // Récupérer l'émotion dominante (label et compatibilité)
        const dominantEmotion = {
            label: sortedResults[0].label,
            compatibility: (sortedResults[0].score * 100).toFixed(2), // En pourcentage
        };

        console.log('Émotion dominante :', dominantEmotion);
        return dominantEmotion;
    } catch (error) {
        console.error('Erreur lors de l\'analyse des émotions :', error);
        return { label: 'error', compatibility: '0.00' };
    }
};

// POST /api/emotions/detect
router.post('/detect', async (req, res) => {
    const { text } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'Le texte est requis pour l\'analyse.' });
    }

    try {
        const emotion = await detectEmotion(text);

        // Enregistrer seulement l'étiquette (label) de l'émotion dans la base de données
        const newEmotion = new Emotion({ text, emotion: emotion.label });
        await newEmotion.save();

        // Répondre avec l'étiquette et la compatibilité
        res.json({
            emotion: emotion.label,
            compatibility: emotion.compatibility, // Compatibilité seulement pour affichage
        });
    } catch (error) {
        console.error('Erreur lors de l\'enregistrement ou de l\'analyse :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

// GET /api/emotions/history
router.get('/history', async (req, res) => {
    try {
        const history = await Emotion.find().sort({ createdAt: -1 });
        res.json(history);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique :', error);
        res.status(500).json({ error: 'Erreur interne du serveur.' });
    }
});

module.exports = router;
