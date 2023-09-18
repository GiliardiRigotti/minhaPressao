import { useNavigation } from "@react-navigation/native";
import { Container, Title, Wrapper } from "./styles";
import { IMedida } from "../../interfaces/imedidas";
import { Alert } from "react-native";

interface Props {
    data: IMedida
}


export default function Item({ data }: Props) {
    const date = new Date(data.date)

    function handleDelete() {
        Alert.alert(
            'Aviso',
            'Tem certeza que quer deletar?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => { },
                },
            ],
            { cancelable: false },
        );
    }


    return (
        <Container>
            <Wrapper>
                <Title>
                    {data.max}
                </Title>
                <Title>
                    {data.min}
                </Title>
            </Wrapper>
            <Wrapper>
                <Title>
                    {date.getDate()}/{date.getMonth() + 1}/{date.getFullYear()}
                </Title>
            </Wrapper>
        </Container>
    )
}