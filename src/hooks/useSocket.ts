import { accessTokenStore } from '@/app/_store/authenStore'
import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export const useSocket = (url: string) => {
	const accessToken = useAtomValue(accessTokenStore)
	const [socket, setSocket] = useState<Socket | null>(null)

	useEffect(() => {
		const socketIo = io(url, { auth: { token: accessToken } })

		setSocket(socketIo)

		function cleanup() {
			socketIo.disconnect()
		}

		return cleanup
	}, [url, accessToken])

	return socket
}
