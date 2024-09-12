import DogKidSick from '@/assets/lotties/DOG/KID-SICK.json'
import DogSick from '@/assets/lotties/DOG/SICK.json'
//--------------------------------- COMMON -------------------------------//
import DogCommonDirty from '@/assets/lotties/DOG/COMMON/DIRTY.json'
import DogCommonEat from '@/assets/lotties/DOG/COMMON/EAT.json'
import DogCommonFunny from '@/assets/lotties/DOG/COMMON/FUNNY.json'
import DogCommonKidDirty from '@/assets/lotties/DOG/COMMON/KID-DIRTY.json'
import DogCommonKidEat from '@/assets/lotties/DOG/COMMON/KID-EAT.json'
import DogCommonKidFunny from '@/assets/lotties/DOG/COMMON/KID-FUNNY.json'
import DogCommonKidSad from '@/assets/lotties/DOG/COMMON/KID-SAD.json'
import DogCommonKidNormal from '@/assets/lotties/DOG/COMMON/KID.json'
import DogCommonNormal from '@/assets/lotties/DOG/COMMON/OLD.json'
import DogCommonSad from '@/assets/lotties/DOG/COMMON/SAD.json'
import DogCommonShower from '@/assets/lotties/DOG/COMMON/SHOWER.json'

//--------------------------------- RARE -------------------------------//
import DogRareDirty from '@/assets/lotties/DOG/RARE/DIRTY.json'
import DogRareEat from '@/assets/lotties/DOG/RARE/EAT.json'
import DogRareFunny from '@/assets/lotties/DOG/RARE/FUNNY.json'
import DogRareKidDirty from '@/assets/lotties/DOG/RARE/KID-DIRTY.json'
import DogRareKidEat from '@/assets/lotties/DOG/RARE/KID-EAT.json'
import DogRareKidFunny from '@/assets/lotties/DOG/RARE/KID-FUNNY.json'
import DogRareKidSad from '@/assets/lotties/DOG/RARE/KID-SAD.json'
import DogRareKidNormal from '@/assets/lotties/DOG/RARE/KID.json'
import DogRareNormal from '@/assets/lotties/DOG/RARE/OLD.json'
import DogRareSad from '@/assets/lotties/DOG/RARE/SAD.json'
import DogRareShower from '@/assets/lotties/DOG/RARE/SHOWER.json'

//--------------------------------- EPIC -------------------------------//
import DogEpicDirty from '@/assets/lotties/DOG/EPIC/DIRTY.json'
import DogEpicEat from '@/assets/lotties/DOG/EPIC/EAT.json'
import DogEpicFunny from '@/assets/lotties/DOG/EPIC/FUNNY.json'
import DogEpicKidDirty from '@/assets/lotties/DOG/EPIC/KID-DIRTY.json'
import DogEpicKidEat from '@/assets/lotties/DOG/EPIC/KID-EAT.json'
import DogEpicKidFunny from '@/assets/lotties/DOG/EPIC/KID-FUNNY.json'
import DogEpicKidSad from '@/assets/lotties/DOG/EPIC/KID-SAD.json'
import DogEpicKidNormal from '@/assets/lotties/DOG/EPIC/KID.json'
import DogEpicNormal from '@/assets/lotties/DOG/EPIC/OLD.json'
import DogEpicSad from '@/assets/lotties/DOG/EPIC/SAD.json'
import DogEpicShower from '@/assets/lotties/DOG/EPIC/SHOWER.json'

//--------------------------------- LEGENDARY -------------------------------//
import DogLegendaryDirty from '@/assets/lotties/DOG/LEGENDARY/DIRTY.json'
import DogLegendaryEat from '@/assets/lotties/DOG/LEGENDARY/EAT.json'
import DogLegendaryFunny from '@/assets/lotties/DOG/LEGENDARY/FUNNY.json'
import DogLegendaryKidDirty from '@/assets/lotties/DOG/LEGENDARY/KID-DIRTY.json'
import DogLegendaryKidEat from '@/assets/lotties/DOG/LEGENDARY/KID-EAT.json'
import DogLegendaryKidFunny from '@/assets/lotties/DOG/LEGENDARY/KID-FUNNY.json'
import DogLegendaryKidSad from '@/assets/lotties/DOG/LEGENDARY/KID-SAD.json'
import DogLegendaryKidNormal from '@/assets/lotties/DOG/LEGENDARY/KID.json'
import DogLegendaryNormal from '@/assets/lotties/DOG/LEGENDARY/OLD.json'
import DogLegendarySad from '@/assets/lotties/DOG/LEGENDARY/SAD.json'
import DogLegendaryShower from '@/assets/lotties/DOG/LEGENDARY/SHOWER.json'

