# Docs

General documentation about this project and it's related features.

## NPM & Workspaces

This project is a monorepo that relies on [npm](https://docs.npmjs.com/) to manage [workspaces](https://docs.npmjs.com/cli/v9/using-npm/workspaces).

You can create multiple projects with different technologies by adding a new workspace folder under the `/packages` folder.

#### How to add a new workspace

```bash
npm init -w ./packages/[name]
# or
npm init -w ./libs/[name]
```

Make sure to use the following naming convention when creating a new workspace: `[project-name]-[technology]-[type]`. i.e.: 
- `/packages/ppa-angular-client/`
- `/packages/ppa-nest-api/`

#### How to setup shared workspaces

If you need to create a shared workspace for different projects just add a folder under `/libs` and follow the naming convention: `[project-name]-shared`.

i.e.: `/libs/ppa-shared/`.

#### How to add a dependency to a specific workspace

```bash
npm -i [package] -w packages/[name] 
# or
npm -i [package] -w libs/[name]
```

## Command History Records

#### NVM commands to manage nodejs installations (optional)
```bash
# list nodejs versions available for installation
nvm ls-remote
# install latest lts node version
nvm install --lts
# check node version
node --version # v20.11.0
# check npm version
npm --version # v10.2.4
```

#### Nestjs app related commands:

```bash
# install nestjs
npm i -g @nestjs/cli
# add project/workspace to packages folder
npm init -w ./packages/[name]
# create nestjs app inside workspace
nest new [name] --directory packages/[name] --skip-git --strict --package-manager npm
```

#### NPM available commands

```bash
# install all dependencies
npm install
# install only workspace dependencies
npm install -w packages/[name]
# start ppa app (server and client)
npm run ppa:start
# start only ppa-nest-api (port 3000)
npm run ppa:nest:start
```

### Docker commands:
```bash
# run the application in development environment
docker-compose up -d
# run the application in production environment
docker-compose -f "docker-compose.production.yml" up -d --build 
```
Or you can install the recommended VSCode extension for docker and run the docker-compose file manually
