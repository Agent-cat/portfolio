import { ProfileCard } from './components/ProfileCard'
import { RecentBlogsSection } from './components/RecentBlogsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { EducationSection } from './components/EducationSection'
import { CertificationsSection } from './components/CertificationsSection'
import { getGitHubContributions } from '@/lib/github'
import profileData from '@/data/profile.json'

export default async function Home() {
  const githubHref = profileData.socials.find((s) => s.icon === 'SiGithub')?.href ?? 'https://github.com/Agent-cat'
  const username = githubHref.split('/').pop() || 'Agent-cat'
  const githubData = await getGitHubContributions(username)

  return (
    <>
      <ProfileCard githubData={githubData} />
      <RecentBlogsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
    </>
  )
}
