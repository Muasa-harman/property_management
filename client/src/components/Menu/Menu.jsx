import React, { useState } from 'react';
import './Dropdown.css'; // Import your CSS file

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = (event) => {
    if (!event.target.matches('.dropbtn')) {
      setIsOpen(false);
    }
  };

  return (
    <div>
      <h2>Clickable Dropdown</h2>
      <p>Click on the button to open the dropdown menu.</p>

      <div className="dropdown" onClick={closeDropdown}>
        <button onClick={toggleDropdown} className="dropbtn">Dropdown</button>
        <div id="myDropdown" className={`dropdown-content ${isOpen ? 'show' : ''}`}>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;