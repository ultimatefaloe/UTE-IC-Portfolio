import SkillType from "@/components/skills/skillType";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Skills"
}

const  Skills = () => {
  return (
   <>
    <SkillType />
   </>
  )
};

export default Skills;