import 'dotenv/config';
import { Client, GatewayIntentBits, Collection } from 'discord.js';
import fs from 'fs';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates
    ]
});

// Đọc prefix mặc định
const config = JSON.parse(fs.readFileSync("config.json"));
const globalPrefix = config.prefix || "!";

// Đọc prefix riêng từ file
let prefixes = {};
if (fs.existsSync("./schema/prefixes.json")) {
    prefixes = JSON.parse(fs.readFileSync("./schema/prefixes.json"));
}

client.commands = new Collection();

// Load lệnh General
const generalCommandFiles = fs.readdirSync('./commands/General').filter(file => file.endsWith('.js'));
for (const file of generalCommandFiles) {
    const command = await import(`./commands/General/${file}`);
    client.commands.set(command.default.name, command.default);
}

// Load commands từ thư mục chính (Music)
const musicCommandFiles = fs.readdirSync('./commands/Music').filter(file => file.endsWith('.js'));
for (const file of musicCommandFiles) {
    const command = await import(`./commands/Music/${file}`);
    client.commands.set(command.default.name, command.default);
}

// Load thêm lệnh cấu hình (ví dụ: setprefix)
const configCommandFiles = fs.readdirSync('./commands/Config').filter(file => file.endsWith('.js'));
for (const file of configCommandFiles) {
    const command = await import(`./commands/Config/${file}`);
    client.commands.set(command.default.name, command.default);
}

client.once('ready', () => {
    console.log(`✅ Logged in as ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot || !message.guild) return;

    // Lấy prefix theo từng server
    const prefix = prefixes[message.guild.id] || globalPrefix;
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    const command = client.commands.get(cmd);
    if (!command) return;

    try {
        await command.run(client, message, args);
    } catch (err) {
        console.error(err);
        message.reply('❌ Có lỗi xảy ra khi thực hiện lệnh.');
    }
});

// Erela (Lavalink) setup
import setupErela from './utils/erelaClient.js';
setupErela(client);

// Đăng nhập bot
client.login(process.env.TOKEN);
