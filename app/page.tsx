"use client"
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
export default function Page() {
  const [dateTime, setDateTime] = useState({date:null, time:null, day:null});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=America%2FToronto');
        const data = await response.json();
        setDateTime({ date: data.date, time: data.time, day: data.dayOfWeek });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-grow flex-col min-h-screen min-w-screen bg-zinc-900">
      <div className="flex flex-row flex-1">
        <div className="flex flex-col w-1/3 text-4xl bg-zinc-700 border-r-2 border-white justify-center items-center font-cormorantGaramond">
          {dateTime.date ? (
            <pre>{dateTime.date}</pre>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="flex flex-col w-2/3 text-4xl bg-zinc-800 font-poppins justify-center items-center">
            {dateTime.day ? (
              <pre>{dateTime.day}</pre>
            ) : (
              <p>Loading...</p>
            )}
        </div>
      </div>
      <div className="flex flex-col border-y-2 border-white flex-1 justify-center items-center text-9xl font-poppins">
        {dateTime.time ? (
          <pre>{dateTime.time}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex flex-col flex-1 bg-zinc-950 justify-center items-center">
        <Link href="/tytan.dev">
          <Button variant="link" className="text-5xl font-cormorantGaramond">Tytan Codes</Button>
        </Link>
      </div>
    </div>
  );
}