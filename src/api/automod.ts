import request from '../utils/request.js'
import {
	AutomodAction,
	TriggerMetadata,
	Snowflake,
	AutomodRule
} from '../types'
/** Get a list of all rules currently configured for the guild */
async function list(guild_id: Snowflake): Promise<AutomodRule> {
	return request.get(
		`guilds/${guild_id}/auto-moderation/rules`
	) as unknown as AutomodRule
}
/** Get a single rule.  */
async function get(guild_id: Snowflake, rule_id: Snowflake) {
	return request.get(
		`guilds/${guild_id}/auto-moderation/rules/${rule_id}`
	) as unknown as AutomodRule
}
type CreateParams = {
	/** the rule name */
	name: string
	/** the event type */
	event_type: number
	/** the trigger type */
	trigger_type: 1 | 3 | 4 | 5
	/** the trigger metadata */
	trigger_metadata?: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled (`false` by default) */
	enabled?: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exempt_roles?: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exempt_channels?: Snowflake[]
}
/** Create a new rule. */
async function create(
	guild_id: Snowflake,
	rule: CreateParams
): Promise<AutomodRule> {
	return request.post(
		`guilds/${guild_id}/auto-moderation/rules`,
		rule
	) as unknown as any
}
type ModifyParams = Omit<CreateParams, 'trigger_type'>
/** Modify an existing rule */
async function modify(
	guild_id: Snowflake,
	rule_id: Snowflake,
	rule: Partial<ModifyParams>
): Promise<AutomodRule> {
	return request.patch(
		`guilds/${guild_id}/auto-moderation/rules/${rule_id}`,
		rule
	) as unknown as AutomodRule
}
/** Delete a rule. */
async function _delete(guild_id: Snowflake, rule_id: Snowflake): Promise<void> {
	return request.delete(
		`guilds/${guild_id}/auto-moderation/rules/${rule_id}`
	) as unknown as void
}

export default { list, get, create, modify, delete: _delete }
