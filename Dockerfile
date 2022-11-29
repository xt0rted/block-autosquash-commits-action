FROM node:16-alpine

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of your action's code
COPY . .

# Run `node /main.js`
ENTRYPOINT [ "node", "/main.js" ]
