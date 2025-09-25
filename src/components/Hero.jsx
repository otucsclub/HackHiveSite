import React, { useEffect, useState} from "react";
import honey from "../assets/Honeycomb.svg";

export default function Hero() {
    const [timeLeft, setTimeLeft] = useState({
        days: "--",
        hours: "--",
        minutes: "--",
        seconds: "--",
    });

    useEffect(() => {
        const targetDate = new Date("2026-01-16T00:00:00");

        const updateCountdown = () => {
        const now = new Date();
        const diff = targetDate - now;

        if (diff <= 0) {
            setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        });
        };

        updateCountdown(); // call once on mount
        const interval = setInterval(updateCountdown, 1000);

        return () => clearInterval(interval); // cleanup
    }, []);
    
    return (
        <>
        <section className="hero">
            <div 
                className="hero__bg"
                style={{
                    backgroundImage: `url(${honey})`,
                }}
            />

            <div className="floating__blob"></div>
            <div className="floating__blob2"></div>

            <div className="hovering__blob2" style={{ bottom: "15%", right: "15%" }} />
            <div className="hovering__blob" style={{ top: "35%", right: "25%" }} />

            <div className="wandering__blob" />
            <div className="wandering__blob" style={{ right: "-20%" }} />

            <div className="wandering__glowing__blob" />
            <div className="wandering__glowing__blob2" style={{ right: "-20%" }} />
            {/* spotlight behind text */}
            
            <div className="hero__content">
                <h1 className="hero__title">HackHive 2026</h1>
                <p className="hero__tag"> Where Innovation Swarms.</p>

                <div className="hero__count">
                    {timeLeft.days} days • {timeLeft.hours} Hours • {timeLeft.minutes} Minutes • {timeLeft.seconds} Seconds
                </div>
            </div>
        </section>
        </>
    );
}