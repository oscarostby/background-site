import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import image5a from './images/4.png';
import image5b from './images/5.png';
import image5c from './images/9.jpg';
import image5d from './images/10.jpg';
import image5e from './images/11.jpg';
import { FaDiscord, FaYoutube, FaTwitch, FaShoppingCart } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { GiSoccerBall } from 'react-icons/gi';

// Keyframes for fade-in animation
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

// Styled component for full screen image display
const FullScreenImage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
`;

// Styled component for the main image
const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 1s ease-in-out; // Apply fade-in animation
`;

// Styled component for the clock
const ClockContainer = styled.div`
  position: absolute;
  top: 20px; // Positioning at the top
  left: 50%;
  transform: translateX(-50%);
  font-size: 72px; // Increased font size
  font-family: 'Arial', sans-serif; // Modern font
  color: white; // Clock color
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5); // Optional shadow for better visibility
`;

// Styled component for weather information
const WeatherContainer = styled.div`
  position: absolute;
  top: 100px; // Positioning below the clock
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px; // Adjust font size
  font-family: 'Arial', sans-serif; // Modern font
  color: white; // Weather info color
`;

// Styled component for icon grid
const IconGrid = styled.div`
  position: absolute;
  bottom: 30px; // Positioning at the bottom
  left: 50%; // Centering horizontally
  transform: translateX(-50%); // Adjusting for centering
  display: flex; // Using flexbox for layout
  gap: 20px; // Space between icons
`;

// Styled component for search input
const SearchInput = styled.input`
  position: absolute;
  bottom: 150px; // Position above icons (30px above)
  left: 50%;
  transform: translateX(-50%);
  width: 500px; // Initial width
  padding: 10px;
  border-radius: 15px;
  border: none;
  transition: all 0.3s ease;     
  background-color: rgba(255,255,255,0.8); // Optional background change on focus
    
  &:hover {
    width: 500px; // Expanded width on focus
    outline: none; // Remove default outline
    background-color: rgba(255,255,255,0.2); // Optional background change on focus
    backdrop-filter: blur(5px);
    padding: 15px;

}
  &:focus {
    width: 800px; // Expanded width on focus
    outline: none; // Remove default outline
    background-color: rgba(255,255,255,0.2); // Optional background change on focus
    backdrop-filter: blur(5px);
    width: 600px; // Initial width
    padding: 15px;
    color: white;
}
`;

const IconWrapper = styled.div`
    display:flex;
    align-items:center; // Centering vertically
    justify-content:center; // Centering horizontally
    background-color : rgba(255,255,255,0.2);
    backdrop-filter : blur(5px);
    border-radius :15px;
    width :80px; // Fixed width for uniformity
    height :80px; // Fixed height for uniformity

    &:hover {
        transform : scale(1.05);
        background-color : rgba(255,255,255,0.3);
        box-shadow :0px6px8pxrgba(0,0,0,0.2);
        cursor:pointer; // Change cursor on hover
    }
`;

const StyledIcon = styled.div`
    font-size :30px; // Adjust icon size
    color:white; // Icon color
`;

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('no-NO', { timeZone: 'Europe/Oslo' }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString('no-NO', { timeZone: 'Europe/Oslo' }));
        }, 1000); // Update every second

        return () => clearInterval(intervalId);
    }, []);

    return <ClockContainer>{time}</ClockContainer>;
};

const Weather = () => {
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=924438ae1af442cdb1991319242511&q=Oslo&aqi=no`);
            const data = await response.json();
            setWeather(data);
        };

        fetchWeather();
    }, []);

    return (
        <WeatherContainer>
            {weather ? (
                <div>
                    {weather.location.name}: {weather.current.temp_c}°C, {weather.current.condition.text}
                </div>
            ) : (
                <div>Loading weather...</div>
            )}
        </WeatherContainer>
    );
};

function App() {
    const images = [image5a, image5b, image5c, image5d, image5e];
    
    const [currentImage, setCurrentImage] = useState(images[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setCurrentImage(images[randomIndex]);
        }, 10000); // Change image every ten seconds

        return () => clearInterval(intervalId);
    }, [images]);

    return (
        <FullScreenImage>
            <Image src={currentImage} alt="Random" />
            <Clock />
            <Weather />
            <SearchInput placeholder="Search..." />
            <IconGrid>
                <IconWrapper>
                    <StyledIcon><FaDiscord /></StyledIcon>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaYoutube /></StyledIcon>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaTwitch /></StyledIcon>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><SiGmail /></StyledIcon>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><GiSoccerBall /></StyledIcon>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaShoppingCart /></StyledIcon>
                </IconWrapper>
            </IconGrid>
        </FullScreenImage>
    );
}

export default App;