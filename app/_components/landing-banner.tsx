// COMPONENTS
import { Header } from "@/components/ui/header";
import { Title, titleVariants } from '@/components/ui/title';
import { Description, descriptionVariants } from "@/components/ui/description";
import { CylinderSVG } from '../../components/SVGs';
import Link from 'next/link';
import { buttonVariants } from '../../components/ui/button';
// UTILS
import { cn } from '@/utils/helpers';

export default async function LandingBanner() {
  return(
    <div className="container min-h-[90vh] flex justify-center items-center">
      <div className="relative isolate px-4 pt-14 lg:px-6">
        <div className="absolute -rotate-45 bottom-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:bottom-10 -left-70 origin-bottom-left animate-rotateRight">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>
        <div className="absolute -rotate-20 -top-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 left-20 origin-bottom-right animate-rotateLeft">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>
        <div className="absolute -top-10 rotate-20 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 -right-20 origin-top-right animate-rotateLeft">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>

        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <Header
              className="flex flex-col justify-center items-center gap-6"
              headerTitle={
                <Title 
                  title="Data to enrich your online business"
                  className={cn(titleVariants({
                    variant: "secondary",
                    size: "xl",
                    className: "capitalize"
                  }))}
                />
              }
              headerDescription={
                <Description
                  description="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua"
                  className={cn(descriptionVariants({
                    variant: "secondary",
                    size: "default"
                  }))}
                />
              }
            />
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link 
                href="/pro"
                className={cn(buttonVariants({ variant: "primary" }))}
              >
                Get Started
              </Link>
              <Link 
                href="/courses"
                className={cn(buttonVariants({ variant: "primaryOutlined" }))}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}