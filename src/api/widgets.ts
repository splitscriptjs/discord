import request from '../utils/request.js'
import {
	Snowflake,
	WidgetSettings,
	Widget,
	WidgetImageStyle
} from '../types.js'

async function settings(guild_id: Snowflake): Promise<WidgetSettings> {
	return request.get(`guilds/${guild_id}/widget`) as unknown as WidgetSettings
}
/** Modify a guild widget settings object for the guild */
async function modify(
	guild_id: Snowflake,
	settings?: Partial<WidgetSettings>
): Promise<Widget> {
	return request.patch(
		`guilds/${guild_id}/widget`,
		settings
	) as unknown as Widget
}
/** Returns the widget for the guild. */
async function get(guild_id: Snowflake): Promise<Widget> {
	return request.get(`guilds/${guild_id}/widget.json`) as unknown as Widget
}
/** Returns a PNG image widget for the guild. */
async function image(
	guild_id: Snowflake,
	style: WidgetImageStyle
): Promise<string> {
	return request.get(`guilds/${guild_id}/widget.png`, {
		style: style
	}) as unknown as string
}
export default { settings, modify, get, image }
