import IntroSearch from "./ui/IntroSearch";

export default function Home({
  searchParams,
}: {
  searchParams: { term?: string };
}) {
  return <IntroSearch searchParams={searchParams} />;
}
