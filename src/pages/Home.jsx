import React from "react";
import SideBar from "../Components/sidebar/SideBar";
import Navbar from "../Components/Navbar";
import TaskList from "../Components/TaskList";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />

      <main className="mx-auto flex w-full max-w-[1600px] flex-col items-stretch gap-4 px-3 py-4 sm:px-4 md:px-6 lg:flex-row lg:items-start lg:gap-2">
        <aside className="w-full lg:sticky lg:top-[110px] lg:w-[280px] lg:flex-shrink-0">
          <SideBar />
        </aside>

        <section className="min-w-0 flex-1 mr-7">
          <TaskList />
        </section>
      </main>
    </div>
  );
};

export default Home;
