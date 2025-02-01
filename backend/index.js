import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Index = () => {
  const [seatingData, setSeatingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Fetch seating layout or relevant data from your API
    const fetchSeatingLayout = async () => {
      try {
        const response = await fetch('/api/seating-layout');
        const data = await response.json();
        setSeatingData(data);
      } catch (error) {
        console.error('Error fetching seating layout:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeatingLayout();
  }, []);

  const handleLogin = (role) => {
    // Redirect based on the role (admin or employee)
    if (role === 'admin') {
      router.push('/admin-dashboard');
    } else {
      router.push('/employee-dashboard');
    }
  };

  return (
    <div>
      <Head>
        <title>WorkHive - AI Powered Office Seat Planner</title>
        <meta name="description" content="Optimize your office seating arrangement with AI" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Welcome to WorkHive</h1>
        <p>Your AI-powered office seat planner.</p>

        {loading ? (
          <p>Loading seating layout...</p>
        ) : (
          <div>
            <h2>Current Seating Layout</h2>
            {/* Render seating layout here, you can use D3.js or other visualization tools */}
            <div>
              {/* Placeholder for visual layout */}
              {seatingData && seatingData.layout ? (
                <div>{/* Render seating layout dynamically here */}</div>
              ) : (
                <p>No seating data available</p>
              )}
            </div>
          </div>
        )}

        <div>
          <button onClick={() => handleLogin('admin')}>Admin Login</button>
          <button onClick={() => handleLogin('employee')}>Employee Login</button>
        </div>
      </main>
    </div>
  );
};

export default Index;
