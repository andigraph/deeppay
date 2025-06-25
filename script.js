const connector = new TonConnectSDK.TonConnect({
  manifestUrl: 'https://yourdomain.com/tonconnect-manifest.json'
});

connector.restoreConnection();

document.getElementById("connect-wallet").onclick = async () => {
  const wallets = await connector.getWallets();
  const wallet = wallets.find(w => w.universalLink || w.jsBridgeKey);
  if (!wallet) return alert("Tidak ada wallet yang ditemukan.");
  connector.connect(wallet.universalLink ? {
    universalLink: wallet.universalLink,
    bridgeUrl: wallet.bridgeUrl
  } : { jsBridgeKey: wallet.jsBridgeKey });
};

document.getElementById("pay-btn").onclick = async () => {
  const tx = {
    to: "0:DEEP_NET_WALLET_ADDRESS",
    value: "100000000",
    message: "Bayar WiFi DeepNet"
  };
  try {
    await connector.sendTransaction(tx);
    alert("🎉 Pembayaran berhasil!");
  } catch {
    alert("❌ Pembayaran gagal.");
  }
};