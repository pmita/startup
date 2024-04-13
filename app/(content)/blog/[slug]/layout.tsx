// COMPONENTS
import { Banner, bannerVariants, BannerHeader, BannerFooter } from "@/components/ui/banner";
import { Title, titleVariants } from '@/components/ui/title';
import { tagVariants, Tag } from "@/components/ui/tag";
import { Header } from "@/components/ui/header";
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
      <Banner className={cn(bannerVariants({  variant: "center", size: "half", className: "flex-col items-stretch bg-primary rounded-[6px]"}))}>
        <BannerHeader className="flex flex-col justify-start items-start gap-5 max-w-[350px] sm:max-w-[600px]">    
          <Header
              className="flex flex-col justify-start items-start gap-6"
              headerTitle={
                <Title 
                  title={blog?.title ?? "Iconing Title"}
                  className={cn(titleVariants({
                    variant: "neutral",
                    size: "lg",
                    className: "capitalize"
                  }))}
                />
              }
            />
        </BannerHeader> 
        <BannerFooter className="flex-row justify-start items-start gap-2.5">
          {blog?.tags?.map(({ title, variant}) => (
              <Tag 
                key={title} 
                tag={'# ' + title}
                className={cn(tagVariants({ variant }))}
              /> 
            ))}
            {blog?.date && (
              <Tag
                tag={format('dd-MMMM-yyyy', parseISO(blog.date)).split('-').join(' ')}
                className={cn(tagVariants({ variant: "secondaryOutlined" }))}
              />
            )}
        </BannerFooter>
      </ Banner>
      {children}
    </>
  );
}