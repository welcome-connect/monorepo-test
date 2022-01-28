import { createPortal } from 'react-dom'
import { ReactNode } from 'react'
import { usePortal } from '@app/hooks/usePortal'

type PortalProps = {
	id: string
	children: ReactNode
}

export function Portal({ id, children }: PortalProps) {
	const target = usePortal(id)

	return createPortal(children, target)
}
