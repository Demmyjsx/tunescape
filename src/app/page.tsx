import IntroSearch from "./ui/IntroSearch";
import LandingUi from "./ui/landingui";

export default function Home({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  return (
    <>
      <LandingUi />
      <IntroSearch searchParams={searchParams} />
    </>
  );
}
