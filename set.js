const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidU9aL0RTbW1SdWQwa1hOZDZaKzhQRXFMSjdmMHlEc05rOXk4bzJuNEdsRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibFhFb29xVWc4aUpjTFU4aFBwUFZROHEwMkhCeVZFY2RRb1hVV3F2QjBqVT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrQUZGeGVTaUVyb1lLUTZwVWFBZmQwenBaODJ2YVNhL0dkOWE4M0liU0VVPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5VjZLbThrSUdBNVE3YytuZyszTEsxZDg3aVUrMWppMnhlMXE5Mm9yL0Q4PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNbEZoditWeTlpcXdSNUFicWQrdEVjRjV2dzdBaE1HNElBZ0oxZmRwMEU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllhUExHSkFwKzRneFY2QnF3ZjVQQTJreXYza2tNM3NtMXcveTBBdUl2VFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUdvYW5OOFBOZHJGOXlUVEpGS0ZIQ0ppS1p5UitEd2VXR2FJZ1pZRHZsaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid3FxVnZpV0lRWFVIcFJVM21jR2hvUHR3T0ZZdWlZYmd2TjFSbGpKd0Ntbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVMc0M1V0ZiWUs3WEd6NHVCbVl2cVl1TzZZRzNobWNLdnBXWHF1SFVMN3QyNTZ5VWpuamlOZTZJc2cxRTBDSnlxMUx5RCthWTR1VjNLdWpsbit5UUJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjExLCJhZHZTZWNyZXRLZXkiOiJmWFU4TWJ2bkF3M1lVUjg1eEI3NEVvMDY0VEkrb2V4aDltbHdoMHRzeVlRPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIzTUNlT1V4aVJ1QzJpdjA3cDh4TWNRIiwicGhvbmVJZCI6IjQwYTU0M2FjLTM1ZDItNGU2Ni1hNTIwLTk5ZjFlYTZmMGFiMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJKRlFvV05FRlQwY2poUTZyWFVUcEVtUWhnSEE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN056UXJUUVkrRFluMDVuTE0wQ21LTkxCMUNBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkxYSjVSRUY5IiwibWUiOnsiaWQiOiI0MDc3MDgxMTkyOToyMEBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSUNpNVBRRUVJalk1NzRHR0FNZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSVdSem5vNGJyY21pV0VGc1VGYk5qbnlLcDh6NUl2elFUWWdsSVRuTzBoWT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiWmRURUtlM3dsRnlaLzFMZ1o5QUE3aW9yMnZ5OG5GWHlpVGVnYzY4WS9sbGJ4NnFHZDI3cFdoVHBuUDFGV2V2SFdhSXF1UUUxYUZWL0NCajBUcGN4Q2c9PSIsImRldmljZVNpZ25hdHVyZSI6IitYeDFNYmRwbGluRFBaTUovdklFK0Z2aXh0Z2JabGJ2ZmhTaTU4QVVZaUVkVTU4Qi9URDFmOWpHcmtPbFdjUS9nUGZWRFo0eUdZdzAra1k1V1FGaUNBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiNDA3NzA4MTE5Mjk6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU0ZrYzU2T0c2M0pvbGhCYkZCV3pZNThpcWZNK1NMODBFMklKU0U1enRJVyJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MjMzNDk5OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFPS3AifQ==',
    PREFIXE: process.env.PREFIX || "+",
    CHAT_BOT : process.env.CHAT_BOT|| "non",
    OWNER_NAME : process.env.OWNER_NAME || "cosmin",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "40770811929",
    ANTICALL: process.env.ANTICALL || "non",
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_REACT_STATUS: process.env.AUTO_REACT_STATUS || "non",
    AUTO_BIO: process.env.AUTO_BIO || "non",
    ANTIDELETEDM: process.env.ANTIDELETEDM|| "non", 
    ANTIVV: process.env.ANTIVV|| "non", 
    ADMGROUP: process.env.ADMGROUP || "non", 
    AUTO_SAVE_CONTACTS: process.env.AUTO_SAVE_CONTACTS || "non", 
    AUTO_REPLY: process.env.AUTO_REPLY || "non",              
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    AUTOREAD_MESSAGES: process.env.AUTOREAD_MESSAGES || "non",
    AUTO_REACT: process.env.AUTO_REACTION || "non",
    ANTILINK :process.env.ANTILINK || "non", 
    GURL: process.env.GURL  || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    WEBSITE :process.env.GURL || "https://whatsapp.com/channel/0029VaRHDBKKmCPKp9B2uH2F",
    CAPTION : process.env.CAPTION || "ᴘᴏᴡᴇʀᴇᴅ ʙʏ Popkid-MD",
    BOT : process.env.BOT_NAME || 'ultra bot',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.PUBLIC_MODE || "public",
    TIMEZONE: process.env.TIMEZONE || "Africa/Nairobi", 
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME || null,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY || null,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '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',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    CHATBOT : process.env.PM_CHATBOT || 'no',  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
                  
