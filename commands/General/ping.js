export default {
  name: "ping",
  run: async (client, message) => {
    const sent = await message.reply("🏓 Đang đo ping...");
    const ping = sent.createdTimestamp - message.createdTimestamp;
    sent.edit(`🏓 Độ trễ: \`${ping}ms\` | API Ping: \`${Math.round(client.ws.ping)}ms\``);
  }
}
