// utils/erelaClient.js
import { Manager } from 'erela.js';

export default function setupErela(client) {
  client.manager = new Manager({
    nodes: [
      {
        host: "localhost",       // hoặc IP/VPS của bạn
        port: 2333,
        password: "youshallnotpass",
        identifier: "main"
      }
    ],
    send(id, payload) {
      const guild = client.guilds.cache.get(id);
      if (guild) guild.shard.send(payload);
    }
  });

  // Cập nhật trạng thái voice
  client.on("raw", (d) => client.manager.updateVoiceState(d));

  // Sự kiện kết nối node
  client.manager.on("nodeConnect", node => {
    console.log(`✅ Kết nối Lavalink node: ${node.options.identifier}`);
  });

  // Sự kiện bắt đầu phát bài mới
  client.manager.on("trackStart", (player, track) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (channel) {
      channel.send(`🎶 Đang phát: **${track.title}**`);
    }
  });

  // ✅ CHỈNH SỬA ở đây – xử lý khi hết queue
  client.manager.on("queueEnd", (player) => {
    const channel = client.channels.cache.get(player.textChannel);
    if (channel) channel.send("📃 Danh sách phát đã kết thúc.");

    // Nếu 24/7 đang bật, KHÔNG destroy player
    if (player.get("247")) {
      console.log("🛑 Chế độ 24/7 đang bật → giữ bot trong voice.");
      return;
    }

    player.destroy(); // Nếu không 24/7 → rời khỏi voice
  });
}
