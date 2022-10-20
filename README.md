# Discord League of Legends ARAM MMR Bot
A node.js discord bot that allows you to look up a summoners ARAM MMR via WhatIsMyMMR.com

## Assumptions: 
You are able to run a node.js application with your enviornment and you are familiar with the Discord bot ecosystem

## How to run the bot:

- Create the Discord App https://discord.com/developers/applications
    Some help could be found at: https://discord.com/developers/docs/getting-started#creating-an-app
- Obtain your Client Secret for this app
- Update 'token' in default-config.json with your secret key
- Rename default-config.json to config.json

Install the dependencies and devDependencies and start the server.
```sh
npm i
```
Run the app
```sh
node index.js
```
