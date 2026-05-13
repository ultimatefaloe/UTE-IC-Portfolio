"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminServicesPage() {
  return (
    <ResourceManager
      title="Services"
      description="Highlight consulting and engineering offerings."
      resource="services"
      columns={[
        { label: "Title", key: "title" },
        { label: "Description", key: "description" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
      ]}
    />
  );
}
