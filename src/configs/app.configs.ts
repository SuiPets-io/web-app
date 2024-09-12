export const AppConfig = {
	name: 'Petpals App',
}

enum MODE {
	DARK = 'dark',
	LIGHT = 'light',
}

export const siteConfig = {
	title: 'Petpals',
	// logo: logoImg,
	// icon: logoIconImg,
	mode: MODE.LIGHT,
}

export const globalEnv = {
	baseURL: process.env.NEXT_PUBLIC_BASE_URL,
	hostname: process.env.NEXT_PUBLIC_HOST_NAME,
	adminWalletAddress: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
	telegramBotApp: process.env.NEXT_PUBLIC_TELEGRAM_BOT_APP,
	cryptKey: process.env.NEXT_PUBLIC_CRYPT_KEY || '',
	googgleAnalyticsId: process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID || '',
	suiEnv: (process.env.NEXT_PUBLIC_SUI_ENV || 'devnet') as
		| 'devnet'
		| 'mainnet'
		| 'testnet'
		| 'localnet',
	rpcSui: process.env.NEXT_PUBLIC_RPC_SUI || '',
	ppsContract: process.env.NEXT_PUBLIC_PPS_CONTRACT_ADDRESS || '',
}
