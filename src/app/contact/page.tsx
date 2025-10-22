import ContactPage from "@/components/contact/contactPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Me"
}

const  Contact = () => {
  return (
    <ContactPage />
  )
};

export default Contact;