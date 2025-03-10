const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEo5cDVoNUpxOVVQUVppMm9OWmdNY0NGc1FlTUhxWm4rWkJISWs1bk9YMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ2pXM0d0dFB1TW5wUHhRWWRKTks5dTNEVkRsWVNXaTZ2UVRacDlVUFUzcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvSFJEWHYxcStrSTVRSldHeXVWZFNqQzlpaHB0akZhTVpmM0N3SEMrV1ZnPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJhV3hPU0lrWkJSeFllTVZ6WFlIKzVUVzdjSmpJZVBNQk5GZmRwcFNiUjI0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVBRjZDczY0SHc3OUE3ZW1EbUwzWlFydGkyTytRY2tZOW5sMTJ6UWQ2bnc9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImxVUnN1RGVhakJPZDhVdmx2bUlzRGhscCtlS0FYQU5Pb2hscTJCK3lqRzQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUJhc24vZXVsdUM1bUxlS0FCY290cXNCdWNhYllONEJrWHFRbTJHcnpVaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicTlhU1VsUXVaT3pCa1QxdEZvb3BDV2pRczM2MzYyeXA5RDBJR2pBQVdpbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InBsUGxpRHpab0NXZXhQUkppTklDbDNKSFBva2MwZ0JEZXFWcUQ1cUNLandkUUw3L0ROemxvMzQrTTZHOWtyMzFDVWNEREFWT1dDYi8wZ1BoaExlZUJnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTE5LCJhZHZTZWNyZXRLZXkiOiJSYWFxRFBpMlNlaithZnlEN1ZHS2hVaTRiOXpLRm1XQTFsaUs2U3c4cHJNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY5NTc0ODU2MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIxMjg3OURENzMyODc4Njk1RTNBQjhFQjJGMEYxRUVEQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxNjA0OTI5fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTU2OTU3NDg1NjJAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiRTBCQkJCRTZBODhGQUY2QTRCMUNDNDE4RDc0NTc3M0EifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0MTYwNDkyOX1dLCJuZXh0UHJlS2V5SWQiOjMxLCJmaXJzdFVudXBsb2FkZWRQcmVLZXlJZCI6MzEsImFjY291bnRTeW5jQ291bnRlciI6MSwiYWNjb3VudFNldHRpbmdzIjp7InVuYXJjaGl2ZUNoYXRzIjpmYWxzZX0sImRldmljZUlkIjoiQ1ZMNmFIUHhSUmVRYzhWSWRPMG10ZyIsInBob25lSWQiOiJkOWRkYzhmMS04YmU5LTQxNDEtYjM4ZS1mMjk1ZWMyNGRjZTAiLCJpZGVudGl0eUlkIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV1hpOTMrZ2l6OCsrek5KbUJUZ0YwTEZoUlZVPSJ9LCJyZWdpc3RlcmVkIjp0cnVlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdNcHR5ckpXOFZtd2Y5TDFmTnFySGpscmZjYz0ifSwicmVnaXN0cmF0aW9uIjp7fSwicGFpcmluZ0NvZGUiOiJIWFhDV0NNTCIsIm1lIjp7ImlkIjoiMjU1Njk1NzQ4NTYyOjEwQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IvCdkLrwnZuo8J2bqfCdkYbwnZGHIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQWDc1N1lCRUs2UXU3NEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvRVNWT2Q3SVk3UmpXRUpkOUlxZ1IxeEpmK0NOOERoRkpweDZibHV5Z1RFPSIsImFjY291bnRTaWduYXR1cmUiOiJtaU9OeVByOWZLR1BHa3VCaVczZUphMnBGYlp2ZEpnTHZnQW5sc0tvRGc3VVVMVEZjcGlPTGdTRk9VNGFTYk56NmZtd3hwTGo3RGU5T2JPVVR2aTNDZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiOUw3V0RBdHY1UklxM0RRQkM4eWhmS0lDdUU2QWtYMzJqL3luTk5CZW1OYWxiYnJFWDhTcTBSN3ByOVF0RWtMZmpDUWdMbk5nVFZWc1owb1p2c3kwQUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTU3NDg1NjI6MTBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZnhFbFRuZXlHTzBZMWhDWGZTS29FZGNTWC9namZBNFJTYWNlbTVic29FeCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTYwNDkyNCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFObUIifQ==',
    PREFIXE: process.env.PREFIX || "_",
    OWNER_NAME: process.env.OWNER_NAME || "DICKEN",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "255695 748 562", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'on',
    BOT : process.env.BOT_NAME || 'MAPENZI CHENGA MD🥹',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'hey buddy here im mapenzi chenga md',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "off",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
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
