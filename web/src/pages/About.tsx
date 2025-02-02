import React from "react";
import Footer from "../components/Footer";
import Logo from "../components/Logo";

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base-200">
      {/* Hero Section */}
      <div className="hero min-h-[400px] bg-base-100">
        <div className="hero-content text-center">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold animate-fade-in-down">
              About{" "}
              <span className={`text-5xl font-black inline-flex gap-1`}>
                News<span className="italic">Hub</span>
              </span>
            </h1>
            <p className="py-6 animate-fade-in-up">
              Your trusted source for the latest news, in-depth analysis, and
              trending stories from around the globe.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 animate-fade-in-left">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg mb-4">
              At NewsHub, we are committed to delivering accurate, unbiased, and
              timely news to our readers. Our mission is to empower individuals
              with knowledge and insights that matter.
            </p>
            <p className="text-lg">
              We believe in the power of information to inspire change and
              foster understanding in a rapidly evolving world.
            </p>
          </div>
          <div className="flex-1 animate-fade-in-right">
            <img
              src="https://picsum.photos/600/400?random=1"
              alt="Mission"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-base-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="card bg-base-200 shadow-xl hover:scale-105 transition-transform duration-300 animate-fade-in-up"
              >
                <figure>
                  <img
                    src={`https://picsum.photos/400/300?random=${item + 10}`}
                    alt="Team Member"
                    className="rounded-t-lg"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">John Doe</h2>
                  <p>Lead Journalist</p>
                  <p>
                    With over 10 years of experience, John specializes in
                    investigative journalism and breaking news.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 animate-fade-in">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
            <div className="card-body">
              <h2 className="card-title">Integrity</h2>
              <p>
                We are committed to honesty and transparency in all our
                reporting.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
            <div className="card-body">
              <h2 className="card-title">Accuracy</h2>
              <p>
                Every story is thoroughly researched and fact-checked to ensure
                reliability.
              </p>
            </div>
          </div>
          <div className="card bg-base-100 shadow-lg hover:shadow-2xl transition-shadow duration-300 animate-fade-in-up">
            <div className="card-body">
              <h2 className="card-title">Innovation</h2>
              <p>
                We embrace new technologies and storytelling methods to engage
                our audience.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AboutPage;
