export const revalidate = 1200;

import { notFound } from 'next/navigation';
// LIBRARIES
import { format, parseISO } from 'date-fns'
import { allBlogs } from 'contentlayer/generated'

interface BlogPageProps {
  params: {
    slug: string[]
  }
}

async function getPostFromParams(params: any) {
  const slug = params?.slug?.join('/');
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug)

  if(!blog) return null;

  return blog;
} 

export async function generateStaticParams(): Promise<BlogPageProps["params"][]> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams.split("/"),
  }))
}

export const generateMetadata = ({ params }: { params: { slug: string } }) => {
  const blog = allBlogs.find((blog) => blog.slugAsParams === params.slug)
  if (!blog) return {};

  return { 
    title: blog.title ,
    description: blog?.description,
  }
}

const BlogPage = async ({ params }: BlogPageProps) => {
  const blog = await getPostFromParams(params);
  if (!blog) notFound();

  return (
    <article className="mx-auto max-w-xl py-8">
      <div className="mb-8 text-center">
        <time dateTime={blog.date} className="mb-1 text-xs text-gray-600">
          {format(parseISO(blog.date), 'LLLL d, yyyy')}
        </time>
        <h1 className="text-3xl font-bold">{blog.title}</h1>
      </div>
    </article>
  )
}

export default BlogPage;
