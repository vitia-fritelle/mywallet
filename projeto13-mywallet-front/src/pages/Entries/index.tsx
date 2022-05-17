import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { StyledHeader, StyledInput, StyledSubmitButton } from "../../components";
import { EntryPage } from "./types";
import entryAxios from '../../adapters';
import UserContext from "../../contexts/UserContext";

export default (props:EntryPage) => {
    
    const [value,setValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const browse = useNavigate();
    const {token} = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const saveCredit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        entryAxios.post('/entry',{value,description},config).then(() => {
            browse('/home');
        }).catch(() => {
            alert('Algo deu errado!');
        });
    };
    const saveDebit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const debit = '-'+value;
        entryAxios.post('/entry',{value: debit,description},config).then(() => {
            browse('/home');
        }).catch(() => {
            alert('Algo deu errado!');
        });
    };
    const updateEntry = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        entryAxios.put('/entry',{value,description},config).then(() => {
            browse('/home');
        }).catch(() => {
            alert('Algo deu errado!');
        });
    };
    const deleteEntry = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        entryAxios.delete('/entry',config).then(() => {
            browse('/home');
        }).catch(() => {
            alert('Algo deu errado!');
        });
    };

    const entries = [
        {
            header:"Nova entrada",
            button:"Salvar entrada",
            action:saveCredit
        },
        {
            header:"Nova saída",
            button:"Salvar saída",
            action:saveDebit
        },
        {
            header:"Editar entrada",
            button:"Atualizar entrada",
            action:updateEntry
        },
        {
            header:"Editar saída",
            button:"Atualizar saída",
            action:deleteEntry
        }
    ]; 
    return (
        <Container>
            <StyledHeader>{entries[props.type].header}</StyledHeader>
            <form onSubmit={entries[props.type].action}>
                <StyledInput
                    required
                    type="text"
                    value={value} 
                    placeholder="Valor" 
                    onChange={e => setValue(e.target.value)}/>
                <StyledInput
                    required
                    type="text"
                    value={description} 
                    placeholder="Descrição" 
                    onChange={e => setDescription(e.target.value)}/>    
                <StyledSubmitButton type="submit">
                    {entries[props.type].button}
                </StyledSubmitButton>
            </form>
        </Container>
    );
};

const Container = styled.div`
    header {
        margin-bottom: 40px;
        margin-top: 25px;
    }

`