"use client";

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminSystemDesignPage() {
  return (
    <ResourceManager
      title="System Design"
      description="Curate architecture diagrams and system notes."
      resource="system-design"
      columns={[
        { label: "Title", key: "title" },
        { label: "Type", key: "type" },
        { label: "Order", key: "order" },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "description", label: "Description", type: "textarea" },
        { name: "diagramUrl", label: "Diagram URL", type: "text" },
        {
          name: "type",
          label: "Type",
          type: "select",
          options: [
            { label: "Architecture", value: "ARCHITECTURE" },
            { label: "Flow", value: "FLOW" },
            { label: "API", value: "API" },
          ],
        },
        { name: "order", label: "Order", type: "number" },
      ]}
    />
  );
}
