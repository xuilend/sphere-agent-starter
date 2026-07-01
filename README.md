# Sphere Agent Starter — Autonomous Agent for Unicity Network

> **Autonomous Agent for Unicity Testnet2** — Built with Sphere SDK  
> Track: **Autonomous Agents** | Target XP: **6,500** (Gold + Agentic + AstridOS)

---

## 🎯 Overview

This repository contains a fully functional **autonomous agent** that:
- ✅ Auto-creates wallet on first run (BIP39/BIP32)
- ✅ Sends/receives tokens on Unicity testnet2
- ✅ Listens for incoming transfers
- ✅ Runs as a persistent service (agentic — no human in loop)
- ✅ Compatible with **AstridOS** runtime

**Track:** Autonomous Agents  
**Goal:** Demonstrate deep SDK usage — payments, wallet management, autonomous economic actions

---

## 🚀 Quickstart

### Prerequisites
- Node.js v18+ (`npm`)
- Unicity testnet2 access (public API key provided)

### Installation
```bash
git clone https://github.com/tahee-labs/sphere-agent-starter.git
cd sphere-agent-starter
npm install
```

### Environment Setup
```bash
cp .env.example .env
# Edit .env with your config if needed
```

### Run the Agent
```bash
npm start
```

**Expected output:**
```
🚀 Starting Unicity Autonomous Agent...
✅ [AGENT] New wallet created
🔑 [AGENT] Seed phrase: word1 word2 ... word12
💾 [AGENT] Seed phrase saved to .agent_seed.txt
📍 [AGENT] Wallet address: 00007a...
🏷️ [AGENT] Unicity ID: @tahee_final
💸 [AGENT] Sending 1000000 UCT to 00007a00ade3f2958cf630000589287d...
✅ [AGENT] Transfer successful!
💰 [AGENT] Balance: 990000 UCT
👂 [AGENT] Listening for incoming transfers...
🤖 [AGENT] Agent running. Press Ctrl+C to stop.
```

---

## 📁 Project Structure

```
sphere-agent-starter/
├── src/
│   └── index.js              # Main agent logic
├── .env.example              # Environment variables template
├── .gitignore
├── package.json
└── README.md
```

---

## 🔧 Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `NETWORK` | Network alias | `testnet2` |
| `GATEWAY_URL` | Gateway endpoint | `gateway.testnet2.unicity.network` |
| `WALLET_API_URL` | Wallet API | `https://wallet-api.unicity.network` |
| `ORACLE_API_KEY` | Oracle API key | `sk_ddc...` (public testnet) |
| `DEVICE_ID` | Unique agent identifier | Auto-generated |
| `RECIPIENT_ADDRESS` | Destination for test transfer | `00007a00ade3f2958cf630000589287d` |
| `SEND_AMOUNT` | Amount to send (string) | `1000000` |
| `COIN_ID` | Token | Token type | `UCT` |

---

## 🎯 Agent Capabilities

| Feature | Implementation |
|---------|----------------|
| **Wallet Auto-Generation** | `Sphere.init({ autoGenerate: true })` |
| **Token Transfers** | `sphere.payments.send({ recipient, amount, coinId })` |
| **Balance Check** | `sphere.payments.getBalance({ coinId })` |
| **Incoming Transfer Listener** | `sphere.payments.onTransfer(handler)` |
| **Persistent Wallet** | Seed phrase saved to `.agent_seed.txt` |
| **Graceful Shutdown** | SIGINT handler closes sphere connection |

---

## 🏗️ Submission Details

### Track: **Autonomous Agents**
- **XP Target:** 6,500 (Gold 5,000 + Agentic 1,000 + AstridOS 500)
- **Agentic:** ✅ Runs as autonomous loop, no human clicks
- **AstridOS:** ✅ Compatible with AstridOS runtime
- **Deep SDK Use:** ✅ Payments, wallet, messaging primitives

### Submission Requirements ✅
- [x] Public GitHub repository
- [x] App runs on Unicity testnet2
- [x] Clear README with run instructions
- [x] Uses Sphere SDK primitives (payments, wallet, messaging)
- [x] Agentic behavior (autonomous economic actions)
- [x] Compatible with AstridOS

---

## 🚀 Deployment

### Local Development
```bash
npm run dev    # Hot reload with nodemon
```

### Production (VPS)
```bash
# On your VPS
git clone https://github.com/tahee-labs/sphere-agent-starter.git
cd sphere-agent-starter
npm install
npm start
```

### Cloudflare Tunnel (Free HTTPS)
```bash
# Install cloudflared
cloudflared tunnel --url http://localhost:3000
# Agent accessible at https://your-tunnel.trycloudflare.com
```

---

## 📋 Run Instructions for Reviewers

1. **Clone & Install**
   ```bash
   git clone https://github.com/tahee-labs/sphere-agent-starter.git
   cd sphere-agent-starter
   npm install
   ```

2. **Configure** (optional)
   ```bash
   cp .env.example .env
   # Edit RECIPIENT_ADDRESS if needed
   ```

3. **Run**
   ```bash
   npm start
   ```

4. **Observe**
   - Wallet auto-created (or restored from seed)
   - Test transfer sent
   - Balance checked
   - Agent listens for incoming transfers

---

## 🔐 Security Notes

- **Seed phrase** saved locally (`.agent_seed.txt`) — keep secure
- **Oracle API key** is public testnet key (`sk_ddc...`) — no secret
- **Device ID** auto-generated per instance
- No private keys in code — all in `.env` (gitignored)

---

## 📞 Contact & Links

- **GitHub:** https://github.com/tahee-labs/sphere-agent-starter
- **Unicity Portal:** https://developers.unicity.network
- **Sphere SDK Docs:** https://github.com/unicity-sphere/sphere-sdk
- **Discord:** Unicity Community

---

**Built with ❤️ by Tahee Labs for Unicity Builder Challenge**