# Projet NFactoryJob

Projet de groupe réalisé par :

**Maxence BOSSIN**
**Anthony CHEVALIER** _en tant que chef de projet_
**Léonard JOUEN**
**Romain LALLEMENT**

## Description du besoin client

Une agence de recrutement cherche à mordeniser sa lecture de CV.

Avant les personnes devait envoyer des CVs manuscits à l'agence ou bien des PDF en ligne par mail.

Elle desire numérisé son processus pour qu'un utilisateur puisse directement saisir son CV en ligne.
Une fois le CV créer par l'utilsateur (connecté ou non) les recruteurs du cabinet pourront le generer en PDF. L'utilisateur pourra également le generer en PDF pour ces besoins personels.

## Réponse au besoin

### Compte

Nous avons créer un site WEB via ** WORDPRESS **
Il y a trois rôle d'utlisateur :

- [x] Adiminsitrateur => Gestion des compte via l'interface de wordpress
- [x] Recruteur => Posiblité de trier les CV correspondant au besoin des entreprises | possibilité de telercharger les CV en PDF
- [x] Chercheur d'emploie => Posibilité de s'enregister pour garder en mémoire ces infomation | créer un CV

### Technologies Utilisés

#### Backend

- **PHP** avec wordpress, intéragis avec le serveur. Il nous a également servi à créer les API pour l'ajax.

#### FrontEnd

- **HTML** Il permet d'enrichir un texte avec des informations structurelles, sémantiques et de présentation.
- **SASS** livrairie CSS, stylise le HTML
- **JQUERY** livrairie Javascript, intéraction avec les pages WEB

#### Système de gestion de base de données

- **PhpMyAdmin** phpMyAdmin est une application Web de gestion pour les systèmes de gestion de base de donnée

#### Le modèle conceptuel des données

(ajouter l'image)

## Mise en place du projet

### 1. Instalation de **WORDPRESS**

#### L'installation en local

##### Instalation de XAMPP, simule un serveur en local

Installation de Xampp (terlerchargement de la version correspondant à votre systeme d'exploitation) : https://www.apachefriends.org/fr/index.html
Ensuite Allumer XAMMP cliquer sur RUN pour Appache et MySql

![Image XAMP](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/XAMP.PNG)

Pour WINDOW :
Une fois l'installation fini un dossier xampp s'est créer à l'endroit où vous l'avez installer.
Normalement il se situe sur votre disque C à l'emplacement : C:\xampp\htdocs
Vous devrai ensuite placer votre WORDPRESS dans le dossier **htdocs**

##### Instalation de WORDPRESS

Une fois fait vous devez installer **WORDPRESS**

Rendez-vous sur ce site : https://fr.wordpress.org/download/
Il fait décendre un peu et cliquer sur le bouton "Télecharger WordPress 5.9"
à noté que la version peut changer, ça n'a pas d'importance.

![Image Installation de WordPress](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/wordpressInstallation.PNG)

###### Instalation de WORDPRESS

### 2. Telechargement du thème _NFactoryJob_

Via GITHUB :

![Image GIT CLONE](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/gitClone.png)

Bien vérifier que vous êtes sur la branche _*Master*_ comme l'encardré en rouge en haut à droite.
Ensuite cliqué sur '_code_' une petite fenêtre va s'ouvire. Alors cliquer sur les deux carés surligné en rouge sur l'image.

### 2.1 Installation du thème _NFactoryJob_

Rendez-vous dans votre explorateur de fichier et allez la ou vous voulez crée votre site. Après cette étapes nous allons commencer l'installation de **Wordpress** :

#### Installation de Wordpress :
Précédement nous vous avons demandez de télécharger, il est temps de les utilisez.  

En premier lieux nous allons installez les fichiers de wordpress dans le dossier de notre site pour cela vous allez devoir ouvrir via (WinRar ou 7Zip) l'archive que vous avez télécharger tout à l'heure.    

Dans cette archive vous allez trouvez un fichier **"wordpress"** ce fichier contient tout ce que le site à besoin pour fonctionnez.    

Maintenant ce fichier il va falloir le mettre dans le fichier de votre site pour cela vous allez copier le fichier dans l'archive et le copier dans le fichier de votre site.    

![Image FICHIER DU SITE](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/gitClone.png)

#### Installation du thème _NFactoryJob_  
Pour installez le thème

### . Mise en place de la BDD

### . Comment passer un compte en recruteur
