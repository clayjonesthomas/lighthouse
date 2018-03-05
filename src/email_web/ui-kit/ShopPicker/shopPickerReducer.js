import {ADD_SHOP_PICKER_REF} from './ShopPickerActions'

export function addOnlyShopPickerRef(state = null, action) {
	switch (action.type) {
		case ADD_SHOP_PICKER_REF:
			return action.data.ref
		default:
			return state
	}
}