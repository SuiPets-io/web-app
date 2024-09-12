import PigKidSick from '@/assets/lotties/PIG/KID-SICK.json'
import PigSick from '@/assets/lotties/PIG/SICK.json'
//--------------------------------- COMMON -------------------------------//
import PigCommonDirty from '@/assets/lotties/PIG/COMMON/DIRTY.json'
import PigCommonEat from '@/assets/lotties/PIG/COMMON/EAT.json'
import PigCommonFunny from '@/assets/lotties/PIG/COMMON/FUNNY.json'
import PigCommonKidDirty from '@/assets/lotties/PIG/COMMON/KID-DIRTY.json'
import PigCommonKidEat from '@/assets/lotties/PIG/COMMON/KID-EAT.json'
import PigCommonKidFunny from '@/assets/lotties/PIG/COMMON/KID-FUNNY.json'
import PigCommonKidSad from '@/assets/lotties/PIG/COMMON/KID-SAD.json'
import PigCommonKidNormal from '@/assets/lotties/PIG/COMMON/KID.json'
import PigCommonNormal from '@/assets/lotties/PIG/COMMON/OLD.json'
import PigCommonSad from '@/assets/lotties/PIG/COMMON/SAD.json'
import PigCommonShower from '@/assets/lotties/PIG/COMMON/SHOWER.json'

//--------------------------------- RARE -------------------------------//
import PigRareDirty from '@/assets/lotties/PIG/RARE/DIRTY.json'
import PigRareEat from '@/assets/lotties/PIG/RARE/EAT.json'
import PigRareFunny from '@/assets/lotties/PIG/RARE/FUNNY.json'
import PigRareKidDirty from '@/assets/lotties/PIG/RARE/KID-DIRTY.json'
import PigRareKidEat from '@/assets/lotties/PIG/RARE/KID-EAT.json'
import PigRareKidFunny from '@/assets/lotties/PIG/RARE/KID-FUNNY.json'
import PigRareKidSad from '@/assets/lotties/PIG/RARE/KID-SAD.json'
import PigRareKidNormal from '@/assets/lotties/PIG/RARE/KID.json'
import PigRareNormal from '@/assets/lotties/PIG/RARE/OLD.json'
import PigRareSad from '@/assets/lotties/PIG/RARE/SAD.json'
import PigRareShower from '@/assets/lotties/PIG/RARE/SHOWER.json'

//--------------------------------- EPIC -------------------------------//
import PigEpicDirty from '@/assets/lotties/PIG/EPIC/DIRTY.json'
import PigEpicEat from '@/assets/lotties/PIG/EPIC/EAT.json'
import PigEpicFunny from '@/assets/lotties/PIG/EPIC/FUNNY.json'
import PigEpicKidDirty from '@/assets/lotties/PIG/EPIC/KID-DIRTY.json'
import PigEpicKidEat from '@/assets/lotties/PIG/EPIC/KID-EAT.json'
import PigEpicKidFunny from '@/assets/lotties/PIG/EPIC/KID-FUNNY.json'
import PigEpicKidSad from '@/assets/lotties/PIG/EPIC/KID-SAD.json'
import PigEpicKidNormal from '@/assets/lotties/PIG/EPIC/KID.json'
import PigEpicNormal from '@/assets/lotties/PIG/EPIC/OLD.json'
import PigEpicSad from '@/assets/lotties/PIG/EPIC/SAD.json'
import PigEpicShower from '@/assets/lotties/PIG/EPIC/SHOWER.json'

//--------------------------------- LEGENDARY -------------------------------//
import PigLegendaryDirty from '@/assets/lotties/PIG/LEGENDARY/DIRTY.json'
import PigLegendaryEat from '@/assets/lotties/PIG/LEGENDARY/EAT.json'
import PigLegendaryFunny from '@/assets/lotties/PIG/LEGENDARY/FUNNY.json'
import PigLegendaryKidDirty from '@/assets/lotties/PIG/LEGENDARY/KID-DIRTY.json'
import PigLegendaryKidEat from '@/assets/lotties/PIG/LEGENDARY/KID-EAT.json'
import PigLegendaryKidFunny from '@/assets/lotties/PIG/LEGENDARY/KID-FUNNY.json'
import PigLegendaryKidSad from '@/assets/lotties/PIG/LEGENDARY/KID-SAD.json'
import PigLegendaryKidNormal from '@/assets/lotties/PIG/LEGENDARY/KID.json'
import PigLegendaryNormal from '@/assets/lotties/PIG/LEGENDARY/OLD.json'
import PigLegendarySad from '@/assets/lotties/PIG/LEGENDARY/SAD.json'
import PigLegendaryShower from '@/assets/lotties/PIG/LEGENDARY/SHOWER.json'

