import { useContext } from 'react'
import { NavigationContext } from '@app/contexts/navigation/NavigationProvider'
import { NavActionTypes } from '@app/contexts/navigation/state'

export function useNavigation() {
	const { state, dispatch } = useContext(NavigationContext)

	function toggleNavExpand() {
		dispatch({ type: NavActionTypes.ToggleNavExpand })
	}

	return { ...state, toggleNavExpand }
}
