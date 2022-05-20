import styled from 'styled-components';

const Footer =  styled.div({
    "@media (max-width: 575px)": {
        position: "absolute",
        bottom: "0px"
    },
    width: "100%",
    backgroundColor: "#eee",
    color: "#000",
    textAlign: "center",
    padding:"15px"
});

export default function footer(){
    return(
        <Footer>
            <p>&copy; 2022 Copyright: Noor Fadhila</p>
        </Footer>
    )
}