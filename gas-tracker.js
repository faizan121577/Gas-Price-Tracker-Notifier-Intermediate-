const { ethers } = require("ethers");
const axios = require("axios");
require("dotenv").config();

// Load configuration from .env file
const RPC_URL = process.env.RPC_URL;
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const GAS_THRESHOLD_GWEI = parseFloat(process.env.GAS_THRESHOLD_GWEI);

if (!RPC_URL || !TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID || !GAS_THRESHOLD_GWEI) {
    console.error("Error: Missing required environment variables in .env file.");
    process.exit(1);
}

const provider = new ethers.providers.JsonRpcProvider(RPC_URL);

async function sendTelegramNotification(message) {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    try {
        await axios.post(url, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'Markdown'
        });
        console.log("✅ Notification sent!");
    } catch (error) {
        console.error("❌ Error sending Telegram notification:", error.message);
    }
}

async function checkGasPrice() {
    try {
        const feeData = await provider.getFeeData();
        const gasPriceInGwei = parseFloat(ethers.utils.formatUnits(feeData.gasPrice, 'gwei'));
        
        console.log(`Current Gas Price: ${gasPriceInGwei.toFixed(2)} Gwei`);

        if (gasPriceInGwei < GAS_THRESHOLD_GWEI) {
            const message = `⛽ *Gas Price Alert!* ⛽\n\nCurrent gas price is *${gasPriceInGwei.toFixed(2)} Gwei*, which is below your threshold of *${GAS_THRESHOLD_GWEI} Gwei*.`;
            await sendTelegramNotification(message);
        }
    } catch (error) {
        console.error("❌ Error fetching gas price:", error.message);
    }
}

console.log("🚀 Gas Tracker Started.");
console.log(`Will notify if gas drops below ${GAS_THRESHOLD_GWEI} Gwei.`);
console.log("Checking every minute...");

// Check immediately on start, then every 60 seconds.
checkGasPrice();
setInterval(checkGasPrice, 60 * 1000);
