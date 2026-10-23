import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Cursor from '@/components/Cursor'
export default function SiteLayout({ children }: { children: React.ReactNode }) { return <><Cursor /><Navbar />{children}<Footer /></> }
