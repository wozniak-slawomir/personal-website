# syntax=docker/dockerfile:1

# Frontend build
FROM node:18 AS frontend-build
WORKDIR /app
COPY frontend .
RUN npm install
RUN npm run build && cp -r dist /bin/server

# Build the backend application
FROM rust:bookworm AS backend-build
ARG APP_NAME
WORKDIR /app

# Copy the backend source code
COPY ./backend/src ./src
COPY ./backend/Cargo.toml .
COPY ./backend/Cargo.lock .
COPY ./backend/.cargo/config.toml ./.cargo/config.toml

# Build the application.

RUN cargo build --locked --release && \
    cp -r ./target/release/$APP_NAME /bin/server

# Create a new stage for running the application
FROM debian:bookworm-slim AS final

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Create a non-privileged user that the app will run under.
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser
USER appuser

# Copy the executable from the "backend-build" stage.
COPY --from=backend-build /bin/server /bin/server
# Copy the frontend build output to the backend
COPY --from=frontend-build /bin/server /bin/server/static

RUN ls -la /bin/server/static
RUN ls -la /bin/server/static/assets

# Configure rocket to listen on all interfaces.
ENV ROCKET_ADDRESS=0.0.0.0

# Expose the port that the application listens on.
EXPOSE 8000

# What the container should run when it is started.
CMD ["/bin/server/backend"]
