import { ProfileCard } from './components/ProfileCard'
import { RecentBlogsSection } from './components/RecentBlogsSection'
import { ExperienceSection } from './components/ExperienceSection'
import { SkillsSection } from './components/SkillsSection'
import { EducationSection } from './components/EducationSection'
import { CertificationsSection } from './components/CertificationsSection'

export default function Home() {
  return (
    <>
      <ProfileCard />
      <RecentBlogsSection />
      <ExperienceSection />
      <SkillsSection />
      <EducationSection />
      <CertificationsSection />
    </>
  )
}
