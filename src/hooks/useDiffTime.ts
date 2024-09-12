import moment from 'moment'
import { useEffect, useState } from 'react'

export const useDiffTime = ({ nextTime }: { nextTime: string }) => {
	const [diffTime, setDiffTime] = useState<number | null>(null)

	useEffect(() => {
		if (nextTime) {
			const temp = moment(nextTime).valueOf() - moment.now()
			setDiffTime(temp)

			const interval = setInterval(() => {
				const temp = moment(nextTime).valueOf() - moment.now()
				if (temp >= 0) {
					setDiffTime(temp)
				} else {
					setDiffTime(0)
					clearInterval(interval)
				}
			}, 1000)
			return () => clearInterval(interval)
		} else {
			setDiffTime(null)
			return
		}
	}, [nextTime])

	return { diffTime }
}
