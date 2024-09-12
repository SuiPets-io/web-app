'use client'
import { useGetDecryptedPrivateKey } from '@/app/_store/telegramStore'
import { Button, CopyIcon, PowerIcon, Text } from '@/components/ui'
import { AVATAR_COLORS } from '@/constants'
import { useAccount, useDisconnectWallet } from '@/hooks'
import { addressShorten } from '@/utils'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Avatar from 'boring-avatars'
import { useState } from 'react'
import { CopyButton } from '../CopyButton'
import { useModal } from '../GlobalModal'
import { TextareaWithLabel } from '../TextareaWithLabel'
import BalanceInfo from './BalanceInfo/BalanceInfo'

const AccountInfoModal = () => {
	const { closeModal } = useModal()
	const { address } = useAccount()
	const { onDisconnect } = useDisconnectWallet()
	const decryptedPrivateKey = useGetDecryptedPrivateKey()
	const [isHiderivateKey, setHidePrivateKey] = useState(true)

	const onDisconnectAccount = () => {
		closeModal()
		onDisconnect()
	}

	return (
		<div className="flex flex-col gap-4 items-center pb-4 px-4 -mt-10">
			<Avatar
				size={60}
				name={address}
				variant="marble"
				colors={AVATAR_COLORS}
			/>
			<div className="flex flex-col items-center gap-2">
				<Text variant="headline">{addressShorten(address, 5, 4)}</Text>

				<BalanceInfo />
			</div>

			<div className="flex gap-2 items-end w-full">
				<TextareaWithLabel
					readOnly
					name="privateKey"
					label="Private key"
					value={decryptedPrivateKey}
					isHide={isHiderivateKey}
					rows={3}
				/>
				<div className="flex flex-col gap-1 mb-1">
					<Button
						onClick={() => setHidePrivateKey((prev) => !prev)}
						variant="icon"
						className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
						{isHiderivateKey ? (
							<EyeOpenIcon className="text-neutral-50 w-5 h-5" />
						) : (
							<EyeNoneIcon className="text-neutral-50 w-5 h-5" />
						)}
					</Button>
					<CopyButton
						content={decryptedPrivateKey}
						variant="icon"
						className="flex items-center justify-center rounded-[13px] h-[35px] w-[35px] p-0">
						<CopyIcon className="stroke-neutral-50 w-5 h-5" />
					</CopyButton>
				</div>
			</div>

			<div className="grid grid-cols-2 gap-4">
				<CopyButton
					content={address}
					variant="secondary"
					className="w-full flex flex-col bg-neutral-400 px-4 py-2 rounded-xl h-full gap-0.5">
					<CopyIcon className="stroke-neutral-50 w-5 h-5" />
					Copy Address
				</CopyButton>
				<Button
					variant="secondary"
					onClick={onDisconnectAccount}
					className="w-full flex flex-col bg-neutral-400 px-4 py-2 rounded-xl h-full gap-0.5">
					<PowerIcon className="fill-neutral-50 w-5 h-5" /> Disconnect
				</Button>
			</div>
		</div>
	)
}

export default AccountInfoModal
