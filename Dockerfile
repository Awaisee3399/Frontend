# Step 1: Build the React app
FROM node:18 AS build

WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Step 2: Serve the build using serve
FROM node:18

WORKDIR /app
RUN npm install -g serve

# Copy only the final build
COPY --from=build /app/build ./build

EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"]