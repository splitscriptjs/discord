import request from '../utils/request.js'
import { Snowflake } from '../types'
import toCamelCase from '../utils/toCamelCase.js'
import { ChannelType } from './channels.js'

class Command {
	id!: Snowflake
	type?: CommandType
	applicationId!: Snowflake
	guildId?: Snowflake
	name!: string
	nameLocalizations: LocaleObject | null | undefined
	description!: string
	descriptionLocalizations?: LocaleObject | null | undefined
	options?: CommandOption[]
	defaultMemberPermissions!: string | null
	dmPermission?: boolean
	defaultPermission?: boolean | null | undefined
	nsfw?: boolean
	version!: string

	/** Deletes this channel */
	async delete() {
		return await _delete(this.id, this.guildId)
	}
	/** Updates this channel
	 *
	 * Also updates this class instance
	 */
	async edit(updatedCommand: EditParams): Promise<Command> {
		const result = await edit(this.id, updatedCommand)
		Object.assign(this, result)
		return result
	}
	/** Gets this command
	 *
	 * Also updates this class instance
	 */
	async get() {
		const result = await get(this.id, this.guildId)
		Object.assign(this, result)
		return result
	}
	async getPermissions(guildId: Snowflake): Promise<CommandPermission>
	async getPermissions(guildId?: undefined): Promise<CommandPermission>
	async getPermissions(guildId?: Snowflake): Promise<CommandPermission> {
		if (guildId) {
			return await permissions.get(this.id, guildId)
		} else if (!this.guildId) {
			throw new Error('This is not a guild command, must have `guildId`')
		} else {
			return await permissions.get(this.id, this.guildId)
		}
	}
	constructor(command: unknown) {
		Object.assign(this, toCamelCase(command))
	}
}

async function create(
	command: {
		/** Name of command, 1-32 characters */
		name: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		nameLocalizations?: LocaleObject | null
		/** 1-100 character description */
		description?: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		descriptionLocalizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		defaultMemberPermissions?: string | null
		/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		defaultPermission?: boolean
		/** Type of command, defaults `1` if not set */
		type?: CommandType
		/** Indicates whether the command is age-restricted */
		nsfw?: boolean
	},
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`
	const _command = await request.post(URL, command)
	return new Command(_command)
}
async function _delete(
	commandId: Snowflake,
	guildId?: Snowflake
): Promise<void> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`
	await request.delete(URL)
}

