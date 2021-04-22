# Urgent-E

Application de gestion des services des urgences dans les hôpitaux réalisée dans le cadre du cours de Technologies informatiques innovantes (Master 1 Sciences Cognitives, IDMC Nancy).

Cette application permet aux utilisateurs de suivre leurs métriques de santé, fournies par un objet connecté (montre, bracelet...) et de contacter les urgences en cas de besoin.\
Le temps d'attente indiqué aux utilisateurs dépendra de leur état de santé, de l'affluence des urgences et des dossiers potentiellement prioritaires détectés parmi les utilisateurs de l'application. 

## Scripts disponibles

Dans le répertoire du projet, vous pouvez faire :

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