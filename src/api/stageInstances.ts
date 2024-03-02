import request from '../utils/request.js'
import { Snowflake } from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class StageInstance {
	id!: Snowflake
	guildId!: Snowflake
	channelId!: Snowflake
	topic!: string
	privacyLevel!: PrivacyLevel
	discoverableDisabled!: boolean
	guildScheduledEventId!: Snowflake | null

	/** Gets this stage instance
	 *
	 * Also updates this class instance
	 */
	async get(): Promise<StageInstance> {
		const result = await get(this.channelId)
		Object.assign(this, result)
		return result
	}
	/** Edits this stage instance
	 *
	 * Also updates this class instance
	 */
	async edit(instance: EditParams): Promise<StageInstance> {
		const result = await edit(this.channelId, instance)
		Object.assign(this, result)
		return result
	}
	/** Deletes this stage instance */
	async delete(): Promise<void> {
		return await _delete(this.channelId)
	}

	constructor(data: unknown) {
		Object.assign(this, toCamelCase(data))
	}
}

/** Creates a new Stage instance associated to a Stage channel. */
async function create(instance: {
	/** The id of the Stage channel */
	channelId: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance (default) */
	privacyLevel: PrivacyLevel
	/** Notify @everyone that a Stage instance has started */
	sendStartNotification?: boolean
}): Promise<StageInstance> {
	return new StageInstance(await request.post(`stage-instances`, instance))
}
/** Gets the stage instance associated with the Stage channel, if it exists. */
async function get(channelId: Snowflake): Promise<StageInstance> {
	return new StageInstance(await request.get(`stage-instances/${channelId}`))
}
type EditParams = {
	/** The topic of the Stage instance (1-120 characters) */
	topic?: string
	/** The privacy level of the Stage instance */
	privacyLevel?: PrivacyLevel
}
/** Edit an existing Stage instance. */
async function edit(
	channelId: Snowflake,
	instance: EditParams
): Promise<StageInstance> {
	return new StageInstance(
		await request.patch(`stage-instances/${channelId}`, instance)
	)
}
/** Deletes the Stage instance.  */
async function _delete(channelId: Snowflake): Promise<void> {
	await request.delete(`stage-instances/${channelId}`)
}
enum PrivacyLevel {
	/** The Stage instance is visible publicly. (deprecated) */
	Public = 1,
	/** The Stage instance is visible to only guild members. */
	GuildOnly = 2
}
/** A Stage Instance holds information about a live stage. */
type _StageInstance = {
	/** The id of this Stage instance */
	id: Snowflake
	/** The guild id of the associated Stage channel */
	guildId: Snowflake
	/** The id of the associated Stage channel */
	channelId: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance */
	privacyLevel: PrivacyLevel
	/** Whether or not Stage Discovery is disabled **(deprecated)** */
	discoverableDisabled: boolean
	/** The id of the scheduled event for this Stage instance */
	guildScheduledEventId: Snowflake | null
}
export type { _StageInstance as StageInstance }
/** Used to manage stage instances */
export { create, get, edit, _delete as delete, PrivacyLevel }
/** Used to manage stage instances */
export default { create, get, edit, delete: _delete, PrivacyLevel }
