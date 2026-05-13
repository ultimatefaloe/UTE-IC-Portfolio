import { Metadata } from "next";

import SystemDesignPage from "@/components/system-design/systemDesignPage";

export const metadata: Metadata = {
  title: "System Design",
};

export default function SystemDesign() {
  return <SystemDesignPage />;
}
