const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'POPKID-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQUthWjQ0bURnb2x4RXNONms0aXhzYXp1VTRleGtHZkRqMUFZS0xVbXozVT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSnU5emlYdHUzWWI2aEJIZ3phak9USXl3Z3k5UFFqcXVvSlhIcDhPUXJVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFQTZGNUNYZWFPZzVjY1Q1dXZEQ0M0N1hxMXlDTjlraFFBQTRSV2xFK244PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQTlwaEhtWkRqbG90QnN6YnlXT2JyUitZNlNmV0JVU1BDVWFLcHRTYWxFPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IndKTUhMbEhPcVphYzI2bGlyMzVnd0NGYUE4MS9GeXM2VEF0U3FGam9sVU09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxQU2x5R1NUelpkanJtMDU0RGFlbVZwZUFicTNVcFJzWE4zbThKN3Nua009In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMkIrb3l2K0thV0NzUnIwS1hyeksxMFdtUWFQbWI2aGsvbTVuK1dHZDhGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMExscEx5SitHVGxMUTUvWUtqanZqdWVaNjBZcHNoWTMvN3JQeHRia1VITT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImlKNTlpTjZSbkYxakZqMktJTHFiTnRhNVZMT3ZFSkFJNlF6NGJKTXkybHo1OXZCWjlwbFVpV0JDMGFCUzR3TnJqeW15cDF4bTVxSDZtWStBR3NGZWpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjM2LCJhZHZTZWNyZXRLZXkiOiJacDlyaDdYcHdtQUlMYjViR1VXOCt4d0l0cnhxZ2Jwc2FQUmwwY2pIdU1jPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjgzM0NEQ0MwMUI2MzhERTQ1RUVCOUM4MkNCNEE3MjlBIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA4MTkzMTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjMwQTdCODE5QTYxRERFNjUwNDZDQjIzNUQ2REYxOEMyIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA4MTkzMTh9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjM3MzFEOUMwRjUwNDkyMDkyQTExOEIzNDRGQTIyNTg3In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA4MTkzMjB9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzg0ODU4NDMzQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkNFQURDQTlEOUY3MDJGRkJDNzIzMzBDNkI3NUQ4MjA1In0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA4MTkzMjB9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjNPZHdhVllRU0EtcWhFS1g4YVBUa3ciLCJwaG9uZUlkIjoiZDk2YmFkYjEtNzI3NC00NWVlLTg1NWEtMmE4YTA3ZmViY2M4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im00SVZiakRWRURnQzdTUW5WcGorUmlvejVOST0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBQndrWC9HdEZhMXI5WlFWeU5HdmtmeGxtN1E9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRkZCREhXRTgiLCJtZSI6eyJpZCI6IjQwNzg0ODU4NDMzOjVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoiY29zbWluIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNNdUN2S3NGRU9pV2k3NEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI0YzhOcXBaN0tVTXpzUkZicU1pMU5kWnExaTJnckw5M1Q0VE1tV1BaNERvPSIsImFjY291bnRTaWduYXR1cmUiOiJmd3BZSURhWFhncVJPVzYxYkcrTXdPUzU0Y2M0d2ZScXJtcmJpTTI4VW9aTGxqN1d6ZXhCcm9EdW04M1NvZStMT0wxczFHZDZRMkVzM0FXME9uZE9BUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRlh6RExSTUFLNFBxdUVsdllUbzA4MXJOZXRSRlFFdk5mREpzLzljTzlEMTAyRVdSM1N2NjcvQmVYL2FsMW5IRWduNy9iNythR2lIZ2kxMEJMRzdYanc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc4NDg1ODQzMzo1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVIUERhcVdleWxETTdFUlc2akl0VFhXYXRZdG9LeS9kMCtFekpsajJlQTYifX1dLCJwbGF0Zm9ybSI6InNtYmEiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3NDA4MTkzMTcsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBUE9qIn0=',
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
                  
