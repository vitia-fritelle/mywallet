import styled from 'styled-components'
import { StyledHeader } from '../../components'

export const StyledBalance = styled.div`

    display: flex;
    width: 100%;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    line-height: 20px;
    color: #000000;
    width: 100%;
    display: inline-flex;
    justify-content: space-between;
`;

export const StyledList = styled.ul`

    display: flex;
    gap: 20px;
    color: #000000;
    overflow-y: scroll;
    height: 100%;
    height: 100%;
    flex-flow: column nowrap;
    li {
        width: 100%;
        display: inline-flex;
        justify-content: space-between;
        .date {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #C6C6C6;
        }
        .description {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            color: #000000;
        }
        .value {
            font-family: 'Raleway';
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 19px;
            text-align: right;
        }
    }
`;

export const StyledView = styled.div`

    width: 100%;
    min-height: 446px;
    background: #FFFFFF;
    border-radius: 5px;
    position: relative;
    margin-bottom: 13px;
    overflow-x: hidden;
    padding: 23px 15px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    p {
        color: #868686;
        font-family: 'Raleway';
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 23px;
        text-align: center;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
    }
`;

export const StyledEntryButton = styled.button`

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

export const HomeHeader = styled(StyledHeader)`

    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    padding: 25px 0;
`;

export const Container = styled.div`

    ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: space-between;
        align-items: center;
        gap: 30px;
    }
    @media (max-width: 360px) {
        ul {
            justify-content: center;
        }
    }
    .debit {
        color: #C70000;
    }
    .credit {
        color: #03AC00;
    }
`;