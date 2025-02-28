#!/bin/bash
# Build frontend
cd frontend
npm install
npm run build
mkdir -p ../backend/src/main/resources/static
cp -r build/* ../backend/src/main/resources/static/
cd ..

# Build backend
cd backend
./mvnw clean package -DskipTests