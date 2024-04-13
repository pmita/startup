// NEXT
import { type Metadata } from "next";
import Link from "next/link";
// COMPONENTS
import { Banner, BannerHeader, bannerVariants } from "@/components/ui/banner";
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
import { ImageWithFallback } from "@/components/image-with-fallback";
import { tagVariants, Tag } from "@/components/ui/tag";
// PACKAGES
import { allBlogs } from "@/.contentlayer/generated";
import { compareDesc, parseISO } from "date-fns";
import { format } from "date-fns/fp";
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
      <Banner className={cn(bannerVariants({  variant: "center", size: "threeQuarters", className: "flex-col bg-primary rounded-[6px]"}))}>
        <BannerHeader className="flex flex-col justify-start items-start gap-10 max-w-[350px] sm:max-w-[600px]">
          <h3 className="text-2xl font-bold tracking-tight text-primary-white">👋 Hello</h3>
          <Header
              className="flex flex-col justify-start items-start gap-6"
              headerTitle={
                <Title 
                  title="All Blog Articles"
                  className={cn(titleVariants({
                    variant: "neutral",
                    size: "xl",
                    className: "capitalize"
                  }))}
                />
              }
              headerDescription={
                <Description
                  description="Insights about coding, entrepreneurship, tools, and the in-betweens"
                  className={cn(descriptionVariants({
                    variant: "neutral",
                    size: "default"
                  }))}
                />
              }
            />
        </BannerHeader> 
      </ Banner>
      <section className="grid grid-cols-[1fr] grid-auto-rows gap-4 justify-center m-10">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-primary-white mx-auto max-w-2xl lg:mx-0 lg:flex lg:max-w-none border-[5px] border-solid border-primary-black rounded-[12px]">
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
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="flex justify-center items-center rounded-[8px] bg-primary-green-light">
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
          </div>
        ))}
      </section>
    </>
  );
}