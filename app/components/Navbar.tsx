import { getAllPosts } from '@/lib/blog'
import { NavbarClient } from './NavbarClient'

// Server component — reads pinned posts at build/request time
export function Navbar() {
  const pinnedPosts = getAllPosts().filter((p) => p.pinned)
  return <NavbarClient pinnedPosts={pinnedPosts} />
}
