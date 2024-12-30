import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginComponent from './Components/LoginandRegister/LoginComponent';
import RegisterComponent from './Components/LoginandRegister/RegisterComponent';
import StudentDashboard from './Components/StudentPages/StudentDashboard';
import FacultyDashboard from './Components/FacultyPages/FacultyDashboard';
import AdminDashboard from './Components/AdminPages/AdminDashboard';
import StudentsList from './Components/AdminPages/StudentList';
import Courses from './Components/StudentPages/Courses';
import AddCourse from './Components/AdminPages/AddCourse';
import UpdateCourse from './Components/AdminPages/UpdateCourse';
import CourseList from './Components/AdminPages/CourseList';
import CourseDetails from './Components/StudentPages/CourseDetails';
import EnrolledCourses from './Components/StudentPages/EnrolledCourses';
import Help from './Components/StudentPages/Help';
import Settings from './Components/StudentPages/Settings';
import Help1 from './Components/AdminPages/Help1';
import Settings1 from './Components/AdminPages/Settings1';


function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes */}
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/" element={<LoginComponent />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/register" element={<RegisterComponent />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/login" element={<LoginComponent />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/student-dashboard/:id" element={<StudentDashboard />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/faculty-dashboard/:id" element={<FacultyDashboard />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/admin-dashboard/:id" element={<AdminDashboard />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/students-list/:id" element={<StudentsList />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/:id" element={<Courses />}  />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/course-list/:id"element={<CourseList />}  />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/create-course"element={<AddCourse />}  />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/update-course/:courseId" element={<UpdateCourse />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/courses/:id/:courseId" element={<CourseDetails />} />
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/:id/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/Help/:id" element={<Help/>}/>
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/settings/:id" element={<Settings/>}/>
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/help1/:id" element={<Help1/>}/>
                <Route path="https://coursemanagementsystembackend-production.up.railway.app/api/v1/settings1/:id" element={<Settings1/>}/>
            </Routes>
        </Router>
    );
}

export default App;
