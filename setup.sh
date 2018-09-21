#!/bin/bash
sudo yum -y install nodejs npm --enablerepo=epel
npm config set registry http://registry.npmjs.org/
npm install