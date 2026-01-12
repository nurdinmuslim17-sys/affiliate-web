function generate() {
  const link = document.getElementById("link").value;
  const promo = document.getElementById("promo").value;
  const imageFile = document.getElementById("image").files[0];

  // Validasi
  if (!link || !imageFile) {
    alert("Link affiliate dan gambar wajib diisi!");
    return;
  }

  // Preview gambar
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById("previewImg").src = reader.result;
  };
  reader.readAsDataURL(imageFile);

  // Teks promo
  document.getElementById("promoText").innerText = promo || "Promo Menarik Hari Ini!";

  // Tombol beli
  document.getElementById("buyBtn").href = link;
}
let recordedChunks = [];
let mediaRecorder;

function generateVideo() {
  const canvas = document.getElementById("videoCanvas");
  const ctx = canvas.getContext("2d");

  const imgSrc = document.getElementById("previewImg").src;
  const promoText = document.getElementById("promoText").innerText;

  if (!imgSrc) {
    alert("Preview gambar dulu!");
    return;
  }

  canvas.style.display = "block";

  const img = new Image();
  img.src = imgSrc;

  const stream = canvas.captureStream(30);
  mediaRecorder = new MediaRecorder(stream, { mimeType: "video/webm" });

  recordedChunks = [];
  mediaRecorder.ondataavailable = e => recordedChunks.push(e.data);

  mediaRecorder.onstop = () => {
    const blob = new Blob(recordedChunks, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    const download = document.getElementById("downloadVideo");
    download.href = url;
    download.download = "affiliate-video.webm";
    download.style.display = "block";
    download.innerText = "Download Video";
  };

  mediaRecorder.start();

  let frame = 0;
  const duration = 150; // total frame

  const animate = () => {
    frame++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Background
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Zoom effect
    const scale = 1 + frame * 0.001;
    const w = img.width * scale;
    const h = img.height * scale;

    ctx.drawImage(
      img,
      canvas.width / 2 - w / 2,
      canvas.height / 2 - h / 2,
      w,
      h
    );

    // Promo text
    ctx.fillStyle = "white";
    ctx.font = "bold 60px Arial";
    ctx.textAlign = "center";
    ctx.fillText(promoText, canvas.width / 2, canvas.height - 200);

    if (frame < duration) {
      requestAnimationFrame(animate);
    } else {
      mediaRecorder.stop();
    }
  };

  img.onload = animate;
}
