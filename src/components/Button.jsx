export default function Button({ children, onClick, style={} }) {
  return (
    <button className='btn' style={style} onClick={onClick}>
      {children}
    </button>
  );
}
