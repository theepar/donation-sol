<template>
  <div class="relative min-h-screen w-full flex items-center justify-center bg-[#050505] text-white font-sans overflow-hidden">
    
    <div class="absolute top-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#9945FF] rounded-full blur-[100px] opacity-30 animate-float"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[250px] h-[250px] bg-[#14F195] rounded-full blur-[100px] opacity-30 animate-float-reverse"></div>

    <div class="relative z-10 w-full max-w-lg px-4 py-8">
      <div class="bg-[#141417]/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl ring-1 ring-white/5">

        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 border-b border-white/5 pb-6">
          <div 
            class="flex items-center px-4 py-1.5 rounded-full text-xs font-bold border transition-all duration-300"
            :class="!walletAddress 
              ? 'text-red-400 border-red-500/20 bg-red-500/5' 
              : 'text-[#14F195] border-[#14F195]/20 bg-[#14F195]/5 shadow-[0_0_10px_rgba(20,241,149,0.1)]'"
          >
            <span class="w-2 h-2 rounded-full bg-current mr-2 animate-pulse"></span>
            {{ !walletAddress ? 'Not Connected' : truncatedAddress }}
          </div>

          <button 
            v-if="!walletAddress" 
            @click="showWalletModal = true" 
            class="w-full sm:w-auto bg-white text-black px-6 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 hover:-translate-y-0.5 transition-all shadow-lg shadow-white/10"
          >
            Connect Wallet
          </button>
          <button 
            v-else 
            @click="disconnectWallet" 
            class="w-full sm:w-auto bg-white/5 text-gray-300 border border-white/10 px-6 py-2 rounded-xl text-xs font-bold hover:bg-white/10 hover:text-white transition-all"
          >
            Disconnect
          </button>
        </div>

        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-white/5 rounded-2xl mb-6 text-4xl shadow-[0_0_30px_rgba(153,69,255,0.15)] ring-1 ring-white/10">
            ☕
          </div>
          <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-3 tracking-tight">
            Fuel the Code
          </h1>
          <p class="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto">
            Support the project via Solana Network.<br class="hidden sm:block">Every transaction keeps the updates coming.
          </p>
        </div>

        <div 
          class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 transition-all duration-300"
          :class="{ 'opacity-50 pointer-events-none grayscale': !walletAddress }"
        >
          <button @click="handleDonate(0.1)" class="group relative bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-[#9945FF]/50 hover:bg-[#9945FF]/5 hover:-translate-y-1 transition-all duration-300">
            <span class="block font-mono font-bold text-lg mb-1 group-hover:text-[#9945FF] transition-colors">0.1 SOL</span>
            <span class="text-xs text-gray-500 font-medium">Seed</span>
          </button>

          <button @click="handleDonate(0.5)" class="group relative bg-[#14F195]/5 border border-[#14F195]/30 rounded-2xl p-4 hover:border-[#14F195] hover:-translate-y-1 transition-all duration-300 shadow-[0_0_20px_rgba(20,241,149,0.05)] hover:shadow-[0_0_30px_rgba(20,241,149,0.2)]">
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#14F195] text-[#050505] text-[10px] font-extrabold px-3 py-1 rounded-full shadow-lg tracking-wide">
              POPULAR
            </div>
            <span class="block font-mono font-bold text-lg mb-1 text-[#14F195]">0.5 SOL</span>
            <span class="text-xs text-[#14F195]/70 font-medium">Builder</span>
          </button>

          <button @click="handleDonate(1)" class="group relative bg-white/5 border border-white/5 rounded-2xl p-4 hover:border-[#9945FF]/50 hover:bg-[#9945FF]/5 hover:-translate-y-1 transition-all duration-300">
            <span class="block font-mono font-bold text-lg mb-1 group-hover:text-[#9945FF] transition-colors">1.0 SOL</span>
            <span class="text-xs text-gray-500 font-medium">Architect</span>
          </button>
        </div>

        <div class="relative flex py-2 items-center mb-6">
          <div class="flex-grow border-t border-white/5"></div>
          <span class="flex-shrink-0 mx-4 text-gray-600 text-[10px] font-bold tracking-widest uppercase">Or Manual Transfer</span>
          <div class="flex-grow border-t border-white/5"></div>
        </div>

        <div 
          @click="copyDestAddress"
          class="group flex justify-between items-center bg-black/40 border border-white/10 p-4 rounded-xl cursor-pointer hover:border-white/30 hover:bg-black/60 transition-all active:scale-[0.98]"
        >
          <div class="flex flex-col overflow-hidden mr-4">
            <span class="text-[10px] text-gray-500 font-bold mb-1 tracking-wide">DEV WALLET ADDRESS</span>
            <code class="text-[#14F195] font-mono text-sm truncate group-hover:text-white transition-colors">{{ truncatedDestAddress }}</code>
          </div>
          <div class="p-2 bg-white/5 rounded-lg text-gray-500 group-hover:text-white group-hover:bg-white/10 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
          </div>
        </div>

      </div>
    </div>

    <Transition name="fade">
      <div v-if="showWalletModal" class="fixed inset-0 z-50 flex items-center justify-center px-4" @click.self="showWalletModal = false">
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
        
        <div class="relative bg-[#1a1a1f] border border-white/10 w-full max-w-sm rounded-3xl p-6 shadow-2xl animate-slide-up">
          <div class="flex justify-between items-center mb-6">
            <h3 class="text-lg font-bold">Connect Wallet</h3>
            <button class="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors" @click="showWalletModal = false">✕</button>
          </div>

          <div class="space-y-3 mb-8">
            <div 
              v-for="wallet in ['Phantom', 'Solflare', 'Backpack']" 
              :key="wallet"
              class="flex items-center p-4 rounded-xl border cursor-pointer transition-all duration-200"
              :class="selectedWallet === wallet ? 'bg-[#14F195]/10 border-[#14F195] shadow-[0_0_15px_rgba(20,241,149,0.1)]' : 'bg-white/5 border-transparent hover:bg-white/10'"
              @click="selectedWallet = wallet"
            >
              <div class="w-10 h-10 rounded-lg flex items-center justify-center mr-4"
                   :class="{
                     'bg-[#AB9FF2]/20': wallet === 'Phantom',
                     'bg-[#FC7226]/20': wallet === 'Solflare',
                     'bg-[#E33E3F]/20': wallet === 'Backpack'
                   }">
                 <!-- Phantom SVG Icon -->
                 <svg v-if="wallet === 'Phantom'" width="24" height="24" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                   <circle cx="64" cy="64" r="64" fill="url(#phantom-grad)"/>
                   <path d="M110.5 64C110.5 88.9 90.3 109 65.9 109H39.7C36.2 109 33.4 106.2 33.4 102.7V57.4C33.4 37.1 49.8 20.7 70.1 20.7C90.4 20.7 110.5 37.1 110.5 57.4V64Z" fill="white"/>
                   <ellipse cx="54" cy="64" rx="8" ry="9" fill="#4E44CE"/>
                   <ellipse cx="78" cy="64" rx="8" ry="9" fill="#4E44CE"/>
                   <defs><linearGradient id="phantom-grad" x1="0" y1="0" x2="128" y2="128"><stop stop-color="#534BB1"/><stop offset="1" stop-color="#551BF9"/></linearGradient></defs>
                 </svg>
                 <!-- Solflare Favicon -->
                 <img v-if="wallet === 'Solflare'" src="https://solflare.com/favicon.ico" width="24" height="24" alt="Solflare" />
                 <!-- Backpack Favicon -->
                 <img v-if="wallet === 'Backpack'" src="https://backpack.app/favicon.ico" width="24" height="24" alt="Backpack" />
              </div>
              <span class="font-bold text-sm tracking-wide">{{ wallet }}</span>
              <div v-if="selectedWallet === wallet" class="ml-auto w-6 h-6 bg-[#14F195] rounded-full flex items-center justify-center text-black text-xs font-bold">✓</div>
            </div>
          </div>

          <button 
            class="w-full py-4 rounded-xl font-bold transition-all disabled:opacity-50 disabled:cursor-not-allowed text-[#050505] bg-[#14F195] hover:bg-[#12d685] hover:shadow-[0_0_20px_rgba(20,241,149,0.3)] active:scale-[0.98]"
            :disabled="!selectedWallet" 
            @click="connectSelectedWallet"
          >
            Connect to {{ selectedWallet || 'Wallet' }}
          </button>
        </div>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="transactionStatus !== 'idle'" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/90 backdrop-blur-md"></div>
        <div class="relative bg-[#1a1a1f] border border-white/10 w-full max-w-xs rounded-3xl p-8 shadow-2xl text-center animate-bounce-in">
          
          <div v-if="transactionStatus === 'processing'">
            <div class="w-16 h-16 border-4 border-white/10 border-t-[#14F195] rounded-full animate-spin mx-auto mb-6"></div>
            <h3 class="text-xl font-bold mb-2">Processing</h3>
            <p class="text-gray-400 text-sm">Please check your wallet to approve the transaction...</p>
          </div>

          <div v-if="transactionStatus === 'success'">
            <div class="w-16 h-16 bg-[#14F195]/20 text-[#14F195] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl shadow-[0_0_30px_rgba(20,241,149,0.2)]">✓</div>
            <h3 class="text-xl font-bold mb-2 text-white">Donation Sent!</h3>
            <p class="text-gray-400 text-sm mb-8">Thank you for fueling the code.</p>
            <button @click="transactionStatus = 'idle'" class="w-full py-3 bg-white/10 rounded-xl hover:bg-white/20 font-bold text-sm transition-colors">Awesome</button>
          </div>

          <div v-if="transactionStatus === 'error'">
            <div class="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6 text-3xl">✕</div>
            <h3 class="text-xl font-bold mb-2">Failed</h3>
            <p class="text-red-400/80 text-sm mb-8 break-words">{{ statusMessage }}</p>
            <button @click="transactionStatus = 'idle'" class="w-full py-3 bg-white/10 rounded-xl hover:bg-white/20 font-bold text-sm transition-colors">Close</button>
          </div>

        </div>
      </div>
    </Transition>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js'

