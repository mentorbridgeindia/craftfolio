"use client";

import Home from "@modules/Home/Home";
import PrivateRoute from "@modules/Security/PrivateRoute";

export default function HomePage() {
  return (
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  );
}
