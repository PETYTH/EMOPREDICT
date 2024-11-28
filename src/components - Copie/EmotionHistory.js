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
        <div className="history" style={{ padding: '20px', position: 'relative' }}>
            {/* Bouton "Retour à l'accueil" */}
            <button
                onClick={() => navigate('/')} // Redirection vers la page d'accueil
                style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '10px 15px',
                    fontSize: '14px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Retour à l'accueil
            </button>

            <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Historique des analyses</h2>
            {loading ? (
                <p>Chargement de l'historique...</p>
            ) : history.length === 0 ? (
                <p>Aucun historique disponible.</p>
            ) : (
                <ul>
                    {history.map((entry, index) => (
                        <li key={index}>
                            <strong>{entry.text}</strong> - {entry.emotion} ({new Date(entry.createdAt).toLocaleString()})
                        </li>
                    ))}
                </ul>
            )}
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    style={{ marginRight: '10px', padding: '5px 10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
                >
                    Précédent
                </button>
                <span>Page {currentPage} sur {totalPages}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    style={{ marginLeft: '10px', padding: '5px 10px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
                >
                    Suivant
                </button>
            </div>
        </div>
    );
}

export default EmotionHistory;
