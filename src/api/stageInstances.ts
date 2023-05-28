import request from '../utils/request.js'
import { Snowflake, StageInstance, StageInstancePrivacyLevel } from '../types'

/** Creates a new Stage instance associated to a Stage channel. */
async function create(instance: {
	/** The id of the Stage channel */
	channel_id: Snowflake
	/** The topic of the Stage instance (1-120 characters) */
	topic: string
	/** The privacy level of the Stage instance (default GUILD_ONLY) */
	privacy_level: StageInstancePrivacyLevel
	/** Notify @everyone that a Stage instance has started */
	send_start_notification?: boolean
}): Promise<StageInstance> {
	return request.post(`stage-instances`, instance) as unknown as StageInstance
}
/** Gets the stage instance associated with the Stage channel, if it exists. */
async function get(channel_id: Snowflake): Promise<StageInstance> {
	return request.get(
		`stage-instances/${channel_id}`
	) as unknown as StageInstance
}
/** Updates fields of an existing Stage instance. */
async function modify(
	channel_id: Snowflake,
	instance: {
		/** The topic of the Stage instance (1-120 characters) */
		topic?: string
		/** The privacy level of the Stage instance */
		privacy_level?: StageInstancePrivacyLevel
	}
): Promise<StageInstance> {
	return request.patch(
		`stage-instances/${channel_id}`,
		instance
	) as unknown as StageInstance
}
/** Deletes the Stage instance.  */
async function _delete(channel_id: Snowflake): Promise<void> {
	return request.delete(`stage-instances/${channel_id}`) as unknown as void
}
export default { create, get, modify, delete: _delete }
