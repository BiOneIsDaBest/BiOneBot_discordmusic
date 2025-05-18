export default {
  name: "loop",
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài nào đang phát.");

    const mode = args[0];
    if (mode === "track") {
      player.setTrackRepeat(true);
      player.setQueueRepeat(false);
      return message.reply("🔂 Đã bật lặp lại bài hiện tại.");
    } else if (mode === "queue") {
      player.setQueueRepeat(true);
      player.setTrackRepeat(false);
      return message.reply("🔁 Đã bật lặp lại toàn bộ hàng đợi.");
    } else {
      player.setQueueRepeat(false);
      player.setTrackRepeat(false);
      return message.reply("⏹️ Đã tắt chế độ lặp.");
    }
  }
}
