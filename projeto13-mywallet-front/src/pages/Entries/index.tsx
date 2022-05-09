import { useState } from "react";
import styled from "styled-components";
import { StyledHeader, StyledInput, StyledSubmitButton } from "../../components";
import { EntryPage } from "./types";

export default (props:EntryPage) => {
    
    const [value,setValue] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    
    const saveCredit = () => {};
    const saveDebit = () => {};
    const updateEntry = () => {};
    const deleteEntry = () => {};

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
                <StyledSubmitButton type="submit">{entries[props.type].button}</StyledSubmitButton>
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