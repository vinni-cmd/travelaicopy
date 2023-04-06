'use client'

import { FormEvent, useState } from 'react'

export default function Form() {
  const [country, setCountry] = useState('')
  const [result, setResult] = useState('Get ready!')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Send data to API route
    const res = await fetch('/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        country,
      }),
    })

    const resulttt = await res.json()
    console.log(resulttt)
    const { chatRes } = resulttt
    setResult(chatRes)

    setCountry('')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Country:
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="border-2 border-pink-600 "
          />
        </label>
        <button>💥</button>
      </form>
      <p className="border-2 font-bold">{result}</p>
    </>
  )
}
