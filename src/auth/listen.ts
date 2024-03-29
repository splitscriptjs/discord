import { Presence, Snowflake } from '../types'
import variable from '../utils/variable.js'
import tokenToId from '../utils/tokenToId.js'
import { EventEmitter } from '@splitscript.js/core'
import WS from 'ws'
import toCamelCase from '../utils/toCamelCase.js'
type IntentFlag =
	| 'guilds'
	| 'guild_members'
	| 'guild_moderation'
	| 'guild_emojis_and_stickers'
	| 'guild_integrations'
	| 'guild_webhhooks'
	| 'guild_invites'
	| 'guild_presences'
	| 'guild_messages'
	| 'guild_messages_reactions'
	| 'guild_message_typing'
	| 'direct_messages'
	| 'direct_message_reactions'
	| 'direct_message_typings'
	| 'message_content'
	| 'guild_scheduled_events'
	| 'auto_moderation_configuration'
	| 'auto_moderation_execution'

type Identify = {
	presence?: Presence
	intents?: IntentFlag[] | number
}
const resumeData: {
	session_id?: Snowflake
	sequence?: number
	resumeUrl?: string
} = {}
const reconnectCodes: Record<number, boolean> = {
	4000: true,
	4001: true,
	4002: true,
	4003: true,
	4005: true,
	4007: true,
	4008: true,
	4009: true
}
function connect(
	token: string,
	options: Identify = { intents: 0 },
	emitter: EventEmitter<string[]>
) {
	if (!token) throw new Error('token must be provided')

	variable.set('token', token)
	variable.set('app_id', tokenToId(token))

	const ws = new WS('wss://gateway.discord.gg/?v=10&encoding=json')
	function heartbeat(ms: number): number {
		return setInterval(() => {
			ws.send(JSON.stringify({ op: 1, d: null }))
		}, ms) as unknown as number
	}
	options.intents ??= 0
	if (Array.isArray(options.intents)) {
		if (!options.intents.every((v) => typeof v === 'string'))
			throw new TypeError('Invalid intents array')
		const flags: Record<string, number> = {
			guilds: 1 << 0,

			guild_members: 1 << 1,

			guild_moderation: 1 << 2,

			guild_emojis_and_stickers: 1 << 3,

			guild_integrations: 1 << 4,

			guild_webhhooks: 1 << 5,

			guild_invites: 1 << 6,

			guild_voice_states: 1 << 7,

			guild_presences: 1 << 8,

			guild_messages: 1 << 9,

			guild_messages_reactions: 1 << 10,

			guild_message_typing: 1 << 11,

			direct_messages: 1 << 12,
			direct_message_reactions: 1 << 13,

			direct_message_typings: 1 << 14,

			message_content: 1 << 15,

			guild_scheduled_events: 1 << 16,

			auto_moderation_configuration: 1 << 20,

			auto_moderation_execution: 1 << 21
		}
		let generatedIntents = 0

		for (const intent of options.intents ?? []) {
			if (!flags[intent]) throw new TypeError(`Invalid intent flag ${intent}`)
			generatedIntents += flags[intent.toLowerCase()]
		}

		options.intents = generatedIntents
	} else if (!Number.isInteger(options.intents)) {
		throw new TypeError(
			`intents must be an array or integer. got ${typeof options.intents}`
		)
	}
	const payload = {
		op: 2,
		d: {
			token: token,
			properties: {
				os: process.platform,
				browser: 'splitscript',
				device: 'splitscript'
			},
			presence: options?.presence ?? { status: 'online' },
			intents: options?.intents ?? 0
		}
	}

	ws.on('open', () => {
		ws.send(JSON.stringify(payload))
	})
	ws.on('message', (data: Buffer) => {
		const payload = JSON.parse(data.toString('utf-8')) as {
			t: string
			op: number
			d: Record<string, unknown>
			s: number
		}

		const { t, op, d, s } = payload
		switch (op) {
			case 0:
				resumeData.sequence = s
				break
			case 1:
				ws.send(JSON.stringify({ op: 1, d: null }))
				break
			case 7:
				ws.send(
					JSON.stringify({
						op: 6,
						d: {
							token,
							session_id: resumeData.session_id,
							seq: resumeData.sequence
						}
					})
				)
				break
			case 10:
				heartbeat(d.heartbeat_interval as number)
				break
		}

		if (!t) return

		let event: string = t.toLowerCase()
		switch (event) {
			case 'ready':
				resumeData.session_id = d.session_id as Snowflake
				resumeData.resumeUrl = d.resume_gateway_url as string
				break
			case 'application_command_permissions_update':
				event = 'command_permissions_update'
				break
			case 'auto_moderation_rule_create':
				event = 'automod_rule_create'
				break
			case 'auto_moderation_rule_update':
				event = 'automod_rule_update'
				break
			case 'auto_moderation_rule_delete':
				event = 'automod_rule_delete'
				break
			case 'auto_moderation_action_execution':
				event = 'automod_action_execution'
				break
			case 'guild_audit_log_entry_create':
				event = 'auditlog_entry_create'
				break
			case 'guild_ban_add':
				event = 'ban_add'
				break
			case 'guild_ban_remove':
				event = 'ban_remove'
				break
			case 'guild_emojis_update':
				event = 'emojis_update'
				break
			case 'guild_stickers_update':
				event = 'stickers_update'
				break
			case 'guild_integrations_update':
				event = 'integrations_update'
				break
			case 'guild_member_add':
				event = 'member_add'
				break
			case 'guild_member_remove':
				event = 'member_remove'
				break
			case 'guild_member_update':
				event = 'member_update'
				break
			case 'guild_members_chunk':
				event = 'members_chunk'
				break
			case 'guild_role_create':
				event = 'role_create'
				break
			case 'guild_role_update':
				event = 'role_update'
				break
			case 'guild_role_delete':
				event = 'role_delete'
				break
			case 'guild_scheduled_event_create':
				event = 'scheduledevent_create'
				break
			case 'guild_scheduled_event_update':
				event = 'scheduledevent_update'
				break
			case 'guild_scheduled_event_delete':
				event = 'scheduledevent_delete'
				break
			case 'guild_scheduled_event_user_add':
				event = 'scheduledevent_user_add'
				break
			case 'guild_scheduled_event_user_remove':
				event = 'scheduledevent_user_remove'
				break
			case 'stage_instance_create':
				event = 'stageinstance_create'
				break
			case 'stage_instance_update':
				event = 'stageinstance_update'
				break
			case 'stage_instance_delete':
				event = 'stageinstance_delete'
				break
		}
		emitter.send(event.split('_'), toCamelCase(d)).catch((r) => console.log(r))
	})

	ws.on('close', (code, reason) => {
		if (reconnectCodes[code]) throw new Error(reason.toString('utf-8'))
		setTimeout(() => {
			connect(token, options, emitter)
		}, 5000)
	})
}
/**
 * Connects to the discord gateway to listen for events
 *
 * Authenticates API requests
 */
