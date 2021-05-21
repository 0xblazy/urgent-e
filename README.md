# Urgent-E

Application de gestion des services des urgences dans les hôpitaux réalisée dans le cadre du cours de Technologies informatiques innovantes (Master 1 Sciences Cognitives, IDMC Nancy).

Cette application permet aux utilisateurs de suivre leurs métriques de santé, fournies par un objet connecté (montre, bracelet...) et de contacter les urgences en cas de besoin.\
Le temps d'attente indiqué aux utilisateurs dépendra de leur état de santé, de l'affluence des urgences et des dossiers potentiellement prioritaires détectés parmi les utilisateurs de l'application.

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
Avec votre numéro de patient, les urgences retrouverons facilement votre dossier.

## Scripts disponibles

Dans le répertoire du projet, vous pouvez faire :

### `npm install`

Installez les packages nécessaires à l'exécution du projet.

### `yarn start`

Lancez l'application en mode développement.\
Ouvrez [http://localhost:3000](http://localhost:3000) pour la voir dans votre navigateur.

La page se rechargera si vous apportez des modifications.\
Vous verrez également toutes les erreurs dans la console.

### `yarn build`

Compilez l'application pour la production dans le dossier `build`. \
Le script regroupe correctement React en mode production et optimise la compilation pour les meilleures performances.

La compilation est minifiée et les noms de fichiers incluent les hachages. \
Votre application est prête à être déployée!

Consultez la section sur [déploiement](https://facebook.github.io/create-react-app/docs/deployment) pour plus d'informations.
