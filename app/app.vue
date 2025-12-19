<template>
  <div class="page-wrapper">
    <div class="glow-orb orb-1"></div>
    <div class="glow-orb orb-2"></div>

    <div class="main-card">
      <div class="card-content">

        <div class="top-bar">
          <div v-if="!walletAddress" class="status-badge disconnected">
            <span class="dot"></span> Not Connected
          </div>
          <div v-else class="status-badge connected">
            <span class="dot"></span> {{ truncatedAddress }}
          </div>

          <button v-if="!walletAddress" @click="showWalletModal = true" class="connect-btn">
            Connect Wallet
          </button>
          <button v-else @click="disconnectWallet" class="disconnect-btn">
            Disconnect
          </button>
        </div>

        <div class="header-section">
          <div class="icon-container">
            <span class="emoji">☕</span>
          </div>
          <h1 class="title">Fuel the Code</h1>
          <p class="subtitle">Support the project via Solana Network.<br>Select a specific amount below.</p>
        </div>

        <div class="grid-options" :class="{ 'disabled': !walletAddress }">
          <button @click="handleDonate(0.1)" class="option-card">
            <div class="option-bg"></div>
            <span class="amount">0.1 SOL</span>
            <span class="tier-label">Seed</span>
          </button>

          <button @click="handleDonate(0.5)" class="option-card featured">
            <div class="featured-badge">POPULAR</div>
            <div class="option-bg"></div>
            <span class="amount">0.5 SOL</span>
            <span class="tier-label">Builder</span>
          </button>

          <button @click="handleDonate(1)" class="option-card">
            <div class="option-bg"></div>
            <span class="amount">1.0 SOL</span>
            <span class="tier-label">Architect</span>
          </button>
        </div>

        <div class="divider"><span>OR MANUAL TRANSFER</span></div>
        <div class="wallet-component" @click="copyDestAddress">
          <div class="wallet-info">
            <span class="label">Dev Wallet Address</span>
            <code class="address-text">{{ truncatedDestAddress }}</code>
          </div>
          <div class="action-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </div>
        </div>

      </div>
    </div>

    <div v-if="showWalletModal" class="modal-overlay" @click.self="showWalletModal = false">
      <div class="modal-card">
        <div class="modal-header">
          <h3>Connect Wallet</h3>
          <button class="close-btn" @click="showWalletModal = false">×</button>
        </div>

        <div class="wallet-list">
          <div class="wallet-item" :class="{ 'selected': selectedWallet === 'Phantom' }"
            @click="selectedWallet = 'Phantom'">
            <div class="wallet-icon phantom-bg">
              <svg width="24" height="24" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="64" cy="64" r="64" fill="url(#phantom-grad)"/>
                <path d="M110.5 64C110.5 88.9 90.3 109 65.9 109H39.7C36.2 109 33.4 106.2 33.4 102.7V57.4C33.4 37.1 49.8 20.7 70.1 20.7C90.4 20.7 110.5 37.1 110.5 57.4V64Z" fill="white"/>
                <ellipse cx="54" cy="64" rx="8" ry="9" fill="#4E44CE"/>
                <ellipse cx="78" cy="64" rx="8" ry="9" fill="#4E44CE"/>
                <defs><linearGradient id="phantom-grad" x1="0" y1="0" x2="128" y2="128"><stop stop-color="#534BB1"/><stop offset="1" stop-color="#551BF9"/></linearGradient></defs>
              </svg>
            </div>
            <span>Phantom</span>
            <span v-if="selectedWallet === 'Phantom'" class="check">✓</span>
          </div>

          <div class="wallet-item" :class="{ 'selected': selectedWallet === 'Solflare' }"
            @click="selectedWallet = 'Solflare'">
            <div class="wallet-icon solflare-bg">
              <img src="https://solflare.com/favicon.ico" width="24" height="24" alt="Solflare" />
            </div>
            <span>Solflare</span>
            <span v-if="selectedWallet === 'Solflare'" class="check">✓</span>
          </div>

          <div class="wallet-item" :class="{ 'selected': selectedWallet === 'Backpack' }"
            @click="selectedWallet = 'Backpack'">
            <div class="wallet-icon backpack-bg">
              <img src="https://backpack.app/favicon.ico" width="24" height="24" alt="Backpack" />
            </div>
            <span>Backpack</span>
            <span v-if="selectedWallet === 'Backpack'" class="check">✓</span>
          </div>
        </div>

        <button class="confirm-connect-btn" :disabled="!selectedWallet" @click="connectSelectedWallet">
          Connect to {{ selectedWallet || 'Wallet' }}
        </button>
      </div>
    </div>

    <div v-if="transactionStatus !== 'idle'" class="modal-overlay">
      <div class="status-card">
        <div v-if="transactionStatus === 'processing'" class="status-content">
          <div class="spinner"></div>
          <h3>Processing Transaction</h3>
          <p>Please approve the request in your wallet...</p>
        </div>

        <div v-if="transactionStatus === 'success'" class="status-content">
          <div class="status-icon success">✓</div>
          <h3>Donation Sent!</h3>
          <p>Thank you for your support.</p>
          <button @click="transactionStatus = 'idle'" class="close-status-btn">Awesome</button>
        </div>

        <div v-if="transactionStatus === 'error'" class="status-content">
          <div class="status-icon error">!</div>
          <h3>Transaction Failed</h3>
          <p>{{ statusMessage }}</p>
          <button @click="transactionStatus = 'idle'" class="close-status-btn">Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

