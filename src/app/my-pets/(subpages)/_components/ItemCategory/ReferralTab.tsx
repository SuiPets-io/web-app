import { CopyButton, InputWithLabel } from '@/components/molecules'
import { CopyIcon, Text } from '@/components/ui'
import { globalEnv } from '@/configs'
import { useProfile } from '@/hooks'
import { addressShorten } from '@/utils'
import useGetUserConfig from '../../_hooks/useGetUserConfig'

const ReferralTab = () => {
	const { data: userConfig } = useGetUserConfig()
	const { data: profileData } = useProfile()

	return (
		<div className="flex flex-col gap-4">
			<div>
				<Text className="text-green-500 font-semibold text-base">
					Referrals
				</Text>
				<div className="border border-green-500 px-4 py-3 rounded-xl flex gap-6 items-center bg-white mt-1">
					<div className="min-w-[60px] text-center">
						<Text className="text-[40px] text-green-500 font-semibold">
							{profileData?.numberReferral || 0}
						</Text>
					</div>
					<div className="border-l border-green-500 h-[56px]" />
					<Text className="text-sm text-green-500">
						{userConfig?.REFERRAL_MESSAGE}
					</Text>
				</div>
			</div>

			<div className="flex flex-col gap-2">
				<InputWithLabel
					label="Referral Code"
					value={profileData?.referralCode}
					readOnly
					suffix={
						<CopyButton
							content={profileData?.referralCode}
							variant="icon"
							className="w-full p-0 bg-transparent">
							<CopyIcon className="stroke-green-500" />
						</CopyButton>
					}
				/>

				<InputWithLabel
					label="Referral Link"
					value={addressShorten(
						`${globalEnv.telegramBotApp}?startapp=${profileData?.referralCode}`,
						12,
						6
					)}
					readOnly
					suffix={
						<CopyButton
							content={`${globalEnv.telegramBotApp}?startapp=${profileData?.referralCode}`}
							variant="icon"
							className="w-full p-0 bg-transparent">
							<CopyIcon className="stroke-green-500" />
						</CopyButton>
					}
				/>
			</div>
		</div>
	)
}

export default ReferralTab
