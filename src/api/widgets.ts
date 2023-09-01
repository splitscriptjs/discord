import request from '../utils/request.js'
import {
	Snowflake,
	WidgetSettings,
	Widget as RawWidget,
	WidgetImageStyle,
	Channel,
	User
} from '../types.js'
import toCamelCase from '../utils/toCamelCase.js'

class Widget {
	id!: Snowflake
	name!: string
	instantInvite!: string | null
	channels!: Partial<Channel>[]
	members!: Partial<User>[]
	presenceCount!: number

	/** Gets this widget settings */
	async settings() {
		return await settings(this.id)
	}
	/** Gets the widget image */
	async image(style?: WidgetImageStyle) {
		return await image(this.id, style)
	}
	/** Gets this widget
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.id)
		Object.assign(this, result)
		return result
	}
	/** Edits this widget
	 *
	 * Also updates this class instance
	 */
	async edit(settings: Partial<WidgetSettings>) {
		const result = await edit(this.id, settings)
		Object.assign(this, result)
		return result
	}

	constructor(data: RawWidget) {
		Object.assign(this, toCamelCase(data))
	}
}

async function settings(guild_id: Snowflake): Promise<WidgetSettings> {
	return request.get(`guilds/${guild_id}/widget`) as unknown as WidgetSettings
}
/** Edit the widget settings for the guild */
async function edit(
	guild_id: Snowflake,
	settings: Partial<WidgetSettings>
): Promise<Widget> {
	return new Widget(
		(await request.patch(
			`guilds/${guild_id}/widget`,
			settings
		)) as unknown as RawWidget
	)
}
/** Returns the widget for the guild. */
async function get(guild_id: Snowflake): Promise<Widget> {
	return new Widget(
		(await request.get(
			`guilds/${guild_id}/widget.json`
		)) as unknown as RawWidget
	)
}
/** Returns a PNG image widget for the guild. */
async function image(
	guild_id: Snowflake,
	style?: WidgetImageStyle
): Promise<string> {
	return (await request.get(`guilds/${guild_id}/widget.png`, {
		style
	})) as unknown as string
}
export default { settings, edit, get, image }
