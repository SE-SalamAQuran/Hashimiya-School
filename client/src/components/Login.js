import { React, useState } from 'react';
import TeachersLoginForm from './TeachersLoginForm';
import StudentsLoginForm from './StudentsLoginForm';
import { Button } from "react-bootstrap";

export default function Login() {
    const [isStudent, setIsStudent] = useState(true);

    function handleStudentClick() {
        setIsStudent(true);
    }
    function handleTeacherClick() {
        setIsStudent(false);
    }

    function LoginForm() {
        if (isStudent) {
            return (
                <div>
                    <StudentsLoginForm />
                    <br />
                    <Button onClick={handleTeacherClick} style={{ marginTop: "2rem" }} variant="dark">Teacher? Login from here
                        <img style={{ marginLeft: "1em" }} src="https://img.icons8.com/ios/30/ffffff/teacher.png" alt="teacher" /></Button>
                </div>


            );
        }
        return (
            <div>
                <TeachersLoginForm />

                <br />
                <Button onClick={handleStudentClick} style={{ marginTop: "2rem" }} variant="dark">Student? Login from here
                    <img style={{ marginLeft: "1em" }} src="https://img.icons8.com/material-rounded/30/ffffff/student-male.png" alt="student" /></Button>

            </div>
        )
    }
    return (
        <div>
            <LoginForm />
        </div>
    )
}
