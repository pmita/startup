// COMPONENTS
import AuthCheck from "../AuthCheck"


export default function CheckProgress({ checkIsCompleted }: { chapterSlug?: string, checkIsCompleted?: boolean }) {
  return (
      <AuthCheck
      fallback={(
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
      )}
    >
      {checkIsCompleted ? (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-green"></div>
      ) : (
        <div className="w-[20px] h-[20px] rounded-[50%] bg-primary-black opacity-75"></div>
      )}
        
    </AuthCheck>
  )
}