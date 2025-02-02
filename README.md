# WorkHive - AI-Powered Office Seat Planner

## Overview
WorkHive is an AI-powered office seat planning and management system designed to optimize workspace utilization, enhance employee collaboration, and reduce operational costs. It dynamically assigns seats based on employee preferences, remote work schedules, and team collaboration needs.

## Features
- **AI-Powered Seat Allocation** – Smart, automated seat assignments based on department, work style, and availability.
- **Interactive Floor Plan** – Drag-and-drop interface for admins to manually adjust seating.
- **Hot Desk & Meeting Room Booking** – Flexible workspace management for employees.
- **Real-Time Analytics** – Monitors seat utilization rates and suggests optimizations.
- **Admin & Employee Dashboards** – Separate portals for managing seating, projects, and job applications.
- **Energy Optimization (Optional)** – Predicts power usage based on occupancy trends.

  ## Demo  
🔗 [Live Demo of WorkHive](https://workhiveapplication.netlify.app/)   


## Tech Stack
- **Frontend:** React.js / Next.js
- **Backend:** Node.js + Express / FastAPI (Python)
- **Database:** PostgreSQL / Firebase
- **AI Model:** Python (Scikit-learn) for seat allocation
- **Visualization:** D3.js for interactive office layout.

---

## Installation & Setup

### Clone the Repository
```sh
git clone https://github.com/MonishRaman/WorkHive.git
cd WorkHive
```

### Setup Frontend
```sh
cd frontend
npm install
npm run dev
```

### Setup Backend (Node.js)
```sh
cd backend
npm install
npm run dev
```

### Setup Backend (FastAPI - Python)
```sh
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Database Setup (PostgreSQL)
```sql
CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    role VARCHAR(50),
    department VARCHAR(50),
    seat_id INT
);

CREATE TABLE seats (
    id SERIAL PRIMARY KEY,
    department VARCHAR(50),
    status VARCHAR(20) CHECK (status IN ('Available', 'Booked')),
    employee_id INT REFERENCES employees(id)
);
```

---

## Usage
1. **Login Page** – Employees and admins can log in using their credentials.
2. **Admin Dashboard** – Manage employees, projects, office layout, and job applications.
3. **Employee Dashboard** – View assigned seats, book meeting rooms, check project details.
4. **Seat Management** – Admins can assign, reallocate, and track seats.
5. **Analytics & Reporting** – Monitor office space utilization and optimize seating plans.

---

## Contribution
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature-name`).
3. Commit your changes (`git commit -m "Added new feature"`).
4. Push to the branch (`git push origin feature-name`).
5. Open a pull request.

---

## License
This project is licensed under the MIT License.

---

## Contact
For any queries or collaboration, reach out at [monishr608@gmail.com].

---

## Screenshots (Optional)
Here are some sample screenshots to help you visualize the WorkHive interface:

### Admin Dashboard
![Admin Dashboard](![image](https://github.com/user-attachments/assets/fdfeb547-803e-4e48-82e7-fc7d0eb45fe5)
)
![image](https://github.com/user-attachments/assets/53543601-66a8-4f4e-a7ee-a598449ca9f9)

### Employee Dashboard
![Employee Dashboard](https://link-to-image.com)

### Interactive Floor Plan
![Floor Plan](https://link-to-image.com)

---

## Deployment Instructions

### Docker Deployment (Optional)
1. Build the Docker image for both frontend and backend:
    ```sh
    docker build -t workhive-frontend ./frontend
    docker build -t workhive-backend ./backend
    ```
2. Run the containers:
    ```sh
    docker run -p 3000:3000 workhive-frontend
    docker run -p 8000:8000 workhive-backend
    ```

### Deploy to Heroku (Optional)
1. Install the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).
2. Create a new Heroku app:
    ```sh
    heroku create workhive
    ```
3. Push your code to Heroku:
    ```sh
    git push heroku main
    ```

---

### 🚀 **Enhancements & Future Scope**
- Implement AI-based **space optimization algorithms**.
- Add **integrations with Slack/MS Teams** for booking notifications.
- Develop **mobile app support** for a seamless experience.

---

**Note:** Feel free to modify and enhance the system based on your needs.  
🚀 **Happy Coding!**
