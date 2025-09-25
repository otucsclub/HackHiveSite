import React, { useEffect, useRef, useState } from "react";
import brilliant_catalyst from "../assets/brilliant_catalyst_logo.png";
import microsoft from "../assets/microsoft_logo.png";
import enactus from "../assets/enactus_logo.png";
import dayforce from "../assets/dayforce_logo.png";

export default function Sponsors() {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect(); // only animate once
                    }
                });
            },
            { threshold: 0.2 } // trigger when 20% visible
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);
//
    return (
        <section
            ref={ref}
            className={`sponsors fade-in-section ${isVisible ? "visible" : ""}`}
        >
            <div className="header">
                <h1>Previous HackHive Sponsors</h1>
            </div>
            <div className="sponsor__container">
                <div className="left__column">
                    <img src={microsoft} alt="microsoft" />
                    <img src={enactus} alt="enactus" />
                </div>
                <div className="right__column">
                    <img src={dayforce} alt="dayforce" />
                    <img src={brilliant_catalyst} alt="brilliant catalyst" />
                </div>
            </div>
        </section>
    );
}
