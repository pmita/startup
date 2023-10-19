export default function ContentLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="flex flex-col items-center justify-center w-full max-w-4xl px-4 mx-auto">
      <h1>Welcome to Content Layout.tsx component</h1>
      {children}
    </section>
  );
}