import ChickenKidSick from '@/assets/lotties/CHICKEN/KID-SICK.json'
import ChickenSick from '@/assets/lotties/CHICKEN/SICK.json'
//--------------------------------- COMMON -------------------------------//
import ChickenCommonDirty from '@/assets/lotties/CHICKEN/COMMON/DIRTY.json'
import ChickenCommonEat from '@/assets/lotties/CHICKEN/COMMON/EAT.json'
import ChickenCommonFunny from '@/assets/lotties/CHICKEN/COMMON/FUNNY.json'
import ChickenCommonKidDirty from '@/assets/lotties/CHICKEN/COMMON/KID-DIRTY.json'
import ChickenCommonKidEat from '@/assets/lotties/CHICKEN/COMMON/KID-EAT.json'
import ChickenCommonKidFunny from '@/assets/lotties/CHICKEN/COMMON/KID-FUNNY.json'
import ChickenCommonKidSad from '@/assets/lotties/CHICKEN/COMMON/KID-SAD.json'
import ChickenCommonKidNormal from '@/assets/lotties/CHICKEN/COMMON/KID.json'
import ChickenCommonNormal from '@/assets/lotties/CHICKEN/COMMON/OLD.json'
import ChickenCommonSad from '@/assets/lotties/CHICKEN/COMMON/SAD.json'
import ChickenCommonShower from '@/assets/lotties/CHICKEN/COMMON/SHOWER.json'

//--------------------------------- RARE -------------------------------//
import ChickenRareDirty from '@/assets/lotties/CHICKEN/RARE/DIRTY.json'
import ChickenRareEat from '@/assets/lotties/CHICKEN/RARE/EAT.json'
import ChickenRareFunny from '@/assets/lotties/CHICKEN/RARE/FUNNY.json'
import ChickenRareKidDirty from '@/assets/lotties/CHICKEN/RARE/KID-DIRTY.json'
import ChickenRareKidEat from '@/assets/lotties/CHICKEN/RARE/KID-EAT.json'
import ChickenRareKidFunny from '@/assets/lotties/CHICKEN/RARE/KID-FUNNY.json'
import ChickenRareKidSad from '@/assets/lotties/CHICKEN/RARE/KID-SAD.json'
import ChickenRareKidNormal from '@/assets/lotties/CHICKEN/RARE/KID.json'
import ChickenRareNormal from '@/assets/lotties/CHICKEN/RARE/OLD.json'
import ChickenRareSad from '@/assets/lotties/CHICKEN/RARE/SAD.json'
import ChickenRareShower from '@/assets/lotties/CHICKEN/RARE/SHOWER.json'

//--------------------------------- EPIC -------------------------------//
import ChickenEpicDirty from '@/assets/lotties/CHICKEN/EPIC/DIRTY.json'
import ChickenEpicEat from '@/assets/lotties/CHICKEN/EPIC/EAT.json'
import ChickenEpicFunny from '@/assets/lotties/CHICKEN/EPIC/FUNNY.json'
import ChickenEpicKidDirty from '@/assets/lotties/CHICKEN/EPIC/KID-DIRTY.json'
import ChickenEpicKidEat from '@/assets/lotties/CHICKEN/EPIC/KID-EAT.json'
import ChickenEpicKidFunny from '@/assets/lotties/CHICKEN/EPIC/KID-FUNNY.json'
import ChickenEpicKidSad from '@/assets/lotties/CHICKEN/EPIC/KID-SAD.json'
import ChickenEpicKidNormal from '@/assets/lotties/CHICKEN/EPIC/KID.json'
import ChickenEpicNormal from '@/assets/lotties/CHICKEN/EPIC/OLD.json'
import ChickenEpicSad from '@/assets/lotties/CHICKEN/EPIC/SAD.json'
import ChickenEpicShower from '@/assets/lotties/CHICKEN/EPIC/SHOWER.json'

