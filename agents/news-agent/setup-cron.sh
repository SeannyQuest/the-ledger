#!/bin/bash
# Daonra News Agent cron setup
# Run: bash setup-cron.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$SCRIPT_DIR/news-agent.log"

# Install deps first
cd "$SCRIPT_DIR" && npm install

# Add cron jobs
(crontab -l 2>/dev/null; echo "0 8 * * * cd $SCRIPT_DIR && npm run fetch >> $LOG_FILE 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "0 9-22 * * * cd $SCRIPT_DIR && npm run fetch:hourly >> $LOG_FILE 2>&1") | crontab -

echo "Cron jobs installed:"
crontab -l | grep news-agent
