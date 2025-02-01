import { Article } from "../api/types";

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <div className="card bg-base-100 object-cover image-full shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-description font-bold">{article.title}</h2>
        <div className="card-actions">
          {article.authors?.map((author) => {
            return (
              <div
                key={author.id}
                className="badge badge-secondary badge-sm text-truncate"
              >
                {author.name}
              </div>
            );
          })}
        </div>
        <div className="card-actions justify-between h-full items-end">
          <div className="badge badge-primary badge-md">
            {article.category?.name}
          </div>
          <div className="badge badge-accent badge-md">
            {article.source?.name}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
