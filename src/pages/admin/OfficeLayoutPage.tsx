import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LayoutGrid, Users, Settings, Video } from 'lucide-react';
import * as d3 from 'd3';
import PowerManagement from './PowerManagement'; // Adjust the path as necessary

// Mock data for departments and seats
const departments = [
  { id: 'development', name: 'Development', seats: Array.from({ length: 60 }, (_, i) => ({ id: `dev-${i + 1}`, number: i + 1, status: 'available' })) },
  { id: 'hr', name: 'HR', seats: Array.from({ length: 60 }, (_, i) => ({ id: `hr-${i + 1}`, number: i + 1, status: 'available' })) },
  { id: 'sales', name: 'Sales', seats: Array.from({ length: 60 }, (_, i) => ({ id: `sales-${i + 1}`, number: i + 1, status: 'available' })) },
  { id: 'marketing', name: 'Marketing', seats: Array.from({ length: 60 }, (_, i) => ({ id: `marketing-${i + 1}`, number: i + 1, status: 'available' })) },
  { id: 'customer-service', name: 'Customer Service', seats: Array.from({ length: 60 }, (_, i) => ({ id: `cs-${i + 1}`, number: i + 1, status: 'available' })) },
  { id: 'legal', name: 'Legal', seats: Array.from({ length: 60 }, (_, i) => ({ id: `legal-${i + 1}`, number: i + 1, status: 'available' })) },
];

