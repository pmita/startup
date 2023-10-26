export const revalidate = 1200;

// NEXT
import { notFound } from 'next/navigation';
// COMPONENTS
import { Mdx } from '@/components/MDX';
// LIBRARIES
import { allBlogs } from 'contentlayer/generated'

interface BlogPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: any) {
  const slug = params?.slug;
  const blog = allBlogs.find((blog) => blog.slugAsParams === slug)

  if(!blog) return null;

  return blog;
} 

export async function generateStaticParams(): Promise<BlogPageProps["params"][]> {
  return allBlogs.map((blog) => ({
    slug: blog.slugAsParams,
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
        <Mdx code={blog.body.code} />
      </div>
    </article>
  )
}

export default BlogPage;
