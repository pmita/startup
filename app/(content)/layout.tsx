export default function ContentPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="container flex flex-col justify-center items-stretch gap-10 p-10">
      {children}
    </section>
  );
}