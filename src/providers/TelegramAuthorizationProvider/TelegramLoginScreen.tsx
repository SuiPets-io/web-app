'use client'
import LoginBg from '@/assets/images/background/login-bg.webp'
import Logo from '@/assets/images/svg/logo.svg'
import { cn } from '@/utils'
import Image from 'next/image'
import CreateAccountButton from './CreateAccountButton'
import LoginButton from './LoginButton'

const TelegramLoginScreen = () => {
	return (
		<div
			className={cn(
				'min-h-[100vh] h-[100vh] max-w-[560px] mx-auto relative',
				'h-screen min-h-[400px] w-full relative bg-white'
			)}>
			<Image
				priority
				src={LoginBg}
				alt="bg"
				className="absolute top-0 left-0 w-full h-[55%] object-cover "
			/>
			<Image
				priority
				src={Logo}
				alt="petpals"
				className="absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-[55%] h-[280px] w-auto lg:h-[300px]"
			/>
			<div className="relative h-full flex flex-col justify-end px-5 lg:px-10 items-center w-full pb-[20%]">
				<div className="flex flex-col gap-4 w-full items-center">
					<LoginButton />
					<CreateAccountButton />
				</div>
			</div>
		</div>
	)
}

export default TelegramLoginScreen
