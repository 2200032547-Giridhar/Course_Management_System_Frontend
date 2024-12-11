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
                <Route path="/" element={<LoginComponent />} />
                <Route path="/register" element={<RegisterComponent />} />
                <Route path="/login" element={<LoginComponent />} />
                <Route path="/student-dashboard/:id" element={<StudentDashboard />} />
                <Route path="/faculty-dashboard/:id" element={<FacultyDashboard />} />
                <Route path="/admin-dashboard/:id" element={<AdminDashboard />} />
                <Route path="/students-list/:id" element={<StudentsList />} />
                <Route path="/courses/:id" element={<Courses />}  />
                <Route path="/course-list/:id"element={<CourseList />}  />
                <Route path="/create-course"element={<AddCourse />}  />
                <Route path="/update-course/:courseId" element={<UpdateCourse />} />
                <Route path="/courses/:id/:courseId" element={<CourseDetails />} />
                <Route path="/:id/enrolled-courses" element={<EnrolledCourses/>}/>
                <Route path="Help/:id" element={<Help/>}/>
                <Route path="/settings/:id" element={<Settings/>}/>
                <Route path="help1/:id" element={<Help1/>}/>
                <Route path="/settings1/:id" element={<Settings1/>}/>
            </Routes>
        </Router>
    );
}

export default App;
