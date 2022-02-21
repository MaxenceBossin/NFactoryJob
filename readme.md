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

Via ZIP :

![Image DL VIA ZIP](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/gitzip.PNG)

Bien vérifier que vous êtes sur la branche _*Master*_ comme l'encardré en rouge en haut à droite.
Ensuite cliqué sur '_code_' une petite fenêtre va s'ouvire. Alors cliqyer sur '_Download ZIP_' qui se trouve dans l'encadré blanc


### 2.1 Installation du thème _NFactoryJob_

Rendez-vous dans votre explorateur de fichier et allez la ou vous voulez crée votre site. Après cette étapes nous allons commencer l'installation de **Wordpress** :

#### Installation de Wordpress :
Précédement nous vous avons demandez de télécharger, il est temps de les utilisez.  

En premier lieux nous allons installez les fichiers de wordpress dans le dossier de notre site pour cela vous allez devoir ouvrir via (WinRar ou 7Zip) l'archive que vous avez télécharger tout à l'heure.    

Dans cette archive vous allez trouvez un fichier **"wordpress"** ce fichier contient tout ce que le site à besoin pour fonctionnez.    

Maintenant ce fichier il va falloir le mettre dans le fichier de votre site pour cela vous allez copier le fichier dans l'archive et le copier dans le fichier de votre site.    

![Image FICHIER DU SITE](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/fichierdusite.PNG)

#### Installation du thème _NFactoryJob_  
Pour installez le thème vous avez donc deux façon :    

Via GitHub :  
  
Pour installez le thème via GitHub il va falloir ouvrir le terminal de commande :  
Dans ce terminal vous allez devoir marqué le chemin vers le theme pas de panique je vous aide :  
Tout d'abord avant de marquez le chemin vers votre dossier il va falloir marquez cd puis le chemin ce qui donne dans votre invite de commande :  

![Image lien vers theme](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/lientheme.PNG)
  
  Une fois cette étapes faites vous allez pouvoir cloné le theme pour cela toujours dans l'invite de commande vous allez devoir marquez :  
![Image lien pour git clone](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/liengitclone.PNG)  

Une fois tous les étapes faites le theme est installer.
 
  Via ZIP :

Un peux plus tôt je vous avez dit que vous pouviez télécharger une archive pour mettre en place le theme, il est donc temps de l'installez.  
Pour cela rendez-vous dans votre explorateur de fichier dans le dossier de votre site.  
Ensuite il va falloir ce rendre dans le dossier des themes, pour cela vous allez devoir rentrez dans le dossier '**wp-content**' / '**themes**'
  
  Une fois dans ce dossier vous allez retrouvé :  

![Image dossierthemebase](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/dossiertheme.PNG)

Ensuite comme pour le fichier wordpress vous allez devoir ouvrir l'archive ou ce trouve le themes et glisser le themes avec les autres thèmes par default de wordpress.  

Ce qui doit donnez :  

![Image dossierthememodif](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/dossierthememodif.PNG)

Une fois tous les étapes faites le theme est installer.

### . Mise en place de la BDD

Pour la mise en place de la BDD vous allez devoir retrounez sur XAMPP et appuyiez sur "**Admin**" au niveau de "**MySQL**" (encadrer bleu) :  
![Image lancementMySQL](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/dossierthememodif.PNG)

Vous allez avoir une page de "phpMyAdmin" qui c'est donc ouvert :  
  
  Je vais donc maintenant vous expliquez comment crée une base de donnée pour wordpress :

  ### Création d'une base de donnée  
Premiere étape vous allez devoir appuyer sur le bouton "**Nouvelle base de données**" sur la gauche du site  
    
Secondes étape vous allez devoir crée la base de données :  
(Attention au nom de votre base de donnée il faut évité tous ce qui est espace, majuscule, accent)  
Vous marquez par exemple le nom de votre site en remplacent donc les espaces par des "_"  
Puis vous appuyer sur le bouton "Créer"
![Image nombasededonne](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/nombase.PNG)



### . Comment passer un compte en recruteur
