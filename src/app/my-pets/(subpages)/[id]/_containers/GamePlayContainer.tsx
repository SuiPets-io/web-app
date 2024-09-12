import ItemCategoryContainer from './ItemCategoryContainer'
import PetAreaContainer from './PetAreaContainer'

const GamePlayContainer = () => {
	return (
		<div className="w-full h-full max-h-[100vh]">
			<PetAreaContainer />
			<ItemCategoryContainer />
		</div>
	)
}

export default GamePlayContainer
