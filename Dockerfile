# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Accept build arguments for environment variables
ARG VITE_API_URL
ARG VITE_SMTP_HOST
ARG VITE_SMTP_PORT
ARG VITE_SMTP_USER
ARG VITE_SMTP_PASS
ARG VITE_MAIL_RECEIVER
ARG VITE_SENDER_EMAIL

# Set environment variables from build args
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_SMTP_HOST=$VITE_SMTP_HOST
ENV VITE_SMTP_PORT=$VITE_SMTP_PORT
ENV VITE_SMTP_USER=$VITE_SMTP_USER
ENV VITE_SMTP_PASS=$VITE_SMTP_PASS
ENV VITE_MAIL_RECEIVER=$VITE_MAIL_RECEIVER
ENV VITE_SENDER_EMAIL=$VITE_SENDER_EMAIL

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