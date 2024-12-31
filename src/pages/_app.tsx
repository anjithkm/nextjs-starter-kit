import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import store from '@/store'
import '#/public/assets/css/global.css'

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
			<Component {...pageProps} />
		</Provider>
	)
}

export default MyApp
