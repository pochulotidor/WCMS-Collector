import { StyleSheet, Dimensions } from "react-native";

const { height, width } = Dimensions.get('screen');

export const globalStyles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },

    reportContainer: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        justifyContent: 'center',
        margin: 3,
    
    },
    reportText: {
        fontSize: 15,
        color: '#000',

    },

    markerIcon: {
        width: 30,
        height: 30
    },

    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        width: '90%',
        height: '50%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center'

    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: '#4CB963'
    },

    button: {
        borderRadius: 20,
        width: 150,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },

    buttonCollect: {
        backgroundColor: "#4CB963",
    },

    buttonClose: {
        backgroundColor: "#BD1616",
    },

    map: {

        width: '100%',
        height: '85%',


    },

    //////Homescreen/////

    reportCard: {
        width: '100%',
        height: 450,
        borderRadius: 15,
        margin: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderTopWidth: 0.3
    },

    cardHeader: {
        height: '15%',
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        justifyContent: 'center'
    },

    cardFooter: {
        width: '100%',
        height: '15%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignItems: 'center',
        flexDirection: 'row'
    },

    cardText: {
        fontSize: 15,
        color: '#232323',
        marginLeft: 8,
        fontWeight: 'bold'
    },

    ///////END////////


    //////Profile Screen//////
    profileHeader: {
        width: '100%',
        height: height / 6,
        backgroundColor: '#4CB963',
        justifyContent: 'center',
        alignItems: 'center',
       
        

    },

    imageHolder: {
        width: width / 5,
        height: height / 10,
        borderRadius: 180,
        backgroundColor: '#fff',
      
    },

    headerText: {
        fontSize: 17,
        color: '#000',
        marginLeft: 10,
        fontWeight: 'bold'
    },

    scrollContainer: {
        width: '100%',
        height: '100%',
        flex: 1,
        marginBottom: 10
    },

    scrollButtons: {
        height: height / 15,
        width: '100%',
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'

    },

    buttonText: {

        fontSize: 17,
        fontWeight: 'bold',
        color: '#191A19',
        marginLeft: 10

    }



})


