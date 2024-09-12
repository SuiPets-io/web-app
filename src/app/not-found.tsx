'use client'

import { Button, Text } from '@/components/ui'
import { useRouter } from 'next-nprogress-bar'

export default function NotFoundPage() {
	const router = useRouter()

	return (
		<div className="flex flex-col items-center justify-center gap-8 h-[100vh] w-full">
			<div className="flex flex-col items-center justify-center">
				<Text variant="d2">404</Text>
				<Text variant="d2">Page not found</Text>
			</div>
			<Button onClick={() => router.push('/')}>Go home</Button>
		</div>
	)
}
