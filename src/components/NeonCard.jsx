const NeonCard = ({ children, className = "" }) => {
  return (
    <div className={`neon-card ${className}`}>
      {children}
    </div>
  );
};

export default NeonCard;
