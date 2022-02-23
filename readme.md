# Projet NFactoryJob

Projet de groupe réalisé par :

**Maxence BOSSIN**  
**Anthony CHEVALIER** _en tant que chef de projet_  
**Léonard JOUEN**  
**Romain LALLEMENT**  

## Description du besoin client

Une agence de recrutement cherche à moderniser sa lecture de CV.

Avant, les candidats devaient envoyer des CV manuscrits à l'agence ou bien des PDF en ligne par mail.

Elle desire numériser son processus pour qu'un utilisateur puisse directement saisir son CV en ligne.  
Une fois le CV créé par l'utilsateur (connecté ou non) les recruteurs du cabinet pourront le générer en PDF.  
L'utilisateur pourra également le générer en PDF pour ces besoins personnels.

## Réponse au besoin  
### Compte

Nous avons créé un site WEB via **WORDPRESS**  
Il y a trois rôles d'utlisateur :

- Administrateur => Gestion des comptes via l'interface de wordpress
- Recruteur => Possiblité de trier les CV correspondant au besoin des entreprises | possibilité de télécharger les CV en PDF
- Chercheur d'emploi => Possibilité de s'enregister pour garder en mémoire ces informations | créer un CV

### Technologies Utilisés

### __Backend__

- **PHP** avec wordpress, interagit avec le serveur. Il nous a également servi à créer les API pour l'ajax.

### __FrontEnd__

- **HTML** Il permet d'enrichir un texte avec des informations structurelles, sémantiques et de présentation.
- **SASS** librairie CSS, stylise le HTML
- **JQUERY** librairie Javascript, interaction avec les pages WEB

#### __Système de gestion de base de données__

- **PhpMyAdmin** phpMyAdmin est une application Web de gestion pour les systèmes de gestion de base de donnée

## Mise en place du projet

### __Installation de *WORDPRESS*__

### __L'installation en local__

### __Installation de XAMPP, simule un serveur en local sur windows__

