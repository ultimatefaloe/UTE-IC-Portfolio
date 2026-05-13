"use client";

import { useEffect, useState } from "react";
import { Layers, Route, Network } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

type SystemDesign = {
  id: string;
  title: string;
  description: string;
  diagramUrl?: string | null;
  type: "ARCHITECTURE" | "FLOW" | "API";
  order: number;
};

const typeIcon = {
  ARCHITECTURE: Layers,
  FLOW: Route,
  API: Network,
};

export default function SystemDesignPage() {
  const [items, setItems] = useState<SystemDesign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      const response = await fetch("/api/system-design", { cache: "no-store" });
      const data = await response.json();
      setItems(data);
      setLoading(false);
    };

    loadItems();
  }, []);

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        <header className="text-center space-y-4">
          <p className="text-sm uppercase tracking-widest text-sky-400">
            System Design
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-sky-900 dark:text-sky-100">
            Architecture Deep Dives
          </h1>
          <p className="text-sky-900/80 dark:text-sky-100/80">
            Explore core backend flows, infrastructure patterns, and delivery pipelines that power the portfolio projects.
          </p>
        </header>

        {loading ? (
          <p className="text-center text-sky-100/70">Loading system design notes...</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {items.map(item => {
              const Icon = typeIcon[item.type] ?? Layers;
              return (
                <Card key={item.id}>
                  <CardHeader className="flex flex-row items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400/10 text-sky-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle>{item.title}</CardTitle>
                      <p className="text-xs uppercase tracking-widest text-sky-100/50">
                        {item.type}
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-sm text-sky-100/70">{item.description}</p>
                    {item.diagramUrl && (
                      <Image
                        src={item.diagramUrl}
                        alt={item.title}
                        className="w-full rounded-lg border border-gray-800"
                        loading="lazy"
                      />
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
