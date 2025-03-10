const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUNSTzZoaG92MUYyQ0RkK0NuZ3Bva0VuYWk1dlp0YmRsQ0JCQXBjSmpYST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGRkWTJ6bWdPUGZyQlRMVm9jK0psLzBLRlFQaG15Q1A0VElHRk9pNVpTaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJSHpFTG1hYWJDNkl5cVpWQWtIMG5ienpSdHgyV2RRblo4UnBVVTZhYUZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJvRE9TSkZZMkg3dHBjUDl2RGpBZ1g1dVR2ME9qNlBxeEQvb3k5SjI3dG00PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9BY3prNit3aXlTVUMvMUJrWlpxTjJidm5KMjJjZUdEdjhrTTgxeWJvRk09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJuQVZEZFJ1d3lGdnBDcURPQzBkWXgzTXd2ZlV4YVhHdXQ0YUZuN1ZzeU09In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUVxUG1ueDViRjhGei9JVDdEaW5vUjRlNDd1Q05mWFZJMlpVajY4VVNrQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibE5wTk9mNkNCT3ZHUDdaOE5Jd25hcWJuME8xd1kzdG9jTTZTYW1yeWRsTT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVIQjFqdjIyTUdocFJsa0xxMDVvUkNMcXZPNTlNdUFRVnNXYjU5ZXYxT2NHTi9Fa3lNbFg1RnhaeVlyeG0yTHd3YkVLR0JtQlBWaklBUktOS0x3ZGdBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJzeHMvWjFrMlN3emlCSFJnVkFmbmN4RGJkeS90MXdkWXlsYno4SlpoNUgwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiIteWpORzN0YVJNV19BMHhjNGFqRTRRIiwicGhvbmVJZCI6ImMzY2MyYjkwLWVmMTItNDBjMC1hZWU2LTU1MTMxNGI4MDExMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqSDE1S240VFVCSWpydHBIQnR4WWQ2TjhBT289In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTlRseEM3M1YvdnAwSHVIMGd6WXlZLzNVU1BnPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IlRKTVdTMVJNIiwibWUiOnsiaWQiOiIyNTU2OTU3NDg1NjI6OEBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZC68J2bqPCdm6nwnZGG8J2RhyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDUFQ3NTdZQkVNN251cjRHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiL0VTVk9kN0lZN1JqV0VKZDlJcWdSMXhKZitDTjhEaEZKcHg2Ymx1eWdURT0iLCJhY2NvdW50U2lnbmF0dXJlIjoia21yUDR0TG5pZ0t0SlBpQ2g1WVU5Vm45cGFlc0c5QXlncmo1allYRTNsc1JHQ2ZrRlNta2NNajVyNlAzVXBkWFcwZGl5Y1BKR1ZyanE0Y1E5Vko5QVE9PSIsImRldmljZVNpZ25hdHVyZSI6ImYzblpVNExldTVMWXpVTThVd3FYT3hJdi9SQmlzZVZqQzRoM2VaQ0dXRGdieTVFbVRzNXdwWGF4U1pDRmk4TGVqOGttY1BuZDhkUzFWSUd4R3dTNGd3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjU1Njk1NzQ4NTYyOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZnhFbFRuZXlHTzBZMWhDWGZTS29FZGNTWC9namZBNFJTYWNlbTVic29FeCJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0MTU5OTcwOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFObDUifQ==',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "DICKENS",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "255714159646", 
             
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
