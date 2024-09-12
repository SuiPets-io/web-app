import { atom } from 'jotai'

export const claimPpsAtom = atom<{ pps: number } | null>(null)
