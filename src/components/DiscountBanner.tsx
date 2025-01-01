import { useState, useEffect } from "react";
import { X, Copy, Check } from "lucide-react";

const calculateTimeLeft = () => {
  const difference = new Date('2025-01-31T23:59:59').getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return {
      days: '00',
      hours: '00',
      minutes: '00',
      seconds: '00'
    };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0'),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24).toString().padStart(2, '0'),
    minutes: Math.floor((difference / 1000 / 60) % 60).toString().padStart(2, '0'),
    seconds: Math.floor((difference / 1000) % 60).toString().padStart(2, '0')
  };
};

interface DiscountBannerProps {
  onClose: () => void;
}

export const DiscountBanner = ({ onClose }: DiscountBannerProps) => {
  const [showDiscount, setShowDiscount] = useState(true);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [copied, setCopied] = useState(false);
  const code = "WINTER24";

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);
      
      if (Object.values(newTimeLeft).every(value => value === '00')) {
        setShowDiscount(false);
        onClose();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const handleClose = () => {
    setShowDiscount(false);
    onClose();
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!showDiscount) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-primary text-white py-3 px-4 flex justify-center items-center" style={{ zIndex: 100 }}>
      <div className="flex items-center justify-center space-x-4 max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 font-sans">
          <span className="text-sm">
            Spare 20% mit dem Code: 
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center space-x-2 bg-white/10 px-3 py-1 rounded hover:bg-white/20 transition-colors"
          >
            <span className="font-mono font-bold">{code}</span>
            {copied ? (
              <Check className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          <div className="hidden sm:flex items-center space-x-2 text-sm">
            <span>Endet in:</span>
            <div className="flex space-x-1">
              <span>{timeLeft.days}d</span>
              <span>{timeLeft.hours}h</span>
              <span>{timeLeft.minutes}m</span>
              <span>{timeLeft.seconds}s</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleClose}
          className="absolute right-4 hover:opacity-80"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};