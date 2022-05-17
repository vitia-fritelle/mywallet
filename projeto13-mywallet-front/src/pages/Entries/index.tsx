import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StyledHeader, StyledInput, StyledSubmitButton } from "../../styles";
import { EntryPage, EntryTypes } from "./types";
import entryAxios from '../../adapters';
import UserContext from "../../contexts/UserContext";
import { ReturnUpBackOutline } from "react-ionicons";
import { Container } from "./styles";
import Entry from "../../models";

export default (props:EntryPage) => {
    
    const location = useLocation();
    const [value,setValue] = useState<string>(
        (location.state as Entry).value.replace('-','')
    );
    const [description, setDescription] = useState<string>(
        (location.state as Entry).description
    );
    const browse = useNavigate();
    const {token} = useContext(UserContext);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const saveEntry = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const entry = props.type === EntryTypes.NEWDEBIT?'-'+value:value;
        entryAxios
        .post(
            '/entry',
            {value: entry,description},config
        )
        .then(() => browse('/home'))
        .catch(() => alert('Algo deu errado!'));
    };
    const updateEntry = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const entry = props.type === EntryTypes.EDITDEBIT?'-'+value:value;
        entryAxios
        .put(
            `/entry/${(location.state as Entry)._id}`,
            {value: entry,description},config
        )
        .then(() => browse('/home'))
        .catch(() => alert('Algo deu errado!'));
    };
    const entries = [
        {
            header:"Nova entrada",
            button:"Salvar entrada",
            action:saveEntry
        },
        {
            header:"Nova saída",
            button:"Salvar saída",
            action:saveEntry
        },
        {
            header:"Editar entrada",
            button:"Atualizar entrada",
            action:updateEntry
        },
        {
            header:"Editar saída",
            button:"Atualizar saída",
            action:updateEntry
        }
    ]; 
    return (
        <Container>
            <StyledHeader>
                {entries[props.type].header}
                <ReturnUpBackOutline
                    color={'#00000'} 
                    height="25px"
                    width="25px"
                    style={{cursor:'pointer'}}
                    onClick={() => browse(-1)}/>
            </StyledHeader>
            <form onSubmit={entries[props.type].action}>
                <StyledInput
                    required
                    type="text"
                    value={value} 
                    placeholder="Valor" 
                    onChange={(e) => setValue(e.target.value)}/>
                <StyledInput
                    required
                    type="text"
                    value={description} 
                    placeholder="Descrição" 
                    onChange={(e) => setDescription(e.target.value)}/>    
                <StyledSubmitButton type="submit">
                    {entries[props.type].button}
                </StyledSubmitButton>
            </form>
        </Container>
    );
};

