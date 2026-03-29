"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const PROJECT_IMAGES = [
  "/services1-1.jpg",
  "/services1-2.jpg",
  "/services1-3.jpg",
  "/services1-4.webp",
];

interface ProjectsData {
  id: string;
  Title: string;
  Descrption: string;
  C1Title: string; C1Descrption: string; C1Points: string[];
  C2Title: string; C2Descrption: string; C2Points: string[];
  C3Title: string; C3Descrption: string; C3Points: string[];
  C4Title: string; C4Descrption: string; C4Points: string[];
}

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/proxy/projects")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.length > 0) setData(json.data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = data
    ? [
        { title: data.C1Title, description: data.C1Descrption, highlights: data.C1Points },
        { title: data.C2Title, description: data.C2Descrption, highlights: data.C2Points },
        { title: data.C3Title, description: data.C3Descrption, highlights: data.C3Points },
        { title: data.C4Title, description: data.C4Descrption, highlights: data.C4Points },
      ]
    : [];

  return (
    <main className="bg-gradient-to-b from-[#f9fcf8] to-white">
      {/* ── Hero ── */}
      <section className="mx-auto max-w-7xl px-6 pb-8 pt-14 md:pt-20">
        <p className="mb-3 inline-flex items-center rounded-full border border-cyan-200 bg-white px-4 py-1 text-sm font-semibold text-gray-700">
          Selected Work
        </p>
        <h1 className="max-w-3xl text-3xl font-bold tracking-tight text-gray-900 md:text-5xl">
          PROJECTS
        </h1>

        {loading ? (
          <div className="mt-5 space-y-2 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-2/3" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        ) : (
          <>
            <p className="mt-5 max-w-3xl text-base leading-7 text-gray-600 md:text-lg">
              {data?.Descrption ||
                "From humanitarian supply chains to institutional support operations, our delivery model is designed for consistency, speed, and accountability."}
            </p>
            <p className="mt-3 text-base font-semibold text-cyan-600">
              This builds instant trust.
            </p>
          </>
        )}
      </section>

      {/* ── Project Cards ── */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-7 px-6 pb-16 md:grid-cols-2">
        {loading
          ? [1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-2xl border border-gray-200 bg-white shadow-sm animate-pulse">
                <div className="h-56 bg-gray-200 rounded-t-2xl" />
                <div className="space-y-3 p-6">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-4 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            ))
          : cards.map((project, index) => (
              <article
                key={index}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={PROJECT_IMAGES[index % PROJECT_IMAGES.length]}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="space-y-4 p-6">
                  <h2 className="text-xl font-bold text-gray-900">{project.title}</h2>
                  <p className="text-sm leading-6 text-gray-600">{project.description}</p>

                  <ul className="space-y-2">
                    {(project.highlights || []).map((highlight, hi) => (
                      <li key={hi} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-cyan-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-1">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-600 transition-colors hover:text-cyan-700"
                    >
                      Request Similar Project
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
      </section>
    </main>
  );
}
