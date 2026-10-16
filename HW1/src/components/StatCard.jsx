export default function StatCard({ label, value, color = '#f0f0f0', icon }) {
  return (
    <div className="stat-card" style={{ backgroundColor: color }}>
      <div className="stat-value"><span aria-hidden="true">{icon}</span> {value}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}
