import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, TouchableWithoutFeedback, ListView, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import { NavigationActions } from 'react-navigation';
import Button from 'apsl-react-native-button';
import {Ionicons} from '@expo/vector-icons';
import NavigationBar from 'react-native-navbar';
import Storage from 'react-native-storage';
import {Font} from 'expo'
import { setCustomText } from 'react-native-global-props';
const dismissKeyboard = require('dismissKeyboard')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var storage = new Storage({
    // maximum capacity, default 1000  
    size: 1000,
 
    // Use AsyncStorage for RN, or window.localStorage for web. 
    // If not set, data would be lost after reload. 
    storageBackend: AsyncStorage,
    
    // expire time, default 1 day(1000 * 3600 * 24 milliseconds). 
    // can be null, which means never expire. 
    defaultExpires: 1000 * 3600 * 24,
    
    // cache data in the memory. default is true. 
    enableCache: true,
    
    // if data was not found in storage or expired, 
    // the corresponding sync method will be invoked and return  
    // the latest data. 
    sync : {
        // we'll talk about the details later. 
    }
})	

class Login extends React.Component {
    static route={
        navigationBar: {
            title: 'Login page'
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            num: '',
        }
    }

    async componentDidMount() {
        await Font.loadAsync({
            'gotham': require('../res/fonts/gotham.ttf'),
            'gotham_bold': require('../res/fonts/gotham_bold.ttf'),
        });
        const customTextProps = { 
            style: { 
                fontFamily: 'gotham'
            }
        }
        setCustomText(customTextProps);
        const _this = this
        storage.load({
            key: 'setting',
        }).then(ret => {
            console.log(ret.userid);
            _this.props.setLevel(ret.level)
            _this.props.setComplexity(ret.complexity)       
            _this.props.resetGoalNumber(ret.level, ret.complexity)     
        }).catch(err => {
            _this.props.resetGoalNumber(4, false)     
        });
    }

    onChanged(data) {
        this.props.resetGoalNumber(data.level, data.isComplex)     
    }
    
    render() {
        const titleButtonConfig = (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <Text style={styles.navText}>{this.props.level} digits</Text>
            </View>
        )
        const rightButtonConfig = (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('setting', {onChanged: (data) => this.onChanged(data)})} style={{alignItems: 'flex-end', width: 50, flexDirection: 'row'}}>
                <Ionicons name='ios-settings-outline' size={32} style={{ color: 'white'}} />
            </TouchableOpacity>
        )
        if(this.state.num.length == this.props.level) dismissKeyboard()
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    style = {styles.navBar}
                    title = {titleButtonConfig}
                    rightButton = {rightButtonConfig}
                />
                <View style = {styles.container}>
                        <TextInput
                            style = {styles.textInput}
                            maxLength={this.props.level}
                            underlineColorAndroid='transparent'
                            keyboardType = 'numeric'
                            onChangeText = {(Text) => this.setState({num: Text})}
                            value = {this.state.num}
                        />
                        {
                            this.props.inProg == 'yes'?
                                <View style={styles.scrollView}>
                                    <ListView 
                                    enableEmptySections={true}
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
                            :
                            <Text style={styles.text}>
                                {
                                'Hi, I thought a random number of ' + this.props.level + ' digits. Now you must guess the number correclty by checking '
                                + (this.props.level * 2 - 1) + " times at maximum. Let's get started!"
                                }
                            </Text>
                        }
                        {
                            this.state.num.length == this.props.level?
                            <View>
                                <Button 
                                    style = {styles.button}
                                    textStyle = {{color: 'white'}}
                                    isDisabled = {this.state.isLoading}
                                    isLoading = {this.state.isLoading}
                                    activityIndicatorColor = 'yellow'
                                    onPress = {() => this.checkNumber(this.state.num)}>
                                    <Text style = {styles.buttonText}>Check</Text>
                                </Button>
                            </View>
                            :
                            null
                        }                        
                </View>
            </View>
        );
    }

    onRefresh(data) {
        this.setState({num: ''})
    }

    onRestart(data) {
        if(data.isSuccess){

        }
        else{
            this.props.resetGoalNumber(this.props.level, this.props.complexity)
            this.setState({num: ''})
        }
    }

    checkNumber(num) {
        dismissKeyboard
        const { navigate } = this.props.navigation;
        this.props.check(num, this.props.goal, this.props.times, this.props.history)
        navigate('home', { onRefresh: this.onRefresh.bind(this), onRestart: this.onRestart.bind(this), number: this.state.num})
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#4d79ff',
        paddingTop: 20,
        paddingBottom: 30,
        alignItems: 'center'
    },

    backgroundImage: {
        flex: 1, 
        justifyContent: 'center',
        alignItems: 'center',
        resizeMode: 'stretch', 
        alignSelf: 'stretch'
    },

    navText: {
        fontSize: 20,
        color: 'white',
        alignItems: 'center',
    },

    text: {
        fontSize: 24,
        textAlign: 'center',
        color: 'white',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 40
    },
    textInput: {
        padding: 10,
        height: 80,
        width: 250,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 60,
        color: 'white'
    },
    buttonText: {
        color: 'purple',
        fontSize: 32
    },
    
    button: {
        backgroundColor: '#66ff33',
        borderWidth: 0,
        height: 70,
        width: 240,
        marginTop: 50,
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
    navBar: {
        backgroundColor: '#4d79ff', 
        marginTop: -20, 
        height:60
    },
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        level: state.level,
        complexity: state.isComplex,
        inProg: state.inProg,
        goal: state.goal,
        times: state.times,
        history: state.history
    }
}, mapDispatchToProps)(Login);