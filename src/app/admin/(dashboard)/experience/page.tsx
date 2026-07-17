"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminExperiencePage() {
  return (
    <ResourceManager
      title="Experience"
      description="Maintain the professional timeline and key achievements."
      resource="experience"
      columns={[
        { label: "Company", key: "company" },
        { label: "Role", key: "role" },
        {
          label: "Start",
          key: "startDate",
          render: item => String(item.startDate).slice(0, 10),
        },
      ]}
      fields={[
        { name: "company", label: "Company", type: "text" },
        { name: "role", label: "Role", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        {
          name: "achievements",
          label: "Achievements",
          type: "list",
        },
        { name: "startDate", label: "Start Date", type: "date" },
        { name: "endDate", label: "End Date", type: "date" },
      ]}
    />
  );
}