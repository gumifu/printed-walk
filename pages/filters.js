import React from "react";
import FilterdCard from "../components/FilterCard";
import Header from "../components/Header";
// import FilterdCard from "../components/FilterdCard";

const Filters = () => {
  return (
    <div className="bg-main">
      <section>
        <Header />
      </section>
      <main className="max-w-7xl mx-auto mb-40 px-8 sm:px-16 ">
        <section className="pt-6">
          <FilterdCard />
        </section>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Filters;
