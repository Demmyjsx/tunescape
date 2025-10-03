import Footer from "./footer";
import IntroSearch from "./ui/IntroSearch";
import LandingUi from "./ui/landingui";

type SearchParams = {
  term?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams?: Promise<SearchParams>;
}) {
  // Await searchParams because it's a Promise in Next.js 15
  const params = (await searchParams) ?? {};

  return (
    <>
      <LandingUi />
      <IntroSearch searchParams={params} />
      <Footer />
    </>
  );
}
