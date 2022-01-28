import { useRef, useEffect } from 'react'

function createRootElement(id: string) {
	const rootContainer = document.createElement('div')
	rootContainer.setAttribute('id', id)
	return rootContainer
}

function addRootElement(rootElem: Element) {
	document.body.insertBefore(rootElem, document.body.lastElementChild!.nextElementSibling)
}

export function usePortal(id: string) {
	const rootElemRef = useRef<HTMLDivElement | null>(null)

	useEffect(
		function setupElement() {
			const existingParent = document.querySelector(`#${id}`)
			const parentElem = existingParent || createRootElement(id)

			if (!existingParent) {
				addRootElement(parentElem)
			}

			parentElem.appendChild(rootElemRef.current as HTMLDivElement)

			return function removeElement() {
				rootElemRef?.current?.remove()
				if (!parentElem.childElementCount) {
					parentElem.remove()
				}
			}
		},
		[id]
	)

	function getRootElem() {
		if (!rootElemRef.current) {
			rootElemRef.current = document.createElement('div')
		}

		return rootElemRef.current
	}

	return getRootElem()
}
