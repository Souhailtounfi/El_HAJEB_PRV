# 🌆 Province-El-Hajeb-WEBSITE

**Transformer les villes, autonomiser les communautés, inspirer l’innovation**

![Dernier Commit](https://img.shields.io/github/last-commit/YourUsername/EL-Hajeb-website?color=green)  
![Langages](https://img.shields.io/github/languages/count/YourUsername/EL-Hajeb-website)  
![Langage Principal](https://img.shields.io/github/languages/top/YourUsername/EL-Hajeb-website?color=yellow)  
![Issues](https://img.shields.io/github/issues/YourUsername/EL-Hajeb-website)  
![Licence](https://img.shields.io/github/license/YourUsername/EL-Hajeb-website)  

---

## 🚀 Construit avec les outils et technologies

![Laravel](https://img.shields.io/badge/Laravel-12-red?logo=laravel)  
![React](https://img.shields.io/badge/React-18-blue?logo=react)  
![Vite](https://img.shields.io/badge/Vite-4-purple?logo=vite)  
![MySQL](https://img.shields.io/badge/MySQL-8-blue?logo=mysql)  
![phpMyAdmin](https://img.shields.io/badge/phpMyAdmin-orange?logo=php)  
![Composer](https://img.shields.io/badge/Composer-yellow?logo=composer)  
![NPM](https://img.shields.io/badge/NPM-9-red?logo=npm)  

---

## 📑 Table des matières

- [Aperçu](#-aperçu)  
- [Fonctionnalités](#-fonctionnalités)  
- [Démarrage rapide](#-démarrage-rapide)  
  - [Prérequis](#prérequis)  
  - [Installation](#installation)  
  - [Configuration de l’environnement](#configuration-de-lenvironnement)  
  - [Base de données](#base-de-données)  
  - [Utilisation](#utilisation)  
- [Tests](#-tests)  
- [Licence](#-licence)  

---

## 📖 Aperçu

**EL-Hajeb-Website** est un projet open-source construit avec **Laravel 12 (backend)** et **React + Vite (frontend)**, relié à une **base de données MySQL**.  
Il offre une architecture modulaire pour les **portails urbains multilingues**, incluant l’authentification des utilisateurs, la gestion des rôles, la gestion de contenu et une interface moderne côté frontend.  

---

## ✨ Fonctionnalités

- ✅ **Backend Laravel 12** avec modèles, contrôleurs, middleware et configurations extensibles.  
- ✅ **Frontend React + Vite** avec Tailwind CSS et support multilingue.  
- ✅ **Base de données MySQL** gérée avec phpMyAdmin.  
- ✅ **Authentification & Sécurité** avec JWT / Sanctum.  
- ✅ **Contrôle d’accès basé sur les rôles (RBAC)** pour utilisateurs et administrateurs.  
- ✅ **Gestion multilingue du contenu** avec support du téléchargement de médias.  
- ✅ **Tests automatisés** avec PHPUnit (backend) et Jest (frontend).  

---

## ⚙️ Démarrage rapide

### ✅ Prérequis

Assurez-vous d’avoir installé sur votre machine :

- [PHP >= 8.1](https://www.php.net/)  
- [Composer](https://getcomposer.org/)  
- [Node.js + npm](https://nodejs.org/)  
- [MySQL](https://www.mysql.com/)  
- [phpMyAdmin](https://www.phpmyadmin.net/)  
- [Git](https://git-scm.com/)  

---

### 📥 Installation



1️⃣ Installer les dépendances Laravel (backend)
```bash
composer install
php artisan key:generate
php artisan migrate

```

Installer les dépendances Node.js (frontend)
```bash
npm install
npm run dev 
```

🔧 Configuration de l’environnement

Créez un fichier .env en copiant .env.example et configurez vos identifiants MySQL, ainsi que les paramètres d’application Laravel.

cp .env.example .env


Puis :
```bash
php artisan migrate --seed
```



🗄️ Base de données

Créez une base de données MySQL (par exemple province_hajeb).

Configurez-la dans le fichier .env.

Utilisez php artisan migrate --seed pour installer les tables avec des données de test.


Utilisation

Démarrer le backend (Laravel) :
```bash
php artisan serve
```

Démarrer le frontend (React + Vite) :
```bash
npm run dev
```

Accédez ensuite à l’application via http://localhost:5173.

🔐 Accès à la page administrateur

Pour accéder au panneau d’administration :

Raccourci clavier : CTRL + ALT + A

Lien direct : / _admin-prvc-login-2025

Premiere connexion d'apres la base de donnee exemple :
  Email : admin@example.com
  mot de passe : password123


🧪 Tests

Backend (Laravel) :

php artisan test


Frontend (React) :

npm run test