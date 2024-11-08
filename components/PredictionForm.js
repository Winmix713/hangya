import { useState, useEffect } from 'react'
import { teamConfig } from '../lib/teamConfig'

export default function PredictionForm() {
  const [teams, setTeams] = useState([])

  useEffect(() => {
    setTeams(Object.keys(teamConfig))
  }, [])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.target)
    const matchups = []

    for (let i = 1; i <= 4; i++) {
      matchups.push({
        home: formData.get(`homeTeam${i}`),
        away: formData.get(`awayTeam${i}`)
      })
    }

    try {
      const response = await fetch('/api/get-predictions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchups),
      })

      if (response.ok) {
        const predictions = await response.json()
        displayPredictions(predictions)
      } else {
        console.error('Failed to fetch predictions')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const displayPredictions = (predictions) => {
    const predictionsContainer = document.getElementById('predictions')
    predictionsContainer.innerHTML = ''

    predictions.forEach(prediction => {
      const predictionElement = document.createElement('div')
      predictionElement.className = 'bg-white p-4 rounded shadow'
      predictionElement.innerHTML = `
        <h3 class="text-lg font-bold mb-2">${prediction.match.home} vs ${prediction.match.away}</h3>
        <p>Hazai győzelem: ${prediction.homeWinPercentage}%</p>
        <p>Vendég győzelem: ${prediction.awayWinPercentage}%</p>
        <p>Döntetlen: ${prediction.drawPercentage}%</p>
        <p>Átlag gólszám: ${prediction.avgTotalGoals}</p>
        <p>Mindkét csapat gól: ${prediction.bothTeamsScoredPercentage}%</p>
        <p>Magabiztosság: ${prediction.confidence}%</p>
      `
      predictionsContainer.appendChild(predictionElement)
    })
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {[1, 2, 3, 4].map(i => (
        <div key={i}>
          <div>
            <label htmlFor={`homeTeam${i}`} className="block mb-2">{i}. Hazai csapat:</label>
            <select id={`homeTeam${i}`} name={`homeTeam${i}`} className="w-full p-2 border rounded" required>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor={`awayTeam${i}`} className="block mb-2">{i}. Vendég csapat:</label>
            <select id={`awayTeam${i}`} name={`awayTeam${i}`} className="w-full p-2 border rounded" required>
              {teams.map(team => (
                <option key={team} value={team}>{team}</option>
              ))}
            </select>
          </div>
        </div>
      ))}
      <div className="md:col-span-4">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
          Előrejelzés Futtatása
        </button>
      </div>
    </form>
  )
}