import { Link } from "react-router-dom";
import { useFeeds } from "../api/queries/feedQueries";
import { Feed } from "../api/types";
import FeedCard from "../components/FeedCard";

const PersonalFeeds = () => {
  // Fetch articles based on filters
  const { data: feedsData, isLoading } = useFeeds();

  // If user has not feeds
  if (!isLoading && (!feedsData || !feedsData.length)) {
    return (
      <div className="w-full h-[90vh] flex items-center justify-center">
        <div role="alert" className="alert alert-warning alert-soft">
          <span>
            No personal feed created yet! Go to{" "}
            <Link to={"/headlines"} className="font-bold italic text-primary">
              Headlines
            </Link>{" "}
            and create one.
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="m-5 mb-0">
      <div role="alert" className="alert alert-info alert-soft">
        <span>
          Go to{" "}
          <Link to={"/headlines"} className="font-bold italic text-primary">
            Headlines
          </Link>{" "}
          to create a new feed.
        </span>
      </div>

      <div className="divider"></div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(15)].map((_, index) => (
            <div key={index} className="skeleton h-48 w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedsData?.map((feed: Feed) => (
            <FeedCard key={feed.id} feed={feed} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonalFeeds;
