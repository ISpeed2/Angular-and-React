import StudentCard from './StudentCard';

export default function StudentList({ students, sortBy }) {
  if (students.length === 0) return <p className="empty">Студентов пока нет.</p>;

  // Сортируем копию: массив из пропсов остаётся неизменным.
  const sortedStudents = sortBy === 'name'
    ? [...students].sort((a, b) => a.name.localeCompare(b.name, 'ru'))
    : students;

  return (
    <div className="student-list">
      {sortedStudents.map((student) => <StudentCard key={student.id} student={student} />)}
    </div>
  );
}
