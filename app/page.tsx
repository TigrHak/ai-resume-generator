'use client'
import { useState } from 'react'

export default function Home() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [usedFree, setUsedFree] = useState(false)

  async function generateResume() {
    if (usedFree) return

    setLoading(true)
    setOutput('')

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ input })
    })

    const data = await res.json()
    setOutput(data.result || 'No response')
    setLoading(false)
    setUsedFree(true)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f0f0f, #1a1a1a)',
        color: '#ffffff',
        padding: '60px 20px',
        fontFamily: 'Arial'
      }}
    >
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#111',
          borderRadius: '14px',
          padding: '40px',
          boxShadow: '0 0 40px rgba(0,0,0,0.6)'
        }}
      >
        {/* HERO */}
        <h1 style={{ fontSize: '42px', marginBottom: '10px' }}>
          Turn Student Experience Into a Job-Ready Resume
        </h1>
        <p style={{ color: '#aaa', marginBottom: '25px' }}>
          Built for students and interns with little or no work experience.
        </p>

        <p style={{ color: '#888', marginBottom: '40px' }}>
          Used by students applying for internships, first jobs, and university programs.
        </p>

        {/* HOW IT WORKS */}
        <h2 style={{ marginBottom: '10px' }}>How it works</h2>
        <ul style={{ color: '#ccc', marginBottom: '40px' }}>
          <li>1. Paste your part-time job, volunteering, or project experience</li>
          <li>2. AI rewrites it into a professional resume format</li>
          <li>3. Copy and use it instantly</li>
        </ul>

        {/* TOOL */}
        <h2 style={{ marginBottom: '10px' }}>Paste your experience</h2>
        <textarea
          placeholder="Example: Worked in a shop, helped customers, managed stock"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{
            width: '100%',
            height: '140px',
            padding: '14px',
            fontSize: '16px',
            borderRadius: '8px',
            border: 'none',
            marginBottom: '20px'
          }}
        />

        <button
          onClick={generateResume}
          disabled={loading || usedFree}
          style={{
            padding: '14px 28px',
            fontSize: '16px',
            cursor: usedFree ? 'not-allowed' : 'pointer',
            background: usedFree ? '#333' : '#4f46e5',
            color: '#fff',
            border: 'none',
            borderRadius: '8px'
          }}
        >
          {loading
            ? 'Generating...'
            : usedFree
            ? 'Free Resume Used'
            : 'Generate My Resume'}
        </button>

        {/* OUTPUT */}
        {output && (
          <div
            style={{
              marginTop: '40px',
              background: '#0a0a0a',
              padding: '20px',
              borderRadius: '10px',
              whiteSpace: 'pre-wrap'
            }}
          >
            {output}
          </div>
        )}

        {/* PAYWALL */}
        {usedFree && (
          <div
            style={{
              marginTop: '30px',
              padding: '20px',
              background: '#181818',
              borderRadius: '10px',
              color: '#ccc'
            }}
          >
            🔒 You’ve used your free resume.  
            <br />
            Unlock unlimited resumes for <strong>$3</strong>.
          </div>
        )}

        {/* EXAMPLE */}
        <h2 style={{ marginTop: '50px' }}>Example</h2>
        <p style={{ color: '#aaa' }}>
          <strong>Before:</strong> Worked in a shop and helped customers.
        </p>
        <p style={{ color: '#aaa' }}>
          <strong>After:</strong> Provided customer service, assisted with product selection, and supported daily store operations.
        </p>

        {/* FOOTER */}
        <p style={{ marginTop: '60px', color: '#666' }}>
          No sign-up required. Built specifically for students and first-time job seekers.
        </p>
      </div>
    </main>
  )
}