// --- CONFIGURATION ---
const destinationWallet = '9PnVe4SMoh3jomJba6KvHKJLLnJBt1gY1W9WiEph6Mfp' // Ganti dengan wallet asli Anda jika sudah siap

// --- REACTIVE STATE ---
const showWalletModal = ref(false)
const selectedWallet = ref<string | null>(null)
const walletAddress = ref<string | null>(null)
const currentProvider = ref<any>(null)
const transactionStatus = ref('idle') // 'idle' | 'processing' | 'success' | 'error'
const statusMessage = ref('')

// --- COMPUTED PROPERTIES ---
const truncatedDestAddress = computed(() => `${destinationWallet.slice(0, 6)}...${destinationWallet.slice(-4)}`)
const truncatedAddress = computed(() => !walletAddress.value ? '' : `${walletAddress.value.slice(0, 4)}...${walletAddress.value.slice(-4)}`)

// --- WALLET UTILITIES ---
const getProvider = (walletName: string) => {
  if (typeof window === 'undefined') return null
  const win = window as any
  if (walletName === 'Phantom') {
    if (win.phantom?.solana?.isPhantom) return win.phantom.solana
    if (win.solana?.isPhantom) return win.solana // Legacy support
    window.open('https://phantom.app/', '_blank')
  } else if (walletName === 'Solflare') {
    if (win.solflare?.isSolflare) return win.solflare
    window.open('https://solflare.com/', '_blank')
  } else if (walletName === 'Backpack') {
    if (win.backpack) return win.backpack
    window.open('https://backpack.app/', '_blank')
  }
  return null
}

