export default {
  name: "stop",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài hát nào đang phát.");

    player.destroy(); // Dừng nhạc và rời khỏi voice
    message.reply("⏹️ Đã dừng phát nhạc và rời khỏi kênh thoại.");
  }
}