//--------------------------------- LEGENDARY -------------------------------//
import ChickenLegendaryDirty from '@/assets/lotties/CHICKEN/LEGENDARY/DIRTY.json'
import ChickenLegendaryEat from '@/assets/lotties/CHICKEN/LEGENDARY/EAT.json'
import ChickenLegendaryFunny from '@/assets/lotties/CHICKEN/LEGENDARY/FUNNY.json'
import ChickenLegendaryKidDirty from '@/assets/lotties/CHICKEN/LEGENDARY/KID-DIRTY.json'
import ChickenLegendaryKidEat from '@/assets/lotties/CHICKEN/LEGENDARY/KID-EAT.json'
import ChickenLegendaryKidFunny from '@/assets/lotties/CHICKEN/LEGENDARY/KID-FUNNY.json'
import ChickenLegendaryKidSad from '@/assets/lotties/CHICKEN/LEGENDARY/KID-SAD.json'
import ChickenLegendaryKidNormal from '@/assets/lotties/CHICKEN/LEGENDARY/KID.json'
import ChickenLegendaryNormal from '@/assets/lotties/CHICKEN/LEGENDARY/OLD.json'
import ChickenLegendarySad from '@/assets/lotties/CHICKEN/LEGENDARY/SAD.json'
import ChickenLegendaryShower from '@/assets/lotties/CHICKEN/LEGENDARY/SHOWER.json'

export const ChickenAnimation = {
	normal: {
		normal: {
			animation: {
				common: ChickenCommonKidNormal,
				rare: ChickenRareKidNormal,
				epic: ChickenEpicKidNormal,
				legendary: ChickenLegendaryKidNormal,
			},
			width: 100,
			height: 140,
		},
		hungry: {
			animation: {
				common: ChickenCommonKidSad,
				rare: ChickenRareKidSad,
				epic: ChickenEpicKidSad,
				legendary: ChickenLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		eat: {
			animation: {
				common: ChickenCommonKidEat,
				rare: ChickenRareKidEat,
				epic: ChickenEpicKidEat,
				legendary: ChickenLegendaryKidEat,
			},
			width: 100,
			height: 140,
		},
		dirty: {
			animation: {
				common: ChickenCommonKidDirty,
				rare: ChickenRareKidDirty,
				epic: ChickenEpicKidDirty,
				legendary: ChickenLegendaryKidDirty,
			},
			width: 100,
			height: 140,
		},
		sad: {
			animation: {
				common: ChickenCommonKidSad,
				rare: ChickenRareKidSad,
				epic: ChickenEpicKidSad,
				legendary: ChickenLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		sick: {
			animation: {
				common: ChickenKidSick,
				rare: ChickenKidSick,
				epic: ChickenKidSick,
				legendary: ChickenKidSick,
			},
			width: 90,
			height: 140,
		},
		funny: {
			animation: {
				common: ChickenCommonKidFunny,
				rare: ChickenRareKidFunny,
				epic: ChickenEpicKidFunny,
				legendary: ChickenLegendaryKidFunny,
			},
			width: 90,
			height: 140,
		},
		toilet: {
			animation: {
				common: ChickenCommonShower,
				rare: ChickenRareShower,
				epic: ChickenEpicShower,
				legendary: ChickenLegendaryShower,
			},
			width: 190,
			height: 190,
		},
	},
	genesis: {
		normal: {
			animation: {
				common: ChickenCommonNormal,
				rare: ChickenRareNormal,
				epic: ChickenEpicNormal,
				legendary: ChickenLegendaryNormal,
			},
			width: 110,
			height: 190,
		},
		dirty: {
			animation: {
				common: ChickenCommonDirty,
				rare: ChickenRareDirty,
				epic: ChickenEpicDirty,
				legendary: ChickenLegendaryDirty,
			},
			width: 110,
			height: 190,
		},
		hungry: {
			animation: {
				common: ChickenCommonSad,
				rare: ChickenRareSad,
				epic: ChickenEpicSad,
				legendary: ChickenLegendarySad,
			},
			width: 110,
			height: 190,
		},
		eat: {
			animation: {
				common: ChickenCommonEat,
				rare: ChickenRareEat,
				epic: ChickenEpicEat,
				legendary: ChickenLegendaryEat,
			},
			width: 110,
			height: 190,
		},
		funny: {
			animation: {
				common: ChickenCommonFunny,
				rare: ChickenRareFunny,
				epic: ChickenEpicFunny,
				legendary: ChickenLegendaryFunny,
			},
			width: 110,
			height: 190,
		},
		sad: {
			animation: {
				common: ChickenCommonSad,
				rare: ChickenRareSad,
				epic: ChickenEpicSad,
				legendary: ChickenLegendarySad,
			},
			width: 110,
			height: 190,
		},
		sick: {
			animation: {
				common: ChickenSick,
				rare: ChickenSick,
				epic: ChickenSick,
				legendary: ChickenSick,
			},
			width: 110,
			height: 190,
		},
		toilet: {
			animation: {
				common: ChickenCommonShower,
				rare: ChickenRareShower,
				epic: ChickenEpicShower,
				legendary: ChickenLegendaryShower,
			},
			width: 190,
			height: 190,
		},
	},
}
