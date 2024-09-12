export enum ECHAIN {
	SUI = 'sui',
	PPS = 'pps',
}

export enum PET_STATUS {
	NEED_TO_BUY = 'need-to-buy',
	AVAILABLE = 'available',
	EGG = 'egg',
	PET = 'pet',
	DIE = 'die',
}

export enum PET_STAGE {
	EAT = 'eat',
	TOILET = 'toilet',
	ENTERTAINMENT = 'entertainment',
}

export enum PET_ITEM_TYPE {
	FOOD = 'food',
	TOILET = 'toilet',
	ENTERTAINMENT = 'entertainment',
}

export enum PET_TYPE {
	CAT = 'cat',
	CHICKEN = 'chicken',
	DOG = 'dog',
	PIG = 'pig',
}

export enum RARITY {
	COMMON = 'common',
	RARE = 'rare',
	EPIC = 'epic',
	LEGENDARY = 'legendary',
}

export enum ORIGIN {
	GENESIS = 'genesis',
	NORMAL = 'normal',
}

export enum EGG_STATUS {
	ACTIVE = 'active',
	ONSALE = 'onsale',
	FARMING = 'farming',
	DIE = 'die',
}

export enum EGG_ONSATE_STATUS {
	BUYING = 'buying',
	ONSALE = 'listing',
}

export enum CHECK_TX_TYPE {
	BUY_OFFERING = 'buy-offering',
	BUY_ITEM = 'buy-item',
	BUY_EGG = 'buy-egg',
	ACTIVE_FUSION = 'active-fusion',
	ACTIVE_AUTO = 'active-auto',
	FUSION = 'fusion',
	BUY_PET_SLOT = 'buy-pet-slot',
	CLAIM_PPS = 'claim-pps',
	RESET_PET = 'reset-pet',
}

export enum CHECK_TX_STATUS {
	WAITING_TO_CHECK = 'waiting-to-check',
	SUCCESS = 'success',
	FAIL = 'fail',
}
