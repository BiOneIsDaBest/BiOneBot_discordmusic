export default {
  name: "play",
  run: async (client, message, args) => {
    const voiceChannel = message.member?.voice?.channel;
    if (!voiceChannel) return message.reply("❌ Bạn cần tham gia voice channel trước.");

    const query = args.join(" ");
    if (!query) return message.reply("❌ Bạn chưa nhập tên bài hát.");

    // Tạo hoặc lấy player từ Lavalink
    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: voiceChannel.id,
      textChannel: message.channel.id,
      selfDeafen: true
    });

    // Kết nối nếu chưa kết nối
    if (player.state !== "CONNECTED") player.connect();

    // Tìm kiếm bài hát
    const res = await client.manager.search(query, message.author);
    if (res.loadType === "LOAD_FAILED") return message.reply("❌ Lỗi khi tìm kiếm bài hát.");
    if (res.loadType === "NO_MATCHES") return message.reply("❌ Không tìm thấy bài hát phù hợp.");

    // Gán người yêu cầu vào bài hát
    const track = res.tracks[0];
    track.requester = message.author.username;

    // Thêm bài hát vào hàng đợi
    player.queue.add(track);

    // Phát nếu chưa có bài đang chạy
    if (!player.playing && !player.paused && !player.queue.size) {
      player.play();
    }

    return message.reply(`✅ Đã thêm vào hàng đợi: **${track.title}**`);
  }
}
