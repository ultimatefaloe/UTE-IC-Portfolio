"use client"

import ResourceManager from "@/components/admin/resource-manager";

export default function AdminBlogPage() {
  return (
    <ResourceManager
      title="Blog"
      description="Draft and publish engineering insights."
      resource="blog"
      listQuery="all=true"
      columns={[
        { label: "Title", key: "title" },
        { label: "Slug", key: "slug" },
        {
          label: "Published",
          key: "published",
          render: item => (item.published ? "Yes" : "No"),
        },
      ]}
      fields={[
        { name: "title", label: "Title", type: "text" },
        { name: "slug", label: "Slug", type: "text" },
        { name: "content", label: "Content", type: "textarea" },
        { name: "tags", label: "Tags", type: "list" },
        {
          name: "published",
          label: "Published",
          type: "checkbox",
          helper: "Toggle live visibility",
        },
      ]}
    />
  );
}
