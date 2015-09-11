export const CHANGE_COMPONENT = "CHANGE_COMPONENT";
export function changeComponent(component) {
	return {
		type : CHANGE_COMPONENT,
		component : component
	}
}

export const CHANGE_VALUE = "CHANGE_VALUE";
export function changeValue(name, value) {
	return {
		type : CHANGE_VALUE,
		name : name,
		value : value
	}
}