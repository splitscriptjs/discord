<a href="https://www.npmjs.com/package/@splitscript.js/discord" align="">

![](https://i.imgur.com/L2Jtisg.png)

</a>

<div align="center">

Package for making discord bots

[![install size](https://packagephobia.com/badge?p=@splitscript.js/discord)](https://packagephobia.com/result?p=@splitscript.js/discord) [![downloads](https://img.shields.io/npm/dm/@splitscript.js/discord?color=90ee90&style=flat)](https://www.npmjs.com/package/@splitscript.js/discord)

<a href='https://splitscript.js.org/discord' style='text-decoration:none;'>

<img src='https://i.imgur.com/8PqPYu0.png' alt='docs' height='100px'>

</a>

</div>

## About

This package is part of [SplitScript.js, the everything framework](https://splitscript.js.org)

It is used for building discord bots

## Install

```bash
$ npm i @splitscript.js/discord
```

## Usage

### Listen for events

This authenticates the discord APIs and listens for events from the gateway

```js
import discord from '@splitscript.js/discord'

discord.listen('TOKEN', {
	// Intents get calculated automatically
	intents: ['guild_messages', 'message_content', 'other_intent']
})
```

### Authenticate API requests

You can also use `.login` if you don't want to listen for events, but just want to use the apis

```js
discord.login('TOKEN')
```

### Use the APIs

Most discord APIs should be supported.
You can use them like this:

```ts
await discord.channels.list('A_GUILD_ID')
```

For a full list of APIs, go to [the docs](https://splitscript.js.org/discord)

<div align="center">

<sub><code>v3.1.2</code> | by [ultraviolet](https://github.com/ultravioletasdf)</sub>

</div>
