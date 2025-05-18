import fs from "fs";
const prefixesPath = "./schema/prefixes.json";

export default {
  name: "setprefix",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("Administrator")) {
      return message.reply("❌ Bạn cần quyền **Administrator** để đổi prefix.");
    }

    const newPrefix = args[0];
    if (!newPrefix) return message.reply("❗ Vui lòng nhập prefix mới. Ví dụ: `!setprefix .`");

    let prefixes = {};
    if (fs.existsSync(prefixesPath)) {
      prefixes = JSON.parse(fs.readFileSync(prefixesPath));
    }

    prefixes[message.guild.id] = newPrefix;
    fs.writeFileSync(prefixesPath, JSON.stringify(prefixes, null, 2));

    message.reply(`✅ Đã đặt prefix mới cho server này là \`${newPrefix}\``);
  }
};
