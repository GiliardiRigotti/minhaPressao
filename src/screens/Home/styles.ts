import styled from "styled-components/native";
import { colors } from "../../constants/colors";
import { StyleSheet } from "react-native";

export const Container = styled.View`
    flex:1;
    background-color:${colors.white};
    padding: 20px;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.TouchableOpacity`
    margin-top:8px;
    width:50%;
    height:40px;
    background-color:${colors.green};
    border-radius:8px;
    align-items: center;
    justify-content: center;
`;

export const ButtonAdd = styled.TouchableOpacity`
    width:60px;
    height:60px;
    background-color:${colors.redLight};
    border-radius:50px;
    align-items: center;
    justify-content: center;
    position: absolute;
    bottom: 50px;
    right: 35px;
`;

export const ButtonCancel = styled.TouchableOpacity`
    margin-top:8px;
    width:50%;
    height:40px;
    background-color:${colors.redLight};
    border-radius:8px;
    align-items: center;
    justify-content: center;
`;

export const ButtonTitle = styled.Text`
    font-size: 16px;
    font-weight:bold;
    color:${colors.white};
`;

export const ContainerModal = styled.View`
    height: 60%;
    width: 100%;
    padding: 20px;
    background-color:${colors.grayLight};
    border-top-right-radius: 50px;
    border-top-left-radius: 50px;
    position: absolute;
    bottom: 0;
    align-items: center;
    justify-content: center;
`;

export const Input = styled.TextInput`
    border-radius: 5px;
`;

export const styles = StyleSheet.create({
    shadow: {
        width: '50%',
        margin: 10,
        padding: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})