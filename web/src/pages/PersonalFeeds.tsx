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
      <div className="bg-base-100 border border-base-300 collapse">
        <input type="checkbox" className="peer" />
        <div className="collapse-title bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          How do I create and edit a feed?
        </div>
        <div className="collapse-content bg-primary text-primary-content peer-checked:bg-secondary peer-checked:text-secondary-content">
          <ul className="list-disc pl-5">
            <li>
              Go to{" "}
              <Link
                to={"/headlines"}
                className="font-bold italic underline text-blue-800"
              >
                "Headlines"
              </Link>{" "}
              to Create a new feed by setting filtering criteria then clicking
              <span className="font-bold italic underline">"Save as Feed"</span>
              .
            </li>
            <li>
              Navigate to each feed's page by clicking{" "}
              <span className="font-bold italic underline">"View"</span> on its
              card to edit the feed criteria.
            </li>
          </ul>
        </div>
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
