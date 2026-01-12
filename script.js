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
