"use client";

import PrivateRoute from "@modules/Security/PrivateRoute";
import Home from "@modules/Home/Home";

export default function IndexPage() {
  return (
    <PrivateRoute>
      <Home />
    </PrivateRoute>
  );
}
