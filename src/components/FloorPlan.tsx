// FloorPlan.js
import React, { useState, useEffect } from 'react';
import * as d3 from 'd3';

const FloorPlan = () => {
  const [seats, setSeats] = useState([]);

  // Fetch seat layout data from backend
  useEffect(() => {
    fetch('http://localhost:5000/api/seats')  // Change this URL to your backend endpoint
      .then(response => response.json())
      .then(data => setSeats(data))
      .catch(err => console.error("Error fetching seats:", err));
  }, []);

  useEffect(() => {
    if (seats.length > 0) {
      const svg = d3.select("#floorPlan")
                    .append("svg")
                    .attr("width", 800)
                    .attr("height", 600);

      // Create rectangles for each seat
      svg.selectAll("rect")
        .data(seats)
        .enter()
        .append("rect")
        .attr("x", d => d.x)
        .attr("y", d => d.y)
        .attr("width", 80)
        .attr("height", 50)
        .attr("fill", d => {
          if (d.department === "Engineering") return "blue";
          if (d.department === "Marketing") return "green";
          return "red";
        })
        .attr("stroke", "black")
        .on("click", (event, d) => {
          // Handle seat click (could open a booking modal)
          alert(`Seat ID: ${d.id}, Department: ${d.department}`);
        });

      // Optional: Add labels for departments
      svg.selectAll("text")
        .data(seats)
        .enter()
        .append("text")
        .attr("x", d => d.x + 40) // Center the text in each seat
        .attr("y", d => d.y + 25)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .text(d => d.department);
    }
  }, [seats]);

  return (
    <div>
      <h3>Office Floor Plan</h3>
      <div id="floorPlan"></div>
    </div>
  );
};

export default FloorPlan;
