import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Settings, Video } from 'lucide-react';
import { useDashboardStore } from '../../store/dashboardStore';
import * as d3 from 'd3';

export const OfficeLayoutPage: React.FC = () => {
  const { seats, meetingRooms } = useDashboardStore();
  const [activeTab, setActiveTab] = useState<'layout' | 'assignment' | 'management' | 'meetings'>('layout');
  const [seatCount, setSeatCount] = useState<{ booked: number; empty: number }>({ booked: 0, empty: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const tabs = [
    { id: 'layout', label: 'Seat Layout', icon: LayoutGrid },
    { id: 'assignment', label: 'Seat Assignment', icon: Users },
    { id: 'management', label: 'Seat Management', icon: Settings },
    { id: 'meetings', label: 'Meeting Rooms', icon: Video }
  ];

  useEffect(() => {
    if (activeTab === 'assignment' && svgRef.current) {
      // Render floor seating structure with D3.js
      renderSeatAssignment(seats);
    }
  }, [activeTab, seats]);

  const renderSeatAssignment = (seats: any[]) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear any previous content

    const width = window.innerWidth; // Full window width
    const height = window.innerHeight - 100; // Full window height minus some space for other UI elements

    // Set up the SVG container
    svg.attr('width', width).attr('height', height);

    const seatWidth = 60;
    const seatHeight = 40;
    const rows = 10; // Number of rows
    const cols = 12; // Number of columns

    const seatData = seats.filter(seat => seat.status === 'available' || seat.status === 'occupied');

    // Create seat elements based on available data
    const seatGroups = svg
      .selectAll('.seat')
      .data(seatData)
      .enter()
      .append('g')
      .attr('class', 'seat')
      .attr('transform', (d, i) => {
        const x = (i % cols) * (seatWidth + 20);
        const y = Math.floor(i / cols) * (seatHeight + 20);
        return `translate(${x}, ${y})`;
      })
      .on('mouseover', function (event, d) {
        d3.select(this).select('rect').attr('stroke', 'black').attr('stroke-width', 2);
      })
      .on('mouseout', function (event, d) {
        d3.select(this).select('rect').attr('stroke', 'none');
      })
      .on('click', function (event, d) {
        // On seat click, update the seat count based on its status
        if (d.status === 'occupied') {
          setSeatCount(prevState => ({
            ...prevState,
            booked: prevState.booked + 1,
            empty: prevState.empty
          }));
        } else if (d.status === 'available') {
          setSeatCount(prevState => ({
            ...prevState,
            booked: prevState.booked,
            empty: prevState.empty + 1
          }));
        }
      });

    // Draw seats as rounded rectangles for a more realistic look
    seatGroups
      .append('rect')
      .attr('width', seatWidth)
      .attr('height', seatHeight)
      .attr('rx', 8)  // Rounded corners
      .attr('ry', 8)
      .attr('fill', d => {
        if (d.status === 'available') return '#6BBF4D'; // Green for available
        if (d.status === 'occupied') return '#FF5733'; // Red for occupied
        return '#FFD700'; // Yellow for unassigned or unknown
      });

    // Add seat numbers
    seatGroups
      .append('text')
      .attr('x', seatWidth / 2)
      .attr('y', seatHeight / 2)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'white')
      .attr('font-size', '12px')
      .text(d => d.number);

    // Optional: Add department labels on top of seats
    seatGroups
      .append('text')
      .attr('x', seatWidth / 2)
      .attr('y', 5)
      .attr('dy', '.35em')
      .attr('text-anchor', 'middle')
      .attr('fill', 'black')
      .attr('font-size', '10px')
      .text(d => d.department);

    // Optional: Draw department separators or walls
    svg
      .append('line')
      .attr('x1', 0)
      .attr('x2', width)
      .attr('y1', rows * (seatHeight + 20) - 10)
      .attr('y2', rows * (seatHeight + 20) - 10)
      .attr('stroke', '#000')
      .attr('stroke-width', 2);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-4 shadow-sm">
        <div className="flex space-x-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeTab === tab.id
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-lg">
        {activeTab === 'layout' && (
          <div className="grid grid-cols-8 gap-4">
            {seats.map(seat => (
              <motion.div
                key={seat.id}
                whileHover={{ scale: 1.05 }}
                className={`p-4 rounded-lg text-center cursor-pointer ${
                  seat.status === 'available'
                    ? 'bg-green-100 text-green-700'
                    : seat.status === 'occupied'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-yellow-100 text-yellow-700'
                }`}
              >
                <p className="font-semibold">{seat.number}</p>
                <p className="text-sm">{seat.department}</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'assignment' && (
          <div className="h-[100vh] w-full">
            <svg ref={svgRef}></svg> {/* D3.js Floor Layout */}
          </div>
        )}

        {activeTab === 'meetings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meetingRooms.map(room => (
              <motion.div
                key={room.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 rounded-lg border border-gray-200"
              >
                <h3 className="text-lg font-semibold mb-2">{room.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>Capacity: {room.capacity} people</p>
                  <p>Floor: {room.floor}</p>
                  <p className={`font-semibold ${
                    room.isAvailable ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {room.isAvailable ? 'Available' : 'In Use'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-2">
        <p className="text-center">
          Booked Seats: {seatCount.booked} | Empty Seats: {seatCount.empty}
        </p>
      </div>
    </div>
  );
};
