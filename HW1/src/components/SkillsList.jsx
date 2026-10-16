export default function SkillsList({ skills = [] }) {
  return (
    <div className="skills">
      <strong>Навыки</strong>
      {skills.length === 0 ? <p>Навыки пока не указаны</p> : (
        <ul>{skills.map((skill) => <li key={skill}>{skill}</li>)}</ul>
      )}
    </div>
  );
}
