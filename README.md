# CESIeats

## Sommaire
1. [Description](#description)
2. [Pré-requis](#pré-requis)
3. [Guide d'installation](#guide-dinstallation)
4. [Documentation](#documentation)
5. [License](#license)
6. [Auteurs](#auteurs)

## Description

CESIeats est une API React permettant la mise en relation entre des clients, des livreurs et des restaurateur.  
Chaque utilisateur à des besoins spécifiques et n'ont pas accès au mêmes fonctionnalitées.

### Le client consommateur
Le client qui commande des repas doit pouvoir :
- **Gérer son compte** : créer, modifier, supprimer, consulter son profil.
- **Gérer ses commandes** : créer, modifier, supprimer, consulter et payer des commandes.
- **Historique des commandes** : consulter les commandes passées.
- **Suivi des livraisons** : suivre l'état des livraisons en cours.
- **Parrainage** : parrainer des amis pour utiliser la plateforme.
- **Notifications** : recevoir des notifications pop-up (hors e-mail).

### Le restaurateur
Le restaurateur souhaitant accroître sa visibilité doit pouvoir :
- **Gérer son compte** : créer, modifier, supprimer, consulter son profil.
- **Gérer les articles** : créer, modifier, supprimer, consulter des articles (plats, boissons,
etc.).
- **Gérer les menus** : créer, modifier, supprimer, consulter des menus composés d'articles.
- **Gérer les commandes** : visualiser et valider des commandes.
- **Suivi des livraisons** : suivre l'état des livraisons en cours.
- **Historique des commandes** : consulter les commandes passées.
- **Statistiques** : consulter des statistiques de performance.
- **Parrainage** : parrainer d'autres restaurateurs.
- **Notifications** : recevoir des notifications pop-up (hors e-mail).

### Le livreur
Le livreur indépendant doit pouvoir :
- **Gérer son compte** : créer, modifier, supprimer, consulter son profil.
- **Gérer les livraisons** : accepter ou refuser des livraisons, prendre en charge et acquitter les livraisons.
- **Validation des livraisons** : vérifier la livraison via QR code ou code.
- **Parrainage** : parrainer d'autres livreurs.
- **Notifications** : recevoir des notifications pop-up (hors e-mail).

CESIeats assure également une supervision des comptes pour le service commercial mais offre également un suivi des commandes.

Une partie du projet à également été pensée pour les développeurs qui pourront librement accèder à l'API via leur clé mais aussi à la documentation de l'application ?

## Pré-requis

Pour utiliser CESIeats dans les meilleurs conditions, assurez-vous que les éléments suivants sont installés sur votre système :

- Node.js (version : 20.13 ou supérieure)
- npm (version : 10.5 ou supérieure)

## Guide d'installation
1. Clonez le dépôt GitHub :
```bash
git clone https://github.com/AnatholyB1/foodCesi.git
```

2. Accédez au répertoire du projet :
```bash
cd foodCesi
```

3. Installez les dépendances :
```bash
npm install
```

4. Lancez l'environnement de dévelopement :
```bash
npm run dev
```

Vous pouvez désormais accèder au front-end de l'application via : http://localhost:5173/   
mais également au back-end via : http://localhost:8000/

## Documentation

Une documentation complète des différents end-points du back-end est disponible à l'adresse : http://localhost:8000/api-docs/   

## License

Le présent projet est distribué sous license MIT.  
Pour plus d'informations, vous êtes invitez à consulté le fichier : [LICENSE](https://github.com/AnatholyB1/foodCesi/blob/main/LICENSE).

## Auteurs
- Anatholy Bricon
- Antoine Favereau
- Timéo Villette
- Audrey Brissard

Pour toute question, suggestion ou contribution, veuillez nous contacter directement via [notre page GitHub](https://github.com/AnatholyB1/foodCesi).
