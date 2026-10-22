import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getStore } from "@/lib/content";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const store = await getStore();
  return (
    <>
      <Header store={store} />
      <main>{children}</main>
      <Footer store={store} />
    </>
  );
}
