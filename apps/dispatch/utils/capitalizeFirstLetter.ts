export function capitalizeFirstLetter([first, ...rest]: string, locale = navigator.language) {
	return first.toLocaleUpperCase(locale) + rest.join('')
}
