// COMPONENTS
import Header from "@/components/Header"
import Title from "@/components/Header/Title"
import Description from "@/components/Header/Description"
import { SubscribeButton } from "@/components/Buttons"
// LIB
import { pricing } from "@/config/pricing"

export default async function ProMembersPage() {
  return (
    <div className='container flex flex-col justify-center items-stretch gap-16'>
      <Header
        className="flex flex-col justify-center items-center gap-6"
        headerTitle={
          <Title 
            title="Become a Pro Member"
            className="capitalize"
          />
        }
        headerDescription={
          <Description
            description="Learn the essential skills for modern FullStack web and app development"
            className="capitilize"
          />
        }
      />

      <section className="grid grid-cols-[1fr] gap-4 justify-center">
        {pricing.length && pricing.map((price) => (
          <div className="bg-white" key={price.id}>
            <div className="mx-auto max-w-7xl">
              <div className="mx-auto max-w-2xl border-[5px] border-solid border-primary-black rounded-[12px] lg:mx-0 lg:flex lg:max-w-none">
                <div className="p-8 sm:p-10 lg:flex-auto">
                  <h3 className="text-2xl font-bold tracking-tight text-gray-900">{price.title}</h3>
                  <p className="mt-6 text-base leading-7 text-gray-600">{price.description}</p>
                  <div className="mt-10 flex items-center gap-x-4">
                    <h4 className="flex-none text-sm font-semibold leading-6 text-primary-black">What’s included</h4>
                    <div className="h-px flex-auto bg-gray-100"></div>
                  </div>
                  <ul role="list" className="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6">
                      {price.bonuses?.length && price.bonuses?.map((bonus) => (
                      <li className="flex gap-x-3" key={bonus}>
                        <svg className="h-6 w-5 flex-none text-indigo-600" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clip-rule="evenodd" />
                        </svg>
                        {bonus}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
                  <div className="rounded-[8px] bg-primary-green-light py-10 text-center lg:flex lg:flex-col lg:justify-center lg:py-16">
                    <div className="mx-auto max-w-xs px-8">
                      <p className="text-base font-semibold text-gray-600">{price.sellingPoint}</p>
                      <p className="mt-6 flex items-baseline justify-center gap-x-2">
                        <span className="text-5xl font-bold tracking-tight text-gray-900">${price.price}</span>
                        <span className="text-sm font-semibold leading-6 tracking-wide text-gray-600">{price.frequency}</span>
                      </p>
                      <SubscribeButton 
                        className="mt-10 w-full bg-primary-black px-3 py-2 text-center text-sm font-semibold text-white border-primary-black shadow-sm hover:bg-indigo-500 hover:border-indigo-500 hover:text-primary-white"
                        stripeProduct={{ quantity: 1, price: price.stripePriceId }}
                        purchaseType={price.purchaseType}
                      >
                        Buy Now
                      </SubscribeButton>
                      <p className="mt-6 text-xs leading-5 text-gray-600">Invoices and receipts available for easy company reimbursement</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}
