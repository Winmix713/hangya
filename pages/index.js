import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PredictionForm from '../components/PredictionForm'

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>WinMix - Főoldal</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Mérkőzés Előrejelzések</h2>
        <PredictionForm />
        <div id="predictions" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"></div>
      </main>

      <Footer />
    </div>
  )
}