type EditParams = {
	/** Name of command, 1-32 characters */
	name?: string
	/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
	nameLocalizations?: LocaleObject | null
	/** 1-100 character description */
	description?: string
	/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
	descriptionLocalizations?: LocaleObject | null
	/** Parameters for the command */
	options?: CommandOption[]
	/** Set of permissions represented as a bit set */
	defaultMemberPermissions?: string | null
	/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
	defaultPermission?: boolean
	/** Indicates whether the command is age-restricted */
	nsfw?: boolean
}
async function edit(
	commandId: Snowflake,
	command: EditParams,
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`
	const _command = await request.patch(URL, command)
	return new Command(_command)
}
async function list(
	guildId?: Snowflake | null,
	withLocalizations?: boolean
): Promise<Command[]> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`
	const commands = (await request.get(URL, {
		with_localizations: withLocalizations
	})) as unknown[]
	return commands.map((command) => new Command(command))
}
async function bulkOverwrite(
	commands: {
		/** ID of the command, if known */
		id?: Snowflake
		/** Name of command, 1-32 characters */
		name: string
		/** Localization dictionary for the `name` field. Values follow the same restrictions as `name` */
		nameLocalizations?: LocaleObject | null
		/** 1-100 character description */
		description: string
		/** Localization dictionary for the `description` field. Values follow the same restrictions as `description` */
		descriptionLocalizations?: LocaleObject | null
		/** Parameters for the command */
		options?: CommandOption[]
		/** Set of permissions represented as a bit set */
		defaultMemberPermissions?: string | null
		/** Indicates whether the command is available in DMs with the app, only for globally-scoped commands. By default, commands are visible. */
		dmPermission?: boolean | null
		/** Replaced by `defaultMemberPermissions` and will be deprecated in the future. Indicates whether the command is enabled by default when the app is added to a guild. Defaults to `true` */
		defaultPermission?: boolean
		/** Type of command, defaults `1` if not set */
		type?: CommandType
		/** Indicates whether the command is age-restricted */
		nsfw?: boolean
	}[],
	guildId?: Snowflake
): Promise<void> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands`
		: `applications/{APP_ID}/commands`

	await request.post(URL, commands)
}
async function get(
	commandId: Snowflake,
	guildId?: Snowflake
): Promise<Command> {
	const URL = guildId
		? `applications/{APP_ID}/guilds/${guildId}/commands/${commandId}`
		: `applications/{APP_ID}/commands/${commandId}`

	const command = await request.get(URL)
	return new Command(command)
}
const permissions = {
	async list(guildId: Snowflake): Promise<CommandPermission[]> {
		return (await request.get(
			`applications/{APP_ID}/guilds/${guildId}/commands/permissions`
		)) as unknown as CommandPermission[]
	},
	async get(
		commandId: Snowflake,
		guildId: Snowflake
	): Promise<CommandPermission> {
		return (await request.get(
			`applications/{APP_ID}/guilds/${guildId}/commands/${commandId}/permissions`
		)) as unknown as CommandPermission
	}
}
export enum CommandType {
	/** Slash commands; a text-based command that shows up when a user types / */
	ChatInput = 1,
	/** A UI-based command that shows up when you right click or tap on a user */
	User = 2,
	/** A UI-based command that shows up when you right click or tap on a message */
	Message = 3
}
export enum OptionType {
	Subcommand = 1,
	SubcommandGroup = 2,
	String = 3,
	Integer = 4,
	Boolean = 5,
	User = 6,
	Channel = 7,
	Role = 8,
	Mentionable = 9,
	Number = 10,
	Attachment = 11
}
export enum PermissionType {
	Role = 1,
	User = 2,
	Channel = 3
}
export {
	create,
	edit,
	list,
	bulkOverwrite,
	get,
	permissions,
	_delete as delete
}
export default {
	create,
	delete: _delete,
	edit,
	list,
	bulkOverwrite,
	get,
	permissions
}

type _Command = {
	/** snowflake id of command */
	id: Snowflake
	/** type of command */
	type?: CommandType
	/** id of parent application */
	applicationId: Snowflake
	/** guild id of command, if not global */
	guildId?: Snowflake
	/** name of command */
	name: string
	/** localization dictionary for `name` field */
	nameLocalizations: object | null | undefined
	/** description for `chatInput` commands, empty string for `user` and `message` commands */
	description: string
	/** localization dictionary for `description` field */
	descriptionLocalizations?: object | null | undefined
	/** params for `chatInput` command, max 25 */
	options?: CommandOption[]
	/**  set of permissions represent as bit set */
	defaultMemberPermissions: string | null
	/** whether command is available in dms */
	dmPermission?: boolean
	/** **soon deprecated** - whether command is enabled by default */
	defaultPermission?: boolean | null | undefined
	/** whether command is age-restricted */
	nsfw?: boolean
	/** autoincrementing version id update during substantial record changes */
	version: string
}
export type CommandOption = {
	/** type of option */
	type: OptionType
	/** name of option */
	name: string
	/** localization dictionary for `name` */
	nameLocalizations?: object | null | undefined
	/** description of option */
	description: string
	/** localization dictionary `description` */
	descriptionLocalizations?: object | null | undefined
	/** if param is required or optional */
	required?: boolean
	/** choices for `string`, `integer` and `number` types for user to pick from, max 25 */
	choices?: CommandOptionChoice[]
	/** if option is subcommand or subcommand group type, nested options will be params */
	options?: CommandOption[]
	/** if option is channel type, channels shown will be restricted to these types */
	channelTypes?: ChannelType[]
	/** if option is `integer` or `number`, min value permitted */
	minValue?: number
	/** if option is `integer` or `number`, max value permitted */
	maxValue?: number
	/** if option is `string`, min allowed length */
	minLength?: number
	/** if option is `string`, max allowed length */
	maxLength?: number
	/** if autocomplete interactions are enabled for `string`, `integer`, or `number` type option */
	autocomplete?: boolean
}
export type CommandOptionChoice = {
	/** command option choice name */
	name: string
	/** localization dictionary for `name` */
	nameLocalizations?: object | null | undefined
	/** value for choice */
	value: string | number
}
export type GuildCommandPermission = {
	/** id of command or application id */
	id: Snowflake
	/** id of application command belongs to */
	applicationId: Snowflake
	/** id of guild */
	guildId: Snowflake
	/** permissions for command in guild */
	permissions: CommandPermission[]
}
export type CommandPermission = {
	/** id of role, user, or channel */
	id: Snowflake
	/** role (`1`), user (`2`), or channel (`3`) */
	type: PermissionType
	/** `true` to allow, `false` to disallow */
	permission: boolean
}
export type LocaleObject = {
	/** Indonesian, Bahasa Indonesia */
	id?: string
	/** Danish, Dansk */
	da?: string
	/** German, Deutsch */
	de?: string
	/** English (UK) */
	'en-GB'?: string
	/** English (US) */
	'en-US'?: string
	/** Spanish, Español */
	'es-ES'?: string
	/** French, Français */
	fr?: string
	/** Croatian, Hrvatski */
	hr?: string
	/** Italian, Italiano */
	it?: string
	/** Lithuanian, Lietuviškai */
	lt?: string
	/** Hungarian, Magyar */
	hu?: string
	/** Dutch, Nederlands */
	nl?: string
	/** Norwegian, Norsk */
	no?: string
	/** Polish, Polski */
	pl?: string
	/** Portuguese (Brazilian), Português do Brasil */
	'pt-BR'?: string
	/** Romanian (Romania), Română */
	ro?: string
	/** Finnish, Suomi */
	fi?: string
	/** Swedish, Svenska */
	'sv-SE'?: string
	/** Vietnamese, Tiếng Việt */
	vi?: string
	/** Turkish, Türkçe */
	tr?: string
	/** Czech, Čeština */
	cs?: string
	/** Greek, Ελληνικά */
	el?: string
	/** Bulgarian, български */
	bg?: string
	/** Russian, Pусский */
	ru?: string
	/** Ukrainian, Українська */
	uk?: string
	/** Hindi, हिन्दी */
	hi?: string
	/** Thai, ไทย */
	th?: string
	/** Chinese (China), 中文 */
	'zh-CN'?: string
	/** Japanese, 日本語 */
	ja?: string
	/** Chinese (Taiwan), 繁體中文 */
	'zh-TW'?: string
	/** Korean, 한국어 */
	ko?: string
}
export type { _Command as Command }