// --- CONFIG ---
const destinationWallet = '9PnVe4SMoh3jomJba6KvHKJLLnJBt1gY1W9WiEph6Mfp'

// --- STATE ---
const showWalletModal = ref(false)
const selectedWallet = ref < string | null > (null)
const walletAddress = ref < string | null > (null)
const currentProvider = ref < any > (null)

// Status Transaksi: 'idle', 'processing', 'success', 'error'
const transactionStatus = ref('idle')
const statusMessage = ref('')

// --- COMPUTED ---
const truncatedDestAddress = computed(() => {
  return `${destinationWallet.slice(0, 6)}...${destinationWallet.slice(-4)}`
})

const truncatedAddress = computed(() => {
  if (!walletAddress.value) return ''
  return `${walletAddress.value.slice(0, 4)}...${walletAddress.value.slice(-4)}`
})

// --- ACTIONS ---

// 1. Logic Memilih Provider Wallet
const getProvider = (walletName: string) => {
  if (typeof window === 'undefined') return null
  const win = window as any

  if (walletName === 'Phantom') {
    if (win.phantom?.solana?.isPhantom) return win.phantom.solana
    if (win.solana?.isPhantom) return win.solana
    window.open('https://phantom.app/', '_blank')
  }
  else if (walletName === 'Solflare') {
    if (win.solflare?.isSolflare) return win.solflare
    window.open('https://solflare.com/', '_blank')
  }
  else if (walletName === 'Backpack') {
    if (win.backpack) return win.backpack
    window.open('https://backpack.app/', '_blank')
  }

  alert(`${walletName} not found! Please install the extension.`)
  return null
}

// 2. Connect Wallet Flow
const connectSelectedWallet = async () => {
  if (!selectedWallet.value) return

  try {
    const provider = getProvider(selectedWallet.value)
    if (!provider) return

    // Trigger connection modal dari extension
    const resp = await provider.connect()

    // Simpan state
    currentProvider.value = provider
    walletAddress.value = resp.publicKey.toString()

    // Tutup modal
    showWalletModal.value = false

  } catch (err) {
    console.error("Connection failed", err)
  }
}

const disconnectWallet = () => {
  if (currentProvider.value) {
    currentProvider.value.disconnect()
  }
  walletAddress.value = null
  currentProvider.value = null
  selectedWallet.value = null
}

// 3. Donation Logic
const handleDonate = async (amount: number) => {
  if (!walletAddress.value || !currentProvider.value) {
    showWalletModal.value = true
    return
  }

  transactionStatus.value = 'processing'

  try {
    // Setup Connection (Gunakan Mainnet untuk production, Devnet untuk test)
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

    const fromPubkey = new PublicKey(walletAddress.value)
    const toPubkey = new PublicKey(destinationWallet)

    const transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey,
        toPubkey,
        lamports: amount * LAMPORTS_PER_SOL,
      })
    )

    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = fromPubkey

    // Sign & Send menggunakan provider yang aktif
    const { signature } = await currentProvider.value.signAndSendTransaction(transaction)

    // Wait for confirmation
    await connection.confirmTransaction(signature)

    transactionStatus.value = 'success'

  } catch (err: any) {
    console.error(err)
    transactionStatus.value = 'error'
    statusMessage.value = err.message || 'Transaction rejected'
  }
}

const copyDestAddress = () => {
  navigator.clipboard.writeText(destinationWallet)
  alert("Dev address copied!")
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

/* Base Layout */
.page-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #050505;
  font-family: 'Inter', sans-serif;
  color: #fff;
  overflow: hidden;
}

/* Background Effects */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.4;
  z-index: 0;
}

.orb-1 {
  width: 300px;
  height: 300px;
  background: #9945FF;
  top: -50px;
  left: -50px;
}

