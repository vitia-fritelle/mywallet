import { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ExitOutline, AddCircleOutline, RemoveCircleOutline  } from 'react-ionicons'
import Entry from '../../models'
import entryAxios from '../../adapters';
import UserContext from '../../contexts/UserContext'
import { Container, HomeHeader, StyledBalance, StyledEntryButton, StyledList, StyledView } from './styles';

const dateRegex = /^(\d{4})-(\d{2})-(\d{2})#(\d{2}):(\d{2}):(\d{2})$/;

export default ({name}: {name:string}) => {

    const browse = useNavigate();
    const logout = () => {
        localStorage.removeItem('user');
        browse('/');
    };
    const [entries, setEntries] = useState<Array<Entry>>([]);
    const getTotal = () => entries.reduce((acc,{value}) => {
        return (acc+parseFloat(value));
    },0);
    let { token } = useContext(UserContext);

    const debitOrCredit = (value:string) => {
        return parseFloat(value) > 0 ? 'value credit': 'value debit';
    };
    const printPrice = (price:number) => {
        return price.toFixed(2).replace('-','');
    }
    useEffect(() => {
        const storedToken = localStorage.getItem('user');
        if (!token && storedToken) {
            token = storedToken;
        }
    },[]);
    useEffect(() => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };
        entryAxios.get('/entry', config).then(({data}) => {
            setEntries(data.map((element: Entry) => { 
                const {description, value, date, _id} = element;
                return new Entry(description, value, date, _id);
            }))
        }).catch(() => {
            alert('Algo deu errado!');
        })
    },[]);
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
                                return (
                                    <li className='entries' key={_id}>
                                        <span className='date'>
                                            {dateDisplay}
                                        </span> 
                                        <span className='description'>
                                            {description}
                                        </span>
                                        <span className={debitOrCredit(value)}>
                                            {printPrice(price)}
                                        </span> 
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