// --- ACTIONS ---
const connectSelectedWallet = async () => {
  if (!selectedWallet.value) return
  try {
    const provider = getProvider(selectedWallet.value)
    if (!provider) return
    const resp = await provider.connect()
    currentProvider.value = provider
    walletAddress.value = resp.publicKey.toString()
    showWalletModal.value = false
  } catch (err) { 
    console.error("Connection failed", err) 
  }
}

const disconnectWallet = () => {
  if (currentProvider.value) currentProvider.value.disconnect()
  walletAddress.value = null
  currentProvider.value = null
  selectedWallet.value = null
}

const handleDonate = async (amount: number) => {
  if (!walletAddress.value || !currentProvider.value) {
    showWalletModal.value = true; return
  }
  
  transactionStatus.value = 'processing'
  statusMessage.value = ''

  try {
    // Gunakan 'confirmed' agar user tidak menunggu terlalu lama (finalized terlalu lama)
    const connection = new Connection('https://api.devnet.solana.com', 'confirmed')
    
    const fromPubkey = new PublicKey(walletAddress.value)
    const toPubkey = new PublicKey(destinationWallet)
    
    const transaction = new Transaction().add(
      SystemProgram.transfer({ fromPubkey, toPubkey, lamports: amount * LAMPORTS_PER_SOL })
    )
    
    const { blockhash } = await connection.getLatestBlockhash()
    transaction.recentBlockhash = blockhash
    transaction.feePayer = fromPubkey
    
    // Sign & Send
    const { signature } = await currentProvider.value.signAndSendTransaction(transaction)
    
    // Confirm
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
  alert("Address copied to clipboard!")
}
</script>

<style>
/* GLOBAL CSS RESET */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  background-color: #050505; /* Menghilangkan garis putih saat overscroll */
}

/* CUSTOM ANIMATIONS */
@keyframes float {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(30px, 50px); }
}

.animate-float { animation: float 10s infinite ease-in-out; }
.animate-float-reverse { animation: float 12s infinite ease-in-out reverse; }

.animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes slideUp {
  from { opacity: 0; transform: translateY(40px) scale(0.95); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-bounce-in { animation: bounceIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
@keyframes bounceIn {
  from { opacity: 0; transform: scale(0.8); }
  to { opacity: 1; transform: scale(1); }
}

/* TRANSITION UTILS */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>