import { ref, computed } from 'vue'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets'
import { SolflareWalletAdapter } from '@solana/wallet-adapter-wallets'
import { BackpackWalletAdapter } from '@solana/wallet-adapter-wallets'

// Daftar wallet yang didukung
const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
    new BackpackWalletAdapter(),
]

// State
const connected = ref(false)
const publicKey = ref<string | null>(null)
const currentWallet = ref<any>(null)
const walletName = ref<string | null>(null)

export const useWallet = () => {

    // Connect ke wallet tertentu
    const connect = async (walletType: 'phantom' | 'solflare' | 'backpack') => {
        const walletMap = {
            phantom: wallets[0],
            solflare: wallets[1],
            backpack: wallets[2],
        }

        const wallet = walletMap[walletType]

        try {
            await wallet.connect()
            connected.value = true
            publicKey.value = wallet.publicKey?.toString() || null
            currentWallet.value = wallet
            walletName.value = wallet.name

            return wallet
        } catch (err) {
            console.error('Failed to connect:', err)
            throw err
        }
    }

    // Disconnect
    const disconnect = async () => {
        if (currentWallet.value) {
            await currentWallet.value.disconnect()
        }
        connected.value = false
        publicKey.value = null
        currentWallet.value = null
        walletName.value = null
    }

    // Cek wallet mana yang ter-install
    const getInstalledWallets = () => {
        return wallets.filter(w => w.readyState === 'Installed')
    }

    return {
        connected,
        publicKey,
        walletName,
        currentWallet,
        connect,
        disconnect,
        getInstalledWallets,
        wallets,
    }
}