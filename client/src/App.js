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
  position: relative;
  overflow: hidden;
`;

// Styled component for the main image
const Image = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: opacity 1s ease-in-out;
  opacity: ${props => props.active ? 1 : 0};
`;

// Styled component for the clock
const ClockContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 72px;
  font-family: 'Arial', sans-serif;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  z-index: 3; // Ensure clock is above images
`;

// Styled component for weather information
const WeatherContainer = styled.div`
  position: absolute;
  top: 100px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  font-family: 'Arial', sans-serif;
  color: white;
  z-index: 3; // Ensure weather is above images
`;

// Styled component for icon grid
const IconGrid = styled.div`
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 20px;
`;


// Styled component for search input
const SearchInput = styled.input`
  position: absolute;
  bottom: 150px; 
  left: 50%;
  transform: translateX(-50%);
  width: 500px; 
  padding: 10px;
  border-radius: 15px;
  border: none;
  
    transition: all .3s ease;     
    background-color: rgba(255,255,255,0.8);
    
    &:hover {
      outline:none; 
      background-color : rgba(255,255,255,0.2); 
      backdrop-filter : blur(5px);
      padding :15px; 
    }

    &:focus {
      outline:none; 
      background-color : rgba(255,255,255,0.2); 
      backdrop-filter : blur(5px);
      padding :15px; 
      color:white; 
      width: 600px;
    }
`;

const IconWrapper = styled.a`
    display:flex; 
    align-items:center; 
    justify-content:center; 
    background-color : rgba(255,255,255,0.2);
    backdrop-filter : blur(5px);
    border-radius :15px; 
    width :80px; 
    height :80px; 
    text-decoration:none;

    &:hover {
        transform : scale(1.05);
        background-color : rgba(255,255,255,0.3);
        box-shadow :0px6px8pxrgba(0,0,0,0.2);
        cursor:pointer; // Change cursor on hover
    }
`;

const StyledIcon = styled.div`
    font-size :30px; 
    color:white; 
`;

const Clock = () => {
    const [time, setTime] = useState(new Date().toLocaleTimeString('no-NO', { timeZone: 'Europe/Oslo' }));

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(new Date().toLocaleTimeString('no-NO', { timeZone: 'Europe/Oslo' }));
        }, 1000);

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
    
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 10000); // Change image every ten seconds

        return () => clearInterval(intervalId);
    }, [images.length]);

    return (
        <FullScreenImage>
            {images.map((img, index) => (
                <Image 
                    key={index} 
                    src={img} 
                    alt={`Background ${index +1}`} 
                    active={index === currentImageIndex}
                />
            ))}
            <Clock />
            <Weather />
            <SearchInput placeholder="Search..." />
            <IconGrid>
                <IconWrapper href="https://discord.com" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><FaDiscord /></StyledIcon>
                </IconWrapper>
                <IconWrapper href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><FaYoutube /></StyledIcon>
                </IconWrapper>
                <IconWrapper href="https://twitch.tv" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><FaTwitch /></StyledIcon>
                </IconWrapper>
                <IconWrapper href="https://mail.google.com" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><SiGmail /></StyledIcon>
                </IconWrapper>
                <IconWrapper href="https://www.fotmob.com" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><GiSoccerBall /></StyledIcon>
                </IconWrapper>
                <IconWrapper href="https://www.finn.no" target="_blank" rel="noopener noreferrer">
                    <StyledIcon><FaShoppingCart /></StyledIcon>
                </IconWrapper>
            </IconGrid>
        </FullScreenImage>
    );
}

export default App;
