"use client"

import { BookOpen, Calendar, MessageSquare, ArrowLeft, TrendingUp, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { MOCK_USERS, MOCK_ENROLLMENTS, MOCK_COURSES } from "@/lib/mock-data"
import { useParams } from "next/navigation"

export default function TutorStudentDetailPage() {
    const params = useParams()
    const studentId = params.id as string

    // In a real app we'd fetch the student. 
    // For now we only have "s1", so if it matches s1 use that, else dummy fallback or not found.
    const studentUser = MOCK_USERS.student

    // In a real app, we would verify the ID:
    // const student = studentId === "s1" ? studentUser : null;

    // For demo purposes, we'll assume the student exists and is the one we have mock data for
    const student = {
        ...studentUser,
        joinDate: "September 2025"
    }

    // 1. Get courses taught by current tutor (t1)
    const tutorCourses = MOCK_COURSES.filter(c => c.tutorId === "t1")
    const tutorCourseIds = tutorCourses.map(c => c.id)

    // 2. Get enrollments for this student with this tutor
    const commonEnrollments = MOCK_ENROLLMENTS.filter(e =>
        e.studentId === studentId &&
        tutorCourseIds.includes(e.courseId)
    )

    // 3. Get detailed course info for display
    const enrolledCourses = commonEnrollments.map(e => {
        const course = MOCK_COURSES.find(c => c.id === e.courseId)
        return {
            ...course,
            enrollmentDate: e.enrollmentDate,
            progress: e.progress || 0,
            grade: e.grade || "N/A",
            attendance: e.attendance || "100%",
            status: e.status
        }
    })

    // 4. Calculate stats based on these shared courses
    const totalClasses = 12 // Mocked sum of sessions
    const avgAttendance = "96%" // Mocked average
    const nextClass = "Monday, 4:00 PM" // Mocked

    return (
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="flex items-center space-x-4">
                <Link href="/tutor/students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft size={20} />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Student Profile</h1>
                    <p className="text-slate-500">View performance and manage courses</p>
                </div>
            </div>

            {/* Profile Header */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
                        <div className="h-24 w-24 bg-gradient-to-br from-primary to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-3xl shadow-lg ring-4 ring-primary/10">
                            {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="text-center md:text-left">
                            <h2 className="text-2xl font-bold text-slate-900">{student.name}</h2>
                            <p className="text-slate-500 mb-2">Student ID: #{studentId.toUpperCase()}</p>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-100">
                                    {enrolledCourses.length} Active Courses
                                </span>
                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100">
                                    Active since {student.joinDate}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex space-x-3">
                        <Link href="/tutor/messages">
                            <Button className="space-x-2">
                                <MessageSquare size={16} />
                                <span>Message Student</span>
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                            <BookOpen size={20} />
                        </div>
                        <span className="text-slate-500 font-medium">Classes Taken</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{totalClasses}</p>
                    <p className="text-sm text-slate-400 mt-1">With you</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-green-50 rounded-lg text-green-600">
                            <CheckCircle size={20} />
                        </div>
                        <span className="text-slate-500 font-medium">Attendance Rate</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900">{avgAttendance}</p>
                    <p className="text-sm text-slate-400 mt-1">Very Consistent</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
                    <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-purple-50 rounded-lg text-purple-600">
                            <Calendar size={20} />
                        </div>
                        <span className="text-slate-500 font-medium">Next Session</span>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 truncate text-lg mt-1">{nextClass}</p>
                    <p className="text-sm text-slate-400 mt-1">Mathematics (GCSE)</p>
                </div>
            </div>

            {/* Courses & Performance */}
            <div className="space-y-6">
                <h3 className="text-xl font-bold text-slate-900">Enrolled Courses & Performance</h3>
                <div className="grid grid-cols-1 gap-6">
                    {enrolledCourses.map((course) => (
                        <div key={course.id} className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h4 className="text-lg font-bold text-slate-900">{course.name}</h4>
                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>Enrolled: {course.enrollmentDate}</span>
                                        <span className="flex items-center">
                                            <TrendingUp size={14} className="mr-1 text-primary" />
                                            Grade: {course.grade}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex-1 max-w-sm">
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="font-medium text-slate-700">Course Progress</span>
                                        <span className="font-bold text-primary">{course.progress}%</span>
                                    </div>
                                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-primary rounded-full transition-all duration-500"
                                            style={{ width: `${course.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {enrolledCourses.length === 0 && (
                        <div className="p-12 text-center bg-slate-50 rounded-xl border border-dashed border-slate-200 text-slate-500">
                            No active enrollments found for this student with you.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
