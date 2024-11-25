// src/App.js
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import image5a from './images/4.png';
import image5b from './images/5.png';
import image5c from './images/9.jpg';
import image5d from './images/10.jpg';
import image5e from './images/11.jpg';
import { FaDiscord, FaYoutube, FaTwitch } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { GiSoccerBall } from 'react-icons/gi';
import { FaShoppingCart } from 'react-icons/fa';

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

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: ${fadeIn} 1s ease-in-out; // Apply fade-in animation
`;

// Styled component for the clock
const ClockContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 30px;
  color: white;
  font-family: 'Roboto', sans-serif;
  font-size: 3em; // Larger font size for modern look
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7); // Add shadow for better readability
`;

// Styled component for icon grid
const IconGrid = styled.div`
  position: absolute;
  top: 40px;
  right: 40px;
  display: grid;
  grid-template-columns: repeat(2, minmax(80px, auto));
  gap: 20px;
`;

const IconWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 15px;
  width: 80px; // Square shape
  height: 80px; // Square shape
  box-shadow: 0px 4px 6px rgba(0,0,0,0.1);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    background-color: rgba(255,255,255,0.3);
    box-shadow: 0px 6px 8px rgba(0,0,0,0.2);
    cursor: pointer; // Change cursor on hover
}
`;

const StyledIcon = styled.div`
    font-size: 30px; // Adjust icon size
    color: white; // Icon color
    margin-bottom: 5px; // Space between icon and label
`;

const IconLabel = styled.span`
    font-size: 10px; // Font size for labels
    color: white; // Label color
    text-shadow:1px1px2pxrgba(0,0,0,0.5); // Shadow for better readability
`;

function App() {
    const images = [image5a, image5b, image5c, image5d, image5e];
    
    const [currentImage, setCurrentImage] = useState(images[0]);
    
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const intervalId = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * images.length);
            setCurrentImage(images[randomIndex]);
        }, 10000); // Change image every ten seconds

        return () => clearInterval(intervalId);
    }, [images]);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            setTime(new Date());
        },1000); // Update time every second

        return () => clearInterval(timeInterval);
    }, []);

    return (
        <FullScreenImage>
            <Image src={currentImage} alt="Random" />
            <ClockContainer>
                {time.toLocaleTimeString()}
            </ClockContainer>
            <IconGrid>
                <IconWrapper>
                    <StyledIcon><FaDiscord /></StyledIcon>
                    <IconLabel>Discord</IconLabel>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaYoutube /></StyledIcon>
                    <IconLabel>YouTube</IconLabel>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaTwitch /></StyledIcon>
                    <IconLabel>Twitch</IconLabel>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><SiGmail /></StyledIcon>
                    <IconLabel>Gmail</IconLabel>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><GiSoccerBall /></StyledIcon>
                    <IconLabel>FotMob</IconLabel>
                </IconWrapper>
                <IconWrapper>
                    <StyledIcon><FaShoppingCart /></StyledIcon>
                    <IconLabel>FINN.no</IconLabel>
                </IconWrapper>
            </IconGrid>
        </FullScreenImage>
    );
}

export default App;