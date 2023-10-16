interface HeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  heading: string;
  subHeading?: string;
}

export default async function Header({ heading, subHeading, className, ...props }: HeaderProps) {
  return (
    <>
      <div className={className} {...props}>
        <h1 className="text-6xl font-poppins font-bold capitilize">
          {heading}
        </h1>

        {subHeading && (
          <h3 className="text-l font-roboto font-normal">{subHeading}</h3>
        )}
      </div>
    </>
  )
}