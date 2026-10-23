import { NextResponse } from 'next/server'
import { listEnquiries, setStatus, removeEnquiry, type Status } from '@/lib/store'
export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'
export async function GET() { return NextResponse.json({ items: await listEnquiries() }) }
export async function PATCH(req: Request) {
  const b = await req.json().catch(() => ({}))
  if (typeof b.id !== 'string' || !['new', 'contacted', 'closed'].includes(b.status)) return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  return (await setStatus(b.id, b.status as Status)) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Not found.' }, { status: 404 })
}
export async function DELETE(req: Request) {
  const id = new URL(req.url).searchParams.get('id') || ''
  return (await removeEnquiry(id)) ? NextResponse.json({ ok: true }) : NextResponse.json({ error: 'Not found.' }, { status: 404 })
}
