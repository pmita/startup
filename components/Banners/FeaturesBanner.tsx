// COMPONENTS
import Header from "../Header";
import Title from "../Header/Title";
import Description from "../Header/Description";
import InfoCard from "../InfoCard";
// UTILS
import { features } from "@/lib/features";


export default async function FeaturesBanner() {
  return (
    <section className="container flex flex-col justify-start items-stretch gap-16 h-[100vh]">
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title 
            title="Features"
            className="capitalize"
          />
        }
        headerDescription={
          <Description
            description="Learn the latest web development trends with feature based project. We cover everything from authentication, UI/UX, database configuration, and many more"
            className="capitilize"
          />
        }
      />
      

      <section className="grid grid-cols-[repeat(auto-fill,minmax(240px,300px))] auto-rows-[185px] gap-8 mx-0 my-4 p-4 justify-center">
        {features.map((feature) => (
          <div key={feature.id} className="w-full border-[5px] border-solid border-primary-black columnCenterLeft gap-1 rounded-[12px] bg-primary-white p-4 py-2">
            <InfoCard 
              icon={true}
              title={feature?.title}
              description={feature?.description}
            />
          </div>
        ))}
      </section>
    </section>
  )
}