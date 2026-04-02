const mineflayer = require('mineflayer');
const antiafk = require('mineflayer-antiafk');
const express = require('express');

// Web Server for Render/UptimeRobot
const app = express();
app.get('/', (req, res) => res.send('Bot Status: ACTIVE'));
app.listen(3000, () => console.log('Web server ready.'));

const botArgs = {
    host: 'Homecrafters.aternos.me', // REPLACE THIS
    port: 59004,
    username: 'Adithi',
    version: '1.26.3.1', // REPLACE with your server version
    auth: 'offline',   // Keep 'offline' for Cracked servers
    checkTimeoutInterval: 60000 
};

let bot;

function createBot() {
    bot = mineflayer.createBot(botArgs);
    bot.loadPlugin(antiafk);

    bot.on('spawn', () => {
        console.log("Bot spawned. Bypassing AFK detection...");
        bot.afk.setOptions({ chatting: true, distance: 4 });
        bot.afk.start();
    });

    bot.on('end', (reason) => {
        console.log(`Disconnected: ${reason}. Retrying in 15s...`);
        setTimeout(createBot, 15000);
    });

    bot.on('error', (err) => console.log(`Error: ${err}`));
}

createBot();
