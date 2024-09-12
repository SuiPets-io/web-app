import { globalEnv } from '@/configs'
import { useAccount, useSocket } from '@/hooks'
import { addressShorten } from '@/utils'
import { ethers } from 'ethers'
import { useEffect } from 'react'
import { toast } from 'sonner'

const Listener = () => {
	const { address } = useAccount()
	const socket = useSocket(`${globalEnv.baseURL}/global`)

	useEffect(() => {
		if (socket) {
			socket.on('noti-numb', (data: any) => {
				const { data: notiData } = data

				if (address && notiData?.[0]?.publicAddress) {
					const publicAddress = ethers.getAddress(notiData[0].publicAddress)
					if (publicAddress !== ethers.getAddress(address)) {
						toast(notiData[0].gameName, {
							description: `${addressShorten(publicAddress, 6, 4)} got ${
								notiData[0].amount
							} SUI`,
						})
					}
				}
			})
		}

		return () => {
			if (socket) {
				socket.off('message')
			}
		}
	}, [address, socket])

	return null
}

export default Listener
