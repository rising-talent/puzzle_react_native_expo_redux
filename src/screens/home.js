import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback, ListView } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import NavigationBar from 'react-native-navbar';
import { FontAwesome } from '@expo/vector-icons';
import Button from 'apsl-react-native-button';
const notifyText = ['Not good', 'Good', 'Excellent', 'Great', 'Awesome', 'Wonderful']
const dismissKeyboard = require('dismissKeyboard')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        dismissKeyboard()
    }
    render() {
        var _this = this;
        const left = this.props.level * 2 - 1 - this.props.times
        const titleButtonConfig = (
            <View style={{alignItems: 'center', flexDirection: 'row', height: 120, paddingTop: 30}}>
                <Text style={[styles.back, {color: left < this.props.level?'#ff3333':'#3333ff'}]}>{left} times left</Text>
            </View>
        )
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    style = {styles.navBar}
                    title = {titleButtonConfig}
                />
                <View style={styles.container}>
                    {
                        this.props.success?
                            <View>
                                <Text style={styles.welcomeText}>Welcome to you!</Text>
                                <Text style={styles.text}>{this.props.email}</Text>
                                <Text style={styles.text}>{this.props.password}</Text>
                            </View>
                        :left == 0?
                            <View style={styles.infoView}>
                                <View style={styles.infoView}>
                                    <Text style={[styles.welcomeText, {color: '#666666'}]}>{this.props.navigation.state.params.number}</Text>
                                    <Text style={[styles.welcomeText, {color: '#666666'}]}>You are failed!</Text>
                                    <Text style={[styles.welcomeText, {fontSize: 28}]}>The goal number was</Text>
                                    <Text style={styles.welcomeText}>{this.props.goal}</Text>
                                </View>
                                <View style={styles.scrollView}>
                                    <ListView 
                                        dataSource = {ds.cloneWithRows(this.props.history)}
                                        renderRow = {(rowData, sectionID, rowID) => {
                                            return(
                                                <View key={rowID}>
                                                    <Text style={styles.historyItem}>{rowData.number} : {rowData.state}</Text>
                                                </View>
                                            )
                                        }
                                    }>
                                    </ListView>
                                </View>
                            </View>
                        :
                            <View style={styles.infoView}>
                                <Text style={styles.numberText}>{this.props.navigation.state.params.number}</Text>
                                <Text style={styles.welcomeText}>{notifyText[this.props.yNumber]}</Text>
                                <Text style={styles.welcomeText}>Y {this.props.yNumber}, N {this.props.nNumber}</Text>
                                <View>
                                    <Text style={styles.text}>'Y' means the number of the correct digits you guessed for both of the position and digit. </Text>
                                    <Text style={styles.text}>'N' means the number of the correct digits you guessed for the position only. </Text>
                                </View>
                            </View>

                    }
                    <View>
                        {
                            left == 0?
                            <Button 
                                style = {styles.tryButton}
                                textStyle = {{color: 'blue'}}
                                isDisabled = {this.state.isLoading}
                                isLoading = {this.state.isLoading}
                                activityIndicatorColor = 'blue'
                                onPress = {() => {
                                    this.props.navigation.goBack()
                                    this.props.navigation.state.params.onRestart({isSuccess: false});
                                }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome name='chevron-left' size={32} style={{ color: 'blue'}} />
                                    <Text style = {[styles.buttonText, {color: 'blue'}]}>Try again</Text>
                                </View>
                            </Button>
                            :
                            <Button 
                                style = {styles.button}
                                textStyle = {{color: 'white'}}
                                isDisabled = {this.state.isLoading}
                                isLoading = {this.state.isLoading}
                                activityIndicatorColor = 'yellow'
                                onPress = {() => {
                                    this.props.navigation.goBack()
                                    this.props.navigation.state.params.onRefresh({num: ''});
                                }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <FontAwesome name='chevron-left' size={32} style={{ color: 'white'}} />
                                    <Text style = {styles.buttonText}>Back</Text>
                                </View>
                            </Button>
                        }
                        
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#00b3b3',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    navBar: {
        backgroundColor: '#00b3b3', 
        marginTop: -20, 
        height:100
    },
    welcomeText: {
        fontSize: 36,
        fontFamily: 'gotham_bold',
        color: 'white',
        textAlign: 'center'
    },
    infoView: {
        alignItems: 'center',
    },
    numberText: {
        color: 'white',
        width: 200,
        fontSize: 60,
        fontFamily: null,
        textAlign: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: 'white',
        marginBottom: 20
    },
    failText: {
        color: 'white',
        width: 200,
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'gotham_bold',
        marginBottom: 20
    },
    back: {
        fontSize: 24,
        color: 'white',
        padding: 10
    },
    text: {
        fontSize: 24,
        color: 'white',
        paddingTop: 20
    },
    buttonText: {
        color: 'white',
        fontSize: 32,
        marginLeft: 20,
        alignItems: 'center'
    },
    
    button: {
        backgroundColor: '#666666',
        borderWidth: 0,
        height: 70,
        width: 240,
        marginTop: 20,
        borderRadius: 70
    },
    tryButton: {
        backgroundColor: '#2db300',
        borderWidth: 0,
        height: 70,
        width: 240,
        marginTop: 20,
        borderRadius: 70
    },
    scrollView: {
        height: 200,
        paddingTop: 30,
        width: 260,
        backgroundColor: 'transparent'
    },
    historyItem: {
        height: 40,
        textAlign: 'center',
        fontSize: 28,
        color: 'white',
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        success: state.success,
        yNumber: state.yNumber,
        nNumber: state.nNumber,
        goal: state.goal,
        times: state.times,
        level: state.level,
        history: state.history
    }
}, mapDispatchToProps)(Home);