"use client";

import { useEffect, useState } from "react";

interface PortfolioItem {
  title: string;
  fileUrl: string;
}

interface PortfolioRecord {
  _id?: string;
  title?: string;
  items?: PortfolioItem[];
}

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [sectionTitle, setSectionTitle] = useState("Our Portfolio");
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/proxy/portfolio")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.length > 0) {
          const record: PortfolioRecord = json.data[0];
          if (record.title) setSectionTitle(record.title);
          if (Array.isArray(record.items) && record.items.length > 0) {
            setItems(record.items);
          } else {
            setError(true);
          }
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#538A3E] border-t-transparent" />
          <p className="text-gray-600">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  if (error || items.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600">Portfolio is not available at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <section className="min-h-[60vh] py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">{sectionTitle}</h1>
        <p className="text-gray-500 text-center mb-10">Click a title below to download the file.</p>

        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
            >
              <span className="font-medium text-gray-800 text-lg">{item.title}</span>
              <a
                href={item.fileUrl}
                target="_blank"
                rel="noreferrer"
                download
                className="flex items-center gap-2 bg-[#538A3E] hover:bg-[#477635] text-white px-5 py-2 rounded-lg text-sm font-medium transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3" />
                </svg>
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



