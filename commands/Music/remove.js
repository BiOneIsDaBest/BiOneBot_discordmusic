export default {
  name: "remove",
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue || !player.queue.length) {
      return message.reply("📭 Hàng đợi hiện đang trống.");
    }

    const index = parseInt(args[0], 10);
    if (isNaN(index) || index < 1 || index > player.queue.length) {
      return message.reply(`❌ Vui lòng nhập số thứ tự từ \`1\` đến \`${player.queue.length}\``);
    }

    const removed = player.queue[index - 1];
    player.queue.remove(index - 1);

    return message.reply(`🗑️ Đã xoá bài: **${removed.title}** khỏi hàng đợi.`);
  }
}
