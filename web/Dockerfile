# Use Node.js v23.6.0
FROM node:23.6.0

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./web/package.json ./web/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY ./web .

# Copy the OpenAPI docs file from the /api directory
COPY ./api/storage/api-docs/api-docs.json ./api-docs.json

# Generate types from OpenAPI spec
RUN npx openapi-typescript ./api-docs.json --output ./src/api/types/api.d.ts

# Build the app
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Set environment variable for API
ENV VITE_API_BASE="http://localhost:8000"

# Start the app
CMD ["npm", "run", "preview", "--", "--host"]