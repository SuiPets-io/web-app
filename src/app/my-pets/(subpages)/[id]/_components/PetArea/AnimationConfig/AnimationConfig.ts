import { PET_TYPE } from '@/constants'
import { CatAnimation } from './CatAnimation'
import { ChickenAnimation } from './ChickenAnimation'
import { DogAnimation } from './DogAnimation'
import { PigAnimation } from './PigAnimation'

export const AnimationConfig = {
	[PET_TYPE.CAT]: CatAnimation,
	[PET_TYPE.CHICKEN]: ChickenAnimation,
	[PET_TYPE.DOG]: DogAnimation,
	[PET_TYPE.PIG]: PigAnimation,
}
