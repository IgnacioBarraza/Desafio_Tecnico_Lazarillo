#!/bin/sh

# Variables (modify as needed)
REMOTE_USER=nacho
REMOTE_HOST=192.168.1.85
REMOTE_TEMP_PATH=/home/nacho/Desktop/tech-challenge
REMOTE_FINAL_PATH=/var/www/tech-challenge
LOCAL_PATH=/transfer/dist/desafio-tecnico-lazarillo/
PASSWORD=${PASSWORD}

# Ensure the remote temp path exists
sshpass -p "${PASSWORD}" ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "mkdir -p ${REMOTE_TEMP_PATH}"

# Copy files to the remote temp directory
sshpass -p "${PASSWORD}" scp -o StrictHostKeyChecking=no -r ${LOCAL_PATH}/* ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_TEMP_PATH}

# Move files to the final destination with sudo
sshpass -p "${PASSWORD}" ssh -o StrictHostKeyChecking=no ${REMOTE_USER}@${REMOTE_HOST} "
echo ${PASSWORD} | sudo -S rm -rf ${REMOTE_FINAL_PATH} &&
echo ${PASSWORD} | sudo -S mkdir -p ${REMOTE_FINAL_PATH}
echo ${PASSWORD} | sudo -S cp -r ${REMOTE_TEMP_PATH}/* ${REMOTE_FINAL_PATH} && 
echo ${PASSWORD} | sudo -S rm -rf ${REMOTE_TEMP_PATH}/*"
