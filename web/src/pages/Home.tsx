import React, { useRef } from "react";
import { useArticles } from "../api/queries/articleQueries";
import ArticleCard from "../components/ArticleCard";
import { useCategories } from "../api/queries/categoryQueries";
import { Category } from "../api/types";
import Footer from "../components/Footer";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HomePage: React.FC = () => {
  // Get latest 3 news articles
  const { data: articlesData, isLoading: isArticlesLoading } = useArticles(
    {
      with: "source,category,authors",
    },
    1,
    3
  );

  // Get all categories
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories();

  // Animations
  const heroRef = useRef(null);
  const articlesRef = useRef(null);
  const categoriesRef = useRef(null);

  useGSAP(() => {
    gsap.from(heroRef.current, {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power2.out",
    });
    gsap.from(articlesRef.current, {
      scrollTrigger: {
        trigger: articlesRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      y: 50,
      duration: 2,
      ease: "power2.out",
      stagger: 0.2,
    });

    gsap.from(categoriesRef.current, {
      scrollTrigger: {
        trigger: categoriesRef.current,
        start: "left 50%",
        toggleActions: "play none none reverse",
      },
      opacity: 0,
      x: -50,
      duration: 2,
      ease: "power2.out",
      stagger: 0.3,
    });
  }, []);

  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div ref={heroRef} className="hero min-h-[90vh] bg-base-100">
        <div className="hero-content flex flex-wrap">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold animate-fade-in-down">
              Stay Informed with the Latest News
            </h1>
            <p className="py-6 animate-fade-in-up">
              Explore breaking news, and trending stories from around the
              internet.
            </p>
            <a href="/headlines" className="btn btn-primary animate-bounce">
              <div className="inline-grid *:[grid-area:1/1]">
                <div className="status status-success animate-ping"></div>
                <div className="status status-success"></div>
              </div>{" "}
              Headlines
            </a>
          </div>
          <img
            src="/news-1.png"
            className="max-w-sm scale-120 transition-all duration-300 hover:scale-140"
          />
        </div>
      </div>

      {/* Featured News Section */}
      <div ref={articlesRef} className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
          Latest Headlines
        </h2>
        {isArticlesLoading ? (
          <div className="flex items-center justify-center">
            <span className="loading loading-ring loading-xl"></span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articlesData?.data?.map((article) => (
              <div key={article.id} className="article-card">
                <ArticleCard article={article} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Categories */}
      <div ref={categoriesRef} className="bg-base-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Gathered in Different Categories
          </h2>
          {isCategoriesLoading ? (
            <div className="flex items-center justify-center">
              <span className="loading loading-ring loading-xl"></span>
            </div>
          ) : (
            <div className="space-y-6">
              {categoriesData?.map((item: Category) => (
                <div
                  key={item.id}
                  className="card lg:card-side bg-base-200 shadow-xl hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up"
                >
                  <div className="card-body">
                    <h2 className="card-title">Latest News in {item.name}</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <div className="card-actions justify-end">
                      <a
                        href={`/headlines?category=${item.id}`}
                        className="btn btn-secondary"
                      >
                        Read More
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
