import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

function hash(value: string) {
    return crypto.createHash('sha256').update(value.trim().toLowerCase()).digest('hex')
}

export async function POST(req: NextRequest) {
    const body = await req.json()
    const { full_name, email, phone } = body

    const payload = {
        data: [
            {
                event_name: 'Lead',
                event_time: Math.floor(Date.now() / 1000),
                action_source: 'website',
                user_data: {
                    em: email ? [hash(email)] : [],
                    ph: phone ? [hash(phone)] : [],
                    fn: full_name ? [hash(full_name.split(' ')[0])] : [],
                    ln: full_name?.split(' ')[1] ? [hash(full_name.split(' ')[1])] : [],
                },
            },
        ],
    }

    const res = await fetch(
        `https://graph.facebook.com/v19.0/${process.env.META_PIXEL_ID}/events?access_token=${process.env.META_CAPI_TOKEN}`,
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }
    )

    const data = await res.json()
    return NextResponse.json(data)
}