// STYLES
import './style.css';

type CourseCardProps = {
  info?: React.ReactNode;
  image?: React.ReactNode;
}

export default async function CourseCard({
  info, image
}: CourseCardProps) {
  return (
    <div className="full columnTopCenter gap-4 shadow-xl bg-primary-blue rounded-[12px]">
        <div className="ImageContainer relative">
          {image}
          <span
            className="absolute right-[5%] top-[5%] bg-primary-black px-2 py-1 text-center font-bold text-primary-white">
            New
          </span>
        </div>
        
        
        <div className="CardDetails columnCenterLeft gap-1 transition-all duration-[0.3s] ease-[ease-in-out] px-4 py-2 rounded-b-[12px] bg-primary-white p-4">
          {info}
        </div>
    </div>
    )
}