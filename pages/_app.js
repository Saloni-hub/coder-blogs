import Navbar from '../componants/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return <>
  <Navbar/>
  <Component {...pageProps} />
  </>
}

export default MyApp
