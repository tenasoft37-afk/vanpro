"use client";

import { useEffect, useState } from "react";

export default function PortfolioPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/api/proxy/portfolio")
      .then((r) => r.json())
      .then((json) => {
        if (json.success && json.data?.length > 0 && json.data[0].url) {
          window.location.href = json.data[0].url;
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
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-500 border-t-transparent" />
          <p className="text-gray-600">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="text-center">
          <h1 className="mb-2 text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="text-gray-600">Portfolio is not available at the moment. Please try again later.</p>
        </div>
      </div>
    );
  }

  return null;
}
