import { Children } from 'react'
import BoxItem from './BoxItem'

const BoxGroup = () => {
	return (
		<div className="max-h-[calc(100vh-144px)] overflow-auto px-4">
			<div className="grid grid-cols-2 gap-2 py-4">
				{Children.toArray(Array.from({ length: 4 }, () => <BoxItem />))}
			</div>
		</div>
	)
}

export default BoxGroup
