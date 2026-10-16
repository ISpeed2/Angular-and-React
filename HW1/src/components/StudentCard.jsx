import Badge from './Badge';
import SkillsList from './SkillsList';

export default function StudentCard({ student }) {
  const { name, age, course, city, gpa, skills } = student;
  const stars = Math.round(gpa);

  return (
    <article className="student-card">
      <div className="student-heading">
        <img className="avatar" src={`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}`} alt={`Аватар: ${name}`} width="56" height="56" loading="lazy" />
        <div><h3>{name}</h3><Badge text={`${course} курс`} color={course >= 3 ? '#166534' : '#92400e'} /></div>
      </div>
      <p><strong>Возраст:</strong> {age} лет</p>
      <p><strong>Город:</strong> {city}</p>
      <p><strong>Средний балл:</strong> {gpa} <span aria-hidden="true">{'⭐'.repeat(stars)}{'☆'.repeat(5 - stars)}</span></p>
      {gpa >= 4.5 && <Badge text="🏆 Отличник" color="#166534" />}
      <SkillsList skills={skills} />
    </article>
  );
}
