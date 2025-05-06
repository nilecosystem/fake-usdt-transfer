#!/bin/bash

echo "Setting up AirdropScan Telegram Bot..."

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file from template if it doesn't exist
if [ ! -f .env ]; then
  echo "Creating .env file from template..."
  cp env.example .env
  echo "Please edit the .env file to add your Telegram bot token."
else
  echo ".env file already exists. Skipping creation."
fi

echo ""
echo "Setup complete!"
echo "To start the bot in development mode, run: npm run dev"
echo "To start the bot in production mode, run: npm start"
echo ""
echo "Don't forget to update your BOT_TOKEN in the .env file!" 