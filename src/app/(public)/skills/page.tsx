import SkillList from '@/components/skills/skillList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills — Tunmise Falodun',
};

export default function SkillsPage() {
  return <SkillList />;
}