#!/bin/bash
REPOSITORY=/home/ubuntu/build

cd $REPOSITORY

#? dependencies 설치
echo 'Installing Dependencies ...'
/usr/bin/yarn

#? Prisma 사전 작업
echo 'Generating Prisma ...'
/usr/bin/yarn generate

#? PM2로 서버 실행
echo 'Starting server with PM2 ...'
/usr/bin/pm2 restart /usr/bin/yarn -- start-server:dev