export const PigAnimation = {
	normal: {
		normal: {
			animation: {
				common: PigCommonKidNormal,
				rare: PigRareKidNormal,
				epic: PigEpicKidNormal,
				legendary: PigLegendaryKidNormal,
			},
			width: 100,
			height: 140,
		},
		hungry: {
			animation: {
				common: PigCommonKidSad,
				rare: PigRareKidSad,
				epic: PigEpicKidSad,
				legendary: PigLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		eat: {
			animation: {
				common: PigCommonKidEat,
				rare: PigRareKidEat,
				epic: PigEpicKidEat,
				legendary: PigLegendaryKidEat,
			},
			width: 100,
			height: 140,
		},
		dirty: {
			animation: {
				common: PigCommonKidDirty,
				rare: PigRareKidDirty,
				epic: PigEpicKidDirty,
				legendary: PigLegendaryKidDirty,
			},
			width: 100,
			height: 140,
		},
		sad: {
			animation: {
				common: PigCommonKidSad,
				rare: PigRareKidSad,
				epic: PigEpicKidSad,
				legendary: PigLegendaryKidSad,
			},
			width: 100,
			height: 140,
		},
		sick: {
			animation: {
				common: PigKidSick,
				rare: PigKidSick,
				epic: PigKidSick,
				legendary: PigKidSick,
			},
			width: 90,
			height: 140,
		},
		funny: {
			animation: {
				common: PigCommonKidFunny,
				rare: PigRareKidFunny,
				epic: PigEpicKidFunny,
				legendary: PigLegendaryKidFunny,
			},
			width: 90,
			height: 140,
		},
		toilet: {
			animation: {
				common: PigCommonShower,
				rare: PigRareShower,
				epic: PigEpicShower,
				legendary: PigLegendaryShower,
			},
			width: 190,
			height: 190,
		},
	},
	genesis: {
		normal: {
			animation: {
				common: PigCommonNormal,
				rare: PigRareNormal,
				epic: PigEpicNormal,
				legendary: PigLegendaryNormal,
			},
			width: 130,
			height: 190,
		},
		dirty: {
			animation: {
				common: PigCommonDirty,
				rare: PigRareDirty,
				epic: PigEpicDirty,
				legendary: PigLegendaryDirty,
			},
			width: 130,
			height: 190,
		},
		hungry: {
			animation: {
				common: PigCommonSad,
				rare: PigRareSad,
				epic: PigEpicSad,
				legendary: PigLegendarySad,
			},
			width: 130,
			height: 190,
		},
		eat: {
			animation: {
				common: PigCommonEat,
				rare: PigRareEat,
				epic: PigEpicEat,
				legendary: PigLegendaryEat,
			},
			width: 130,
			height: 190,
		},
		funny: {
			animation: {
				common: PigCommonFunny,
				rare: PigRareFunny,
				epic: PigEpicFunny,
				legendary: PigLegendaryFunny,
			},
			width: 120,
			height: 190,
		},
		sad: {
			animation: {
				common: PigCommonSad,
				rare: PigRareSad,
				epic: PigEpicSad,
				legendary: PigLegendarySad,
			},
			width: 130,
			height: 190,
		},
		sick: {
			animation: {
				common: PigSick,
				rare: PigSick,
				epic: PigSick,
				legendary: PigSick,
			},
			width: 140,
			height: 190,
		},
		toilet: {
			animation: {
				common: PigCommonShower,
				rare: PigRareShower,
				epic: PigEpicShower,
				legendary: PigLegendaryShower,
			},
			width: 190,
			height: 190,
		},
	},
}
