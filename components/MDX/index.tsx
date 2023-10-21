
// LIBRARIES
import { useMDXComponent } from "next-contentlayer/hooks";
// LIB
import { cn } from "@/lib/util";

const components = {
  h1: ({ className, ...props}: { className?: string}) => (
    <h1
      className={cn(
        "mt-2 scroll-m-20 text-4xl font-poppins font-bold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h2: ({ className, ...props}: { className?: string}) => (
    <h2
      className={cn(
        "mt-8 scroll-m-20 text-3xl font-poppins font-semibold tracking-tight first:mt-0",
        className
      )}
      {...props}
    />
  ),
  h3: ({ className, ...props}: { className?: string}) => (
    <h3
      className={cn(
        "mt-8 scroll-m-20 text-42l font-roboto font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h4: ({ className, ...props}: { className?: string}) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-roboto font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props}: { className?: string}) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-roboto font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props}: { className?: string}) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-roboto font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props}: { className?: string}) => (
    <a
      className={cn(
        "font-medium underline underline-offset-4 text-blue-400",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props}: { className?: string}) => (
    <p
      className={cn(
        "leading-7 [&:not(:first-child)]:mt-6",
        className
      )}
      {...props}
    />
  ),
  code: ({ className, ...props }: { className?: string }) => (
    <code
      className={cn(
        "relative rounded border px-[0.3rem] py-[0.2rem] font-mono text-sm",
        className
      )}
      {...props}
    />
  )
}

interface MDXProps {
  code: string;
  className?: string;
}

export function Mdx({ code, className }: MDXProps) {
  const Component = useMDXComponent(code);

  return (
    <div className={cn(
        "flex flex-col justify-center items-center gap-4",
        className
      )}
    >
      <Component components={components} />
    </div>
  )
}