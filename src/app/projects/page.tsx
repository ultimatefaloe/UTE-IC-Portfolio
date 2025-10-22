import ProjectPage from "@/components/projects/productpage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects"
}

const  Projects = () => {
  return (
    <>
      <ProjectPage />
    </>
  )
};

export default Projects;