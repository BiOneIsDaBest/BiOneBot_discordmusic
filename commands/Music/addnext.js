export default {
  name: "addnext",
  run: async (client, message, args) => {
    const query = args.join(" ");
    if (!query) return message.reply("❌ Bạn chưa nhập tên bài hát.");
    
    const voiceChannel = message.member?.voice?.channel;
    if (!voiceChannel) return message.reply("❌ Bạn cần tham gia voice channel trước.");

    const player = client.manager.create({
      guild: message.guild.id,
      voiceChannel: voiceChannel.id,
      textChannel: message.channel.id,
      selfDeafen: true
    });

    if (player.state !== "CONNECTED") player.connect();

    const search = await client.manager.search(query, message.author);
    if (search.loadType === "NO_MATCHES") return message.reply("❌ Không tìm thấy bài hát.");
    if (search.loadType === "LOAD_FAILED") return message.reply("❌ Lỗi khi tìm kiếm bài hát.");

    const track = search.tracks[0];
    
    // 🟡 Thêm track vào vị trí kế tiếp (sau bài đang phát)
    player.queue.splice(0, 0, track); // index 0 là ngay sau bài hiện tại

    message.reply(`⏭️ Đã chèn bài: **${track.title}** vào ngay sau bài đang phát.`);
  }
}