export function listen(token: string, options: Identify = {}) {
	const emitter = new EventEmitter('discord', '@splitscript.js/discord', [
		'hello',
		'ready',
		'resumed',
		'reconnect',
		'invalid/session',
		'command/permissions/update',
		'automod/rule/create',
		'automod/rule/update',
		'automod/rule/delete',
		'automod/action/execute',
		'channel/create',
		'channel/update',
		'channel/delete',
		'channel/pins/update',
		'thread/create',
		'thread/update',
		'thread/delete',
		'thread/list/sync',
		'thread/member/update',
		'thread/members/update',
		'guild/create',
		'guild/update',
		'guild/delete',
		'auditlog/entry/create',
		'ban/add',
		'ban/remove',
		'emojis/update',
		'stickers/update',
		'integrations/update',
		'member/add',
		'member/remove',
		'member/update',
		'members/chunk',
		'role/create',
		'role/update',
		'role/delete',
		'scheduledevent/create',
		'scheduledevent/update',
		'scheduledevent/delete',
		'scheduledevent/user/add',
		'scheduledevent/user/remove',
		'integration/create',
		'integration/update',
		'integration/delete',
		'interaction/create',
		'invite/create',
		'invite/delete',
		'message/create',
		'message/update',
		'message/delete',
		'message/delete/bulk',
		'message/reaction/add',
		'message/reaction/remove',
		'message/reaction/remove/all',
		'message/reaction/remove/emoji',
		'presence/update',
		'stageinstance/create',
		'stageinstance/update',
		'stageinstance/delete',
		'typing/start',
		'user/update',
		'voice/state/update',
		'voice/server/update',
		'webhooks/update'
	])
	connect(token, options, emitter)
}
