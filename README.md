# EMOPREDICT

Analyseur d'Émotions - Machine Learning


Description :
Ce projet est un analyseur d'émotions basé sur Machine Learning, permettant de détecter et d'analyser les émotions présentes dans un texte soumis par un utilisateur. L'application utilise un modèle pré-entraîné via l'API Hugging Face pour détecter des émotions comme joie, tristesse, colère, ou neutralité.

L'application comprend :
- Un backend pour gérer l'analyse des émotions et stocker les données dans une base de données MongoDB.
- Un frontend pour soumettre des textes et afficher les résultats de l'analyse dans une interface utilisateur stylisée.

Fonctionnalités principales :
- Analyse des émotions via un modèle pré-entraîné Hugging Face.
- Affichage de l'émotion dominante avec un score de compatibilité.
- Liste des émotions détectées avec leurs probabilités respectives.
- Stockage de l'émotion dominante et du texte analysé dans une base de données MongoDB.
- Historique des analyses (option future).

Technologies utilisées:

Backend :
- Node.js : Serveur backend.
- Express.js : Framework web pour gérer les routes et API.
- Mongoose : ODM pour MongoDB.
- Hugging Face Inference API : Analyse des émotions à l'aide d'un modèle NLP.
- dotenv : Gestion des variables d'environnement.

Frontend :
- React.js : Interface utilisateur dynamique.
- Axios : Gestion des requêtes HTTP.
- CSS : Stylisation de l'interface utilisateur.

Base de données
- MongoDB : Base de données NoSQL pour stocker les textes soumis et les émotions détectées.

Installation et configuration : 

Prérequis:
- Télécharger Node.js
- Assurez-vous que MongoDB est installé et en cours d'exécution.
- Générez une clé d'accès via Hugging Face.

Étapes d'installation :

Backend :
1. Clonez le dépôt :
git clone <URL_DU_DEPOT>
cd emotion-detector/backend

2. Intallez les dépendances :
npm install

3. Configurez les variables d'environnement :
- Créez un fichier .env dans le répertoire backend.
- Ajoutez les clés suivantes :
HUGGINGFACE_API_KEY=<VOTRE_CLE_HUGGINGFACE>
MONGO_URI=mongodb://127.0.0.1:27017/emotionDB
PORT=5000

4. Démarrez le server backend : 
npm start

Frontend:
1. Allez dans le répertoire Frontend :
cd ../frontend

2. Démarrez l'application :
ng serve

Utilisation :
- Accédez au frontend via : http://localhost:3000.
- Entrez un texte dans la zone prévue et cliquez sur "Analyser l'émotion".
L'application affichera :
Soit l'émotion dominante avec son score de compatibilité.
Soit toutes les émotions détectées avec leurs scores respectifs.
Et les résultats sont automatiquement enregistrés dans MongoDB.
