export default {
  name: "volume",
  run: async (client, message, args) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player) return message.reply("❌ Không có bài hát nào đang phát.");

    const vol = parseInt(args[0]);
    if (!vol || isNaN(vol)) {
      return message.reply(`🔉 Âm lượng hiện tại là \`${player.volume}%\``);
    }

    if (vol < 0 || vol > 100) {
      return message.reply("❌ Vui lòng nhập âm lượng từ 0 đến 100.");
    }

    player.setVolume(vol);
    message.reply(`✅ Đã đặt âm lượng thành \`${vol}%\``);
  }
}
