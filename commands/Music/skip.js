export default {
  name: "skip",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) {
      return message.reply("❌ Không có bài hát nào đang phát.");
    }

    const current = player.queue.current;
    player.stop();
    message.reply(`⏭️ Đã bỏ qua: **${current.title}**`);
  }
}
