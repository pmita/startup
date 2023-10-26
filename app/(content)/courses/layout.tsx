export default function CoursesPageLayout({ children, params }: { children: React.ReactNode, params: { slug: string, id: string }}) {
  console.log(params.slug);
  return (
    <section className="container flex flex-col justify-center items-stretch">
      {children}
    </section>
  );
}