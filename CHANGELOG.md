# 1.0.0

First version - all APIs added

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
