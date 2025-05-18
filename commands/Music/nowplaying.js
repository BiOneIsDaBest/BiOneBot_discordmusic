export default {
  name: "nowplaying",
  run: async (client, message) => {
    const player = client.manager.players.get(message.guild.id);
    if (!player || !player.queue.current) {
      return message.reply("❌ Không có bài nào đang phát.");
    }

    const track = player.queue.current;
    const currentTime = formatTime(player.position);
    const totalTime = formatTime(track.duration);

    message.reply({
      content: `🎶 **Đang phát:** [${track.title}](${track.uri})\n` +
               `⏱️ Thời lượng: \`${currentTime} / ${totalTime}\`\n` +
               `👤 Yêu cầu bởi: ${track.requester || "Không rõ"}`
    });
  }
}

// Hàm định dạng mm:ss
function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}
