//=== import external ===
import React from 'react';
import { Text, View, TouchableOpacity, Image } from 'react-native';
//=== import internal ===
import styles from './styles';
//=== declare variable ===

const FacebookTabBar = React.createClass({
    tabIcons: [],

    propTypes: {
        goToPage: React.PropTypes.func,
        activeTab: React.PropTypes.number,
        tabs: React.PropTypes.array,
        icons: React.PropTypes.array
    },

    componentWillReceiveProps(props) {
        if (props.page != this.props.page) {
            this.props.goToPage(props.page);
        }
    },

    gotoPage(tab) {
        //tabsText: ['Status', 'Kollegaer', 'Forbruk', 'Køer', 'More']
        if (tab == 'Status') {
            this.props.goToPage(0);
            return;
        }
        if (tab == 'Kollegaer') {
            this.props.goToPage(1);
            return;
        }
    },

    render() {
        return (
            <View style={[styles.tabs, this.props.style, { backgroundColor: this.props.backgroundColor }]}>
                {this.props.tabs.map((tab, i) => {
                    let colorActive = this.props.activeTab === i ? '#5FA4CE' : '#9B9B9B';
                    const rawIcon = this.props.icons[i];
                    const icon = this.props.activeTab === i ? rawIcon.selectedIconSource : rawIcon.iconSource;

                    return (
                        <TouchableOpacity key={i} onPress={() => this.props.goToPage(i)} style={styles.tab}>
                            <Image
                                source={icon}
                                style={{
                                    height: 30,
                                    width: 30,
                                    resizeMode: 'contain'
                                }}
                                resizeMode={'contain'}
                                ref={icon => {
                                    this.tabIcons[i] = icon;
                                }}
                            />
                            <Text style={[this.props.textStyle, { color: colorActive }]}>
                                {this.props.tabsText[i] != undefined ? this.props.tabsText[i] : ''}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    }
});

export default FacebookTabBar;
