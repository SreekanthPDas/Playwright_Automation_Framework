# Use official Playwright image
FROM mcr.microsoft.com/playwright:v1.45.0-jammy

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm ci

# 👉 Install Allure CLI (needed to generate report)
RUN npm install -g allure-commandline --save-dev

# Copy rest of the project
COPY . .

# Install browsers (redundant but safe)
RUN npx playwright install --with-deps

# 👉 Ensure result folders exist (important for volume mounts)
RUN mkdir -p /app/allure-results /app/allure-report /app/playwright-report /app/test-results

# Run tests by default
CMD ["npx", "playwright", "test"]