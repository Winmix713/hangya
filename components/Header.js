import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">WinMix</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><Link href="/"><a className="hover:underline">Főoldal</a></Link></li>
            <li><Link href="/team-statistics"><a className="hover:underline">Csapat Statisztikák</a></Link></li>
            <li><Link href="/odds-input"><a className="hover:underline">Odds Bevitel</a></Link></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}