export default {
  name: "queue",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue || !player.queue.length) {
      return message.reply("📭 Hàng đợi hiện đang trống.");
    }

    const queue = player.queue;
    const current = player.queue.current;

    const tracks = queue.slice(0, 10).map((track, index) => {
      return `\`${index + 1}.\` [${track.title}](${track.uri})`;
    }).join("\n");

    message.reply({
      content: `🎶 **Đang phát:** [${current.title}](${current.uri})\n\n📃 **Hàng đợi:**\n${tracks}`
    });
  }
}
