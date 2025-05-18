export default {
  name: "seek",
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài hát nào đang phát.");

    const seconds = parseInt(args[0]);
    if (isNaN(seconds)) {
      return message.reply("⏩ Vui lòng nhập số giây cần tua đến.");
    }

    player.seek(seconds * 1000); // chuyển sang milliseconds
    message.reply(`⏩ Đã tua đến ${seconds} giây.`);
  }
}
