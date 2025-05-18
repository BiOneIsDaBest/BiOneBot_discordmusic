export default {
  name: "pause",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài hát nào đang phát.");
    if (player.paused) return message.reply("⏸️ Bài hát đã được tạm dừng trước đó.");

    player.pause(true);
    message.reply("⏸️ Đã tạm dừng phát nhạc.");
  }
}
