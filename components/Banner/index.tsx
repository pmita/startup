// UTILS
import { cn } from "@/utils/helpers/client";

type BannerProps = {
  className?: string;
  bannerTitle?: React.ReactNode;
  bannerTags?: React.ReactNode;
  bannerDescription?: React.ReactNode;
}

export default async function Banner({ className, bannerTitle, bannerTags, bannerDescription}: BannerProps) {
  return (
    <section 
      className={cn(
        "flex flex-col justify-center items-stretch",
        className

      )}
    >

      {bannerTitle && bannerTitle}
      {bannerTags && bannerTags}
      {bannerDescription && bannerDescription}
    </section>
  )
}