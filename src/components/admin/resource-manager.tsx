"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "date"
  | "list";

export type FieldConfig = {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: { label: string; value: string }[];
  helper?: string;
};

export type ColumnConfig<T> = {
  label: string;
  key: keyof T | string;
  render?: (item: T) => ReactNode;
};

type ResourceManagerProps<T extends Record<string, unknown>> = {
  title: string;
  description?: string;
  resource: string;
  columns: ColumnConfig<T>[];
  fields: FieldConfig[];
  idField?: keyof T;
  listQuery?: string;
};

const parseList = (value: string) =>
  value
    .split(/,|\n/)
    .map(item => item.trim())
    .filter(Boolean);

const formatList = (value: string[] | undefined) =>
  Array.isArray(value) ? value.join(", ") : "";

export default function ResourceManager<T extends Record<string, unknown>>({
  title,
  description,
  resource,
  columns,
  fields,
  idField = "id" as keyof T,
  listQuery = "",
}: ResourceManagerProps<T>) {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<T | null>(null);
  const [formState, setFormState] = useState<Record<string, unknown>>({});

  const listUrl = useMemo(() => {
    const query = listQuery ? `?${listQuery}` : "";
    return `/api/${resource}${query}`;
  }, [resource, listQuery]);

  const loadItems = async () => {
    setLoading(true);
    const response = await fetch(listUrl, { cache: "no-store" });
    const data = await response.json();
    setItems(data);
    setLoading(false);
  };

  useEffect(() => {
    loadItems();
  }, [listUrl]);

  const openCreate = () => {
    setEditing(null);
    const initial: Record<string, unknown> = {};
    fields.forEach(field => {
      initial[field.name] = field.type === "checkbox" ? false : "";
    });
    setFormState(initial);
    setOpen(true);
  };

  const openEdit = (item: T) => {
    setEditing(item);
    const initial: Record<string, unknown> = {};
    fields.forEach(field => {
      const value = item[field.name];
      if (field.type === "list") {
        if (Array.isArray(value)) {
          initial[field.name] = formatList(value as string[]);
        } else if (typeof value === "string") {
          initial[field.name] = value;
        } else {
          initial[field.name] = "";
        }
      } else if (field.type === "checkbox") {
        initial[field.name] = Boolean(value);
      } else if (field.type === "date") {
        initial[field.name] = value ? String(value).slice(0, 10) : "";
      } else {
        initial[field.name] = value ?? "";
      }
    });
    setFormState(initial);
    setOpen(true);
  };

  const handleSubmit = async () => {
    const payload: Record<string, unknown> = { ...formState };
    fields.forEach(field => {
      if (field.type === "number") {
        payload[field.name] = Number(payload[field.name] ?? 0);
      }
      if (field.type === "checkbox") {
        payload[field.name] = Boolean(payload[field.name]);
      }
      if (field.type === "list") {
        payload[field.name] = parseList(String(payload[field.name] ?? ""));
      }
    });

    const idValue = editing ? String(editing[idField]) : null;
    const method = editing ? "PUT" : "POST";
    const endpoint = editing ? `/api/${resource}/${idValue}` : `/api/${resource}`;

    await fetch(endpoint, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setOpen(false);
    await loadItems();
  };

  const handleDelete = async (item: T) => {
    const idValue = String(item[idField]);
    await fetch(`/api/${resource}/${idValue}`, { method: "DELETE" });
    await loadItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-sky-100">{title}</h2>
          {description && (
            <p className="text-sm text-sky-100/60">{description}</p>
          )}
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={openCreate}>New Entry</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {editing ? `Edit ${title}` : `Create ${title}`}
              </DialogTitle>
              <DialogDescription>
                Fill in the details and save when ready.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {fields.map(field => (
                <label key={field.name} className="space-y-2 text-sm">
                  <span className="text-sky-100/80">{field.label}</span>
                  {field.type === "textarea" && (
                    <Textarea
                      value={String(formState[field.name] ?? "")}
                      placeholder={field.placeholder}
                      onChange={event =>
                        setFormState(prev => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                    />
                  )}
                  {field.type === "list" && (
                    <Textarea
                      value={String(formState[field.name] ?? "")}
                      placeholder={
                        field.placeholder ?? "Comma or newline separated values"
                      }
                      onChange={event =>
                        setFormState(prev => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                    />
                  )}
                  {(field.type === "text" ||
                    field.type === "number" ||
                    field.type === "date") && (
                    <Input
                      type={
                        field.type === "date"
                          ? "date"
                          : field.type === "number"
                            ? "number"
                            : "text"
                      }
                      value={String(formState[field.name] ?? "")}
                      placeholder={field.placeholder}
                      onChange={event =>
                        setFormState(prev => ({
                          ...prev,
                          [field.name]: event.target.value,
                        }))
                      }
                    />
                  )}
                  {field.type === "checkbox" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={Boolean(formState[field.name])}
                        onChange={event =>
                          setFormState(prev => ({
                            ...prev,
                            [field.name]: event.target.checked,
                          }))
                        }
                      />
                      <span className="text-xs text-sky-100/60">
                        {field.helper}
                      </span>
                    </div>
                  )}
                  {field.type === "select" && (
                    <Select
                      value={String(formState[field.name] ?? "")}
                      onValueChange={(value: string) =>
                        setFormState(prev => ({ ...prev, [field.name]: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={field.placeholder ?? "Select"} />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                  {field.helper && field.type !== "checkbox" && (
                    <p className="text-xs text-sky-100/50">{field.helper}</p>
                  )}
                </label>
              ))}
              <Button onClick={handleSubmit} className="w-full">
                Save
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rounded-xl border border-gray-800 bg-gray-900/60">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map(column => (
                <TableHead key={String(column.key)}>{column.label}</TableHead>
              ))}
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  Loading {title.toLowerCase()}...
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length + 1}>
                  No entries yet.
                </TableCell>
              </TableRow>
            ) : (
              items.map(item => (
                <TableRow key={String(item[idField])}>
                  {columns.map(column => (
                    <TableCell key={String(column.key)}>
                      {column.render
                        ? column.render(item)
                        : String(item[column.key as keyof T] ?? "")}
                    </TableCell>
                  ))}
                  <TableCell className="text-right space-x-2">
                    <Button variant="secondary" size="sm" onClick={() => openEdit(item)}>
                      Edit
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(item)}
                      className="text-red-400"
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-wrap gap-2">
        {items.slice(0, 4).map(item => (
          <Badge key={String(item[idField])} variant="outline">
            {String(item[columns[0].key as keyof T] ?? "")}
          </Badge>
        ))}
      </div>
    </div>
  );
}