export const DogAnimation = {
	normal: {
		normal: {
			animation: {
				common: DogCommonKidNormal,
				rare: DogRareKidNormal,
				epic: DogEpicKidNormal,
				legendary: DogLegendaryKidNormal,
			},
			width: 100,
			height: 140,
		},
		hungry: {
			animation: {
				common: DogCommonKidSad,
				rare: DogRareKidSad,
				epic: DogEpicKidSad,
				legendary: DogLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		eat: {
			animation: {
				common: DogCommonKidEat,
				rare: DogRareKidEat,
				epic: DogEpicKidEat,
				legendary: DogLegendaryKidEat,
			},
			width: 100,
			height: 140,
		},
		dirty: {
			animation: {
				common: DogCommonKidDirty,
				rare: DogRareKidDirty,
				epic: DogEpicKidDirty,
				legendary: DogLegendaryKidDirty,
			},
			width: 100,
			height: 140,
		},
		sad: {
			animation: {
				common: DogCommonKidSad,
				rare: DogRareKidSad,
				epic: DogEpicKidSad,
				legendary: DogLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		sick: {
			animation: {
				common: DogKidSick,
				rare: DogKidSick,
				epic: DogKidSick,
				legendary: DogKidSick,
			},
			width: 100,
			height: 150,
		},
		funny: {
			animation: {
				common: DogCommonKidFunny,
				rare: DogRareKidFunny,
				epic: DogEpicKidFunny,
				legendary: DogLegendaryKidFunny,
			},
			width: 100,
			height: 140,
		},
		toilet: {
			animation: {
				common: DogCommonShower,
				rare: DogRareShower,
				epic: DogEpicShower,
				legendary: DogLegendaryShower,
			},
			width: 195,
			height: 195,
		},
	},
	genesis: {
		normal: {
			animation: {
				common: DogCommonNormal,
				rare: DogRareNormal,
				epic: DogEpicNormal,
				legendary: DogLegendaryNormal,
			},
			width: 130,
			height: 195,
		},
		dirty: {
			animation: {
				common: DogCommonDirty,
				rare: DogRareDirty,
				epic: DogEpicDirty,
				legendary: DogLegendaryDirty,
			},
			width: 130,
			height: 195,
		},
		hungry: {
			animation: {
				common: DogCommonSad,
				rare: DogRareSad,
				epic: DogEpicSad,
				legendary: DogLegendarySad,
			},
			width: 130,
			height: 195,
		},
		eat: {
			animation: {
				common: DogCommonEat,
				rare: DogRareEat,
				epic: DogEpicEat,
				legendary: DogLegendaryEat,
			},
			width: 130,
			height: 195,
		},
		funny: {
			animation: {
				common: DogCommonFunny,
				rare: DogRareFunny,
				epic: DogEpicFunny,
				legendary: DogLegendaryFunny,
			},
			width: 130,
			height: 190,
		},
		sad: {
			animation: {
				common: DogCommonSad,
				rare: DogRareSad,
				epic: DogEpicSad,
				legendary: DogLegendarySad,
			},
			width: 130,
			height: 195,
		},
		sick: {
			animation: {
				common: DogSick,
				rare: DogSick,
				epic: DogSick,
				legendary: DogSick,
			},
			width: 130,
			height: 195,
		},
		toilet: {
			animation: {
				common: DogCommonShower,
				rare: DogRareShower,
				epic: DogEpicShower,
				legendary: DogLegendaryShower,
			},
			width: 195,
			height: 195,
		},
	},
}
