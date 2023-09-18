import { useContext, useState } from "react";
import Input from "../../components/Input";
import { Button, ButtonTitle, Container } from "./styles";
import { AppContext } from "../../context";


export function Login({ navigation }) {
    const { login } = useContext(AppContext)
    const [email, setEmail] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function handleLogin() {
        console.log(email, password)
        if (!email || !password) {
            console.error('Erro')
            return
        }
        console.log(login({ email, password }))
        if (await login({ email, password })) {
            navigation.navigate("Home")
        }
    }
    return (
        <Container>
            <Input title="Usuario" onChangeText={setEmail} width={80} />
            <Input title="Senha" onChangeText={setPassword} secureTextEntry width={80} />
            <Button onPress={handleLogin}>
                <ButtonTitle>
                    Adicionar
                </ButtonTitle>
            </Button>
        </Container>
    )
}