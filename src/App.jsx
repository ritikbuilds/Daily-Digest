import React from "react";
import Navbar from "./components/Navbar";
import CardList from "./components/CardList";
import Footer from "./components/Footer";
import Provider from "./components/context/Provider";

function App() {
  return (
    <Provider>
      <main className="flex flex-col w-full min-h-screen text-[#ac3b61]">
        <Navbar />
        <CardList />
        <Footer/>
      </main>
    </Provider>
  );
}

export default App;
