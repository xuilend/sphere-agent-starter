const { Sphere } = require('@unicitylabs/sphere-sdk');
const { createBrowserProviders } = require('@unicitylabs/sphere-sdk/impl/browser');
const { createWalletApiProviders } = require('@unicitylabs/sphere-sdk/impl/shared/wallet-api');
require('dotenv').config();

async function main() {
  console.log('🚀 Starting Unicity Autonomous Agent...');
  
  // --- Setup Providers ---------------------------------------------------------
  const base = createBrowserProviders({
    network: 'testnet',
    oracle: { apiKey: process.env.ORACLE_API_KEY || 'sk_ddc...n' },
  });

  const providers = createWalletApiProviders(base, {
    baseUrl: process.env.WALLET_API_URL || 'https://wallet-api.unicity.network',
    network: 'testnet2',
    deviceId: process.env.DEVICE_ID || 'agent-starter-' + Math.random().toString(36).slice(2, 10),
  });

  // --- Initialize Sphere (auto-create wallet if none exists) -------------------
  const { sphere, created, generatedMnemonic } = await Sphere.init({
    ...providers,
    autoGenerate: true,
  });

  if (created && generatedMnemonic) {
    console.log('✅ [AGENT] New wallet created');
    console.log('🔑 [AGENT] Seed phrase:', generatedMnemonic);
    // Save seed phrase for recovery
    require('fs').writeFileSync('.agent_seed.txt', generatedMnemonic);
    console.log('💾 [AGENT] Seed phrase saved to .agent_seed.txt');
  }

  // Get wallet info
  const wallet = sphere.wallet;
  console.log('📍 [AGENT] Wallet address:', wallet.address);
  console.log('🏷️ [AGENT] Unicity ID:', wallet.unicityId);

  // --- Agent Action: Send Tokens -----------------------------------------------
  const recipient = process.env.RECIPIENT_ADDRESS || '00007a00ade3f2958cf630000589287d';
  const amount = process.env.SEND_AMOUNT || '1000000';
  const coinId = process.env.COIN_ID || 'UCT';

  console.log(`💸 [AGENT] Sending ${amount} ${coinId} to ${recipient}...`);

  try {
    const tx = await sphere.payments.send({
      recipient: recipient,
      amount: amount,
      coinId: coinId,
      memo: 'Autonomous agent test transfer',
    });
    
    console.log('✅ [AGENT] Transfer successful!');
    console.log('📋 Transaction:', JSON.stringify(tx, null, 2));
  } catch (error) {
    console.error('❌ [AGENT] Transfer failed:', error.message);
  }

  // --- Agent Action: Check Balance ---------------------------------------------
  try {
    const balance = await sphere.payments.getBalance({ coinId });
    console.log(`💰 [AGENT] Balance: ${balance} ${coinId}`);
  } catch (error) {
    console.log('⚠️ [AGENT] Could not fetch balance:', error.message);
  }

  // --- Agent Action: Listen for Incoming Transfers -----------------------------
  console.log('👂 [AGENT] Listening for incoming transfers...');
  
  sphere.payments.onTransfer((transfer) => {
    console.log('📨 [AGENT] Received transfer:', transfer);
  });

  // Keep agent running
  console.log('🤖 [AGENT] Agent running. Press Ctrl+C to stop.');
  
  // Handle graceful shutdown
  process.on('SIGINT', async () => {
    console.log('\n🛑 [AGENT] Shutting down...');
    await sphere.close();
    process.exit(0);
  });
}

// Run agent
main().catch(console.error);