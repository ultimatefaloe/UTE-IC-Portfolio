"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminContentPage() {
  return (
    <ResourceManager
      title="Site Copy"
      description="Manage hero and about copy blocks."
      resource="content"
      idField="key"
      columns={[
        { label: "Key", key: "key" },
        { label: "Title", key: "title" },
      ]}
      fields={[
        {
          name: "key",
          label: "Key",
          type: "text",
          helper: "Use hero or about",
        },
        { name: "title", label: "Title", type: "text" },
        { name: "subtitle", label: "Subtitle", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "body", label: "Body", type: "textarea" },
      ]}
    />
  );
}
