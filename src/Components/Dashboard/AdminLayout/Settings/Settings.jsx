// src/components/settings/Settings.jsx
import React, { useState } from "react";
import { ArrowLeft } from "lucide-react";
import TermsCondition from "./TermsCondition";
import Privacy from "./Privacy";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("privacy");

  return (
    <div className="min-h-screen px-6 roboto ">
      {/* Top Tabs */}
      <div className="relative">
        <div className="grid grid-cols-2">
          {/* Terms & Conditions */}
          <button
            onClick={() => setActiveTab("terms")}
            className={`relative py-4 text-lg font-medium text-left ${
              activeTab === "terms" ? "text-[#000000]" : "text-gray-500"
            }`}
          >
            Terms & Conditions
            {/* Border */}
            <span
              className={`absolute left-0 bottom-0 w-full ${
                activeTab === "terms"
                  ? "h-[4px] bg-[#2658C4]"
                  : "h-[4px] bg-[#D9D9D9]"
              }`}
            />
          </button>

          {/* Privacy & Policy */}
          <button
            onClick={() => setActiveTab("privacy")}
            className={`relative py-4 text-lg font-medium text-right ${
              activeTab === "privacy" ? "text-black" : "text-gray-500"
            }`}
          >
            Privacy & Policy
            {/* Border */}
            <span
              className={`absolute left-0 bottom-0 w-full ${
                activeTab === "privacy"
                  ? "h-[4px] bg-[#2658C4]"
                  : "h-[4px] bg-[#D9D9D9]"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Page Title */}
      <div className="flex items-center gap-2 py-4 mt-9 mb-9">
        {/* <ArrowLeft className="w-4 h-4 text-gray-600 cursor-pointer" /> */}
        <h2 className="text-2xl font-medium text-[#333333]">
          {activeTab === "terms"
            ? "Terms & Conditions Edit"
            : "Privacy & Policy Edit"}
        </h2>
      </div>

      {/* Content */}
      <div className="px-6">
        {activeTab === "terms" && <TermsCondition />}
        {activeTab === "privacy" && <Privacy />}
      </div>
    </div>
  );
};

export default Settings;
