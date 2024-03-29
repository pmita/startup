// COMPONENTS
import { Banner, bannerVariants } from "@/components/ui/banner";
import { Title, titleVariants } from '@/components/ui/title';
import { tagVariants, Tag } from "@/components/ui/tag";
// LIBRARIES
import { allBlogs } from "@/.contentlayer/generated";
import { parseISO } from "date-fns";
import { format } from "date-fns/fp";
// UTILS
import { cn } from "@/utils/helpers";

interface BlogPageLayoutProps {
  children: React.ReactNode;
  params : {
    slug: string;
  }
}

export default function BlogPageLayout({ children, params }: BlogPageLayoutProps) {
  const blog = allBlogs.find((blog) => blog?.slugAsParams === params.slug);

  return (
    <>
      <Banner
      className={cn(bannerVariants({
        className: "rounded-[12px] min-h-[505px] w-full bg-primary-black text-primary-white flex flex-col justify-center items-start gap-10 p-10"
      }))}
        tags={
          <div className="flex justify-start items-center gap-1">
          {blog?.tags?.map(({ title, variant}) => (
            <Tag 
              key={title} 
              tag={'# ' + title}
              className={cn(tagVariants({ variant, className:"bg-primary rounded-[6px] border-[6px] border-solid border-primary text-neutral" }))}
            /> 
          ))}
          {blog?.date && (
            <Tag
              tag={format('dd-MMMM-yyyy', parseISO(blog.date)).split('-').join(' ')}
              className={cn(tagVariants({ className:"bg-secondary rounded-[6px] border-[6px] border-solid border-neutral text-neutral" }))}
            />
          )}
        </div>
        }
        bannerDescription={
          <Title 
            title={blog?.title ?? "Iconing Title"}
            className={cn(titleVariants({
              variant: "primary",
              size: "lg",
              className: "capitalize"
            }))}
          />
        }
      />
      {children}
    </>
  );
}