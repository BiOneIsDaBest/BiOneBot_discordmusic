export default {
  name: "shuffle",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || player.queue.length < 2) {
      return message.reply("❌ Không đủ bài để xáo trộn.");
    }

    player.queue.shuffle();
    message.reply("🔀 Đã xáo trộn danh sách phát.");
  }
}
