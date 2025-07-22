# Use a lightweight Node.js base image (Node.js 20 is suitable for your project)
FROM node:20-slim

# Set the working directory inside the container
# All subsequent commands will run from this directory
WORKDIR /app

# Copy package.json and package-lock.json first
# This step is crucial for Docker's build cache. If only dependencies change,
# Docker won't re-run the 'npm install' step, speeding up builds.
# Your project uses `package.json` and likely `package-lock.json`.
COPY package.json ./
COPY package-lock.json ./

# Install production dependencies
# `npm ci` is used for clean and reproducible builds, ideal for CI/CD.
# `--production` ensures only dependencies needed for runtime are installed.
# Your `.npmrc` shows `legacy-peer-deps=true`, `npm ci` handles this.
RUN npm ci --production

# Copy the rest of your application code
# This copies all files from your GitHub repo into the /app directory in the container.
COPY . .

# Build the client (React SPA) and server assets
# This command runs the "build" script defined in your package.json,
# which in turn executes "build:client" and "build:server" concurrently.
# The client assets will go to `dist/spa`, and the server build to `dist/server`.
RUN npm run build

# Expose the port your application listens on
# Your `server/node-build.ts` uses `process.env.PORT || 3000`. Cloud Run injects
# the `PORT` environment variable, so your app will listen on it. Defaulting to 8080
# is standard for Cloud Run.
ENV PORT 8080
EXPOSE 8080

# Define the command to run your production server when the container starts
# Your `vite.config.server.ts` builds the server entry point to `dist/server/production.mjs`.
CMD ["node", "dist/server/production.mjs"]
