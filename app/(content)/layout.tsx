export default function ContentLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="container flex flex-col justify-center items-stretch">
      {children}
    </section>
  );
}