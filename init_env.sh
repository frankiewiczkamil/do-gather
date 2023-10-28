#!/bin/bash

ENV_FILE=".env"

if [ ! -f "$ENV_FILE" ]; then
  echo "Creating $ENV_FILE"
  SECRET=$(openssl rand -base64 32)
  echo "NEXTAUTH_SECRET=$SECRET" > "$ENV_FILE"
  echo "NEXTAUTH_URL=http://localhost:3000" >> "$ENV_FILE"
fi
