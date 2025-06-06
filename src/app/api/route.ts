export async function GET() {
    const res = await fetch('http://........',  {
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY,
        },
    })
    const data = await res.json()
    return Response.json({ data })
}

export async function POST() {
    const res = await fetch('https:........', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'API-Key': process.env.DATA_API_KEY!,
        },
        body: JSON.stringify({ time: new Date().toString() }),
    })
    const data = await res.json()
    return Response.json(data)
}