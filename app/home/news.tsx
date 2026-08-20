"use client"

import Link from "next/link"
import { MdArrowOutward } from "react-icons/md"
import { Button } from "@heroui/button"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuthHeaders } from "../auth"

import NewsBlogs from "@/components/property/news"
import { Spinner } from "@heroui/react"

interface NewsBlogsData {
  id: string
  headline: string
  image: string
  content: string
  date: string
}

const HomeNews = () => {
  const [news, setNews] = useState<NewsBlogsData[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [buttonLoading, setButtonLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchNews = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000"

      const headers = getAuthHeaders()

      try {
        const response = await fetch(`${apiUrl}/api/user/articles`, {
          method: "GET",
          headers,
          cache: "no-store",
        })

        if (!response.ok) {
          throw new Error("Failed to fetch the news.")
        }

        const data = await response.json()

        const sortedData = data.records
          .sort(
            (a: NewsBlogsData, b: NewsBlogsData) =>
              new Date(b.date).getTime() - new Date(a.date).getTime(),
          )
          .slice(0, 5)

        setNews(sortedData || [])
      } catch (err) {
        console.error("Error fetching news:", err)
        setError("Error fetching news details. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  return (
    <section className="flex flex-col py-6 md:py-8">
      <h1 className="text-2xl font-bold uppercase" style={{ color: "#373A36" }}>
        News and Updates
      </h1>

      <div className="flex flex-wrap justify-between gap-4">
        <p
          className="max-w-md text-sm"
          style={{ color: "#373A36", opacity: 0.65 }}
        >
          Get to know the latest news and updates about DMCI Homes.
        </p>

        <Button
          isLoading={buttonLoading}
          variant="solid"
          onPress={() => {
            setButtonLoading(true)
            router.push("/articles-news")
          }}
          className="rounded-xl px-2 text-sm uppercase"
          style={{
            backgroundColor: "#9B0D15",
            color: "#FFFFFF",
          }}
        >
          see all news
          <MdArrowOutward
            size={24}
            className="rounded-full shadow-lg"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#9B0D15",
            }}
          />
        </Button>
      </div>

      {loading ? (
        <div className="flex h-96 justify-center py-12">
          <Spinner size="lg" label="Loading News..." color="danger" />
        </div>
      ) : news && news.length > 0 ? (
        <NewsBlogs articles={news} />
      ) : (
        <p className="py-12 text-center" style={{ color: "#9B0D15" }}>
          No news available.
        </p>
      )}
    </section>
  )
}

export default HomeNews
