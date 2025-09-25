import React from 'react';
import { useEffect, useRef, useState } from 'react';
import honeycomb from "../assets/honeycomb-down.svg";

const universities = [
  // Alberta
  "Athabasca University",
  "Concordia University of Edmonton",
  "King's University",
  "MacEwan University",
  "Mount Royal University",
  "University of Alberta",
  "University of Calgary",
  "University of Lethbridge",

  // British Columbia
  "Capilano University",
  "Emily Carr University of Art + Design",
  "Fairleigh Dickinson University",
  "Island University",
  "Kwantlen Polytechnic University",
  "Quest University Canada",
  "Royal Roads University",
  "Simon Fraser University",
  "Thompson Rivers University",
  "Trinity Western University",
  "University of British Columbia",
  "University of Northern British Columbia",
  "University of the Fraser Valley",
  "University of Victoria",
  "Vancouver Island University",

  // Manitoba
  "Booth University College",
  "Brandon University",
  "Canadian Mennonite University",
  "Providence University College",
  "University of Manitoba",
  "University of Winnipeg",

  // New Brunswick
  "Crandall University",
  "Mount Allison University",
  "St. Stephen's University",
  "St. Thomas University",
  "Université de Moncton",
  "University of New Brunswick",

  // Newfoundland and Labrador
  "Memorial University of Newfoundland",

  // Northwest Territories
  "Aurora College",

  // Nova Scotia
  "Acadia University",
  "Art Gallery of Nova Scotia",
  "Atlantic School of Theology",
  "Cape Breton University",
  "Dalhousie University",
  "Emily Carr University of Art + Design",
  "Mount Saint Vincent University",
  "NSCAD University",
  "Saint Francis Xavier University",
  "Saint Mary's University",
  "University of King's College",

  // Nunavut
  "Nunavut Arctic College",

  // Ontario
  "Algoma University",
  "Brock University",
  "Carleton University",
  "Dominican University College",
  "Huron University College",
  "King's University College",
  "Lakehead University",
  "Laurentian University",
  "McMaster University",
  "Nipissing University",
  "Ontario Institute for Studies in Education",
  "Ontario Tech University",
  "Queen's University",
  "Redeemer University",
  "Royal Military College of Canada",
  "Toronto Metropolitan University",
  "Trent University",
  "University of Guelph",
  "University of Ottawa",
  "University of St. Michael's College",
  "University of Toronto",
  "University of Waterloo",
  "University of Windsor",
  "Wilfrid Laurier University",
  "York University",

  // Prince Edward Island
  "University of Prince Edward Island",

  // Quebec
  "Bishop's University",
  "Concordia University",
  "École de technologie supérieure",
  "École nationale d'administration publique",
  "École Polytechnique de Montréal",
  "HEC Montréal",
  "Institut national de la recherche scientifique",
  "McGill University",
  "Télé-université",
  "Université de Montréal",
  "Université de Sherbrooke",
  "Université du Québec à Chicoutimi",
  "Université du Québec à Montréal",
  "Université du Québec à Rimouski",
  "Université du Québec à Trois-Rivières",
  "Université du Québec en Abitibi-Témiscamingue",
  "Université du Québec en Outaouais",
  "Université Laval",

  // Saskatchewan
  "Briercrest College and Seminary",
  "First Nations University of Canada",
  "Luther College",
  "University of Regina",
  "University of Saskatchewan",

  // Yukon Territory
  "Yukon College",

  // Other/Special Status
  "Other"
].sort();

