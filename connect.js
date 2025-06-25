const connector = new TonConnectSDK.TonConnect({
  manifestUrl: "https://deeppay.vercel.app/tonconnect-manifest.json" // Ganti jika URL deploy beda
});

connector.restoreConnection();

document.getElementById("connect-btn").onclick = async () => {
  try {
    await connector.connect();
    const wallet = connector.wallet;
    if (wallet) {
      document.getElementById("address").classList.remove("hidden");
      document.getElementById("address").textContent = `✅ Terkoneksi: ${wallet.account.address}`;
    }
  } catch (error) {
    alert("Gagal menyambungkan wallet");
  }
};