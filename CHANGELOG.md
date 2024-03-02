# 3.2.2

Fix slow types, add documentation comments

# 3.2.0

- Fixed bug where arrays with non object values would be converted to object
- Restructure types (move most types in types.ts to relative files)
- Add helper enums (e.g `ChannelType`)
- allow imports like `@splitscript.js/discord/messages` and `@splitscript.js/discord/automod`
- move configs to package.json
- errors if gateway closes and reconnect is not allowed

# 3.1.3

Default intents to 0

# 3.1.2

Do not explicitly set patch version for `@splitscript.js/core`

# 3.1.0

- added typesafety for `toCamelCase` and to `toSnakeCase`
- change api options to camelCase
- better types
- add eslint

# 3.0.0

convert events and api responses to camelCase

# 2.0.2

Fixed `reactions.create` (wrong `https` method)

# 2.0.1

Upgrade to latest `@splitscript.js/core` version

# 2.0.0

**Classes**

Go from

```ts
const channel = await discord.channels.create('906313801366921286', {
	name: 'a-channel'
})
await discord.channels.edit(channel.id, {
	name: 'edited-channel'
})
```

to

```ts
const channel = await discord.channels.create('906313801366921286', {
	name: 'a-channel'
})
await channel.edit({
	name: 'edited-channel'
})
```

**Function Renames**

Functions with the name **modify** are now called **edit**
e.g `channels.modify` is now `channels.edit`
Functions with the name **modifyX** are now called **updateX**

e.g `guilds.modifyMFA` is now `guilds.updateMfa`

# 1.0.0

First version - all APIs added
