import { Dimensions } from 'react-native';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const styles = {
    searchBox: {
        top: 0,
        position: "absolute",
        width: width*0.7,
        
    },
    inputWrapper: {
        marginLeft: 15,
        marginRight: 10,
        marginTop: 10,
        marginBottom: 0,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7
    },
    secondInputWrapper: {
        marginLeft: 0,
        marginRight: 10,
        marginTop: 50,
        left: -40,
        backgroundColor: "#fff",
        opacity: 0.9,
        borderRadius: 7,
        borderColor: "#5cccee",
        borderWidth: 0.8

    },
    inputSearch: {
        fontSize: 23,
        
    },
    label: {
        fontSize: 10,
        fontStyle: 'italic',
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 0
    },
    

};

export default styles;