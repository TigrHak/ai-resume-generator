import { NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

export async function POST(req: Request) {
  try {
    const {
      jobTitle,
      education,
      experience,
      skills,
      country,
    } = await req.json()

    const systemPrompt = `
You are an expert resume writer specializing in STUDENTS and FRESH GRADUATES.

Your task:
- Convert limited, weak, or non-professional experience into a strong, professional resume.
- Optimize the resume for ATS systems.
- Adapt wording and tone for the ${country} job market.

STRICT RULES:
- Output ONLY the resume content.
- NO explanations.
- NO emojis.
- NO markdown.
- NO headings like "Here is your resume".
- Use clear sections and bullet points.
- Use strong action verbs.
- Quantify impact where reasonable.
- Keep it professional and concise.

REQUIRED STRUCTURE:
Professional Summary (3–4 lines)
Education
Experience (bullet points)
Skills
`

    const userPrompt = `
Target Job Title:
${jobTitle}

Education:
${education}

Experience / Activities:
${experience}

Skills:
${skills}
`

    const response = await openai.responses.create({
      model: 'gpt-4.1-mini',
      input: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    })

    return NextResponse.json({
      result: response.output_text,
    })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: 'Failed to generate resume' },
      { status: 500 }
    )
  }
}