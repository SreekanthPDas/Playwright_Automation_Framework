# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first (better caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy rest of the project
COPY . .

# Ensure result folders exist (important for mounted volumes)
RUN mkdir -p /app/playwright-report /app/test-results /app/allure-results

# Run tests
CMD ["npx", "playwright", "test"]