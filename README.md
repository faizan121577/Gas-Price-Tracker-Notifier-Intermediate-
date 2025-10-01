# Gas Price Tracker & Notifier

A Node.js script that monitors the gas price of an EVM network in real-time and sends a notification to a Telegram chat when the price drops below a specified threshold.

## Features

- Fetches real-time gas data.
- Configurable gas price threshold.
- Sends alerts directly to your Telegram.

## Setup

1.  **Clone & Install:**
    ```bash
    git clone <your-repo-url>
    cd <your-repo-name>
    npm install ethers dotenv axios
    ```

2.  **Create a Telegram Bot:**
    * Talk to the **BotFather** on Telegram.
    * Create a new bot to get your `TELEGRAM_BOT_TOKEN`.
    * Create a new group, add your bot to it, and send a message.
    * Find your `TELEGRAM_CHAT_ID` by talking to a bot like **@userinfobot**.

3.  **Configure `.env` file:**
    * Create a file named `.env` and add the following, replacing the placeholders with your own data:
        ```env
        RPC_URL="YOUR_INFURA_OR_ALCHEMY_RPC_URL"
        TELEGRAM_BOT_TOKEN="YOUR_TELEGRAM_BOT_TOKEN"
        TELEGRAM_CHAT_ID="YOUR_TELEGRAM_CHAT_ID"
        GAS_THRESHOLD_GWEI="15" 
        ```

4.  **Run the tracker:**
    ```bash
    node gas-tracker.js
    ```
