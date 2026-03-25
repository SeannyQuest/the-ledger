#!/bin/bash
# Daonra News Agent cron setup
# Run: bash setup-cron.sh

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
LOG_FILE="$SCRIPT_DIR/news-agent.log"

# Install deps first
cd "$SCRIPT_DIR" && npm install

# Source .env for key names (used to build cron env prefix)
ENV_FILE="$SCRIPT_DIR/.env"
if [ ! -f "$ENV_FILE" ]; then
  echo "ERROR: $ENV_FILE not found. Copy .env.example and fill in GOOGLE_AI_API_KEY."
  exit 1
fi
ENV_EXPORT="$(grep -v '^#' "$ENV_FILE" | grep '=' | xargs | sed 's/ /; /g')"

# Add cron jobs (env vars sourced inline so cron's restricted shell gets them)
(crontab -l 2>/dev/null; echo "0 8 * * * $ENV_EXPORT; cd $SCRIPT_DIR && npm run fetch >> $LOG_FILE 2>&1") | crontab -
(crontab -l 2>/dev/null; echo "0 9-22 * * * $ENV_EXPORT; cd $SCRIPT_DIR && npm run fetch:hourly >> $LOG_FILE 2>&1") | crontab -

echo "Cron jobs installed:"
crontab -l | grep news-agent
