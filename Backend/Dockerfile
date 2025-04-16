FROM node:18-slim AS build

WORKDIR /usr/src/app

# Copy package files first for better layer caching
COPY package*.json ./
COPY bun.lockb ./

# Install necessary dependencies including Python for bcrypt
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    python3 \
    make \
    g++ \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g bun

# Install dependencies
RUN bun install --frozen-lockfile

# Copy only necessary files
COPY prisma ./prisma/
COPY tsconfig*.json nest-cli.json ./
COPY src ./src/
COPY .env* ./

# Generate Prisma client and build the application
RUN npm rebuild bcrypt --build-from-source
RUN bunx prisma generate
RUN bun run build

# Production stage
FROM node:18-slim AS production

WORKDIR /usr/src/app

# Copy package files for production
COPY package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/node_modules/.prisma ./node_modules/.prisma
COPY prisma ./prisma/
COPY .env* ./

# Install only necessary production dependencies
RUN apt-get update -y && \
    apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && npm install -g bun

# Create a non-root user
RUN groupadd -r appuser && useradd -r -g appuser appuser
RUN mkdir -p /usr/src/app/uploads && chown -R appuser:appuser /usr/src/app

# Switch to non-root user
USER appuser

# Set environment variables
ENV NODE_ENV=production

EXPOSE 3000

# Run the application with migrations
CMD ["bun", "start:migrate:prod"]
