# ☕ Solana Donation Page

A Web3 donation page built with **Nuxt 3** and **Solana**. Accept SOL donations with multi-wallet support and a beautiful glassmorphism UI.

![Solana](https://img.shields.io/badge/Solana-9945FF?style=for-the-badge&logo=solana&logoColor=white)
![Nuxt](https://img.shields.io/badge/Nuxt-00DC82?style=for-the-badge&logo=nuxtdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

## ✨ Features

- 🎨 Modern glassmorphism UI design
- 💜 Solana gradient theme
- 👛 **Multi-wallet support** (Phantom, Solflare, Backpack)
- 🔗 Connect/Disconnect wallet flow
- 📋 One-click address copy
- 💸 Quick donate buttons (0.1, 0.5, 1 SOL)
- ⏳ Transaction status modal (processing, success, error)
- 📱 Responsive design

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) v18+
- A Solana wallet extension:
  - [Phantom](https://phantom.app/) (Recommended)
  - [Solflare](https://solflare.com/)
  - [Backpack](https://backpack.app/)

### Installation

```bash
# Clone the repository
git clone https://github.com/theepar/solana-donation.git
cd solana-donation

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💰 Getting Devnet SOL (For Testing)

1. **Install a Wallet**  
   Download [Phantom](https://phantom.app/), [Solflare](https://solflare.com/), or [Backpack](https://backpack.app/)

2. **Switch to Devnet**  
   - Open your wallet → Settings (⚙️)
   - Developer Settings → Change Network → **Devnet**

3. **Get Free SOL**  
   Visit the official Solana faucet: [https://faucet.solana.com/](https://faucet.solana.com/)
   - Paste your wallet address
   - Click "Confirm Airdrop"
   - You'll receive free devnet SOL!

## 🔌 Supported Wallets

| Wallet | Status | Notes |
|--------|--------|-------|
| Phantom | ✅ Supported | Most popular Solana wallet |
| Solflare | ✅ Supported | Solana-native wallet |
| Backpack | ✅ Supported | Multi-chain wallet |

## ⚙️ Configuration

### Change Recipient Wallet

Edit `app/app.vue` and update the destination wallet address:

```typescript
const destinationWallet = 'YOUR_SOLANA_WALLET_ADDRESS'
```

### Switch to Mainnet (Production)

Update the connection in `app/app.vue`:

```typescript
// Devnet (testing)
const connection = new Connection('https://api.devnet.solana.com', 'confirmed')

// Mainnet (production)
const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed')
```

> ⚠️ **Warning**: On Mainnet, transactions use real SOL with real value!

## 🛠️ Tech Stack

- **Framework**: [Nuxt 3](https://nuxt.com/)
- **Blockchain**: [Solana](https://solana.com/)
- **Packages**:
  - `@solana/web3.js` - Solana JavaScript SDK
  - `buffer` - Buffer polyfill for browser environment

## 📁 Project Structure

```
solana-donation/
├── app/
│   └── app.vue              # Main donation page with wallet logic
├── plugins/
│   └── buffer.client.ts     # Buffer polyfill for browser
├── nuxt.config.ts           # Nuxt configuration
└── package.json
```

## 🎯 User Flow

1. User opens the donation page
2. Clicks "Connect Wallet"
3. Selects wallet (Phantom/Solflare/Backpack)
4. Approves connection in wallet extension
5. Clicks donate amount (0.1, 0.5, or 1 SOL)
6. Approves transaction in wallet
7. Transaction confirmed → Success! 🎉

## 🔍 Verify Transactions

After donating, you can verify your transaction on **Solscan** block explorer:

### Devnet Transactions
- **Account**: [https://solscan.io/account/<WALLET_ADDRESS>?cluster=devnet]
- **Transaction**: `https://solscan.io/tx/<SIGNATURE>?cluster=devnet`

### Mainnet Transactions
- **Account**: `https://solscan.io/account/<WALLET_ADDRESS>`
- **Transaction**: `https://solscan.io/tx/<SIGNATURE>`

## 🚢 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run generate
# Upload dist/ folder to Netlify
```

## 📝 License

MIT License - feel free to use for your own projects!

## 🤝 Contributing

Pull requests are welcome!

---

Made with 💜 and ☕
