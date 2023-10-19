export default function ContentLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="container flex flex-col justify-center items-stretch gap-16">
      <h1 className="text-center">Welcome to Content Layout.tsx component</h1>
      {children}
    </section>
  );
}