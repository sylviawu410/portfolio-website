import React, { useEffect, useState } from 'react';

const Typewriter = () => {
  const toRotate = ['Hi, I\'m Si.', 'I am Creative.', 'I Love Design.', 'I Love to Develop.'];
  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % toRotate.length;
      const fullText = toRotate[i];

      setText(prev =>
        isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1)
      );

      setTypingSpeed(isDeleting ? 75 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(prev => prev + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting]);

  return (
    <h1 className="text-xl md:text-xl font-bold text-white text-center mt-10">
      <span className="typewrite relative">
        <span className="wrap">{text}</span>
        <span className="absolute right-0 w-1 h-6 bg-white animate-blink ml-1"></span>
      </span>
    </h1>
  );
};

export default Typewriter;