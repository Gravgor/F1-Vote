import React from 'react';
import '../css/font.css';
import './css/adminLogin.css';
import { Box, TextField, Button, Input } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';



export class AdminPanelLogin extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
            loginFrontEnd: 'gravgor',
            passwordFrontEnd: 'gravgor',
        }
        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
    }

    setLogin(e){
        let login = e.target.value;
        this.setState({
            login: login,
        });
    }
    setPassword(e){
        let password = e;
        this.setState({
            password: password,
        });
    }


    login(){
        const login = this.state.login;
        const password = this.state.password;
        if(login && password){
            const frontEndLogin = this.state.loginFrontEnd;
            const frontEndPassword = this.state.passwordFrontEnd;
            if(login === frontEndLogin && password === frontEndPassword){
                console.log('ok')
            }
        }
    }

    render(){
        return(
            <div>
        <div className='background'></div>
       <Box 
       component='form'
       sx={{
        width: 300,
        height: 400,
        backgroundColor: 'lightBlue',
        opacity: 0.8,
        borderRadius: 5,
        margin: '150px auto',
       }}
       >
        <h1 style={{marginLeft: '60px', marginBottom: '30px'}}>ADMIN</h1>
        <TextField required id='login' label='Login' variant='outlined'style={{marginTop: '40px', marginLeft: '30px'}} onChange={(e) => this.setLogin(e)} />
        <TextField required id='Password' label='Password' variant='outlined' type='password' style={{ marginLeft: '30px', marginTop: '15px'}} onChange={(e) => this.setPassword(e.target.value)} />
        <Button
          variant='contained'
          color='primary'
          endIcon={<LoginIcon/>}
          style={{marginLeft: '90px', marginTop: '35px'}}
          onClick={() => this.login()}
          
          >Log in!</Button>
       </Box>

    </div>

        )
    }


}