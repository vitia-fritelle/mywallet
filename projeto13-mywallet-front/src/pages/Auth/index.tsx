import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import authAxios from "../../adapters";
import { StyledInput, StyledSubmitButton } from "../../components";
import { AuthPage, AuthTypes } from "./types";

export default (props: AuthPage) => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [reTypePassword, setReTypePassword] = useState<string>('');
    const browse = useNavigate();
    let user;

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = 'auth/login';
        const response = authAxios.post(URL, {
            email,
            password
        });
        response.then(({data}) => {
            if (props.setName && props.setToken) {
                props.setName(data.name);
                props.setToken(data.token);
                localStorage.setItem('user',JSON.stringify(data));
                browse('/home');
            }
        });
        response.catch(() => {
            alert('Algo não deu certo :(');
        });
    };

    const register = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const URL = 'auth/register';
        if(password === reTypePassword) {
            const response = authAxios.post(URL, {
                email,
                password,
                name:username,
            });
            response.then(() => {
                browse('/');
            });
            response.catch(() => {
                alert('Algo não deu certo :(');
            });
        } else {
            alert('As senhas não são iguais!');
        }
    };

    useEffect(() => {
        user = localStorage.getItem('user');
        if(user !== null && props.setName && props.setToken) {
            const data = JSON.parse(user);
            props.setName(data.name);
            props.setToken(data.token);
            browse('/home');
        }
    },[user]);

    const isLoginPage = () => props.type === AuthTypes.LOGIN;

    return (
        <Container>
            <StyledHeading>MyWallet</StyledHeading>
            <form onSubmit={isLoginPage()?login:register}>
                {!isLoginPage() 
                    && <UserNameInput
                        userName={username} 
                        setUserName={setUsername}/>
                }
                <StyledInput 
                    required
                    type="email" 
                    value={email}
                    placeholder="E-mail" 
                    onChange={e => setEmail(e.target.value)}/>
                <StyledInput 
                    required
                    type="password"
                    value={password} 
                    placeholder="Senha" 
                    onChange={e => setPassword(e.target.value)}/>
                {!isLoginPage() 
                    && <ReTypePasswordInput 
                        password={reTypePassword} 
                        setPassword={setReTypePassword}/>
                }
                {
                    <StyledSubmitButton type="submit">
                        {isLoginPage()?'Entrar':'Cadastrar'}
                    </StyledSubmitButton>
                }
            </form>
            {   
                isLoginPage()
                ?
                <Link to="/register">
                    Primeira vez? Cadastre-se!
                </Link>
                :
                <Link to="/">
                    Já tem uma conta? Entre agora!
                </Link>
            }
        </Container>
    );
};

const ReTypePasswordInput = ({password, setPassword}:{
    password: string,
    setPassword: (password:string) => void
}) => {
    return (
        <StyledInput 
            required
            type="password"
            value={password} 
            placeholder="Confirme a senha" 
            onChange={e => setPassword(e.target.value)}/>
    );
}

const UserNameInput = ({userName, setUserName}:{
    userName: string,
    setUserName: (password:string) => void
}) => {
    return (
        <StyledInput 
            required
            type="text"
            value={userName} 
            placeholder="Nome" 
            onChange={e => setUserName(e.target.value)}/>
    );
}

const StyledHeading = styled.h1`

    font-family: 'Saira Stencil One';
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    margin-bottom: 24px;
`;

const Container = styled.div`

    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    height: 100%;
    a {
        font-weight: 700;
        font-size: 15px;
        line-height: 18px;
        margin-top: 36px;
        font-family: 'Raleway';
    }
`;