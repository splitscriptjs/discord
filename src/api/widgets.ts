import request from '../utils/request.js'
import toCamelCase from '../utils/toCamelCase.js'

import type { Snowflake } from '../types'
import type { Channel } from './channels'
import type { User } from './users'

class Widget {
	/** guild id */
	id!: Snowflake
	/** guild name (2-100 characters) */
	name!: string
	/** instant invite for the guilds specified widget invite channel */
	instantInvite!: string | null
	/** voice and stage channels which are accessible by @everyone */
	channels!: Partial<Channel>[]
	/** special widget user objects that includes users presence (Limit 100) */
	members!: Partial<User>[]
	/** number of online members in this guild */
	presenceCount!: number

	/** Gets this widget settings */
	async settings(): Promise<WidgetSettings> {
		return await settings(this.id)
	}
	/** Gets the widget image */
	async image(style?: WidgetImageStyle): Promise<string> {
		return await image(this.id, style)
	}
	/** Gets this widget
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<Widget> {
		const result = await get(this.id)
		Object.assign(this, result)
		return result
	}
	/** Edits this widget
	 *
	 * Also updates this class instance
	 */
	async edit(settings: Partial<WidgetSettings>): Promise<Widget> {
		const result = await edit(this.id, settings)
		Object.assign(this, result)
		return result
	}

	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
	}
}

async function settings(guildId: Snowflake): Promise<WidgetSettings> {
	return (await request.get(`guilds/${guildId}/widget`)) as WidgetSettings
}
/** Edit the widget settings for the guild */
async function edit(
	guildId: Snowflake,
	settings: Partial<WidgetSettings>
): Promise<Widget> {
	return new Widget(await request.patch(`guilds/${guildId}/widget`, settings))
}
/** Returns the widget for the guild. */
async function get(guildId: Snowflake): Promise<Widget> {
	return new Widget(await request.get(`guilds/${guildId}/widget.json`))
}
/** Returns a PNG image widget for the guild. */
async function image(
	guildId: Snowflake,
	style?: WidgetImageStyle
): Promise<string> {
	return (await request.get(`guilds/${guildId}/widget.png`, {
		style
	})) as string
}

type WidgetImageStyle = 'shield' | 'banner1' | 'banner2' | 'banner3' | 'banner4'
type WidgetSettings = {
	/** whether the widget is enabled */
	enabled: boolean
	/** the widget channel id */
	channelId: Snowflake | null
}
/** Used to manage guild widgets */
export { settings, edit, get, image }
/** Used to manage guild widgets */
export default { settings, edit, get, image }
