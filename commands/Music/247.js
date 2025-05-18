export default {
  name: "247",
  run: async (client, message, args) => {
    const sub = args[0];
    const player = client.manager.players.get(message.guild.id);

    if (!player) return message.reply("❌ Không có player nào đang hoạt động.");

    if (sub === "on") {
      player.set("247", true);
      message.reply("✅ Đã bật chế độ 24/7. Bot sẽ luôn ở trong voice.");
    } else if (sub === "off") {
      player.set("247", false);
      message.reply("❎ Đã tắt chế độ 24/7. Bot sẽ rời voice khi hết nhạc.");
    } else {
      const status = player.get("247") ? "🟢 đang bật" : "🔴 đang tắt";
      message.reply(`💤 Trạng thái 24/7 hiện tại: ${status}`);
    }
  }
}
