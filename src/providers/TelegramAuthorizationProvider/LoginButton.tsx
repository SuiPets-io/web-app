import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button } from '@/components/ui'
import LoginSheet from './LoginSheet'

const LoginButton = () => {
	const { openSheet } = useSheet()

	const onOpenLogin = () => {
		openSheet({
			title: 'Login',
			view: <LoginSheet />,
		})
	}

	return (
		<Button
			variant="outline"
			className="w-full max-w-[280px]"
			onClick={onOpenLogin}>
			Login
		</Button>
	)
}

export default LoginButton
