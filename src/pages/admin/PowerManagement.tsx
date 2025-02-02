import React, { useState, useEffect } from 'react';
import { Power, Droplets, Users, Timer, AlertTriangle, TrendingDown, PowerOff } from 'lucide-react';

interface Workstation {
  id: number;
  name: string;
  status: 'occupied' | 'unoccupied';
  powerUsage: number;
  waterUsage: number;
  lastOccupied: string;
  autoShutdownEnabled: boolean;
}

function PowerManagement() {
  const [workstations, setWorkstations] = useState<Workstation[]>([
    {
      id: 1,
      name: 'Station A1',
      status: 'unoccupied',
      powerUsage: 450,
      waterUsage: 2.5,
      lastOccupied: '2 hours ago',
      autoShutdownEnabled: false,
    },
    {
      id: 2,
      name: 'Station A2',
      status: 'occupied',
      powerUsage: 380,
      waterUsage: 1.8,
      lastOccupied: 'Currently occupied',
      autoShutdownEnabled: true,
    },
    {
      id: 3,
      name: 'Station B1',
      status: 'unoccupied',
      powerUsage: 520,
      waterUsage: 3.0,
      lastOccupied: '4 hours ago',
      autoShutdownEnabled: false,
    },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setWorkstations((current) =>
        current.map((station) => ({
          ...station,
          powerUsage:
            station.status === 'occupied'
              ? station.powerUsage + Math.random() * 10 - 5
              : station.powerUsage,
          waterUsage:
            station.status === 'occupied'
              ? Math.max(0.5, station.waterUsage + Math.random() - 0.5)
              : station.waterUsage,
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const toggleStatus = (id: number) => {
    setWorkstations((current) =>
      current.map((station) =>
        station.id === id
          ? {
              ...station,
              status: station.status === 'occupied' ? 'unoccupied' : 'occupied',
              lastOccupied:
                station.status === 'occupied'
                  ? new Date().toLocaleTimeString()
                  : 'Currently occupied',
            }
          : station
      )
    );
  };

  const toggleAutoShutdown = (id: number) => {
    setWorkstations((current) =>
      current.map((station) =>
        station.id === id
          ? {
              ...station,
              autoShutdownEnabled: !station.autoShutdownEnabled,
              powerUsage:
                !station.autoShutdownEnabled && station.status === 'unoccupied'
                  ? station.powerUsage * 0.1 // Reduce power usage when auto-shutdown is enabled
                  : station.powerUsage,
            }
          : station
      )
    );
  };

  const totalPowerWaste = workstations
    .filter((w) => w.status === 'unoccupied')
    .reduce((acc, curr) => acc + curr.powerUsage, 0);

  const totalWaterWaste = workstations
    .filter((w) => w.status === 'unoccupied')
    .reduce((acc, curr) => acc + curr.waterUsage, 0);

  const occupancyRate = (workstations.filter((w) => w.status === 'occupied').length / workstations.length) * 100;

  const unoccupiedStationsWithoutAutoShutdown = workstations.filter(
    (w) => w.status === 'unoccupied' && !w.autoShutdownEnabled
  ).length;

  const dailyPowerSavings = (totalPowerWaste * 24) / 1000;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">Resource Management Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Real-time monitoring and control</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Power className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Power Waste</dt>
                    <dd className="text-lg font-medium text-gray-900">{Math.round(totalPowerWaste)} watts</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Droplets className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Water Waste</dt>
                    <dd className="text-lg font-medium text-gray-900">{totalWaterWaste.toFixed(1)} L/hr</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Occupancy Rate</dt>
                    <dd className="text-lg font-medium text-gray-900">{Math.round(occupancyRate)}%</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Workstations Status</h2>
            <div className="space-y-4">
              {workstations.map((station) => (
                <div
                  key={station.id}
                  className={`border rounded-lg p-4 ${
                    station.status === 'unoccupied' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleStatus(station.id)}
                        className={`w-3 h-3 rounded-full cursor-pointer transition-colors ${
                          station.status === 'occupied' ? 'bg-green-500' : 'bg-red-500'
                        }`}
                        title="Click to toggle status"
                      />
                      <h3 className="text-lg font-medium">{station.name}</h3>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <Power className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{Math.round(station.powerUsage)}W</span>
                      </div>
                      <div className="flex items-center">
                        <Droplets className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{station.waterUsage.toFixed(1)}L/hr</span>
                      </div>
                      <div className="flex items-center">
                        <Timer className="h-5 w-5 text-gray-400 mr-2" />
                        <span>{station.lastOccupied}</span>
                      </div>
                      <button
                        onClick={() => toggleAutoShutdown(station.id)}
                        className={`flex items-center px-3 py-1 rounded-md transition-colors ${
                          station.autoShutdownEnabled
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        <PowerOff className="h-4 w-4 mr-1" />
                        Auto-shutdown
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Live Recommendations</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-yellow-500 flex-shrink-0" />
                <p className="text-gray-600">
                  {unoccupiedStationsWithoutAutoShutdown} workstations have been unoccupied for over 2 hours while still
                  consuming resources.
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <TrendingDown className="h-6 w-6 text-blue-500 flex-shrink-0" />
                <p className="text-gray-600">
                  Implementing auto-shutdown could save approximately {dailyPowerSavings.toFixed(1)} kWh per day.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default PowerManagement;