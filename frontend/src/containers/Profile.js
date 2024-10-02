import React from 'react'; 
import { Box, Button, Card, Typography, TextField } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import MessageIcon from '@mui/icons-material/Message';
import Avatar from '@mui/material/Avatar';

const Profile = () => {
  return (
    <Box sx={{ backgroundColor: '#f4f6f8', paddingBottom: '50px' }}>
      {/* Banner Section */}
      <Box
        sx={{
          backgroundImage: `url('/mnt/data/image.png')`, // Use the image you've uploaded
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: '250px',  // Slightly reduce the height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'black', padding: '20px' }}>
          <Typography variant="h4" fontWeight="bold">
            Hello Jesse
          </Typography>
          {/* <Typography sx={{ color: 'black', maxWidth: '600px', margin: 'auto' }}>
            This is your profile page. You can see the progress you’ve made with your work and manage your projects or assigned tasks.
          </Typography> */}
          <Button
            variant="contained"
            sx={{ mt: 2, backgroundColor: '#00acc1', color: 'white' }}
          >
            Edit Profile
          </Button>
        </Box>
      </Box>

      {/* Main Content Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '-60px',  
          padding: '-70px',    
          maxWidth: '1200px',
          margin: 'auto',
        }}
      >
        {/* User Information Section */}
        <Box
          sx={{
            width: '65%',
            backgroundColor: 'white',
            padding: '25px',
            borderRadius: '10px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
            marginRight: '20px',
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: '20px' }}>
            My Account
          </Typography>

          <form>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <TextField label="Username" fullWidth sx={{ marginRight: '15px' }} />
              <TextField label="Email Address"  fullWidth />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <TextField label="First Name" fullWidth sx={{ marginRight: '15px' }} />
              <TextField label="Last Name"  fullWidth />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <TextField label="Address"  fullWidth /> 
              {/* defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09" */}
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <TextField label="City"  fullWidth sx={{ marginRight: '15px' }} />
              <TextField label="Country" fullWidth sx={{ marginRight: '15px' }} />
              <TextField label="Postal Code" fullWidth />
            </Box>
          </form>
        </Box>

        {/* Profile Card Section */}
            {/* <Card
            sx={{
                width: '30%',
                backgroundColor: 'white',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                textAlign: 'center',
            }}
            >
            <Avatar
                alt="Jessica Jones"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                sx={{ width: 100, height: 100, margin: 'auto', marginBottom: '10px' }}
            />
            <Typography variant="h6" fontWeight="bold">Jessica Jones, 27</Typography>
            <Typography color="textSecondary" sx={{ marginBottom: '10px' }}>
                Bucharest, Romania
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginBottom: '15px' }}>
                Solution Manager - Creative Tim Officer
                <br />
                University of Computer Science
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-around', marginBottom: '15px' }}>
                <Button variant="contained" startIcon={<ConnectWithoutContactIcon />} sx={{ backgroundColor: '#00acc1' }}>
                Connect
                </Button>
                <Button variant="outlined" startIcon={<MessageIcon />}>
                Message
                </Button>
            </Box>

            <Typography variant="body2" color="textSecondary" sx={{ marginTop: '15px' }}>
                Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick Murphy — writes, performs, and records all of his own music.
            </Typography>
            <Button sx={{ marginTop: '15px', color: '#00acc1' }}>Show more</Button>
            </Card> */}
      </Box>
    </Box>
  );
};

export default Profile;
