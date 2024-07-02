import React, { useState, useRef, KeyboardEvent, ClipboardEvent } from 'react';

interface OTPInputProps {
  length: number;
  onComplete: (otp: string) => void;
}

export const OTPInput: React.FC<OTPInputProps> = ({ length, onComplete }) => {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      (element.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (index > 0 && !otp[index]) {
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      }
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, length);
    const pastedChars = pastedData.split('').filter(char => !isNaN(Number(char)));

    if (pastedChars.length > 0) {
      const newOtp = [...otp];
      pastedChars.forEach((char, index) => {
        if (index < length) {
          newOtp[index] = char;
        }
      });
      setOtp(newOtp);

      const nextEmptyIndex = newOtp.findIndex(val => val === '');
      const indexToFocus = nextEmptyIndex === -1 ? length - 1 : nextEmptyIndex;
      inputRefs.current[indexToFocus]?.focus();
    }
  };

  React.useEffect(() => {
    if (otp.every(val => val !== '')) {
      onComplete(otp.join(''));
    }
  }, [otp, onComplete]);

  return (
    <div className="flex justify-center space-x-2">
      {otp.map((data, index) => (
        <input
          key={index}
          ref={el => inputRefs.current[index] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={data}
          onChange={e => handleChange(e.target, index)}
          onKeyDown={e => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="w-12 h-12 text-center text-xl border-2 border-gray-300 rounded-md focus:border-blue-500 focus:outline-none"
        />
      ))}
    </div>
  );
};