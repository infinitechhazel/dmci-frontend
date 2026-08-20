"use client";

import { Card, CardBody, Image, Link } from "@heroui/react";

interface NewsBlogsData {
  id: string;
  headline: string;
  image: string;
  content: string;
  date: string;
}

interface NewsBlogsDataProps {
  articles: NewsBlogsData[];
}

const NewsBlogs: React.FC<NewsBlogsDataProps> = ({ articles }) => {
  const defaultImage =
    "https://www.dmcihomes.com/uploads/media/executives-1563253639282.jpg";

  const sortedArticles = [...articles].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="grid grid-cols-1 gap-4 py-4 md:grid-cols-3 md:gap-2 lg:grid-cols-5">
      {sortedArticles.map((newsItem, index) => {
        const formattedDate = new Date(newsItem.date).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        return (
          <Link key={index} href={`view/articles?id=${newsItem.id}`}>
            <Card
              className="flex h-full flex-col"
              style={{
                backgroundColor: "#FFFFFF",
                borderColor: "#373A36",
              }}
            >
              <CardBody className="flex h-full flex-col overflow-visible px-1 py-1">
                <div className="mb-4 overflow-hidden rounded-lg">
                  <Image
                    isZoomed
                    alt="Card background"
                    className="aspect-w-16 min-h-32 w-full rounded-xl object-cover md:h-48"
                    src={
                      newsItem.image
                        ? `${process.env.NEXT_PUBLIC_API_URL}/articles/${newsItem.image}`
                        : defaultImage
                    }
                    width={1000}
                  />
                </div>

                <div className="flex flex-1 flex-col justify-between px-2 py-4">
                  <h4
                    className="line-clamp-1 text-sm font-bold uppercase md:text-lg"
                    style={{ color: "#373A36" }}
                  >
                    {newsItem.headline}
                  </h4>

                  <small
                    className="line-clamp-3 leading-4 md:line-clamp-3"
                    style={{
                      color: "#373A36",
                      opacity: 0.65,
                    }}
                  >
                    {newsItem.content}
                  </small>

                  <p
                    className="pt-2 text-tiny font-bold uppercase"
                    style={{ color: "#9B0D15" }}
                  >
                    {formattedDate}
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};

export default NewsBlogs;