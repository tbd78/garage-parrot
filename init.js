// import dotenv
const dotenv = require("dotenv");
dotenv.config();

const path = require("path");
const fs = require("fs");

const crypto = require("crypto");
const { InsertUser } = require("./server/db/query/insert");

const PROJECT_ROOT = path.join(__dirname, "/");
const LOCK_FILE_PATH = path.join(PROJECT_ROOT, "install.lock");

const db = require(PROJECT_ROOT + "server/db/connect/connection");

const ENV_VARS = [
    "SESSION_SECRET",
    "ADMIN_EMAIL",
    "ADMIN_PSWD",
    "ADMIN_FIRSTNAME",
    "ADMIN_LASTNAME"
];

const REQUESTS = [
    `CREATE TABLE IF NOT EXISTS user (
        \`id\` INT AUTO_INCREMENT,
        \`username\` CHAR(50),
        \`password\` BLOB,
        \`role\` CHAR(10),
        \`firstname\` CHAR(100),
        \`lastname\` CHAR(100),
        \`salt\` BLOB,
        UNIQUE KEY (\`username\`),
        PRIMARY KEY (\`id\`)
    )`,

    `CREATE TABLE IF NOT EXISTS services(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`service_name\` CHAR(50),
        \`description\` CHAR(50)
    );`,

    `CREATE TABLE IF NOT EXISTS cars(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`brand\` CHAR(50),
        \`model\` CHAR (50),
        \`price\` INT,
        \`mileage\` INT,
        \`year\` INT,
        \`cover_image\` CHAR(100) UNIQUE,
        \`sold\` BOOLEAN
    );`,

    `CREATE TABLE IF NOT EXISTS gallery(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`car_id\` INT REFERENCES cars(id),
        \`image\` CHAR(100) UNIQUE
    );`,

    `CREATE TABLE IF NOT EXISTS specs(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` CHAR(50) UNIQUE,
        \`type\` CHAR(50)
    );`,

    `CREATE TABLE IF NOT EXISTS characteristics(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`car_id\` INT REFERENCES cars(id),
        \`specs_id\` INT REFERENCES specs(id),
        \`value\` CHAR(50)
    );`,

    `CREATE TABLE IF NOT EXISTS contact_info(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`name\` CHAR(50),
        \`address\` CHAR(250),
        \`phone\` CHAR(10),
        \`email\` CHAR(50)
    );`,

    `CREATE TABLE IF NOT EXISTS feedback(
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`date\` DATETIME,
        \`name\` CHAR(50),
        \`comment\` TEXT,
        \`rating\` INT,
        \`validation\` BOOLEAN
    );`,
];

//1- Vérifier si le fichier install.lock n'est pas existant à la racine du projet
const checkifInitWasDone = () => {
    return fs.existsSync(LOCK_FILE_PATH)
}

//2- Vérifier si on peu se connecter à la base de donnée
const checkDbCon = async() => {
    try {
        await db.pool.getConnection();
        return true;
    } catch (error) {
        throw Error("Impossible de se connecter à la base de donné. Veuillez revoir les informations de connexion.")
    }
}

//3- Vérifier si les variables d'environnement (SESSION_SECRET, ADMIN_EMAIL, ADMIN_PWSD, ADMIN_FIRSTNAME, ADMIN_LASTNAME ) sont renseignés
const checkEnvVars = () => {
    let areEnvsReady = true
    for (let index = 0; index < ENV_VARS.length; index++) {
        if (!process.env[ENV_VARS[index]]) {
            areEnvsReady = false
        }
    }

    return areEnvsReady;
}


//4 - Créer la base de données et le compte admin
const generateDatabase = async (requests, conn) => {
    requests.map(async (req, key, array)=> {
        try {
            const res = await conn.query(req);
            console.log(`req ${key + 1 }/${array.length}`)

        } catch (error) {
            throw Error("Une erreur est survenue lors de la generation de la base de donnée. Veuillez vérifier les requetes sql")
        }
    })
}

//TODO: don't allow user to insert admin if there is already one admin in the database
const insertAdminUser = async () => {
    const { ADMIN_EMAIL, ADMIN_PSWD, ADMIN_FIRSTNAME, ADMIN_LASTNAME } = process.env;
    const user = {
        username: ADMIN_EMAIL,
        password: ADMIN_PSWD,
        role: "admin",
        firstname: ADMIN_FIRSTNAME,
        lastname: ADMIN_LASTNAME
    }

    try {
        return await InsertUser(user);
    } catch (error) {
        throw Error("Impossible d'inserer l'admin veuillez revoir la commande SQL");
    }
}

//5 - Importer les donnés fixtures???

//6 - Créer le fichier install.lock
const generateLockFile = () => {
    fs.writeFileSync(LOCK_FILE_PATH, "");
 }

(async function INIT() {

    //1- Vérifier si le fichier install.lock n'est pas existant à la racine du projet
    if (checkifInitWasDone()) {
        console.log("L'initialisation a ete deja faite. Veuillez supprimer le fichier install.lock à la racine et recommencer");
        process.exit();
    }

    //2- Vérifier si on peu se connecter à la base de donnée
    await checkDbCon();

    //3- Vérifier si les variables d'environnement (SESSION_SECRET, ADMIN_EMAIL, ADMIN_PWSD, ADMIN_FIRSTNAME, ADMIN_LASTNAME ) sont renseignés
    if(checkEnvVars() === false) {
        console.log("Des variables d'environnement sont introuvables. Veuillez voir le fichier README.md");
        process.exit();
    }

    //4 - Créer la base de données et le compte admin
    try {
        const conn = await db.pool.getConnection();
        await generateDatabase(REQUESTS, conn);
        const res = await insertAdminUser();
    } catch (error) {
        console.debug("");
    }

    //6 - Créer le fichier install.lock
    generateLockFile();
    console.log("La base de données et l'utilisateur  admin ont été créé");
    process.exit();
})()
