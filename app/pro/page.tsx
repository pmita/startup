// COMPONENTS
import Header from "@/components/Header"
import InfoCard from "@/components/InfoCard"
// UTILS
import { pricing } from "@/lib/pricing"

export default async function ProMembersPage() {
  return (
    <div className='container flex flex-col justify-center items-stretch gap-16'>
      <Header 
        heading="Become a Pro Member" 
        subHeading="Learn the essential skills for modern FullStack web and app development "
        className="flex flex-col justify-center items-center gap-6"
      />

      <section className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] auto-rows-[350px] gap-8 mx-0 my-4 p-4 justify-center">
        {pricing.map((price) => (
          <div key={price.id} className="w-full border-[5px] border-solid border-primary-black columnTopLeft gap-5 rounded-[12px] bg-primary-white p-4 py-2">
            <InfoCard 
              title={price?.title}
              description={price?.description}
              price={price?.price}
              frequency={price?.frequency}
              sellingPoints={price?.sellingPoints}
            />
          </div>
        ))}
      </section>
    </div>
  )
}
