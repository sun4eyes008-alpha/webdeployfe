Universal Note + SpeechMiner Time v2.5.3 FULL
=============================================
Fix chính của bản này:
- Marker/text giờ chạy theo đúng viewport của custom scrollbar handle ngang (`.scrollbar-handle-top` / `.scrollbar-handle-bottom`).
- Logic mới đọc vị trí và độ rộng handle để tính `viewportStart` + `viewportSpan`, rồi đặt marker theo công thức:
  `x = ((markerPercent - viewportStart) / viewportSpan) * waveWidth`
  => khi kéo handle sang phải, mark ở 00:04 sẽ chạy sang trái đúng như bạn mong muốn, thay vì đứng im.
- Overlay chỉ rộng đúng phần wave đang hiển thị; label vẫn là `time + text`; click mark để đổi màu vàng → xanh lá → đỏ.
- Note chính trong sidepanel vẫn sync ngay sau khi add Quick Note.
