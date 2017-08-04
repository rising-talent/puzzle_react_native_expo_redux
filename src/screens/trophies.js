import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Switch, AsyncStorage, ListView } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { ActionCreators } from '../redux/actions'
import NavigationBar from 'react-native-navbar';
import { FontAwesome } from '@expo/vector-icons';
import Button from 'apsl-react-native-button';
import Slider from 'react-native-slider';
import Spinner from 'react-native-loading-spinner-overlay';
import {SimpleLineIcons} from '@expo/vector-icons';

const colorArray = ['#ff9900', '#e68a00', '#cc7a00', '#b36b00', '#995c00', '#804d00', '#804d00', '#4d2e00', '#331f00', '#1a0f00']
const dismissKeyboard = require('dismissKeyboard')
var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

class TrophyList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isPlayerLoading: true
        }
    }

    componentDidMount() {
        const _this = this      
        this.props.getTopPlayers((size) => {
            _this.setState({isPlayerLoading: false})
        })
    }

    sendInvite() {
        alert('Comming soon!')
    }

    sortPlayers(players) {
        return JSON.stringify(players).sort(function(a, b) {
            return (a[trophy] > b[trophy]) ? 1 : ((a[trophy] < b[trophy]) ? -1 : 0);
        });
    }
    
    render() {
        var _this = this;
        const leftButtonConfig = {
            title: 'Close',
            tintColor: 'white',
            handler: function () {
                _this.props.navigation.goBack()
            },
        };
        const rightButtonConfig = {
            title: 'Invite',
            tintColor: 'white',
            handler: function () {
                _this.sendInvite()
            },
        };
        const titleConfig = {
            title: 'Top Players',
            tintColor: 'white',
            style: {
                fontSize: 30,
                fontFamily: 'gotham_bold'
            }
        };
        return (
            <View style={{flex: 1}}>
                <Spinner visible = {this.state.isPlayerLoading} textContent="" textStyle={{color: '#111'}} />
                <NavigationBar
                    style = {styles.navBar}
                    title = {titleConfig}
                    rightButton = {rightButtonConfig}
                    leftButton = {leftButtonConfig}
                />
                <View style={styles.container}>
                    <ListView 
                        enableEmptySections={true}
                        dataSource = {ds.cloneWithRows(this.props.top_players)}
                        renderRow = {(rowData, sectionID, rowID, highlightRow) => {
                            return(
                                <View key={rowID} style={[styles.listItem, {backgroundColor: colorArray[Math.floor(rowID / 10)]}]}>
                                    <View style={styles.listItemLeft}>
                                        <SimpleLineIcons name='trophy' size={25} style={{ color: 'white'}} />
                                        <Text style={styles.trophy}>{rowData.trophy}</Text>
                                        <Text style={styles.name}>{rowData.username}</Text>
                                    </View>
                                    <View>
                                        {

                                        }
                                    </View>
                                </View>
                            )
                        }
                    }>
                    </ListView>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    navBar: {
        backgroundColor: '#4d79ff',
        marginTop: -20,
        height: 80,
        paddingTop: 20,
    },
    name: {
        height: 40,
        fontSize: 28,
        color: 'white',
        fontFamily: 'gotham_bold',
        paddingLeft: 20,
        flex: 1
    },
    trophy: {
        height: 40,
        fontSize: 28,
        color: 'white',
        paddingLeft: 10,
        width: 60
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 30,
        paddingLeft: 20,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderColor: 'white'
    },
    listItemLeft: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
    }
});

function mapDispatchToProps(dispatch) {
    return bindActionCreators(ActionCreators, dispatch);
}

export default connect((state) => { 
    return {
        top_players: state.top_players
    }
}, mapDispatchToProps)(TrophyList);