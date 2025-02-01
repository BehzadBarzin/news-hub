import { Article } from "../api/types";

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

const ArticleCard = ({ article }: { article: Article }) => {
  return (
    <a
      href={article.url}
      target="_blank"
      className="card bg-base-100 object-cover image-full shadow-sm hover-shadow"
    >
      <figure>
        <img src={article.image_url} alt="article" className="object-center" />
      </figure>
      <div className="card-body">
        {article.published_at && <p>{formatDate(article.published_at)}</p>}
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
    </a>
  );
};

export default ArticleCard;
