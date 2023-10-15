"use client"

import Link from 'next/link'
// COMPONENTS
import { CylinderSVG } from '../SVGs';
import Header from '../Header';


export const LandingBanner = () => {
  return(
    <div className="min-h-[90vh] flex justify-center items-center">
      <div className="relative isolate px-4 pt-14 lg:px-6">

        {/* ----- Background SVGs ----- */}
        <div className="absolute -rotate-45 bottom-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:bottom-10 -left-70 origin-bottom-left animate-rotateRight">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>
        <div className="absolute -rotate-20 -top-10 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 left-20 origin-bottom-right animate-rotateLeft">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>
        <div className="absolute -top-10 rotate-20 -z-10 blur-2xl transform-gpu overflow-hidden sm:-top-10 -right-20 origin-top-right animate-rotateLeft">
          <CylinderSVG  width="288" height='428' fill="none"/>
        </div>

        {/* ----- CTA Banner ----- */}
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <Header 
              heading="Data to enrich your online business"
              subHeading="Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua."
              className="flex flex-col justify-center items-center gap-6"            
            />
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <button className="button">
                <Link href={'/pro'}>
                  Get Started
                </Link>
              </button>
              <button className="secondary-button">
                <Link href={'/classes'}>
                  Learn More
                </Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingBanner;