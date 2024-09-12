import { globalEnv,siteConfig } from '@/configs'
import { cn } from '@/utils'
import { GoogleAnalytics } from '@next/third-parties/google'
import { Viewport } from 'next'
import dynamic from 'next/dynamic'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import Providers from './_provider'
import './globals.css'

const poppins = Poppins({
	weight: ['400', '500', '600', '700', '800'],
	subsets: ['latin'],
	variable: '--font-poppins',
})

export async function generateMetadata() {
	return {
		...siteConfig,
	}
}

export const viewport: Viewport = {
	width: 'device-width',
	initialScale: 1,
	maximumScale: 1,
	userScalable: false,
	// Also supported by less commonly used
	// interactiveWidget: 'resizes-visual',
}

const ProgressLoader = dynamic(
	() => import('@/components/molecules/CustomLoaders/ProgressLoader'),
	{
		ssr: false,
	}
)

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<body
				className={cn(
					poppins.className,
					'bg-neutral-50 text-neutral-800 relative'
				)}
				suppressHydrationWarning>
				<Providers>
					{children}
					<ProgressLoader />
				</Providers>
			</body>
			<GoogleAnalytics gaId={globalEnv.googgleAnalyticsId} />
			<Script
				src="https://telegram.org/js/telegram-web-app.js"
				strategy="beforeInteractive"
			/>
		</html>
	)
}
