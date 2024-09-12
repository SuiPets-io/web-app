import CatKidSick from '@/assets/lotties/CAT/KID-SICK.json'
import CatSick from '@/assets/lotties/CAT/SICK.json'
//--------------------------------- COMMON -------------------------------//
import CatCommonDirty from '@/assets/lotties/CAT/COMMON/DIRTY.json'
import CatCommonEat from '@/assets/lotties/CAT/COMMON/EAT.json'
import CatCommonFunny from '@/assets/lotties/CAT/COMMON/FUNNY.json'
import CatCommonKidDirty from '@/assets/lotties/CAT/COMMON/KID-DIRTY.json'
import CatCommonKidEat from '@/assets/lotties/CAT/COMMON/KID-EAT.json'
import CatCommonKidFunny from '@/assets/lotties/CAT/COMMON/KID-FUNNY.json'
import CatCommonKidSad from '@/assets/lotties/CAT/COMMON/KID-SAD.json'
import CatCommonKidNormal from '@/assets/lotties/CAT/COMMON/KID.json'
import CatCommonNormal from '@/assets/lotties/CAT/COMMON/OLD.json'
import CatCommonSad from '@/assets/lotties/CAT/COMMON/SAD.json'
import CatCommonShower from '@/assets/lotties/CAT/COMMON/SHOWER.json'

//--------------------------------- RARE -------------------------------//
import CatRareDirty from '@/assets/lotties/CAT/RARE/DIRTY.json'
import CatRareEat from '@/assets/lotties/CAT/RARE/EAT.json'
import CatRareFunny from '@/assets/lotties/CAT/RARE/FUNNY.json'
import CatRareKidDirty from '@/assets/lotties/CAT/RARE/KID-DIRTY.json'
import CatRareKidEat from '@/assets/lotties/CAT/RARE/KID-EAT.json'
import CatRareKidFunny from '@/assets/lotties/CAT/RARE/KID-FUNNY.json'
import CatRareKidSad from '@/assets/lotties/CAT/RARE/KID-SAD.json'
import CatRareKidNormal from '@/assets/lotties/CAT/RARE/KID.json'
import CatRareNormal from '@/assets/lotties/CAT/RARE/OLD.json'
import CatRareSad from '@/assets/lotties/CAT/RARE/SAD.json'
import CatRareShower from '@/assets/lotties/CAT/RARE/SHOWER.json'

//--------------------------------- EPIC -------------------------------//
import CatEpicDirty from '@/assets/lotties/CAT/EPIC/DIRTY.json'
import CatEpicEat from '@/assets/lotties/CAT/EPIC/EAT.json'
import CatEpicFunny from '@/assets/lotties/CAT/EPIC/FUNNY.json'
import CatEpicKidDirty from '@/assets/lotties/CAT/EPIC/KID-DIRTY.json'
import CatEpicKidEat from '@/assets/lotties/CAT/EPIC/KID-EAT.json'
import CatEpicKidFunny from '@/assets/lotties/CAT/EPIC/KID-FUNNY.json'
import CatEpicKidSad from '@/assets/lotties/CAT/EPIC/KID-SAD.json'
import CatEpicKidNormal from '@/assets/lotties/CAT/EPIC/KID.json'
import CatEpicNormal from '@/assets/lotties/CAT/EPIC/OLD.json'
import CatEpicSad from '@/assets/lotties/CAT/EPIC/SAD.json'
import CatEpicShower from '@/assets/lotties/CAT/EPIC/SHOWER.json'

//--------------------------------- LEGENDARY -------------------------------//
import CatLegendaryDirty from '@/assets/lotties/CAT/LEGENDARY/DIRTY.json'
import CatLegendaryEat from '@/assets/lotties/CAT/LEGENDARY/EAT.json'
import CatLegendaryFunny from '@/assets/lotties/CAT/LEGENDARY/FUNNY.json'
import CatLegendaryKidDirty from '@/assets/lotties/CAT/LEGENDARY/KID-DIRTY.json'
import CatLegendaryKidEat from '@/assets/lotties/CAT/LEGENDARY/KID-EAT.json'
import CatLegendaryKidFunny from '@/assets/lotties/CAT/LEGENDARY/KID-FUNNY.json'
import CatLegendaryKidSad from '@/assets/lotties/CAT/LEGENDARY/KID-SAD.json'
import CatLegendaryKidNormal from '@/assets/lotties/CAT/LEGENDARY/KID.json'
import CatLegendaryNormal from '@/assets/lotties/CAT/LEGENDARY/OLD.json'
import CatLegendarySad from '@/assets/lotties/CAT/LEGENDARY/SAD.json'
import CatLegendaryShower from '@/assets/lotties/CAT/LEGENDARY/SHOWER.json'

