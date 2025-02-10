import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface PlayerControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
                                                                  isPlaying,
                                                                  onPlayPause,
                                                                  onNext,
                                                                  onPrevious,
                                                              }) => {
    return (
        <View style={styles.controls}>
            <TouchableOpacity onPress={onPrevious}>
                <Icon name="controller-fast-backward"  style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPlayPause}>
                <Icon name={isPlaying ? 'controller-paus' : 'controller-play'}  style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity onPress={onNext}>
                <Icon name="controller-fast-forward" style={styles.button} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding:0,
    },
    button: {
        color: '#fff',
        fontSize: 30,
        padding: 30,
    },
});
