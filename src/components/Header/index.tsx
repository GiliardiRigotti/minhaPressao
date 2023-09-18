import { StatusBar } from "expo-status-bar";
import { Container, Title } from "./styles";



export default function Header() {
    return (
        <>
            <StatusBar style="light" />
            <Container>
                <Title>
                    Minha Pressão
                </Title>
            </Container>
        </>
    )
}