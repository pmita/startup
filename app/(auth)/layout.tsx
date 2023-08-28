
interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({children}: AuthLayoutProps) {
  return (
    <section className="flex flex-col min-h-[90vh]">
      <main className="flex-1">
        {children}
      </main>
    </section>
  );
}