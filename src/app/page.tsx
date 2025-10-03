import Footer from "./footer";
import IntroSearch from "./ui/IntroSearch";
import LandingUi from "./ui/landingui";

type PageProps = {
  searchParams?: {
    term?: string;
  };
};

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      <LandingUi />
      <IntroSearch searchParams={searchParams ?? {}} />
      <Footer />
    </>
  );
}
