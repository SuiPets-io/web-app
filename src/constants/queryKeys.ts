export const queryKeys = {
	privateQuery: ['privateQuery'],
	getProfile: (subkey?: string) => [
		...queryKeys.privateQuery,
		'getProfile',
		subkey,
	],
	getMyPet: (subkey?: string) => [
		...queryKeys.privateQuery,
		'getMyPet',
		subkey,
	],
	getMyEgg: (subkey?: string[]) => [
		...queryKeys.privateQuery,
		'getMyEgg',
		...(subkey || []),
	],
	getGlobalEggs: (subkey?: string[]) => [
		...queryKeys.privateQuery,
		'getGlobalEggs',
		...(subkey || []),
	],
	getSoldEggs: (subkey?: string[]) => [
		...queryKeys.privateQuery,
		'getSoldEggs',
		...(subkey || []),
	],
	getPriceConfig: () => [...queryKeys.privateQuery, 'getPriceConfig'],
	getUserConfig: () => [...queryKeys.privateQuery, 'getUserConfig'],
	getPetConfig: () => [...queryKeys.privateQuery, 'getPetConfig'],
	getEggConfig: () => [...queryKeys.privateQuery, 'getEggConfig'],
	checkClaimFreeEgg: () => [...queryKeys.privateQuery, 'checkClaimFreeEgg'],
	getPetDetail: (subkey?: string) => [
		...queryKeys.privateQuery,
		'getPetDetail',
		subkey,
	],
	getFusionList: (subkey?: string[]) => [
		...queryKeys.privateQuery,
		'getFusionList',
		...(subkey || []),
	],
	getEggDetail: (subkey?: string) => [
		...queryKeys.privateQuery,
		'getEggDetail',
		subkey,
	],
	getFusionDetail: (subkey?: string) => [
		...queryKeys.privateQuery,
		'getFusionDetail',
		subkey,
	],
	checkTx: (subkey?: string) => [...queryKeys.privateQuery, 'checkTx', subkey],
}
