import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, AsyncStorage } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import NavigationBar from 'react-native-navbar';
import { FontAwesome } from '@expo/vector-icons';
import Button from 'apsl-react-native-button';
import Storage from 'react-native-storage';
const notifyText = ['Not good', 'Good', 'Excellent', 'Great', 'Awesome', 'Wonderful']
const dismissKeyboard = require('dismissKeyboard')
import Slider from 'react-native-slider';
var DEFAULT_VALUE = 0.2;

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


class Setting extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            level: this.props.level,
            complexity: this.props.isComplex
        }
    }

    saveSettings() {
        const _this = this
        this.props.setLevel(this.state.level)
        this.props.setComplexity(this.state.complexity)  
        let data = {
            level: this.state.level,
            complexity: this.state.complexity
        }
        this.props.saveStorage('setting', data, (res) => {
            this.props.navigation.goBack()
            this.props.navigation.state.params.onChanged({level: this.state.level, isComplex: this.state.complexity});
        })        
    }
    
    render() {
        var _this = this;
        const leftButtonConfig = {
            title: 'Back',
            tintColor: 'white',
            handler: function () {
                _this.props.navigation.goBack()
            },
        };
        const rightButtonConfig = {
            title: 'Save',
            tintColor: 'white',
            handler: function () {
                _this.saveSettings()
            },
        };
        const titleConfig = {
            title: 'Settings',
            tintColor: 'black',
            style: {
                fontSize: 30,
                fontFamily: 'gotham_bold'
            }
        };
        return (
            <View style={{flex: 1}}>
                <NavigationBar
                    style = {styles.navBar}
                    title = {titleConfig}
                    rightButton = {rightButtonConfig}
                    leftButton = {leftButtonConfig}
                />
                <View style={styles.container}>
                    <View style={styles.levelView}>
                        <Text style={[styles.labelText, {textAlign: 'center'}]}>The length of the digit number: {this.state.level}</Text>
                        <Slider
                            style={styles.slider}
                            trackStyle={customStyles.track}
                            thumbStyle={customStyles.thumb}
                            minimumTrackTintColor='#ec4c46'
                            minimumValue={4}
                            maximumValue={6}
                            value={this.state.level}
                            step={1}
                            onValueChange={(value) => this.setState({level: value})}
                        />
                    </View>
                    <View style={styles.complexityView}>
                        <View><Text style={styles.labelText}>Complexity:</Text></View>
                        <View style={{justifyContent: 'center'}}>
                            <Switch
                                onValueChange={(value) => this.setState({complexity: value})}
                                value={this.state.complexity}
                            />
                        </View>
                    </View>
                    <View>
                        <Text style={styles.explainText}>
                        {
                            this.state.complexity?
                                'All of digits can be duplicated like 2566.'
                            :
                                'All of digits are different each other like 1234'
                        }
                        </Text>
                    </View>
                    
                </View>
            </View>
        );
    }
}
var customStyles = StyleSheet.create({
  track: {
    height: 18,
    borderRadius: 1,
    backgroundColor: '#d5d8e8',
  },
  thumb: {
    width: 20,
    height: 30,
    borderRadius: 1,
    backgroundColor: '#838486',
  }
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    navBar: {
        backgroundColor: '#00b3b3',
        marginTop: -20,
        height: 80,
        paddingTop: 20,
    },
    slider: {
        width: 250
    },
    labelText: {
        fontSize: 30,
        color: 'black',
    },
    levelView: {
        alignItems: 'center',
        paddingTop: 20
    },
    complexityView: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        paddingTop: 30,
        borderTopWidth: 1,
        borderColor: 'gray',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20
    },
    explainText: {
        width: 240,
        paddingLeft: 20,
        fontSize: 20,
        color: 'gray'
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        level: state.level,
        isComplex: state.isComplex,
        type: state.gameType
    }
}, mapDispatchToProps)(Setting);