import { promises as fs } from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'
export type Status = 'new' | 'contacted' | 'closed'
export interface Enquiry { id: string; type: string; name: string; email: string; phone: string; message: string; tour: string; fields: Record<string, string>; status: Status; createdAt: string }
const dir = () => process.env.DATA_DIR || path.join(process.cwd(), 'data', 'store')
const file = () => path.join(dir(), 'enquiries.json')
let chain: Promise<unknown> = Promise.resolve()
function lock<T>(fn: () => Promise<T>): Promise<T> { const r = chain.then(fn, fn); chain = r.catch(() => {}); return r }
async function read(): Promise<Enquiry[]> { try { return JSON.parse(await fs.readFile(file(), 'utf8')) } catch { return [] } }
async function write(a: Enquiry[]) { await fs.mkdir(dir(), { recursive: true }); const t = file() + '.tmp'; await fs.writeFile(t, JSON.stringify(a, null, 1)); await fs.rename(t, file()) }
export const listEnquiries = () => read()
export const addEnquiry = (e: Omit<Enquiry, 'id' | 'status' | 'createdAt'>) => lock(async () => { const a = await read(); const rec: Enquiry = { ...e, id: randomUUID(), status: 'new', createdAt: new Date().toISOString() }; a.unshift(rec); await write(a); return rec })
export const setStatus = (id: string, status: Status) => lock(async () => { const a = await read(); const r = a.find(x => x.id === id); if (!r) return false; r.status = status; await write(a); return true })
export const removeEnquiry = (id: string) => lock(async () => { const a = await read(); const n = a.filter(x => x.id !== id); if (n.length === a.length) return false; await write(n); return true })
