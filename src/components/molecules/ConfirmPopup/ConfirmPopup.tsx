import { Button, ClientPortal, Text } from '@/components/ui'
import { ReactNode } from 'react'

interface IConfirmPopupProps {
	text: ReactNode
	show: boolean
	onClose: () => void
	onYes: () => void
}

export const ConfirmPopup = ({
	text,
	show,
	onClose,
	onYes,
}: IConfirmPopupProps) => {
	if (!show) return null

	return (
		<ClientPortal selector="body" show={show}>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
				<div className="absolute top-0 left-0 w-full h-full bg-neutral-800/50" />
				<div className="relative z-10 bg-white p-6 rounded-2xl shadow-lg min-w-[290px] w-[calc(100%-24px)]">
					<div className="mb-4 text-neutral-800 text-center">{text}</div>
					<div className="flex justify-center">
						<div className="w-full">
							<div className="flex justify-between space-x-4">
								<Button
									className="w-full text-white font-bold py-2 px-4"
									onClick={onYes}>
									<Text variant="caption">YES</Text>
								</Button>
								<Button
									className="w-full text-black bg-white	border border-green-600 py-2 px-4"
									onClick={onClose}>
									<Text variant="caption">NO</Text>
								</Button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</ClientPortal>
	)
}
