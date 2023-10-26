// COMPONENTS
import Header from "@/components/Header";
import Title from "@/components/Header/Title";
import Description from "@/components/Header/Description";
import ImageWithFallback from "@/components/ImageWithFallback";
import Tag from "@/components/CourseCard/Tag";
// LIBARIRES
import { allBlogs } from "@/.contentlayer/generated";
import { compareDesc, parse, parseISO } from "date-fns";
import { format } from "date-fns/fp";

export default async function BlogPage() {
  const blogs = allBlogs.sort((a, b) => (
    compareDesc(new Date(a.date), new Date(b.date))
  ))

  return (
    <>
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title 
            title="All Blogs"
            className="capitalize"
          />
        }
        headerDescription={
          <Description
            description="What's on our mind currently"
            className="capitilize"
          />
        }
      />
      <section className="grid grid-cols-[1fr] gap-4 justify-center">
        {blogs.map((blog, index) => (
          <div key={index} className="bg-primary-white mx-auto max-w-2xl border-[5px] border-solid border-primary-black rounded-[12px] lg:mx-0 lg:flex lg:max-w-none">
            <div className="p-8 sm:p-10 lg:flex-auto flex flex-col justify-center items-start">
              <div className="flex justify-start items-center gap-4">
                {blog?.tags?.map((tag, index) => (
                  <Tag 
                    key={tag} 
                    tag={'# ' + tag}
                    className="bg-primary-black rounded-[6px] border-[6px] border-solid border-primary-black"
                  /> 
                ))}
                {blog?.date && (
                  <Tag
                  tag={format('dd-MMMM-yyyy', parseISO(blog.date)).split('-').join(' ')}
                    className="bg-primary-white border-[6px] border-solid border-primary-black rounded-[6px] text-primary-black"
                  />
                )}
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-gray-900">{blog.title}</h3>
              <p className="mt-6 text-base leading-7 text-gray-600">{blog.description}</p>
            </div>
            <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
              <div className="rounded-2xl bg-primary-green-light py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
                <div className="mx-auto max-w-xs px-8">
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
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
}