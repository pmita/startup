// COMPONENTS
import Banner from "@/components/Banner";
import Title, { titleVariants } from "@/components/ui/Title";
import Description from "@/components/Header/Description";
import LandingBanner from "@/components/Banners/LandingBanner";
import Header from "@/components/Header";
import InfoCard from "@/components/InfoCard";
// CONFIG
import { features } from "@/config/features";
// UTILS
import { cn } from "@/utils/helpers";

export default async function Home() {
  return (
    <div>
      <LandingBanner />
      {/* Not Ready Yet, Need to troubleshoot animation in the background */}
      {/* <Banner 
        bannerTitle={
          <Header
            className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center flex flex-col justify-center items-center gap-6"
            headerTitle={
              <Title 
                title="Data to enrich your online business"
                className="capitalize"
              />
            }
            headerDescription={
            <Description
              description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua"
              className="capitilize"
            />
          }
          />
        }
        bannerDescription={
          <div className="mt-10 flex items-center justify-center gap-x-6">
          <button className={cn("button", "primaryButton")}>
            <Link href={'/pro'}>
              Get Started
            </Link>
          </button>
          <button className={cn("button", "secondaryButton")}>
            <Link href={'/courses'}>
              Learn More
            </Link>
          </button>
        </div>
        }
      /> */}
      <Banner 
        className="container flex flex-col justify-start items-stretch gap-16 h-[100vh]"
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
                className="capitilize"
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
