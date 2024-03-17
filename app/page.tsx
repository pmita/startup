// COMPONENTS
import { Banner, bannerVariants } from "@/components/ui/banner";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
import LandingBanner from "./_components/landing-banner";
import { Header } from "@/components/ui/header";
import { InfoCard } from "@/components/info-card";
// CONFIG
import { features } from "@/config/features";
// UTILS
import { cn } from "@/utils/helpers";

export default async function Home() {
  return (
    <div>
      <LandingBanner />
      <Banner 
        className={cn(bannerVariants({
          variant: "fullHeight",
          size: "default",
          className: "container flex flex-col justify-start items-stretch gap-16"
        }))}
        bannerTitle={
          <Header
            className="flex flex-col justify-center items-center gap-6"
            headerTitle={
              <Title 
                title="Features"
                className={cn(titleVariants({ 
                  variant: "secondary", 
                  size: "lg",
                  className: "capitalize" 
                }))}
              />
            }
            headerDescription={
              <Description
                description="Learn the latest web development trends with feature based project. We cover everything from authentication, UI/UX, database configuration, and many more"
                className={cn(descriptionVariants({
                  variant: "secondary",
                  size: "default"
                }))}
              />
            }
          />
        }
        bannerDescription={
          <section className="grid grid-cols-[repeat(auto-fit,minmax(240px,300px))] auto-rows-[185px] gap-8 mx-0 my-4 p-4 justify-center">
            {features.map((feature) => (
              <div key={feature.id} className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-2.5">
                <InfoCard 
                  title={feature?.title}
                  description={feature?.description}
                />
              </div>
            ))}
          </section>
        }
      />
    </div>
  )
}