// Mock data for meeting rooms
const meetingRooms = [
  {
    id: '1',
    name: 'Innovate Hub',
    capacity: 12,
    floor: 1,
    isAvailable: true,
    seating: [
      { id: 'M1-1', status: 'available' },
      { id: 'M1-2', status: 'occupied', occupiedBy: 'Sarah Johnson' },
      { id: 'M1-3', status: 'available' },
      { id: 'M1-4', status: 'available' },
      { id: 'M1-5', status: 'occupied', occupiedBy: 'Emily Davis' },
      { id: 'M1-6', status: 'available' },
      { id: 'M1-7', status: 'available' },
      { id: 'M1-8', status: 'occupied', occupiedBy: 'David Wilson' },
      { id: 'M1-9', status: 'available' },
      { id: 'M1-10', status: 'available' },
      { id: 'M1-11', status: 'available' },
      { id: 'M1-12', status: 'available' }
    ]
  },
  {
    id: '2',
    name: 'Brainstorm Zone',
    capacity: 8,
    floor: 1,
    isAvailable: false,
    seating: [
      { id: 'M2-1', status: 'occupied', occupiedBy: 'Michael Chen' },
      { id: 'M2-2', status: 'occupied', occupiedBy: 'John Smith' },
      { id: 'M2-3', status: 'available' },
      { id: 'M2-4', status: 'available' },
      { id: 'M2-5', status: 'occupied', occupiedBy: 'Laura Brown' },
      { id: 'M2-6', status: 'available' },
      { id: 'M2-7', status: 'available' },
      { id: 'M2-8', status: 'available' }
    ]
  },
  {
    id: '3',
    name: 'Focus Room',
    capacity: 4,
    floor: 2,
    isAvailable: true,
    seating: [
      { id: 'M3-1', status: 'available' },
      { id: 'M3-2', status: 'available' },
      { id: 'M3-3', status: 'available' },
      { id: 'M3-4', status: 'available' }
    ]
  },
  {
    id: '4',
    name: 'Creative Corner',
    capacity: 6,
    floor: 2,
    isAvailable: true,
    seating: [
      { id: 'M4-1', status: 'available' },
      { id: 'M4-2', status: 'available' },
      { id: 'M4-3', status: 'available' },
      { id: 'M4-4', status: 'available' },
      { id: 'M4-5', status: 'available' },
      { id: 'M4-6', status: 'available' }
    ]
  },
  {
    id: '5',
    name: 'Collaboration Station',
    capacity: 10,
    floor: 3,
    isAvailable: false,
    seating: [
      { id: 'M5-1', status: 'occupied', occupiedBy: 'Emma White' },
      { id: 'M5-2', status: 'occupied', occupiedBy: 'James Taylor' },
      { id: 'M5-3', status: 'available' },
      { id: 'M5-4', status: 'available' },
      { id: 'M5-5', status: 'occupied', occupiedBy: 'Olivia Martinez' },
      { id: 'M5-6', status: 'available' },
      { id: 'M5-7', status: 'available' },
      { id: 'M5-8', status: 'available' },
      { id: 'M5-9', status: 'available' },
      { id: 'M5-10', status: 'available' }
    ]
  },
  {
    id: '6',
    name: 'Think Tank',
    capacity: 6,
    floor: 3,
    isAvailable: true,
    seating: [
      { id: 'M6-1', status: 'available' },
      { id: 'M6-2', status: 'available' },
      { id: 'M6-3', status: 'available' },
      { id: 'M6-4', status: 'available' },
      { id: 'M6-5', status: 'available' },
      { id: 'M6-6', status: 'available' }
    ]
  },
  {
    id: '7',
    name: 'Strategy Suite',
    capacity: 8,
    floor: 4,
    isAvailable: true,
    seating: [
      { id: 'M7-1', status: 'available' },
      { id: 'M7-2', status: 'available' },
      { id: 'M7-3', status: 'available' },
      { id: 'M7-4', status: 'available' },
      { id: 'M7-5', status: 'available' },
      { id: 'M7-6', status: 'available' },
      { id: 'M7-7', status: 'available' },
      { id: 'M7-8', status: 'available' }
    ]
  },
  {
    id: '8',
    name: 'Idea Lab',
    capacity: 6,
    floor: 4,
    isAvailable: false,
    seating: [
      { id: 'M8-1', status: 'occupied', occupiedBy: 'Daniel Lee' },
      { id: 'M8-2', status: 'occupied', occupiedBy: 'Sophia Garcia' },
      { id: 'M8-3', status: 'available' },
      { id: 'M8-4', status: 'available' },
      { id: 'M8-5', status: 'available' },
      { id: 'M8-6', status: 'available' }
    ]
  },
  {
    id: '9',
    name: 'Visionary Venue',
    capacity: 10,
    floor: 5,
    isAvailable: true,
    seating: [
      { id: 'M9-1', status: 'available' },
      { id: 'M9-2', status: 'available' },
      { id: 'M9-3', status: 'available' },
      { id: 'M9-4', status: 'available' },
      { id: 'M9-5', status: 'available' },
      { id: 'M9-6', status: 'available' },
      { id: 'M9-7', status: 'available' },
      { id: 'M9-8', status: 'available' },
      { id: 'M9-9', status: 'available' },
      { id: 'M9-10', status: 'available' }
    ]
  },
  {
    id: '10',
    name: 'Inspiration Lounge',
    capacity: 12,
    floor: 5,
    isAvailable: false,
    seating: [
      { id: 'M10-1', status: 'occupied', occupiedBy: 'Ethan Moore' },
      { id: 'M10-2', status: 'occupied', occupiedBy: 'Ava Anderson' },
      { id: 'M10-3', status: 'available' },
      { id: 'M10-4', status: 'available' },
      { id: 'M10-5', status: 'available' },
      { id: 'M10-6', status: 'available' },
      { id: 'M10-7', status: 'available' },
      { id: 'M10-8', status: 'available' },
      { id: 'M10-9', status: 'available' },
      { id: 'M10-10', status: 'available' },
      { id: 'M10-11', status: 'available' },
      { id: 'M10-12', status: 'available' }
    ]
  }
];

