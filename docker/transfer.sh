#!/bin/sh

# Variables (modify as needed)
REMOTE_USER=nacho
REMOTE_HOST=192.168.1.85
REMOTE_PATH=/home/nacho/Desktop/tech-challenge
LOCAL_PATH=/transfer/dist/desafio-tecnico-lazarillo/
PASSWORD=${PASSWORD}

# Ensure the remote path exists
sshpass -p "${PASSWORD}" ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_PATH}"

# Copy files to the remote machine
sshpass -p "${PASSWORD}" scp -o StrictHostKeyChecking=no -r ${LOCAL_PATH}/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}
