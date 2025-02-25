import React from "react";
import NavigationBar from "@/components/navigation-bar";

function Layout({ children }) {
  return (
    <div>
      {children} {/* Correct way to render children */}
      <NavigationBar />
    </div>
  );
}

export default Layout;
