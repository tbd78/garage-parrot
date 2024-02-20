---
--- section du setup de la base de données
---

--- création de la base de données
CREATE DATABASE IF NOT EXISTS garage_parrot;

--- création d'un utilisateur
CREATE USER IF NOT EXISTS user@localhost IDENTIFIED BY "root";

---  donner les privilèges
GRANT ALL ON garage_parrot.* TO user@localhost;

--- utliser la base de données nouvellement créée
USE garage_parrot;

---
--- section création des tables
---

--- création de la table utilisateur pour l'admin et les employés
CREATE TABLE IF NOT EXISTS user (
    `id` INT AUTO_INCREMENT,
    `username` CHAR(50) UNIQUE,
    `password` BLOB,
    `role` CHAR(10),
    `firstname` CHAR(100),
    `lastname` CHAR(100),
    `salt` BLOB,
    UNIQUE KEY (`username`),
    PRIMARY KEY (`id`)
);

--- création d'une table pour les services du garage
CREATE TABLE IF NOT EXISTS services(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `service_name` CHAR(50) UNIQUE,
    `description` CHAR(50)
);


--- CREATE TABLE IF NOT EXISTS horaires(
---     `id` INT AUTO_INCREMENT PRIMARY KEY,
---
--- );

--- création d'une table pour la présentation des véhicules à vendre
CREATE TABLE IF NOT EXISTS cars(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `brand` CHAR(50),
    `model` CHAR (50),
    `price` INT,
    `mileage` INT,
    `year` INT,
    `cover_image` CHAR(100) UNIQUE,
    `sold` BOOLEAN
);

--- table pour la gallerie d'image d'un véhicule
CREATE TABLE IF NOT EXISTS gallery(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `car_id` INT REFERENCES cars(id),
    `image` CHAR(100) UNIQUE
);

--- table contenant la liste des caractéristiques disponibles
CREATE TABLE IF NOT EXISTS specs(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(50) UNIQUE,
    `type` CHAR(50)
);
--- table pour les caractéritiques du véhicules
CREATE TABLE IF NOT EXISTS characteristics(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `car_id` INT REFERENCES cars(id),
    `specs_id` INT REFERENCES specs(id),
    `value` CHAR(50)
);

--- table pour les informations de contact du garage
CREATE TABLE IF NOT EXISTS contact_info(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` CHAR(50),
    `address` CHAR(250),
    `phone` CHAR(10),
    `email` CHAR(50)
);

--- table pour les avis des visiteur
CREATE TABLE IF NOT EXISTS feedback(
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `date` DATETIME,
    `name` CHAR(50),
    `comment` TEXT,
    `rating` INT,
    `validation` BOOLEAN
);
