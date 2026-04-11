"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

const FALLBACK_IMAGES = [
  "/services1-1.jpg",
  "/services1-2.jpg",
  "/services1-3.jpg",
  "/services1-4.webp",
];

interface ProjectsData {
  id: string;
  Title: string;
  Descrption: string;
  C1Title: string; C1Descrption: string; C1Points: string[]; C1Images: string[];
  C2Title: string; C2Descrption: string; C2Points: string[]; C2Images: string[];
  C3Title: string; C3Descrption: string; C3Points: string[]; C3Images: string[];
  C4Title: string; C4Descrption: string; C4Points: string[]; C4Images: string[];
}

/* ── Lightbox ── */
function Lightbox({ images, startIndex, onClose }: { images: string[]; startIndex: number; onClose: () => void }) {
  const [idx, setIdx] = useState(startIndex);
  const total = images.length;

  const prev = useCallback(() => setIdx((i) => (i - 1 + total) % total), [total]);
  const next = useCallback(() => setIdx((i) => (i + 1) % total), [total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[idx]}
          alt={`Image ${idx + 1}`}
          width={1200}
          height={800}
          className="max-h-[85vh] w-auto rounded-lg object-contain"
        />

        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 rounded-full bg-white p-1.5 shadow-lg transition hover:bg-gray-100"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-gray-800" />
        </button>

        {total > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              aria-label="Previous"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/50 p-2 text-white transition hover:bg-black/70"
              aria-label="Next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
              {idx + 1} / {total}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Card image slider ── */
function CardImageSlider({
  images,
  alt,
  onImageClick,
}: {
  images: string[];
  alt: string;
  onImageClick: (index: number) => void;
}) {
  const [current, setCurrent] = useState(0);
  const total = images.length;

  if (total === 0) return null;

  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  return (
    <div className="relative h-56 overflow-hidden bg-gray-100">
      <button
        type="button"
        className="relative block h-full w-full cursor-zoom-in"
        onClick={() => onImageClick(current)}
        aria-label="View full image"
      >
        <Image
          src={images[current]}
          alt={`${alt} – image ${current + 1}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </button>
      {total > 1 && (
        <>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); prev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); next(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-1 transition z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                className={`w-1.5 h-1.5 rounded-full transition ${i === current ? "bg-white" : "bg-white/50"}`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

interface ClientsSectionData {
  id?: string;
  badgeLabel: string;
  title: string;
  description: string;
}

const DEFAULT_CLIENTS_SECTION: ClientsSectionData = {
  badgeLabel: 'Trusted Partners',
  title: 'Proud to Work With',
  description: 'Leading organizations trust us with their most critical operations and transformational initiatives',
};

export default function ProjectsPage() {
  const [data, setData] = useState<ProjectsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ images: string[]; index: number } | null>(null);
  const [clients, setClients] = useState<string[][]>([]);
  const [clientsLoading, setClientsLoading] = useState(true);
  const [clientsSection, setClientsSection] = useState<ClientsSectionData>(DEFAULT_CLIENTS_SECTION);

  useEffect(() => {
    fetch("/api/proxy/projects")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.length > 0) setData(json.data[0]);
      })
      .catch(console.error)
      .finally(() => setLoading(false));

    fetch("/api/proxy/ourclients")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && Array.isArray(json.data)) {
          setClients(json.data.map((c: { images: string[] }) => c.images || []));
        }
      })
      .catch(console.error)
      .finally(() => setClientsLoading(false));

    fetch("/api/proxy/clients-section")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data) {
          setClientsSection({
            badgeLabel: json.data.badgeLabel || DEFAULT_CLIENTS_SECTION.badgeLabel,
            title: json.data.title || DEFAULT_CLIENTS_SECTION.title,
            description: json.data.description || DEFAULT_CLIENTS_SECTION.description,
          });
        }
      })
      .catch(console.error);
  }, []);

  const cards = data
    ? [
        { title: data.C1Title, description: data.C1Descrption, highlights: data.C1Points, images: data.C1Images?.length ? data.C1Images : [FALLBACK_IMAGES[0]] },
        { title: data.C2Title, description: data.C2Descrption, highlights: data.C2Points, images: data.C2Images?.length ? data.C2Images : [FALLBACK_IMAGES[1]] },
        { title: data.C3Title, description: data.C3Descrption, highlights: data.C3Points, images: data.C3Images?.length ? data.C3Images : [FALLBACK_IMAGES[2]] },
        { title: data.C4Title, description: data.C4Descrption, highlights: data.C4Points, images: data.C4Images?.length ? data.C4Images : [FALLBACK_IMAGES[3]] },
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
                <CardImageSlider
                  images={project.images}
                  alt={project.title}
                  onImageClick={(imgIdx) => setLightbox({ images: project.images, index: imgIdx })}
                />
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

      {/* ── Lightbox ── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}

      {/* ── Our Clients ── */}
      {(clientsLoading || clients.length > 0) && (
        <section className="relative bg-gradient-to-b from-white via-[#f9fcf8] to-white py-20">
          {/* Background accent */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-100/20 rounded-full -translate-y-1/2 translate-x-1/4 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-50/20 rounded-full translate-y-1/2 -translate-x-1/4 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-7xl px-6">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/80 backdrop-blur px-4 py-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <p className="text-xs font-semibold uppercase tracking-widest text-cyan-700">
                  {clientsSection.badgeLabel}
                </p>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {clientsSection.title}
              </h2>
              <p className="text-base text-gray-600 max-w-2xl mx-auto">
                {clientsSection.description}
              </p>
            </div>

            {/* Clients Grid */}
            {clientsLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="h-24 bg-white rounded-lg border border-gray-100 animate-pulse" />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {clients.flatMap((imgArr, ci) =>
                  imgArr.map((img, ii) => (
                    <div
                      key={`${ci}-${ii}`}
                      className="group relative"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-cyan-500/0 group-hover:from-cyan-500/5 group-hover:to-cyan-500/10 rounded-xl transition-colors duration-300 pointer-events-none" />
                      <div className="relative h-24 flex items-center justify-center rounded-xl border border-gray-100 bg-white/80 backdrop-blur p-4 shadow-sm transition-all duration-300 group-hover:border-cyan-200 group-hover:shadow-lg group-hover:bg-white">
                        <Image
                          src={img}
                          alt={`Client logo ${ci + 1}`}
                          width={140}
                          height={60}
                          className="max-h-16 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300"
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}



