import { UserInfoOutput } from '@/external/api/authentication/getProfile'
import { atom } from 'jotai'

export type TProfile = UserInfoOutput | null

export const profileAtom = atom<TProfile>(null)
