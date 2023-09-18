import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import Input from "../../components/Input";
import { Button, ButtonAdd, ButtonCancel, ButtonTitle, Container, ContainerModal, styles } from "./styles";
import { IMedida } from "../../interfaces/imedidas";
import { Alert, Modal, ScrollView, Text, TextInput } from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons"
import { colors } from "../../constants/colors";
import { AppContext } from "../../context";
import Item from "../../components/Item";
import Header from "../../components/Header";
import { select } from "../../db/DBHelper";
import { Title, Wrapper } from "../../components/Item/styles";

export function Home() {
    const date = new Date().getTime()
    const { adicionaMedida } = useContext(AppContext)
    const [openModal, setOpenModal] = useState<boolean>(false)
    const [medida, setMedida] = useState<IMedida>({
        max: "",
        min: "",
        date
    })
    const [medidas, setMedidas] = useState<IMedida[]>([])

    const handleAdicionarMedida = () => {
        console.log('antes: ', medida)
        if (medida.max !== "" && medida.min !== "") {
            console.log(medida)
            adicionaMedida(medida)
            setMedida({ ...medida, max: "", min: "" })
            setOpenModal(false)
        }
    }

    useEffect(() => { console.log(medida) }, [medida])

    useEffect(() => {
        (async () => {
            const result = await select("medidas")
            setMedidas(result)
        })()
    }, [openModal])
    return (
        <>
            <Header />
            <Container>
                <ScrollView
                    style={{ width: '100%' }}
                    contentContainerStyle={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%'
                    }}
                >
                    {
                        medidas &&
                        medidas.map((item, index) => <Item key={index} data={item} />)
                    }
                </ScrollView>
                <ButtonCancel onPress={() => setOpenModal(true)}>
                    <ButtonTitle>
                        Adicionar Medida
                    </ButtonTitle>
                </ButtonCancel>
            </Container>
            <Modal
                visible={openModal}
                transparent
            >
                <ContainerModal>
                    <TextInput placeholder="Maxima" value={medida.max} onChangeText={value => setMedida({ ...medida, max: value })} style={styles.shadow} />
                    <TextInput placeholder="Minima" value={medida.min} onChangeText={value => setMedida({ ...medida, min: value })} style={styles.shadow} />
                    <Button onPress={handleAdicionarMedida}>
                        <ButtonTitle>
                            Adicionar
                        </ButtonTitle>
                    </Button>
                    <ButtonCancel onPress={() => setOpenModal(false)}>
                        <ButtonTitle>
                            Cancelar
                        </ButtonTitle>
                    </ButtonCancel>
                </ContainerModal>
            </Modal>
        </>

    )
}