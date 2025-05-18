export default {
  name: "uptime",
  run: async (client, message) => {
    const totalSeconds = Math.floor(process.uptime());
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    message.reply(`🕒 Bot đã chạy được: \`${hours}h ${minutes}m ${seconds}s\``);
  }
}