export const OfficeLayoutPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'layout' | 'assignment' | 'management' | 'meetings'>('layout');
  const [selectedDepartment, setSelectedDepartment] = useState<string | null>(null);
  const [seatCount, setSeatCount] = useState<{ booked: number; available: number }>({ booked: 0, available: 60 });
  const [departmentsData, setDepartmentsData] = useState(departments);
  const svgRef = useRef<SVGSVGElement>(null);

  const tabs = [
    { id: 'layout', label: 'Seat Layout', icon: LayoutGrid },
    { id: 'assignment', label: 'Seat Assignment', icon: Users },
    { id: 'management', label: 'Power Management', icon: Settings },
    { id: 'meetings', label: 'Meeting Rooms', icon: Video }
  ];

  useEffect(() => {
    if (activeTab === 'assignment' && svgRef.current && selectedDepartment) {
      const department = departmentsData.find(dept => dept.id === selectedDepartment);
      if (department) {
        renderSeatAssignment(department.seats);
      }
    }
  }, [activeTab, selectedDepartment, departmentsData]);

  const renderSeatAssignment = (seats: any[]) => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove(); // Clear any previous content

    const width = window.innerWidth; // Full window width
    const height = window.innerHeight - 200; // Full window height minus some space for other UI elements

    // Set up the SVG container
    svg.attr('width', width).attr('height', height);

    const seatWidth = 80; // Bigger seats
    const seatHeight = 60;
    const rows = 6; // Number of rows
    const cols = 10; // Number of columns

    // Create seat elements based on available data
    const seatGroups = svg
      .selectAll('.seat')
      .data(seats)
      .enter()
      .append('g')
      .attr('class', 'seat')
      .attr('transform', (d, i) => {
        const x = (i % cols) * (seatWidth + 20);
        const y = Math.floor(i / cols) * (seatHeight + 20);
        return `translate(${x}, ${y})`;
      })
      .on('click', function (event, d) {
        if (d.status === 'available') {
          // Update seat status to booked
          const updatedSeats = seats.map(seat => (seat.id === d.id ? { ...seat, status: 'booked' } : seat));
          const updatedDepartments = departmentsData.map(dept =>
            dept.id === selectedDepartment ? { ...dept, seats: updatedSeats } : dept
          );
          setDepartmentsData(updatedDepartments);

          // Update seat counts
          setSeatCount(prevState => ({
            booked: prevState.booked + 1,
            available: prevState.available - 1,
          }));
        }
      });

    // Draw seats as rounded rectangles
    seatGroups
      .append('rect')
      .attr('width', seatWidth)
      .attr('height', seatHeight)
      .attr('rx', 8)  // Rounded corners
      .attr('ry', 8)
      .attr('fill', d => (d.status === 'available' ? '#6BBF4D' : '#FF5733')) // Green for available, Red for booked
      .attr('stroke', '#000')
      .attr('stroke-width', 1);

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
  };

  const handleDepartmentClick = (departmentId: string) => {
    setSelectedDepartment(departmentId);
    const department = departmentsData.find(dept => dept.id === departmentId);
    if (department) {
      const bookedSeats = department.seats.filter(seat => seat.status === 'booked').length;
      setSeatCount({ booked: bookedSeats, available: 60 - bookedSeats });
    }
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
          <div className="grid grid-cols-3 gap-4">
            {departments.map(department => (
              <motion.div
                key={department.id}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-lg border border-gray-200 cursor-pointer"
                onClick={() => handleDepartmentClick(department.id)}
              >
                <h3 className="text-lg font-semibold mb-2">{department.name}</h3>
                <p className="text-sm text-gray-600">Total Seats: 60</p>
              </motion.div>
            ))}
          </div>
        )}

        {activeTab === 'assignment' && selectedDepartment && (
          <div className="h-[100vh] w-full">
            <svg ref={svgRef}></svg> {/* D3.js Floor Layout */}
          </div>
        )}

        {activeTab === 'management' && (
          <PowerManagement />
        )}

        {activeTab === 'meetings' && (
          <div className="space-y-6">
            {meetingRooms.map(room => (
              <div key={room.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{room.name}</h3>
                    <p className="text-sm text-gray-600">
                      Capacity: {room.capacity} people | Floor {room.floor}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    room.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {room.isAvailable ? 'Available' : 'In Use'}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  {room.seating?.map(seat => (
                    <div
                      key={seat.id}
                      className={`p-3 rounded-lg text-center ${
                        seat.status === 'available'
                          ? 'bg-green-100 text-green-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      <p className="font-medium">{seat.id}</p>
                      <p className="text-sm">
                        {seat.status === 'occupied' ? seat.occupiedBy : 'Available'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white py-2">
        <p className="text-center">
          Booked Seats: {seatCount.booked} | Available Seats: {seatCount.available}
        </p>
      </div>
    </div>
  );
};