export default function toSnakeCase(value: any): any {
	if (typeof value !== 'object' || !value) return value
	if (Array.isArray(value)) return value.map((sub) => toSnakeCase(sub))
	const newObj: { [key: string]: any } = {}
	for (const key of Object.keys(value)) {
		newObj[key.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()] = toSnakeCase(
			value[key]
		)
	}
	return newObj
}
