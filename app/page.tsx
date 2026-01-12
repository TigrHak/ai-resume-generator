'use client'

import { useState } from 'react'

export default function Home() {
  const [jobTitle, setJobTitle] = useState('')
  const [education, setEducation] = useState('')
  const [experience, setExperience] = useState('')
  const [skills, setSkills] = useState('')
  const [country, setCountry] = useState('UAE')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)

  async function generateResume() {
    setLoading(true)
    setOutput('')

    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        jobTitle,
        education,
        experience,
        skills,
        country,
      }),
    })

    const data = await res.json()
    setOutput(data.result || 'No response')
    setLoading(false)
  }

  return (
    <main
      style={{
        minHeight: '100vh',
        background: '#0f0f0f',
        color: '#ffffff',
        padding: '40px',
        fontFamily: 'Arial',
      }}
    >
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>
        AI Resume Generator (Students)
      </h1>
      <p style={{ color: '#aaa', marginBottom: '30px' }}>
        Turn limited experience into a professional resume
      </p>

      <div style={{ maxWidth: '700px' }}>
        <input
          placeholder="Target Job Title (e.g. Business Intern)"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Education (e.g. BBA Student – Year 2)"
          value={education}
          onChange={(e) => setEducation(e.target.value)}
          style={inputStyle}
        />

        <textarea
          placeholder="Experience / Activities (part-time jobs, volunteering, projects)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          style={{ ...inputStyle, height: '120px' }}
        />

        <input
          placeholder="Skills (e.g. Excel, Communication, Teamwork)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          style={inputStyle}
        />

        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          style={inputStyle}
        >
          <option value="UAE">UAE</option>
          <option value="Europe">Europe</option>
          <option value="USA">USA</option>
        </select>

        <button
          onClick={generateResume}
          style={{
            marginTop: '20px',
            padding: '14px 28px',
            fontSize: '16px',
            cursor: 'pointer',
            background: '#ffffff',
            color: '#000',
            borderRadius: '6px',
            border: 'none',
            fontWeight: 'bold',
          }}
        >
          {loading ? 'Generating...' : 'Generate Resume'}
        </button>
      </div>

      {output && (
        <div
          style={{
            marginTop: '40px',
            background: '#1a1a1a',
            padding: '30px',
            borderRadius: '8px',
            whiteSpace: 'pre-wrap',
            lineHeight: '1.6',
            fontSize: '16px',
            maxWidth: '900px',
          }}
        >
          {output}
        </div>
      )}
    </main>
  )
}

const inputStyle = {
  width: '100%',
  padding: '14px',
  marginBottom: '15px',
  borderRadius: '6px',
  border: 'none',
  fontSize: '15px',
}