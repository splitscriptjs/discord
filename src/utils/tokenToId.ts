/** Get the bot id from an auth token */
export default function tokenToId(token: string) {
	const id = token.split('.')[0]

	return Buffer.from(id, 'base64').toString('ascii')
}
