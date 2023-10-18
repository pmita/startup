interface CourseLayoutProps {
  children: React.ReactNode
}

export default function CourseLayout({ children }: CourseLayoutProps) {
  return (
    <div>
      <h2>Course Layout</h2>
      {children}
    </div>
  )
};