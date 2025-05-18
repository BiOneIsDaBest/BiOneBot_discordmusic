export default {
  name: "clearqueue",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue || player.queue.length === 0) {
      return message.reply("📭 Hàng đợi đã trống sẵn rồi.");
    }

    player.queue.clear();
    message.reply("🧹 Đã xoá toàn bộ bài hát trong hàng đợi.");
  }
}
