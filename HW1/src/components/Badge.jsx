export default function Badge({ text, color = '#4338ca' }) {
  return <span className="badge" style={{ backgroundColor: color }}>{text}</span>;
}
