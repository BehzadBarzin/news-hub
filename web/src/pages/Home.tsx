import ArticleCard from "../components/ArticleCard";
import AuthorFilter from "../components/AuthorFilter";
import CategoryFilter from "../components/CategoryFilter";
import DateFilter from "../components/DateFilter";
import KeywordFilter from "../components/KeywordFilter";
import SourceFilter from "../components/SourceFilter";

function HomePage() {
  return (
    <div className="w-full, h-full flex flex-col gap-10 items-center justify-center">
      <ArticleCard />
      <DateFilter
        label="Published After"
        initial={new Date()}
        onSelect={(selected: Date | null) => {
          console.log(selected);
        }}
      />
      <KeywordFilter
        initialItems={["Hello"]}
        onSelect={(selected: string[]) => {
          // console.log(selected);
        }}
      />
      <CategoryFilter
        initialItems={[1]}
        onSelect={(selected: number[]) => {
          // console.log(selected);
        }}
      />
      <AuthorFilter
        initialItems={[1]}
        onSelect={(selected: number[]) => {
          // console.log(selected);
        }}
      />
      <SourceFilter
        initialItems={[1]}
        onSelect={(selected: number[]) => {
          // console.log(selected);
        }}
      />
    </div>
  );
}

export default HomePage;
