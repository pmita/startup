import Tag from '@/components/CourseCard/Tag'
import './style.css'


export default async function TestPage() {
  return (
    <section className="container flex flex-col justify-center items-stretch gap-10 p-10">
      <h1 className="text-center">Testing Grid Formation</h1>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(265px,265px))] auto-rows-[380px] gap-8 mx-0 my-4 p-4 justify-center">
        <div className="box">
          <div className="box-top"></div>
          <div className="box-bottom flex flex-col justify-start items-start gap-2.5 p-2.5">
            <div className="flex justify-start items-center gap-1">
              <Tag tag="MaxCharact" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
              <Tag tag="MaxCharact" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
            </div>
            <h3 className="font-poppins font-bold font-size text-base">React Fundamentals</h3>
            <p className="font-roboto text-sm">All the essentials in a tight packed project. Checking how many chars</p>
          </div>
        </div>
        <div className="box">
          <div className="box-top"></div>
          <div className="box-bottom flex flex-col justify-start items-start gap-2.5 p-2.5">
            <div className="flex justify-start items-center gap-1">
              <Tag tag="# React" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
              <Tag tag="# React" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
              <Tag tag="# React" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
            </div>
            <h3 className="font-poppins font-bold font-size text-base">React Fundamentals</h3>
            <p className="font-roboto text-sm">All the essentials in a tight packed project. Checking how many chars</p>
          </div>
        </div>
        <div className="box">
          <div className="box-top"></div>
          <div className="box-bottom flex flex-col justify-start items-start gap-2.5 p-2.5">
            <div className="flex justify-start items-center gap-1">
              <Tag tag="How many characters you c" className="bg-primary-green rounded-[6px] border-[2px] border-solid border-primary-green text-primary-white" />
            </div>
            <h3 className="font-poppins font-bold font-size text-base">React Fundamentals</h3>
            <p className="font-roboto text-sm">All the essentials in a tight packed project. Checking how many chars</p>
          </div>
        </div>
        <div className="box">
          <div className="box-top"></div>
          <div className="box-bottom flex flex-col justify-start items-start gap-2.5 p-2.5">
            <h3 className="font-poppins font-bold font-size text-base">React Fundamentals Title Go</h3>
            <p className="font-roboto text-sm">All the essentials in a tight packed project. Checking how many chars</p>
          </div>
        </div>
      </div>
    </section>
  )
}