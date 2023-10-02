export enum ButtonStyle {
	/** blurple */
	Primary = 1,
	/** gray */
	Secondary,
	/** green */
	Success,
	/** red */
	Danger,
	/** gray - navigates to url */
	Link
}
export enum ComponentType {
	/** Container for other components */
	ActionRow = 1,
	/** Button object */
	Button,
	/** Select menu for picking from defined text options */
	StringSelect,
	/** Text input object */
	TextInput,
	/** Select menu for users */
	UserSelect,
	/** Select menu for roles */
	RoleSelect,
	/** Select menu for mentionables (users and roles) */
	MentionableSelect,
	/** Select menu for channels */
	ChannelSelect
}
export enum SelectType {
	/** Select menu for picking from defined text options */
	StringSelect = 3,
	/** Select menu for users */
	UserSelect = 5,
	/** Select menu for roles */
	RoleSelect = 6,
	/** Select menu for mentionables (users and roles) */
	MentionableSelect = 7,
	/** Select menu for channels */
	ChannelSelect = 8
}
export enum InteractionType {
	Ping = 1,
	ApplicationCommand,
	MessageComponent,
	ApplicationCommandAutocomplete,
	ModalSubmit
}
export enum ActivityType {
	/** Playing {name} */
	Game,
	/** Streaming {details} */
	Streaming,
	/** Listening to {name} */
	Listening,
	/** Watching {name} */
	Watching,
	/** {emoji} {state} */
	Custom,
	/** Competing in {name} */
	Competing
}
export enum ActivityFlag {
	Instance = 1 << 0,
	Join = 1 << 1,
	Spectate = 1 << 2,
	JoinRequest = 1 << 3,
	Sync = 1 << 4,
	Play = 1 << 5,
	PartyPrivacyFriends = 1 << 6,
	PartyPrivacyVoiceChannel = 1 << 7,
	Embedded = 1 << 8
}
export enum MembershipState {
	Invited = 1,
	Accepted = 2
}
