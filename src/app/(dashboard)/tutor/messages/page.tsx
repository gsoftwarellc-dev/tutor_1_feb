import MessagesInterface from "@/components/shared/messages-interface"

export default function TutorMessagesPage() {
    const contacts = [
        // Admin
        {
            id: 1,
            name: "Admin Support",
            role: "Administrator",
            lastMessage: "Please submit your monthly report by Friday.",
            time: "11:00 AM",
            unread: 3,
            online: true
        },
        // Students
        {
            id: 2,
            name: "Alex Johnson",
            role: "Student (Math & Physics)",
            lastMessage: "I have a question about Question 5.",
            time: "Yesterday",
            unread: 0,
            online: false
        },
        {
            id: 3,
            name: "Sophie Miller",
            role: "Student (Physics)",
            lastMessage: "Can we reschedule tomorrow's class?",
            time: "09:30 AM",
            unread: 1,
            online: true
        },
        // Parents
        {
            id: 4,
            name: "Sarah Johnson",
            role: "Parent (Alex Johnson)",
            lastMessage: "Regarding Alex's progress in Algebra.",
            time: "2 days ago",
            unread: 0,
            online: false
        }
    ]

    return <MessagesInterface contacts={contacts} />
}
