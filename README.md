# Garage-parrot

Application web pour un garage automobile. Permet à l'administrateur, aux employés et aux visiteurs d'effectuer les tâches suivantes:
<table>
  <thead>
    <tr>
        <th></th>
      <th>Administrateur</th>
      <th>Employés</th>
      <th>Visiteur</th>
    </tr>
  </thead>
  <tr>
    <td>Se connecter</td>
    <td>✔</td>
    <td>✔</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Création d'un compte</td>
    <td>✔</td>
    <td>❌</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Afficher les voitures</td>
    <td>✔</td>
    <td>✔</td>
    <td>✔</td>
  </tr>
  <tr>
    <td>Ajouter/modifier l'annonce d'un véhicule</td>
    <td>❌</td>
    <td>✔</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Gérer les services</td>
    <td>✔</td>
    <td>❌</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Ajouter un témoignage</td>
    <td>❌</td>
    <td>✔</td>
    <td>✔</td>
  </tr>
  <tr>
    <td>Modérer les témoignages</td>
    <td>❌</td>
    <td>✔</td>
    <td>❌</td>
  </tr>
  <tr>
    <td>Contacter le garage</td>
    <td>❌</td>
    <td>❌</td>
    <td>✔</td>
  </tr>
</table>


## Pre-requis
Afin de pouvoir exécuter l'application sur votre poste, vous devez d'abord installer les dépendances suivantes :

 - MariaDB
 - Node.js

## Installation
### Installation des dépendences de Node.js
```bash
$ npm install
```
### Créer un fichier .env
Créer un fichier .env à la racine du projet et renseigner les variables suivantes:
```shell
    WEB_PORT #Port sur lequel l'application sera lancée
    DB_PORT #Port sur lequel la base de données écoute
    DB_HOST #Adresse IP de la base de données
    DB_USER #Utilisateur de la base de données
    DB_PASSWORD #Mot de passe de l'utilisateur de la base de données
    DB_DATABASE #Nom de la base de données
    SESSION_SECRET #Clé secrète utilisée par la session
    ADMIN_EMAIL #Adresse mail de l'administrateur de l'application
    ADMIN_PSWD #Mot de passe de l'administrateur de l'application minimum 8 charactères
    ADMIN_FIRSTNAME #Prénom de l'administrateur
    ADMIN_LASTNAME #Nom de l'administrateur
```

### Création de la base de données et de l'admin
Initialisation de la base de données et de l'utilisateur admin
```bash
$ npm run init
```
NB: S'assurer que la base de données est fonctionnel

## Execution
Lancer le serveur en rentrant la commande suivante:
```bash
$ npm run dev
```
Se rendre à http://localhost:WEB_PORT

NB: Se rendre à http://localhost:WEB_PORT/back-office/admin pour accéder à la page admin et  se rendre à http://localhost:WEB_PORT/back-office/employee pour accéder à la page employé
