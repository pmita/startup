// NEXT
import { type Metadata } from "next";
import Link from "next/link";
// COMPONENTS
import Banner from "@/components/Banner";
import Header from "@/components/Header";
import Title, { titleVariants } from "@/components/ui/Title";
import Description, { descriptionVariants } from "@/components/ui/Description";
import ImageWithFallback from "@/components/ImageWithFallback";
// LIBARIRES
import { allBlogs } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";
import { format } from "date-fns/fp";
import { tagVariants, Tag } from "@/components/ui/Tag";
// UTILS
import { cn } from "@/utils/helpers";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || 'https://example.com/blog'),
  title: 'Blog',
  description: 'Insights about coding, entrepreneurship, tools, and the in-betweens'
}

export default async function BlogPage() {
  const blogs = allBlogs.sort((a, b) => (
    compareDesc(new Date(a.date), new Date(b.date))
  ))

  return (
    <>
      <Banner
        className="rounded-[12px] min-h-[505px] w-full bg-primary-black text-primary-white flex flex-col justify-center items-start gap-10 p-10"
        bannerTitle={(
          <h3 className="text-2xl font-bold tracking-tight text-primary-white">👋 Hello</h3>
        )}
        bannerDescription={
          <Title 
            title="Insights about coding, entrepreneurship, tools, and the in-betweens"
            className={cn(titleVariants({
              variant: "neutral",
              size: "lg",
            }))}
          />
        }
      />
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title 
            title="All Blog Articles"
            className={cn(titleVariants({
              variant: "secondary",
              size: "lg",
              className: "capitalize"
            }))}
          />
        }
        headerDescription={
          <Description
            description="What's on our mind currently"
            className={cn(descriptionVariants({
              variant: "neutral",
              size: "lg"
            }))}
          />
        }
      />
      <section className="grid grid-cols-[1fr] grid-auto-rows gap-4 justify-center">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-primary-white mx-auto max-w-2xl lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto flex flex-col justify-center items-start gap-4">
              <div className="flex justify-start items-center gap-2">
                {blog?.tags?.map(({ title, variant}) => (
                  <Tag 
                    key={title} 
                    tag={'# ' + title}
                    className={cn(tagVariants({ variant, size: 'lg' }))}
                  /> 
                ))}
                {blog?.date && (
                  <Tag
                    tag={format('dd-MMMM-yyyy', parseISO(blog.date)).split('-').join(' ')}
                    className={cn(tagVariants({ variant: 'secondaryOutlined', size: 'lg' }))}
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">{blog.title}</h3>
              <p className="text-base leading-7 text-primary-black">{blog.description}</p>
            </div>
            <div className="flex justify-center items-center rounded-2xl bg-primary-green-light">
              <Link href={`/${blog?._raw.flattenedPath}`}>
                <ImageWithFallback
                  src={'/images/hacker.png'}
                  fallbackSrc="/images/hacker.png"
                  width={0}
                  height={0}
                  sizes="100vw"
                  style={{ width: "100%", height: "100%" }}
                  objectFit="cover"
                  altText={blog?.title || ''}
                />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}