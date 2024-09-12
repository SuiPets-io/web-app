import { useSheet } from '@/components/molecules/GlobalSheet'
import { Button } from '@/components/ui'
import CreateAccountSheet from './CreateAccountSheet'

const CreateAccountButton = () => {
	const { openSheet } = useSheet()

	const onOpenCreateAccount = () => {
		openSheet({
			title: 'Create Account',
			view: <CreateAccountSheet />,
		})
	}

	return (
		<Button
			variant="secondary"
			className="w-full max-w-[280px]"
			onClick={onOpenCreateAccount}>
			Create Account
		</Button>
	)
}

export default CreateAccountButton
