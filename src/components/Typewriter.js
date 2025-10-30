import React, { useEffect, useState, useRef } from 'react';

const Typewriter = ({
  phrases = [],
  typingSpeed = 100,
  deletingSpeed = 50,
  pauseBeforeDelete = 1000,
  triggerOnce = true, //Stops observing once effect starts
  observe = true,
  typewriterStyle = "",
  isBlinking = true
}) => {

  const [text, setText] = useState('');
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);  //	Only starts animation when triggered by scroll or immediately if observe: false
  const [isDone, setIsDone] = useState(false); //	Stops effect on final phrase
  const elementRef = useRef(null);


  useEffect(() => {
    if (!observe) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting){
          setHasStarted(true);
          if (triggerOnce) observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.3, //Typing starts when 30% of the element is visible
      }
    );

    if (elementRef.current){
      observer.observe(elementRef.current); //attaches the observer to the component’s DOM node using ref
    }

    return () => observer.disconnect();

  },[]);

  useEffect(() => {
    if ( !hasStarted || isDone ) return;

    const current = phrases[loopNum];
    const isArray = phrases.length > 1;

    const handleTyping = () => {
      setText((prev) => {
        const fullText = current;
        if (isDeleting) {
          return fullText.substring(0, prev.length - 1);
        } else {
          return fullText.substring(0, prev.length + 1);
        }
      });

      if( ! isDeleting && text === current){
        if (loopNum === phrases.length - 1){
          setIsDone(true);
        } else {
          setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
        }
      }

      if (isDeleting && text ===''){
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }
    };

    const timeout = setTimeout(
      handleTyping, isDeleting ? deletingSpeed: typingSpeed
    );

    return () => clearTimeout(timeout);
  }, [text, isDeleting, hasStarted]);

  return (
    <span ref = {elementRef} className= {`relative inline-block ${typewriterStyle}`}>
      <span className='wrap'>{text}</span>
      <span className={isBlinking? 'absolute right-0 bottom-0.5 w-1 h-[100%] bg-white animate-blink ml-1' : "" } ></span>
    </span> 

  );
};

export default Typewriter;