.orb-2 {
  width: 250px;
  height: 250px;
  background: #14F195;
  bottom: -50px;
  right: -50px;
}

/* Main Card */
.main-card {
  position: relative;
  width: 100%;
  max-width: 480px;
  z-index: 10;
  margin: 1rem;
}

.card-content {
  background: rgba(20, 20, 23, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 2rem;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Top Bar & Status */
.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.status-badge {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 6px 12px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.05);
}

.status-badge.connected {
  color: #14F195;
  border: 1px solid rgba(20, 241, 149, 0.2);
}

.status-badge.disconnected {
  color: #ff4d4d;
  border: 1px solid rgba(255, 77, 77, 0.2);
}

.dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
  margin-right: 6px;
}

.connect-btn,
.disconnect-btn {
  background: #fff;
  color: #000;
  border: none;
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
}

.connect-btn:hover {
  background: #e0e0e0;
  transform: translateY(-1px);
}

.disconnect-btn {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

/* Header */
.header-section {
  text-align: center;
  margin-bottom: 2rem;
}

.icon-container {
  display: inline-flex;
  background: rgba(255, 255, 255, 0.05);
  padding: 1rem;
  border-radius: 50%;
  margin-bottom: 1rem;
  font-size: 2rem;
}

.title {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 700;
}

.subtitle {
  color: #888899;
  font-size: 0.9rem;
  margin-top: 0.5rem;
}

/* Grid Options */
.grid-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-bottom: 2rem;
  transition: opacity 0.3s;
}

.grid-options.disabled {
  opacity: 0.5;
  pointer-events: none;
}

.option-card {
  position: relative;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 1rem 0.5rem;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: all 0.2s;
}

.option-card:hover {
  border-color: #9945FF;
  transform: translateY(-2px);
}

.amount {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
}

.tier-label {
  font-size: 0.7rem;
  color: #888;
  margin-top: 4px;
}

.featured {
  border-color: rgba(20, 241, 149, 0.3);
  background: rgba(20, 241, 149, 0.05);
}

.featured-badge {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #14F195;
  color: #000;
  font-size: 0.6rem;
  font-weight: 800;
  padding: 2px 6px;
  border-radius: 4px;
}

/* Wallet Component (Manual) */
.divider {
  display: flex;
  align-items: center;
  color: #444;
  font-size: 0.7rem;
  margin: 1.5rem 0;
  font-weight: 700;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
  margin: 0 1rem;
}

.wallet-component {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0a0a0c;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 0.75rem 1rem;
  border-radius: 10px;
  cursor: pointer;
}

.wallet-info {
  display: flex;
  flex-direction: column;
}

.wallet-info .label {
  font-size: 0.65rem;
  color: #666;
  text-transform: uppercase;
  margin-bottom: 4px;
}

.address-text {
  color: #14F195;
  font-family: 'JetBrains Mono';
  font-size: 0.85rem;
}

/* --- MODAL STYLES --- */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  padding: 1rem;
}

.modal-card,
.status-card {
  background: #1a1a1f;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 360px;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.close-btn {
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
}

/* Wallet List */
.wallet-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1.5rem;
}

.wallet-item {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.8rem;
  border-radius: 10px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s;
}

.wallet-item:hover {
  background: rgba(255, 255, 255, 0.06);
}

.wallet-item.selected {
  border-color: #14F195;
  background: rgba(20, 241, 149, 0.05);
}

.wallet-icon {
  width: 36px;
  height: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
}

.phantom-bg {
  background: rgba(171, 159, 242, 0.2);
}

.solflare-bg {
  background: rgba(252, 114, 38, 0.2);
}

.backpack-bg {
  background: rgba(227, 62, 63, 0.2);
}

.check {
  margin-left: auto;
  color: #14F195;
  font-weight: bold;
}

.confirm-connect-btn {
  width: 100%;
  padding: 12px;
  border-radius: 10px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, #9945FF, #14F195);
  color: white;
}

.confirm-connect-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #333;
}

/* Status Modal Content */
.status-content {
  text-align: center;
}

.status-content h3 {
  margin: 1rem 0 0.5rem;
}

.status-content p {
  color: #888;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
}

.status-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  font-size: 1.5rem;
}

.status-icon.success {
  background: rgba(20, 241, 149, 0.2);
  color: #14F195;
}

.status-icon.error {
  background: rgba(255, 77, 77, 0.2);
  color: #ff4d4d;
}

.close-status-btn {
  background: rgba(255, 255, 255, 0.1);
  border: none;
  padding: 10px 24px;
  color: #fff;
  border-radius: 8px;
  cursor: pointer;
}

/* Spinner */
.spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top: 3px solid #14F195;
  border-radius: 50%;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>