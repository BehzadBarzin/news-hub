import { useArticles } from "../api/queries/articleQueries";

function HomePage() {
  const { data, isLoading, isError } = useArticles({
    title: "NASA,Trump",
  });

  if (isLoading) {
    return <h1 className="text-4xl font-bold">Loading...</h1>;
  }

  if (isError) {
    return (
      <h1 className="text-4xl font-bold text-red-500">Something Went Wrong</h1>
    );
  }

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default HomePage;
