#!/bin/bash

git pull origin master

cd frontend

yarn install

yarn build

cd ..

cd backend

yarn stop

yarn install

yarn service
