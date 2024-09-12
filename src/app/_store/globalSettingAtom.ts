import { atomWithImmer } from 'jotai-immer'

type TGlobalSetting = {
	loading: boolean
}

export const globalSettingAtom = atomWithImmer<TGlobalSetting>({
	loading: false,
})
