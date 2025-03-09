const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSU5pUzlzb1h3L2ppK0w4cnZ2aCsyYWlFY0p1LzlaK2UyeGxYS3B0bGxuST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUDVIS1BkWDhGVWxEbndLVlUrOUx1eWxMaGNZMXREN2ZERDN0WGtpR0NVaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJQ09MZXl5WkpnYmdLK04vcVBMVEpvMDRmU3FlY1o0b0cxeE5hNzdYN0ZNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJYUDY0L2FPelp5OWQ5cXVIejZXNzN0dnZreUFBVUR3Z1k2c2xjS2hWNGxVPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlJUXVLUDB0KzVZanc0QnRxaDIzZktJVURqN1JvaFhZZEhMdERlR2lnRVE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InRsRk5lYllyaEVGVXRnRXY5UlJackt6djBVL25kOHBUb0g2N056WDJ0akU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibVA4Y1RRZTJWUW9iM3JObjRDMkZHbkdJcUJJMUJCNElsZGw1Y1dGbXYwdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOTZldmo2ZVAvU2Z5Y0d1MWpRdmd2QnhwVjhyNHNqY0VsMDRGOHNnaW1Yaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNmeGJOR1JUeXhFcE53QmNpVm1uRURFaG9CL2xOb0wyWmJxeUI1UkdzSFpja1FjSjJRSHFvWFBXK2c5VGhuai9zaEVwZlIvelViVEsvTUw3U1dYWUFBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzMsImFkdlNlY3JldEtleSI6IktQZURnN0M5eFVwTEVZalZCV1o2TC9YK2p4ZGI2VUN4MW1QcFA5N3AyL0E9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbeyJrZXkiOnsicmVtb3RlSmlkIjoiMjU1Njk1NzQ4NTYyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjZEQjU1NTgzMTc0MTE2QkY1QkI3NzRGNjFGMzE4NENFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDEzODE4OTV9LHsia2V5Ijp7InJlbW90ZUppZCI6IjI1NTY5NTc0ODU2MkBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI5MDlDQjE4QkZDNkMyNDNCQTVEQkY3MjYzRDc0RDA2OSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQxMzgxODk1fV0sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1RFdPcmU5ZVRIaXdpdThJSG5MNjl3IiwicGhvbmVJZCI6IjhlNGM3NDczLWNkY2ItNDg0Ni1iODZhLWZkOGVhMjRiMzg1OSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrYy9pdVdHcjNyaGRVVEt5Z1RXUTZGNDJ0MlE9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSVVabTh1VC84MHNXQ0ZFUm1RS1NrT2NpV1pRPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IldIVkdHREtEIiwibWUiOnsiaWQiOiIyNTU2OTU3NDg1NjI6M0BzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiJnb3N0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNQSDc1N1lCRVBmQnJiNEdHQUVnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIvRVNWT2Q3SVk3UmpXRUpkOUlxZ1IxeEpmK0NOOERoRkpweDZibHV5Z1RFPSIsImFjY291bnRTaWduYXR1cmUiOiJDUFhoRXZya1ZBS2VDNzFKUFVGMk9vM29zdXVVV2MxRGJiNDl0VjRWUlJMamNnZGw4MU8va0Z6VUV0SWVFaFA0bHEvYTFZRkl1RkpnY0ZRbFV6NllCQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoid3RkaDVzN0NMZ01uSUdzc2kzNGdjVW1xcmlRemhUeVhrQ2pXVlJhWTVWRDNOWFVWTjJIOVNXNFJ2YmxSQ1BBbDEzV1ljR1k1N1JJc2ZBeUpqeWxtREE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTU2OTU3NDg1NjI6M0BzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJmeEVsVG5leUdPMFkxaENYZlNLb0VkY1NYL2dqZkE0UlNhY2VtNWJzb0V4In19XSwicGxhdGZvcm0iOiJzbWJhIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQxMzgxODkzLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5sNCJ9',
    PREFIXE: process.env.PREFIX || "@",
    OWNER_NAME: process.env.OWNER_NAME || "DICKENS",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "255714159646", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
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
