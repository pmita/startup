// COMPONENTS
import { ContainerLayout } from "@/layouts/container";

export default function ContentPagesLayout({ children }: { children: React.ReactNode }) {
  return (
    <ContainerLayout>
      {children}
    </ContainerLayout>
  );
}