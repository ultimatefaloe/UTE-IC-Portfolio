"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminSkillsPage() {
  return (
    <ResourceManager
      title="Skills"
      description="Organize skills by discipline and proficiency level."
      resource="skills"
      columns={[
        { label: "Skill", key: "name" },
        { label: "Category", key: "category" },
        { label: "Level", key: "level" },
      ]}
      fields={[
        { name: "name", label: "Name", type: "text" },
        {
          name: "category",
          label: "Category",
          type: "select",
          options: [
            { label: "Backend", value: "BACKEND" },
            { label: "Frontend", value: "FRONTEND" },
            { label: "DevOps", value: "DEVOPS" },
          ],
        },
        {
          name: "level",
          label: "Level (0-100)",
          type: "number",
        },
      ]}
    />
  );
}
