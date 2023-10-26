// COMPONENTS
import Banner from "@/components/Banner";
import Title from "@/components/Header/Title";

export default function BlogPageLayout({ children }: { children: React.ReactNode}) {
  return (
    <section className="container flex flex-col justify-center items-stretch gap-10 p-10">
      <Banner
        className="rounded-[12px] min-h-[505px] w-full bg-primary-black text-primary-white flex flex-col justify-center items-start gap-10 p-10"
        bannerTitle={<h4>👋 Hello</h4>}
        bannerDescription={
          <Title 
            title="Insights about coding, entrepreneurship, tools, and the in-betweens"
            className="capitalize"
          />
        }
      />
      {children}
    </section>
  );
}