// NEXT
import Image from "next/image";
import Link from "next/link";
// COMPONENTS
import { Banner, BannerHeader, BannerFooter, bannerVariants } from "@/components/ui/bannerz";
import { buttonVariants } from "@/components/ui/button";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
// import LandingBanner from "./_components/landing-banner";
import { Header } from "@/components/ui/header";
import { FeaturesBanner } from "./_components/features-banner";
// UTILS
import { cn } from "@/utils/helpers";

export default async function Home() {
  return (
    <div className="px-2 pt-2 w-full">
      {/* <LandingBanner /> */}
      <Banner className={cn(bannerVariants({ variant: "center", className: "flex-col bg-primary rounded-[6px] relative p-10 overflow-hidden min-h-[90dvh]"}))}>
      <BannerHeader className="text-center max-w-[350px] sm:max-w-[600px] pt-12">
      <Header
              className="flex flex-col justify-center items-center gap-6"
              headerTitle={
                <Title 
                  title="Data to enrich your online business"
                  className={cn(titleVariants({
                    variant: "neutral",
                    size: "xl",
                    className: "capitalize"
                  }))}
                />
              }
              headerDescription={
                <Description
                  description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua"
                  className={cn(descriptionVariants({
                    variant: "neutral",
                    size: "default"
                  }))}
                />
              }
            />
        </BannerHeader>        
        <BannerFooter className="text-center text-secondary gap-5">
          <Link 
            href="/pro"
            className={cn(buttonVariants({ variant: "primaryOutlined", size: "lg", className: "border-solid border-neutral" }))}
          >
            Get in touch
          </Link>
          <Link 
            href="/courses"
            className={cn(buttonVariants({ variant: "primary", size: "lg", className: "border-solid border-neutral" }))}
          >
            Our work
          </Link>
        </BannerFooter>
        {/* <Image
          className="absolute bottom-[-25%] left-50 z-0"
          src={"/images/banner-img.png"}
          width={1000}
          height={1000}
          alt={"banner image"}
        /> */}
      </Banner>
      <FeaturesBanner />
    </div>
  )
}
