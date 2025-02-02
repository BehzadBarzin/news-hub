import { useDeleteFeed } from "../api/queries/feedQueries";
import { Feed } from "../api/types";
import { useAppContext } from "../context/AppContext";
import DeleteIcon from "./icons/DeleteIcon";
import ViewIcon from "./icons/ViewIcon";

function getFeedAsLink(feed: Feed): string {
  const queryParams: string[] = [];
  if (feed.keywords && feed.keywords?.length) {
    queryParams.push(`title=${feed.keywords.join(",")}`);
  }
  if (feed.categories && feed.categories?.length) {
    queryParams.push(
      `category=${feed.categories.map((el) => el.id).join(",")}`
    );
  }
  if (feed.authors && feed.authors?.length) {
    queryParams.push(`authors=${feed.authors.map((el) => el.id).join(",")}`);
  }
  if (feed.sources && feed.sources?.length) {
    queryParams.push(`source=${feed.sources.map((el) => el.id).join(",")}`);
  }

  return `/headlines?feedId=${feed.id}&${queryParams.join("&")}`;
}

const FeedCard = ({ feed }: { feed: Feed }) => {
  const { showLoading, hideLoading, showToast } = useAppContext();
  const { mutate: deleteFeed } = useDeleteFeed(feed.id!, {
    onMutate: () => showLoading(),
    onSettled: () => hideLoading(),
    onSuccess: () => showToast("Feed removed successfully!", "success"),
    onError: (error) =>
      showToast(error?.message || "Failed to remove feed", "error"),
  });

  return (
    <div className="card bg-base-300 shadow-sm hover-shadow">
      <div className="card-body">
        <h2 className="card-title font-black text-3xl">{feed.name}</h2>

        {feed.keywords?.length !== 0 && (
          <div>
            <h6 className="font-bold text-md">Title Keywords:</h6>
            <div className="flex gap-1 justify-start items-center">
              {feed.keywords?.map((kw, idx) => (
                <p key={idx} className="badge badge-warning flex-grow-0">
                  {kw}
                </p>
              ))}
            </div>
          </div>
        )}

        {feed.authors?.length !== 0 && (
          <div>
            <h6 className="font-bold text-md">Authors:</h6>
            <div className="flex gap-1 justify-start items-center">
              {feed.authors?.map((author) => (
                <p
                  key={author.id}
                  className="badge badge-secondary flex-grow-0"
                >
                  {author.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {feed.sources?.length !== 0 && (
          <div>
            <h6 className="font-bold text-md">Sources:</h6>
            <div className="flex gap-1 justify-start items-center">
              {feed.sources?.map((source) => (
                <p key={source.id} className="badge badge-accent flex-grow-0">
                  {source.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {feed.categories?.length !== 0 && (
          <div>
            <h6 className="font-bold text-md">Categories:</h6>
            <div className="flex gap-1 justify-start items-center">
              {feed.categories?.map((category) => (
                <p
                  key={category.id}
                  className="badge badge-primary flex-grow-0"
                >
                  {category.name}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Take remaining space */}
        <div className="h-[100%]"></div>

        <div className="divider"></div>
        <div className="card-actions justify-between">
          <button
            className="btn btn-error btn-soft"
            onClick={() => {
              if (confirm(`Delete "${feed.name}" feed?`)) {
                deleteFeed();
              }
            }}
          >
            <DeleteIcon color="#FF5861" />
            Delete
          </button>
          <a
            href={getFeedAsLink(feed)}
            target="_blank"
            className="btn btn-secondary"
          >
            <ViewIcon color="#FFF" /> View (Edit)
          </a>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
