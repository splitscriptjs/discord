import request from '../utils/request.js'
import { Snowflake } from '../types'
import toCamelCase from '../utils/toCamelCase.js'

class Rule {
	id!: Snowflake
	guildId!: Snowflake
	name!: string
	creatorId!: Snowflake
	eventType!: EventType
	triggerType!: TriggerType
	triggerMetadata!: object
	actions!: AutomodAction[]
	enabled!: boolean
	exemptRoles!: Snowflake[]
	exemptChannels!: Snowflake[]

	async get(): Promise<Rule> {
		const rule = await get(this.guildId, this.id)
		Object.assign(this, rule)
		return rule
	}
	async edit(updatedRule: Partial<EditParams>): Promise<Rule> {
		const modified = await edit(this.guildId, this.id, updatedRule)
		Object.assign(this, modified)
		return modified
	}
	async delete(): Promise<void> {
		return await _delete(this.guildId, this.id)
	}
	constructor(rule: unknown) {
		Object.assign(this, toCamelCase(rule))
	}
}
/** Get a list of all rules currently configured for the guild */
async function list(guildId: Snowflake): Promise<Rule[]> {
	const rules = (await request.get(
		`guilds/${guildId}/auto-moderation/rules`
	)) as unknown[]
	return rules.map((rule) => new Rule(rule))
}

/** Get a single rule  */
async function get(guildId: Snowflake, ruleId: Snowflake): Promise<Rule> {
	const rule = await request.get(
		`guilds/${guildId}/auto-moderation/rules/${ruleId}`
	)
	return new Rule(rule)
}
type CreateParams = {
	/** the rule name */
	name: string
	/** the event type */
	eventType: EventType
	/** the trigger type */
	triggerType: TriggerType
	/** the trigger metadata */
	triggerMetadata?: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled (`false` by default) */
	enabled?: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exemptRoles?: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exemptChannels?: Snowflake[]
}
/** Create a new rule */
async function create(guildId: Snowflake, rule: CreateParams): Promise<Rule> {
	const newRule = await request.post(
		`guilds/${guildId}/auto-moderation/rules`,
		rule
	)
	return new Rule(newRule)
}
type EditParams = Omit<CreateParams, 'triggerType'>
/** Edit an existing rule */
async function edit(
	guildId: Snowflake,
	ruleId: Snowflake,
	rule: Partial<EditParams>
): Promise<Rule> {
	const updatedRule = await request.patch(
		`guilds/${guildId}/auto-moderation/rules/${ruleId}`,
		rule
	)
	return new Rule(updatedRule)
}
/** Delete a rule */
async function _delete(guildId: Snowflake, ruleId: Snowflake): Promise<void> {
	await request.delete(`guilds/${guildId}/auto-moderation/rules/${ruleId}`)
}
export enum TriggerType {
	/** check if content contains words from a user defined list of keywords */
	Keyword = 1,
	/** check if content represents generic spam */
	Spam = 3,
	/** check if content contains words from internal pre-defined wordsets */
	KeywordPreset = 4,
	/** check if content contains more unique mentions than allowed */
	MentionSpam = 5
}
export enum EventType {
	/** when a member sends or edits a message in the guild */
	MessageSend = 1
}
export enum ActionType {
	/** blocks a member's message and prevents it from being posted. A custom explanation can be specified and shown to members whenever their message is blocked. */
	BlockMessage = 1,
	/** logs user content to a specified channel */
	SendAlertMessage = 2,
	/** timeout user for a specified duration */
	Timeout = 3
}
export enum KeywordPresetType {
	/** words that may be considered forms of swearing or cursing */
	Profanity = 1,
	/** words that refer to sexually explicit behavior or activity */
	SexualContent = 2,
	/** personal insults or words that may be considered hate speech */
	Slurs = 3
}
/** Used to manage automod rules */
export { list, get, create, edit, _delete as delete }
/** Used to manage automod rules */
export default {
	list,
	get,
	create,
	edit,
	delete: _delete
}

type AutomodRule = {
	/** the id of this rule */
	id: Snowflake
	/** the id of the guild which this rule belongs to */
	guildId: Snowflake
	/** the rule name */
	name: string
	/** the user which first created this rule */
	creatorId: Snowflake
	/** the rule event type */
	eventType: 1
	/** the rule trigger type */
	triggerType: TriggerType
	/** the rule trigger metadata */
	triggerMetadata: TriggerMetadata
	/** the actions which will execute when the rule is triggered */
	actions: AutomodAction[]
	/** whether the rule is enabled */
	enabled: boolean
	/** the role ids that should not be affected by the rule (Maximum of 20) */
	exemptRoles: Snowflake[]
	/** the channel ids that should not be affected by the rule (Maximum of 50) */
	exemptChannels: Snowflake[]
}
/** An action which will execute whenever a rule is triggered. */
type AutomodAction = {
	/** the type of action */
	type: ActionType
	/** additional metadata needed during execution for this specific action type */
	metadata?: AutomodActionMetadata
}
/** Additional data used when an action is executed. */
type AutomodActionMetadata = {
	/** channel to which user content should be logged */
	channelId: Snowflake
	/** timeout duration in seconds */
	durationSeconds: number
	/** additional explanation that will be shown to members whenever their message is blocked */
	customMessage?: string
}
type TriggerMetadata = {
	/** substrings which will be searched for in content (Maximum of 1000) */
	keywordFilter?: string[]
	/** regular expression patterns which will be matched against content (Maximum of 10) */
	regexPatterns?: string[]
	/** the internally pre-defined wordsets which will be searched for in content */
	presets?: KeywordPresetType[]
	/** substrings which should not trigger the rule (Maximum of 100 or 1000) */
	allowList?: string[]
	/** total number of unique role and user mentions allowed per message (Maximum of 50) */
	mentionTotalLimit?: number
}
export type {
	AutomodRule,
	AutomodAction,
	AutomodActionMetadata,
	TriggerMetadata
}
