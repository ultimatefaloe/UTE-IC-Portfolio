"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminProjectsPage() {
  return (
    <ResourceManager
      title="Projects"
      description="Showcase engineering case studies and flagship builds."
      resource="projects"
      columns={[
        { label: "Title", key: "title" },
        { label: "Category", key: "category" },
        {
          label: "Featured",
          key: "featured",
          render: item => (item.featured ? "Yes" : "No"),
        },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Short Description", type: "textarea" },
        { name: "longDescription", label: "Long Description", type: "textarea" },
        {
          name: "techStack",
          label: "Tech Stack",
          type: "list",
          helper: "Comma or newline separated",
        },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            { label: "SaaS", value: "SAAS" },
            { label: "Fintech", value: "FINTECH" },
            { label: "Logistics", value: "LOGISTICS" },
            { label: "Marketplace", value: "MARKETPLACE" },
            { label: "Streaming Platform", value: "STREAMING" },
            { label: "Contracts", value: "CONTRACTS" },
            { label: "Personal", value: "PERSONAL" },
            { label: "Prototypes", value: "PROTOTYPES" },
            { label: "Other", value: "OTHER" },
          ],
        },
        { name: "liveUrl", label: "Live URL", type: "text" },
        { name: "githubUrl", label: "GitHub URL", type: "text" },
        {
          name: "architectureDiagramUrl",
          label: "Architecture Diagram URL",
          type: "text",
        },
        {
          name: "featured",
          label: "Featured",
          type: "checkbox",
          helper: "Show on homepage",
        },
      ]}
    />
  );
}
