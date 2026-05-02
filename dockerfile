# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project
COPY . .

# Install browsers (redundant but safe)
RUN npx playwright install --with-deps

# Run tests by default
CMD ["npx", "playwright", "test"]