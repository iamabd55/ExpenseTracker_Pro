import "./Text.css";

const TextAnimatedGradient = ({ text }) => {
  return (
    <span
      className="
        block animate-text-gradient 
        bg-gradient-to-r from-[#ffffff] via-[#b2abe8] to-[#c7d2fe]
        bg-clip-text text-transparent text-4xl font-['Poppins'] font-semibold
        max-w-md w-[85vw] md:text-6xl md:max-w-full md:w-full 
        text-center mx-auto
      "
    >
      {text}
    </span>
  );
};

export default TextAnimatedGradient;
