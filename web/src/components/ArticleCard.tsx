// const ArticleCard = ({ article }: { article: Article}) => {
const ArticleCard = () => {
  return (
    <div className="card bg-base-100 object-cover image-full w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Some Article 1</h2>
        <div className="card-actions">
          <div className="badge badge-secondary badge-sm">Author</div>
          <div className="badge badge-secondary badge-sm">Author</div>
        </div>
        <div className="card-actions justify-between h-full items-end">
          <div className="badge badge-primary badge-lg">Category</div>
          <div className="badge badge-accent badge-lg">Source</div>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;