Installation de Xampp (téléchargement de la version correspondant à votre système d'exploitation) : https://www.apachefriends.org/fr/index.html  
Ensuite Allumer XAMMP cliquer sur RUN pour Apache et MySql

![Image XAMP](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/XAMP.PNG)

Pour WINDOW :
Une fois l'installation fini un dossier xampp s'est créé à l'endroit où vous l'avez installé.
Normalement, il se situe sur votre disque C à l'emplacement : C:\xampp\htdocs

### __Installation de MAMP, simule un serveur en local sur windows__

Installation de MAMP (téléchargement de la version correspondant à votre système d'exploitation) : https://www.mamp.info/en/downloads/   
Ensuite Allumer MAMP cliquer sur Démarrer les serveurs pour lancez MySQL et Apache

## __Installation de WORDPRESS__

Une fois fait, vous devez installer l'archive de **WORDPRESS**

Rendez-vous sur ce site : https://fr.wordpress.org/download/
Il faut descendre un peu et cliquer sur le bouton "Télecharger WordPress 5.9"
à noter que la version peut changer, ça n'a pas d'importance.

![Image Installation de WordPress](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/wordpressInstallation.png)

### __Installation de WORDPRESS__

### __Téléchargement du thème *NFactoryJob*__

#### **Via GITHUB :**

![Image GIT CLONE](https://github.com/MaxenceBossin/NFactoryJob/blob/Maxence/imageReadMe/gitClone.png)

Bien vérifier que vous êtes sur la branche _*Master*_ comme l'encadré en rouge en haut à droite.
Ensuite cliquer sur '_code_' une petite fenêtre va s'ouvrir. Alors cliquer sur les deux carrés surlignés en rouge sur l'image.

#### **Via ZIP** :

![Image DL VIA ZIP](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/gitzip.PNG)

Bien vérifier que vous êtes sur la branche ***Master*** comme l'encadré en rouge en haut à droite.
Ensuite cliquer sur `code` une petite fenêtre va s'ouvrir. Alors cliquer sur '***Download ZIP***' qui se trouve dans l'encadré blanc


### __Installation du thème *NFactoryJob*__

Rendez-vous dans votre explorateur de fichier et allez là ou vous voulez créer votre site.  
Après cette étape nous allons commencer l'installation de **WORDPRESS** :

### __Installation de Wordpress :__
Précédemment nous vous avons demandé de télécharger : il est temps de les utiliser.  

En premier lieu, nous allons installer les fichiers de wordpress dans le dossier de notre site.  
Pour cela vous allez devoir ouvrir via (WinRar ou 7Zip) l'archive que vous avez téléchargé tout à l'heure.    

Dans cette archive vous allez trouver un fichier **"wordpress"**. Ce fichier contient tout ce que le site à besoin pour fonctionner.    

Maintenant, il va falloir mettre le dossier dans le dossier de votre site.  Pour cela vous allez copier le dossier dans l'archive et le copier dans le dossier de votre site.    

![Image FICHIER DU SITE](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/fichierdusite.PNG)

### __Installation du thème *NFactoryJob*__  
Pour installez le thème vous avez donc deux façons :    

#### **Via GitHub :**  
  
Pour installez le thème via GitHub il va falloir ouvrir le terminal de commandes :  
Dans ce terminal vous allez devoir marquer le chemin vers le thème. Pas de panique on vous aide :  
Tout d'abord, il va falloir marquer "`cd`" puis le chemin vers votre dossier racine du site, ce qui donne dans votre invite de commandes :  

![Image lien vers theme](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/lientheme.PNG)
  
  Une fois cette étape faite, vous allez pouvoir cloner le thème : pour cela toujours dans l'invite de commande vous allez devoir marquer :  

![Image lien pour git clone](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/liengitclone.PNG)  

Une fois tous les étapes exécutées le thème est installé.
 
#### **Via ZIP :**  

Un peu plus tôt, je vous avais dit que vous pouviez télécharger une archive pour mettre en place le thème, il est donc temps de l'installer.  

Pour cela rendez-vous dans votre explorateur de fichier dans le dossier de votre site.  
Ensuite, il va falloir se rendre dans le dossier des thèmes, pour cela vous allez devoir rentrer dans le dossier '**wp-content**' / '**themes**'
  
Une fois dans ce dossier vous allez retrouver :  

![Image dossierthemebase](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/dossiertheme.PNG)

Ensuite, comme pour le fichier wordpress vous allez devoir ouvrir l'archive ou ce trouve le thème et glisser le thème avec les autres thèmes par défaut de wordpress.  

Ce qui doit donner :  

![Image dossierthememodif](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/dossierthememodif.PNG)

Une fois tous les étapes exécutées le thème est installé.

###  __Mise en place de la BDD__

Pour la mise en place de la BDD vous allez devoir retrouner sur XAMPP et appuyez sur "**Admin**" au niveau de "**MySQL**" (encadré bleu) :  

![Image lancementMySQL](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/lancementMySQL.PNG)

Vous allez avoir une page de "**phpMyAdmin**" qui s'est donc ouverte :  
  
  Je vais donc maintenant vous expliquez comment créé une base de données pour wordpress :

  ###  __Création d'une base de données__  
- Première étape : vous allez devoir appuyer sur le bouton "**Nouvelle base de données**" sur la gauche du site  
    
- Seconde étape : vous allez devoir créer la base de données :  
(Attention au nom de votre base de données, il faut éviter tous ce qui est espace, majuscule, accent)
Vous marquez par exemple le nom de votre site en remplaçant donc les espaces par des "_"  
Puis vous appuyer sur le bouton "Créer"  

![Image nombasededonne](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/nombase.PNG)

**Retenez bien le nom de votre base de données, elle va être importante pour la suite de l'installation du site.**

###  **Installation de Wordpress**  

Nous y sommes : dernière étape de l'installation de wordpress, après cette étape vous pourrez accéder à votre site.  
Nous allons faire la dernière installation de wordpress. Pour cela, il va falloir retourner sur votre XAMPP et cette fois-ci appuyer sur le bouton Admin de la catégorie Apache (encadré vert)  

![Image lancementLocalHots](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/lancementlocalhost.PNG)  

Après cette étape, vous avez donc lancé votre "**LocalHost**" ce qui vous permet de voir votre site sans le mettre en ligne.

Une fois que vous êtes dans votre localhost, il suffit de cliquer en direction des fichiers de votre site.  
  
Une fois que vous êtes au bon endroit une page d'installation de wordpress va s'afficher et là, rien de plus simple, il suffit de suivre ce que dit l'installateur.  

Attention cependant certaines choses sont à changer avec précaution !  

![Image installateurwpbdd](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/instalwpbbd.PNG)  

Pour le nom de la base de données, il faut bien mettre le nom de votre site,  
Pour les identifiants, nous sommes en local, pour les utilisateurs windows seul l'identifiant est à changer pas le mot de passe !  
Pour les utilisateurs windows :  
Identifiant : root  
Mot de passe :  

Pour les utilisateurs d'ordinateur sur IOS donc sur **MAC** l'identifiant est le même mais il faut appliquer root au mot de passe donc :  

![Image installateurwpbddmac](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/instalwpbbdmac.PNG) 

L'Adresse de la base de données ne doit pas être changé et pour finir le préfixe des tables doit être changé par "**nfj_**" le site à étais pensé avec ce prefix de table si celui la n'est pas bien rentré cela peux causer des bugs sur le site.

Une fois ses informations inscrites vous pouvez passez à la prochaine étape :  
  
Pour cette étape vous allez simplement devoir enregistrer le nom du site, vos identifiants et un mot de passe :  
  
Attention au mot de passe que vous mettez. Bien mettre un mot de passe dont vous pouvez vous rappeler mais qui reste assez complexe pour éviter que n'importe qui vienne sur la partie admin de votre site !

![Image installateurwpbddmac](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/infosupp.PNG)  

### **Installation du thème _NFactoryJob_**  
Bien! Vous êtes maintenant dans la partie administateur du site.  
Avant toute chose nous allons choisir le bon thème pour notre site pour cela rien de plus simple.  
Il vous suffit de cliquer sur "Apparence" à droite de votre écran.  
Une fois cela fait 4 thèmes s'offrent à vous mais nous allons prendre celui qui nous interesse c'est à dire le thème NfactoryJob.  
Pour l'activer, il suffit de passer votre curseur sur le thème et de cliquez sur "Activer"  
  
### **Configuration du thème _NFactoryJob_** 
Une fois cette étape faite, nous allons faire une partie assez simple qui va faire en sorte que le site fonctionne bien, pour cela rendez-vous dans l'onglet "Réglages" puis "Permaliens"  
  
Vous allez donc devoir cliquer sur le bouton à gauche de "Titre de la publication" comme sur l'exemple ci dessous  

![Image permalien](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/permalien.PNG)  

N'oubliez pas d'enregistrer les modifications et maintenant je vous laisse aller dans l'onglet "**Pages**"
  
Une fois dans cet onglet, deux pages par défaut seront déjà présentes mais elle ne nous interesse pas.  
Nous allons donc créer notre page principale.  
Pour cela en haut de la page vous allez devoir cliquez sur "Ajouter"  

Une fois sur cette page vous allez pouvoir donc suivre certaines étapes pour la création de la page.  
Première chose au niveau de "**Saisissez le titre**" vous allez pouvoir noté "***HomePage***" puis sur la droite de la page dans le petit menu dans la catégorie "**Modèle**" sélectionnez le modèle de page "***HomePage***" puis vous pouvez publier votre page avec le bouton en haut à droite du site.  

![Image lecture](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/createpage.PNG)  

Après cette étape, nous allons mettre la page que nous venons de créer en page principale. Pour cela, je vous laisse aller au niveau de l'onglet "**Réglages**" puis dans "**Lecture**"

Ce paramètre va dire au site quelle page afficher en premier pour cela il va falloir cliquez sur le bouton  
"**Une page statique**" et choisir comme '*Page d'accueil*' la page "**HomePage**" comme indiqué ci dessous :  

![Image lecture](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/lecture.PNG)  

Encore une fois n'oubliez pas d'enregistrer les modifications.  

### **Comment passer un compte en recruteur**


## **Information complémentaire**
### **Enlever les thèmes qui nous servent à rien**

Dans cette étapes je vais vous expliquer comment enlever dans nos fichier les thèmes qui nous servent à rien et garder une interface admin propore.  
  
Pour cela rendez-vous dans le dossier thèmes de votre site qui se trouve pour rappel dans le dossier "wordpress\wp-content\themes"  
Une fois dans ce dossier nous allons donc enlevez les thèmes qui ne sont pas utile pour votre site :  
Avant la manipulation nous retrouvont donc 4 dossiers et un fichier "index"  .
Pour notre site seul le dossier "**NFactoryJob**" nous interesse donc les trois autres fichiers nous allons pouvoirs les supprimer mais attention à ne pas supprimer le fichier "index" il est important pour le fonctionnement du site.

![Image supprtheme](https://github.com/MaxenceBossin/NFactoryJob/blob/Romain/imageReadMe/supprtheme.PNG)  
  
Une fois la manipulation faite votre fichier thème devrais resembler à l'exemple ci-dessus.  