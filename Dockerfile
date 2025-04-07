# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Copy package files for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

# Set environment to production
ENV NODE_ENV=production

# Copy built application from build stage
COPY --from=build /app/.output /app/.output

# Expose the default Nuxt port
EXPOSE 3000

# Start the application
CMD ["node", "/app/.output/server/index.mjs"]