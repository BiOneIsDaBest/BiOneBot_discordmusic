export default {
  name: "save",
  run: async (client, message, args) => {
    const reference = message.reference;
    const reply = reference ? await message.channel.messages.fetch(reference.messageId) : message;

    const content = reply.content || "📝 (Không có nội dung văn bản)";
    const attachments = [...reply.attachments.values()];
    const files = attachments.map(att => att.url);

    try {
      await message.author.send({
        content: `💾 **Đã lưu tin nhắn:**\n📨 Nội dung: ${content}\n👤 Từ: ${reply.author?.tag || "Không rõ"}\n🔗 [Nhảy đến tin nhắn](${reply.url})`,
        files: files.length > 0 ? files : []
      });

      message.reply("📬 Tin nhắn đã được lưu vào DM của bạn.");
    } catch (err) {
      console.error(err);
      message.reply("❌ Không thể gửi DM cho bạn. Vui lòng bật nhận tin nhắn từ server.");
    }
  }
}
