import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, Menu, MenuItem, IconButton, ListItemIcon, Tabs, Tab, CircularProgress } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { useNavigate } from 'react-router-dom';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Visualizations Component with Card Slider
const Visualizations = () => {
    const [visualizations, setVisualizations] = useState({});
    const [loading, setLoading] = useState(true); 
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchVisualizations = async () => {
            setLoading(true); // Set loading to true before fetching data
            try {
                const response = await fetch('https://us-central1-patientengagement-373605.cloudfunctions.net/azure-test-waf-1/hackathon');
                const data = await response.json();

                if (data.status === 'success') {
                    setVisualizations(data.visualizations);
                } else {
                    console.error('Error fetching visualizations:', data.message);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchVisualizations();
    }, []);

    // Slider settings for react-slick
    const sliderSettings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    const buttonStyle = (position) => ({
        position: 'absolute',
        top: '50%',
        [position]: '10px',
        transform: 'translateY(-50%)',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: 'none',
        borderRadius: '50%',
        padding: '10px',
        cursor: 'pointer',
        zIndex: 1,
        fontSize: '18px',
    });

    return (
        <div style={{ position: 'relative' }}>
            {/* Main Visualizations heading */}
            {/* <h4 style={{ 
                color: '#c92020',  
                textTransform: 'uppercase',  
                marginTop: '20px', 
                marginBottom: '10px',  
                textAlign: 'center', 
            }}>
                Visualizations
            </h4> */}
          
            {loading ? ( // Conditional rendering for loader
                <Box display="flex" justifyContent="center" alignItems="center" style={{ height: '450px' }}>
                    <CircularProgress size={60} />
                </Box>
            ) : (
                <>
                    {/* Slider with visualizations */}
                    <Slider {...sliderSettings} ref={sliderRef}>
                        {Object.entries(visualizations).map(([key, value]) => (
                            <div key={key}>
                                {/* Graph heading with first letter capitalized */}
                                <h4 style={{ 
                                    textTransform: 'capitalize',  
                                    marginBottom: '8px',  
                                    textAlign: 'center',  
                                }}>
                                    {key.replace(/_/g, ' ').toLowerCase()}
                                </h4>

                                {/* Visualization Image */}
                                <img 
                                    src={`data:image/png;base64,${value}`} 
                                    alt={key} 
                                    style={{ 
                                        maxWidth: '100%',  
                                        maxHeight: '450px',  
                                        width: 'auto', 
                                        height: 'auto', 
                                        margin: '0 auto', 
                                        display: 'block' 
                                    }} 
                                />
                            </div>
                        ))}
                    </Slider>
                    <button 
                        onClick={() => sliderRef.current.slickPrev()} 
                        style={buttonStyle('left')}
                    >
                        &#10094; {/* Left arrow */}
                    </button>
                    <button 
                        onClick={() => sliderRef.current.slickNext()} 
                        style={buttonStyle('right')}
                    >
                        &#10095; {/* Right arrow */}
                    </button>
                </>
            )}
        </div>
    );
}

// Dashboard Component
export default function Dashboard() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [selectedTab, setSelectedTab] = React.useState(0);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleProfileClick = () => {
        handleClose();
        navigate('/profile'); // Navigate to Profile page
    };

    const handleLogout = () => {
        handleClose();
        navigate('/logout'); // Redirect to the logout page
    };

    const handleTabChange = (event, newValue) => {
        setSelectedTab(newValue);

        // Navigate to Document Q/A page when that tab is selected
        if (newValue === 1) { // Assuming the Document Q/A tab is at index 1
            navigate('/document-qa');
        }
    };

    return (
        <Box sx={{ padding: 0.5, backgroundColor: '#aec7f1', height: '110vh' }}>
            {/* Dashboard Header with Tabs */}
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box display="flex" alignItems="center">
                    <DashboardIcon sx={{ fontSize: 32, marginRight: 1 }} />
                    <Typography 
                        variant="h6" 
                        align="center" 
                        sx={{ whiteSpace: 'nowrap', marginRight: 2 }} // Prevent line break and add margin
                    >
                        One Customer View
                    </Typography>

                    {/* Tabs for different sections */}
                    <Tabs 
                        value={selectedTab} 
                        onChange={handleTabChange} 
                        sx={{ marginLeft: 2, minHeight: '40px', flexGrow: 1 }} // Added flexGrow for responsiveness
                        variant="scrollable"  // Make tabs scrollable
                        scrollButtons="auto"  // Automatically show scroll buttons when necessary
                    >
                        <Tab label="Search" sx={{ minWidth: '80px', padding: '6px 8px' }} />
                        <Tab label="Chat Support" sx={{ minWidth: '100px', padding: '6px 8px' }} />
                        <Tab label="Voice Assistant" sx={{ minWidth: '120px', padding: '6px 8px' }} />
                        <Tab label="Language Translation" sx={{ minWidth: '150px', padding: '6px 8px' }} />
                        <Tab label="Order Status" sx={{ minWidth: '100px', padding: '6px 8px' }} />
                        <Tab label="Social Channels" sx={{ minWidth: '120px', padding: '6px 8px' }} />
                        <Tab label="Product Recommendations" sx={{ minWidth: '200px', padding: '6px 8px' }} />
                    </Tabs>
                </Box>

                <IconButton onClick={handleMenu}>
                    <AccountCircle style={{ color: 'black', fontSize: '40' }} />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleProfileClick}>
                        <ListItemIcon>
                            <PersonIcon fontSize="small" />
                        </ListItemIcon>
                        My Profile
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <SettingsIcon fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>
                        <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </Box>

            {/* Visualizations Section */}
            <Visualizations />
        </Box>
    );
}
