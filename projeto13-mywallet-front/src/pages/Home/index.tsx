import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExitOutline, AddCircleOutline, RemoveCircleOutline, CloseOutline  } from 'react-ionicons'
import Entry from '../../models'
import entryAxios from '../../adapters';
import UserContext from '../../contexts/UserContext'
import { Container, HomeHeader, StyledBalance, StyledEntryButton, StyledList, StyledView } from './styles';
import { dateRegex, debitOrCredit, printPrice } from './utils';

export default ({name}: {name:string}) => {

    const [entries, setEntries] = useState<Array<Entry>>([]);
    const browse = useNavigate();
    
    const getTotal = () => entries.reduce((acc,{value}) => {
        return (acc+parseFloat(value));
    },0);
    
    const logout = () => {
        localStorage.removeItem('user');
        browse('/');
    };
    let { token } = useContext(UserContext);
    useEffect(() => {
        const storedToken = localStorage.getItem('user');
        if (!token && storedToken) {
            token = storedToken;
        }
    },[]);
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const getEntries = () => {
        entryAxios.get('/entry', config).then(({data}) => {
            setEntries(data.map((element: Entry) => { 
                const {description, value, date, _id} = element;
                return new Entry(description, value, date, _id);
            }))
        }).catch(() => {
            alert('Algo deu errado!');
        })
    }
    useEffect(getEntries,[]);
    const deleteEntry = (_id:string) => {
        const answer = window.confirm('Você tem certeza que quer deletar ?');
        if (answer) {
            entryAxios.delete(`/entry/${_id}`,config).then(getEntries);
        }
    }
    return (
        <Container>
            <HomeHeader>
                <h2>Olá, {name}</h2>
                <ExitOutline
                    color={'#00000'} 
                    height="25px"
                    width="25px"
                    onClick={logout}
                    style={{cursor:'pointer'}}
                />
            </HomeHeader>
            <StyledView>
                {
                    entries.length !== 0 
                    ?
                    <>
                        <StyledList>
                        {
                            entries.map(({value,description,date,_id}) => {
                                const match = date.match(dateRegex);
                                const dateDisplay = (
                                    match?`${match[3]}/${match[2]}`:''
                                );
                                const price = parseFloat(value);
                                const goTo = parseFloat(value) < 0 ? '/editdebit' : '/editcredit';
                                return (
                                    <li 
                                        key={_id} >
                                        <span className='date'>
                                            {dateDisplay}
                                        </span> 
                                        <span 
                                            className='description'
                                            onClick={() => browse(
                                                goTo,
                                                {state:{_id,description,value}})}>
                                            {description}
                                        </span>
                                        <span className={debitOrCredit(value)}>
                                            {printPrice(price)}
                                        </span>
                                        <CloseOutline
                                            cssClasses={'delete-icon'}
                                            height="25px"
                                            width="25px"
                                            onClick={() => deleteEntry(_id)}/>
                                    </li>
                                );
                            })
                        }
                        </StyledList>
                        <StyledBalance>
                            SALDO 
                            <span className={debitOrCredit(getTotal().toString())}>
                                {getTotal().toFixed(2)}
                            </span>
                        </StyledBalance>
                    </> 
                    :<p>Não há registros de entrada ou saída</p>
                }
            </StyledView>
            <ul>
                <li>
                    <StyledEntryButton onClick={() => browse('/newcredit')}>
                        <AddCircleOutline
                            color={'#00000'} 
                            height="25px"
                            width="25px"
                        />
                        Nova entrada
                    </StyledEntryButton>
                </li>
                <li>
                    <StyledEntryButton onClick={() => browse('/newdebit')}>
                        <RemoveCircleOutline
                            color={'#00000'} 
                            height="25px"
                            width="25px"
                        />
                        Nova saída
                    </StyledEntryButton>
                </li>
            </ul>
        </Container>
    );
};