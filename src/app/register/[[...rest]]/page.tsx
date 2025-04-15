"use client";

import { SignUp } from "@clerk/nextjs";

export default function Register() {
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <SignUp
            signInUrl="/login"
            appearance={{
              elements: {
                rootBox: {
                  width: "100%",
                },
                card: {
                  boxShadow: "none",
                  width: "100%",
                  backgroundColor: "transparent",
                },
                logoBox: {
                  height: "100px",
                },
                logoImage: {
                  height: "100px",
                },
                headerTitle: {
                  marginBottom: "1rem",
                },
              },
            }}
          />
        </div>
      </div>

      {/* Right Column - Text Content */}
      <div className="w-1/2 bg-gradient-to-br from-indigo-600 to-blue-800 flex items-center justify-center p-8">
        <div className="text-white text-center max-w-md">
          <h1 className="text-4xl font-bold mb-4">Join Our Community</h1>
          <p className="text-lg mb-6">
            Create your account and start your journey with us today.
          </p>
          <div className="space-y-4">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
              </div>
              <span>Secure Registration</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
              </div>
              <span>Instant Access</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12z" />
                </svg>
              </div>
              <span>Personalized Experience</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
