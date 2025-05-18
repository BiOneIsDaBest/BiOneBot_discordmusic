export default {
  name: "resume",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài hát nào đang phát.");
    if (!player.paused) return message.reply("▶️ Bài hát đang phát rồi.");

    player.pause(false);
    message.reply("▶️ Tiếp tục phát nhạc.");
  }
}
