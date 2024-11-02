"use client"
import React, { useEffect, useState } from 'react';

export default function Page() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://timeapi.io/api/time/current/zone?timeZone=America%2FToronto');
        const data = await response.json();
        setTime(data.time);
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
      <div className="flex flex-row flex-1 bg-zinc-800">
        Hello
      </div>
      <div className="flex flex-col border-y-2 border-white flex-1 justify-center items-center text-9xl font-comorantGaramond">
        {time ? (
          <pre>{time}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="flex flex-col flex-1 bg-zinc-800">
        Hello
      </div>
    </div>
  );
}