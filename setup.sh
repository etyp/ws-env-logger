#!/bin/bash
curl --silent --location https://rpm.nodesource.com/setup_8.x | sudo bash -
sudo yum -y install nodejs
npm config set registry http://registry.npmjs.org/
npm install
echo "Ready to go. Run `npm start` to begin."