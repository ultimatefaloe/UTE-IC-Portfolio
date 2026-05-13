import AboutMe from "@/components/about/aboutme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Tunmise"
}

const  About = () => {
  return (
    <AboutMe />
  )
};

export default About;