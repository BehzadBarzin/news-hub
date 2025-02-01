import { Feed } from "../api/types";

const FeedCard = ({ feed }: { feed: Feed }) => {
  return (
    <div className="card bg-base-300 shadow-sm hover-shadow">
      <div className="card-body">
        <h2 className="card-title font-black text-3xl">{feed.name}</h2>
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

        <div>
          <h6 className="font-bold text-md">Authors:</h6>
          <div className="flex gap-1 justify-start items-center">
            {feed.authors?.map((author) => (
              <p key={author.id} className="badge badge-secondary flex-grow-0">
                {author.name}
              </p>
            ))}
          </div>
        </div>

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

        <div>
          <h6 className="font-bold text-md">Categories:</h6>
          <div className="flex gap-1 justify-start items-center">
            {feed.categories?.map((category) => (
              <p key={category.id} className="badge badge-primary flex-grow-0">
                {category.name}
              </p>
            ))}
          </div>
        </div>

        <div className="divider"></div>
        <div className="card-actions justify-between">
          <div className="flex gap-1">
            <button className="btn btn-primary btn-soft">Edit</button>
            <button className="btn btn-error btn-soft">Delete</button>
          </div>
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