export const CatAnimation = {
	normal: {
		normal: {
			animation: {
				common: CatCommonKidNormal,
				rare: CatRareKidNormal,
				epic: CatEpicKidNormal,
				legendary: CatLegendaryKidNormal,
			},
			width: 100,
			height: 140,
		},
		hungry: {
			animation: {
				common: CatCommonKidSad,
				rare: CatRareKidSad,
				epic: CatEpicKidSad,
				legendary: CatLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		eat: {
			animation: {
				common: CatCommonKidEat,
				rare: CatRareKidEat,
				epic: CatEpicKidEat,
				legendary: CatLegendaryKidEat,
			},
			width: 100,
			height: 140,
		},
		dirty: {
			animation: {
				common: CatCommonKidDirty,
				rare: CatRareKidDirty,
				epic: CatEpicKidDirty,
				legendary: CatLegendaryKidDirty,
			},
			width: 100,
			height: 140,
		},
		sad: {
			animation: {
				common: CatCommonKidSad,
				rare: CatRareKidSad,
				epic: CatEpicKidSad,
				legendary: CatLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		sick: {
			animation: {
				common: CatKidSick,
				rare: CatKidSick,
				epic: CatKidSick,
				legendary: CatKidSick,
			},
			width: 100,
			height: 140,
		},
		funny: {
			animation: {
				common: CatCommonKidFunny,
				rare: CatRareKidFunny,
				epic: CatEpicKidFunny,
				legendary: CatLegendaryKidFunny,
			},
			width: 100,
			height: 140,
		},
		toilet: {
			animation: {
				common: CatCommonShower,
				rare: CatRareShower,
				epic: CatEpicShower,
				legendary: CatLegendaryShower,
			},
			width: 180,
			height: 180,
		},
	},
	genesis: {
		normal: {
			animation: {
				common: CatCommonNormal,
				rare: CatRareNormal,
				epic: CatEpicNormal,
				legendary: CatLegendaryNormal,
			},
			width: 140,
			height: 200,
		},
		dirty: {
			animation: {
				common: CatCommonDirty,
				rare: CatRareDirty,
				epic: CatEpicDirty,
				legendary: CatLegendaryDirty,
			},
			width: 140,
			height: 180,
		},
		hungry: {
			animation: {
				common: CatCommonSad,
				rare: CatRareSad,
				epic: CatEpicSad,
				legendary: CatLegendarySad,
			},
			width: 130,
			height: 180,
		},
		eat: {
			animation: {
				common: CatCommonEat,
				rare: CatRareEat,
				epic: CatEpicEat,
				legendary: CatLegendaryEat,
			},
			width: 125,
			height: 180,
		},
		funny: {
			animation: {
				common: CatCommonFunny,
				rare: CatRareFunny,
				epic: CatEpicFunny,
				legendary: CatLegendaryFunny,
			},
			width: 130,
			height: 180,
		},
		sad: {
			animation: {
				common: CatCommonSad,
				rare: CatRareSad,
				epic: CatEpicSad,
				legendary: CatLegendarySad,
			},
			width: 130,
			height: 180,
		},
		sick: {
			animation: {
				common: CatSick,
				rare: CatSick,
				epic: CatSick,
				legendary: CatSick,
			},
			width: 140,
			height: 180,
		},
		toilet: {
			animation: {
				common: CatCommonShower,
				rare: CatRareShower,
				epic: CatEpicShower,
				legendary: CatLegendaryShower,
			},
			width: 180,
			height: 180,
		},
	},
}