export default function Form() {
    const ref = useRef(null);
    const searchInputRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);
    const [selectedUniversity, setSelectedUniversity] = useState('');
    const [customUniversity, setCustomUniversity] = useState('');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const filteredUniversities = universities.filter(uni =>
        uni.toLowerCase().includes(searchTerm.toLowerCase())
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                        observer.disconnect();
                    }
                });
            },
            { threshold: 0.2 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) observer.unobserve(ref.current);
        };
    }, []);

    useEffect(() => {
        const container = document.querySelector('.fireflies');
        if (!container) return;

        const fireflyCount = 20;

        for (let i = 0; i < fireflyCount; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');

            // Limit X spawn to 60% width to keep them centered around form
            firefly.style.left = 20 + Math.random() * 60 + 'vw';
            firefly.style.bottom = '0px'; // start below

            firefly.style.animationDuration = 5 + Math.random() * 5 + 's';
            firefly.style.animationDelay = Math.random() * 2 + 's';

            container.appendChild(firefly);

            // Auto-remove to prevent buildup
            setTimeout(() => {
                firefly.remove();
            }, 10000);
        }

        // Optional: respawn every few seconds
        const interval = setInterval(() => {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            firefly.style.left = 20 + Math.random() * 60 + 'vw';
            firefly.style.bottom = '0px';
            firefly.style.animationDuration = 5 + Math.random() * 5 + 's';
            firefly.style.animationDelay = '0s';
            container.appendChild(firefly);
            setTimeout(() => firefly.remove(), 10000);
        }, 800);
        
        return () => clearInterval(interval);
    }, []);
    
    const handleUniversitySelect = (university) => {
        setSelectedUniversity(university);
        setSearchTerm(university === 'Other' ? '' : university);
        setIsDropdownOpen(false);
        if (university !== 'Other') {
            setCustomUniversity('');
        }
    };

    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
        // Focus the search input when dropdown opens
        if (!isDropdownOpen) {
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                }
            }, 100);
        }
    };

    const handleKeyDown = (e) => {
        // If dropdown is closed and user starts typing, open it and focus search
        if (!isDropdownOpen && e.key.length === 1) {
            setIsDropdownOpen(true);
            setTimeout(() => {
                if (searchInputRef.current) {
                    searchInputRef.current.focus();
                    // Add the typed character to the search term
                    setSearchTerm(e.key);
                }
            }, 100);
        }
    };

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || (!selectedUniversity || (selectedUniversity === 'Other' && !customUniversity))) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/hackhive/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    university: selectedUniversity === 'Other' ? customUniversity : selectedUniversity
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                alert('Thank you for joining the hive! Registration successful.');
                // Reset form
                setName('');
                setEmail('');
                setSelectedUniversity('');
                setCustomUniversity('');
                setSearchTerm('');
            } else {
                alert(`Registration failed: ${data.message || 'Please try again.'}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Registration failed: Unable to connect to server. Please try again.');
        }
    };


    return (
        <section className="form" ref={ref}>
            <div className={`form__container ${isVisible ? "visible" : ""}`}>
                <h1>Join the Hive!</h1>
                <p>Sign the form below to express your interest in joining.</p>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="Full Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required 
                    />
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email Address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                    
                    {/* Custom University Dropdown */}
                    <div className="university-dropdown" onKeyDown={handleKeyDown} tabIndex="0">
                        <div
                            className={`dropdown-toggle ${selectedUniversity ? 'selected' : ''}`}
                            onClick={handleDropdownToggle}
                        >
                            {selectedUniversity || 'Select University/Organization'}
                            <span className={`dropdown-arrow ${isDropdownOpen ? 'open' : ''}`}>▼</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                <div className="dropdown-search-container">
                                    <input
                                        ref={searchInputRef}
                                        type="text"
                                        className="dropdown-search"
                                        placeholder="Search universities..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="11" cy="11" r="8"/>
                                        <path d="m21 21-4.35-4.35"/>
                                    </svg>
                                </div>
                                <div className="dropdown-options">
                                    {filteredUniversities.map((university, index) => (
                                        <div
                                            key={index}
                                            className="dropdown-option"
                                            onClick={() => handleUniversitySelect(university)}
                                        >
                                            {university}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Show custom input if "Other" is selected */}
                    {selectedUniversity === 'Other' && (
                        <input
                            type="text"
                            placeholder="Enter your university/organization"
                            value={customUniversity}
                            onChange={(e) => setCustomUniversity(e.target.value)}
                            className="custom-university-input"
                            required
                        />
                    )}

                    <button type="submit">Submit</button>
                </form>
            </div>
            <div 
                className={`form__honeycomb ${isVisible ? "visible" : ""}`}
                style={{ backgroundImage: `url(${honeycomb})` }}
            />

            <div className="fireflies" />
        </section>
    );
}