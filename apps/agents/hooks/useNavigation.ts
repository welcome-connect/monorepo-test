import { useContext } from 'react'
import { NavigationContext } from '../contexts/navigation/NavigationProvider'
import { NavActionTypes } from '../contexts/navigation/state'

export function useNavigation() {
	const { state, dispatch } = useContext(NavigationContext)

	function toggleNavExpand() {
		dispatch({ type: NavActionTypes.ToggleNavExpand })
	}

	return { ...state, toggleNavExpand }
}
