export default function toCamelCase(value: any): any {
	if (typeof value !== 'object' || !value) return value
	if (Array.isArray(value)) return value.map((sub) => toCamelCase(sub))
	const newObj: { [key: string]: any } = {}
	for (const key of Object.keys(value)) {
		newObj[key.replace(/_(\w)/g, (_, c) => c.toUpperCase())] = toCamelCase(
			value[key]
		)
	}
	return newObj
}
