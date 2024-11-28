import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Pour naviguer entre les pages
import axios from 'axios';

function EmotionHistory() {
    const [history, setHistory] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // Hook pour la navigation
    const itemsPerPage = 5; // Nombre d'éléments par page

    const fetchHistory = async (page) => {
        setLoading(true);
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/history?page=${page}&limit=${itemsPerPage}`);
            setHistory(response.data.history);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error('Erreur lors de la récupération de l\'historique :', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory(1);
    }, []);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            fetchHistory(page);
        }
    };

    return (
        <div className="history-container">
            {/* Bouton "Retour à l'accueil" */}
            <button onClick={() => navigate('/')} className="history-back-button">
                Retour à l'accueil
            </button>

            <div className="history-card">
                <h2>Historique des analyses</h2>
                {loading ? (
                    <p>Chargement de l'historique...</p>
                ) : history.length === 0 ? (
                    <p>Aucun historique disponible.</p>
                ) : (
                    <ul className="history-list">
                        {history.map((entry, index) => (
                            <li key={index} className="history-item">
                                <strong>{entry.text}</strong> - {entry.emotion} (
                                {new Date(entry.createdAt).toLocaleString()})
                            </li>
                        ))}
                    </ul>
                )}

                <div className="history-pagination">
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`}
                    >
                        Précédent
                    </button>
                    <span>
                        Page {currentPage} sur {totalPages}
                    </span>
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`}
                    >
                        Suivant
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EmotionHistory;
