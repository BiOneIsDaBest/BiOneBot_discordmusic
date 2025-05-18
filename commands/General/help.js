export default {
  name: "help",
  run: async (client, message) => {
    const helpText = `
🎵 **LỆNH NHẠC PREFIX CÓ THỂ DÙNG** 🎵

✅ \`!play <tên hoặc link>\` – Phát bài hát từ YouTube  
✅ \`!pause\` – Tạm dừng bài hát  
✅ \`!resume\` – Tiếp tục phát nhạc  
✅ \`!stop\` – Dừng nhạc và rời voice  
✅ \`!skip\` – Bỏ qua bài đang phát  
✅ \`!queue\` – Hiển thị hàng đợi hiện tại  
✅ \`!volume <0-100>\` – Điều chỉnh âm lượng  
✅ \`!loop track/queue/off\` – Lặp bài / hàng đợi  
✅ \`!seek <giây>\` – Tua đến thời điểm nhất định  
✅ \`!shuffle\` – Xáo trộn hàng đợi  
✅ \`!addnext <tên bài>\` – Chèn bài kế tiếp sau bài đang phát  
✅ \`!247 on/off\` – Giữ bot trong voice 24/7  
✅ \`!nowplaying\` – Hiển thị bài đang phát  
✅ \`!remove <số thứ tự>\` – Xóa 1 bài khỏi hàng đợi  
✅ \`!clearqueue\` – Xóa toàn bộ hàng đợi  
✅ \`!setprefix <ký tự>\` – Đổi prefix lệnh cho server này

💡 Gợi ý: Gõ \`!lệnh\` để dùng ngay. Ví dụ: \`!play never gonna give you up\`
    `;

    message.reply({ content: helpText.trim() });
  }
}
