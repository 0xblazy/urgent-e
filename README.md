# Urgent-E

Application de gestion des services des urgences dans les hôpitaux réalisée dans le cadre du cours de Technologies informatiques innovantes (Master 1 Sciences Cognitives, IDMC Nancy) par Isabel Mineiro, Sofiane Adjaoud, Nicolas Carbonnier et Inaya El Alaoui.

Cette application permet aux utilisateurs de suivre leurs métriques de santé, fournies par un objet connecté (montre, bracelet...) et de contacter les urgences en cas de besoin.\
Le temps d'attente indiqué aux utilisateurs dépendra de leur état de santé, de l'affluence des urgences et des dossiers potentiellement prioritaires détectés parmi les utilisateurs de l'application.

## Installation

### Installation du projet

Pour installer le projet, plusieurs choses sont à faire:
- Faites `npm install` pour installer les packages nécessaires à l'exécution du projet (**React Router**, **Formik**, **Yup**, **@react-google-maps/api** et **axios**)
- Faites `yarn start` pour lancer le projet
- Ouvrez [http://localhost:3000](http://localhost:3000) pour accéder à Urgent-E dans votre navigateur

### Installation de Strapi

Pour le moment, l'API Strapi fonctionne uniquement pour afficher des métriques sur le tableau de bord.\
Pour l'installer, voici la marche à suivre :
- déplacez le dossier `api-strapi` en dehors du projet `urgent-e`, sinon le projet ne compilera pas
- dans le dossier `api-strapi` déplacé, faites la commande `npm install` pour installer le projet
- après avoir relancé le terminal, faites `yarn run develop` pour lancer le projet
- Ouvrez [http://localhost:1337/admin](http://localhost:1337/admin) pour vous connecter à l'interface d'administration si vous le souhaitez (les identifants sont dans le fichier `strapi_access`) à la racine du projet principal

## Utilisation

Renseignez vos informations, surveillez vos métriques et contactez les urgences en cas de besoin !!!

### Tableau de bord

Surveillez vos métriques et recevez une alerte si l'une d'elles atteint un niveau critique.

#### Afficher les alertes

La partie API étant encore en développement, l'affichage de l'alerte se fait de facon manuelle, seulement pour voir quelle forme elle prend.\
Avec **React Developer Tools**, sélectionnez le second composant ***Dashboard*** (sans *withRouter*) et cochez l'état `alert` ou `alertCritical` pour afficher l'alerte et, pour `alertCritical`, le décompte et le message de contact des urgences.

### Mes Informations

Renseignez ici vos informations personnelles : nom, prénom, âge, poids, taille, numéro de téléphone, de sécurité sociale...

### Aller aux  Urgences

Indiquez votre motif, précisez le nouveau de douleur, sélectionnez un hopital près de vous, précisez si vous souhaitez une ambulance ou non, ajoutez vos informations personnelles si cela n'a pas été fait et soyez pris en charge rapidement par les services d'urgences.\
Avec votre numéro de patient, les urgences retrouveront facilement votre dossier.

#### Utiliser la carte Maps

Pour que la sélection de l'hopital fonctionne, plusieurs choses sont à faire (la première étape ne concerne pas le projet rendu, seulement un téléchargement depuis GitHub) :
- Créer une clé API sur [Google Cloud Platform](console.cloud.google.com) avec les API **Maps JavaScript API**, **Geocoding API** et **Places API**
- Créer un fichier `.env` à la racine du projet avec une variable `REACT_APP_GOOGLE_API_KEY=votreclé` pour pouvoir utiliser les API Maps
- Installer l'extension **Allow CORS** ([Chrome](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf), [Firefox](https://addons.mozilla.org/fr/firefox/addon/access-control-allow-origin/)) et l'activer pour permettre d'utiliser l'API **Places API** (qui est parfois bloquée sur un serveur local)

Vous pourrez alors choisir un hopital après avoir renseigner votre adresse et le périmètre de recherche.
