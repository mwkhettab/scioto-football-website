"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "@/components/common/Loading";
import Error from "@/components/common/Error";
import PageTitle from "@/components/common/PageTitle";
import Tabs from "@/components/common/Tabs";
import ScheduleCard from "@/components/schedule/ScheduleCard";

const tabs = ["Varsity", "JV", "Freshmen"];

type ScheduleRow = Array<string | number>;

const Page = () => {
  const [selectedTab, setSelectedTab] = useState("Varsity");
  const [loading, setLoading] = useState(true);
  const [schedule, setScheduleData] = useState<ScheduleRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [showPast, setShowPast] = useState(false);

  useEffect(() => {
    const fetchSchedule = async () => {
      setLoading(true);
      try {
        let endpoint = "/api/schedule/varsity";
        if (selectedTab === "JV") endpoint = "/api/schedule/jv";
        else if (selectedTab === "Freshmen")
          endpoint = "/api/schedule/freshman";

        const response = await axios.get(endpoint);
        setScheduleData(response.data["values"]);
        setError(null);
      } catch (err: any) {
        if (err.response?.status === 429) {
          setError(
            "It seems like we've hit a rate limit. Please try again later."
          );
        } else if (err.message) {
          setError(`An error occurred: ${err.message}`);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [selectedTab]);

  // Filter between past and future games
  const today = new Date().toISOString().split("T")[0];
  const rows = schedule.filter((row) =>
    showPast ? row[7] <= today : row[7] > today
  );

  return (
    <div className="min-h-screen bg-white w-full flex flex-col items-center p-4">
      <div className="w-full max-w-6xl">
        <PageTitle title={`${selectedTab} Schedule`} />

        <div className="w-full max-w-6xl mb-6 -mt-6">
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onSelectTab={setSelectedTab}
          />
        </div>

        {/* Toggle Button */}
        <div className="w-full max-w-6xl mb-6 flex justify-center">
          <button
            onClick={() => setShowPast(!showPast)}
            className="bg-[#014321] text-white px-6 py-2 hover:bg-[#015a2a] transition-colors font-oswald uppercase"
          >
            {showPast ? "View Upcoming Games" : "View Past Games"}
          </button>
        </div>

        {loading ? (
          <Loading />
        ) : error ? (
          <Error errorMessage={error} />
        ) : (
          <div className="grid grid-cols-2 gap-6 w-full max-w-6xl font-oswald">
            {rows.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500 py-8">
                No {showPast ? "past" : "upcoming"} games found.
              </div>
            ) : (
              rows.map((row, idx) => (
                <ScheduleCard
                  key={idx}
                  row={row}
                  isNextGame={!showPast && idx === 0}
                  isPastGame={showPast}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
