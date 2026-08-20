"use client";
import Link from "next/link";
import { MdArrowOutward } from "react-icons/md";
import { Button } from "@heroui/button";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthHeaders } from "../auth";

import NewsBlogs from "@/components/property/news";
import { Spinner } from "@heroui/react";

interface NewsBlogsData {
  id: string;
  headline: string;
  image: string;
  content: string;
  date: string;
}

const HomeNews = () => {
  const [news, setNews] = useState<NewsBlogsData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [buttonLoading, setButtonLoading] = useState(false);
  const router = useRouter(); // Initialize router

  useEffect(() => {
    const fetchNews = async () => {
      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const headers = getAuthHeaders();

      try {
        const response = await fetch(`${apiUrl}/api/user/articles`, {
          method: "GET",
          headers,
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch the news.");
        }

        const data = await response.json();

        // Sort articles by date in descending order (latest first)
        const sortedData = data.records
          .sort(
            (a: NewsBlogsData, b: NewsBlogsData) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 5); // Get the latest 4 articles after sorting

        setNews(sortedData || []);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Error fetching news details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Empty dependency array ensures the effect runs once

  return (
    <section className="flex flex-col py-6 md:py-8">
      <h1 className="font-bold text-2xl uppercase">News and Updates</h1>
      <div className="flex justify-between flex-wrap gap-4">
        <p className="text-sm text-default-500 max-w-md">
          Get to know the latest news and updates about DMCI Homes.
        </p>
        <Button
          isLoading={buttonLoading}
          className="bg-green-600 text-white text-sm uppercase px-2 rounded-xl hover:bg-green-800"
          variant="solid"
          onPress={() => {
            setButtonLoading(true);
            router.push(`/articles-news`);
          }}
        >
          see all news{" "}
          <MdArrowOutward
            className="bg-green-300 text-green-700 rounded-full shadow-lg"
            size={24}
          />
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12 h-96">
          <Spinner size="lg" label="Loading News..." />
        </div>
      ) : news && news.length > 0 ? (
        <NewsBlogs articles={news} />
      ) : (
        <p className="text-center text-red-500 py-12">No news available.</p>
      )}
    </section>
  );
};

export default HomeNews;
