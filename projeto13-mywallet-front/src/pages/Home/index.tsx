import { ExitOutline } from 'react-ionicons'
import { AddCircleOutline } from 'react-ionicons'
import { RemoveCircleOutline } from 'react-ionicons'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { StyledHeader } from '../../components'

export default ({name}: {name:string}) => {

    const browse = useNavigate();

    return (
        <Container>
            <HomeHeader>
                <h2>Olá, {name}</h2>
                <ExitOutline
                    color={'#00000'} 
                    height="25px"
                    width="25px"
                />
            </HomeHeader>
            <div className="view">
                <div className="entries"></div>
                <div className="balance"></div>
            </div>
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
}

const StyledEntryButton = styled.button`

    border: none;
    width: 155px;
    height: 114px;
    background: #A328D6;
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-items:flex-start;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    padding: 9px;
`;

const HomeHeader = styled(StyledHeader)`

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
`;

const Container = styled.div`

    ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
    }
    @media (max-width: 360px) {
        ul {
            justify-content: center;
        }
        
        ul > li {
            margin-bottom: 10px;
        }
    }
`;