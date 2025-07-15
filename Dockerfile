FROM node:22-alpine as development

# Working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Start the application
RUN npm run build

CMD ["sh", "-c", "npm run migration:run && npm run start:dev"]
