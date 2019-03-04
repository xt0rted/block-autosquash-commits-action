FROM node:11-alpine

LABEL "name"="block-autosquash-commits-action"

# Labels for GitHub to read the action
LABEL "com.github.actions.name"="Block Autosquash Commits"
LABEL "com.github.actions.description"="Blocks merging pull requests containing commits prefixed with fixup! or squash!"
LABEL "com.github.actions.icon"="alert-circle"
LABEL "com.github.actions.color"="red"

# Labels for GitHub to publish the action
LABEL "repository"="https://github.com/xt0rted/block-autosquash-commits-action"
LABEL "homepage"="https://github.com/xt0rted/block-autosquash-commits-action"
LABEL "maintainer"="Brian Surowiec"

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy the rest of your action's code
COPY . .

# Run `node /entrypoint.js`
ENTRYPOINT [ "node", "/entrypoint.js" ]
