import ServicesPage from "@/components/service/servicePage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services"
}

const  Services = () => {
  return (
    <ServicesPage />
  )
};

export default Services;