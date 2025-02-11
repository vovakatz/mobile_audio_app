import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

interface PlayerControlsProps {
    isPlaying: boolean;
    onPlayPause: () => void;
    onNext: () => void;
    onPrevious: () => void;
    testID?: string;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
                                                                  isPlaying,
                                                                  onPlayPause,
                                                                  onNext,
                                                                  onPrevious,
                                                                  testID = 'player-controls'
                                                              }) => {
    return (
        <View style={styles.controls} testID={testID}>
            <TouchableOpacity
                onPress={onPrevious}
                testID={`${testID}-previous`}
            >
                <Icon name="controller-fast-backward" style={styles.button} />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPlayPause}
                testID={`${testID}-${isPlaying ? 'pause' : 'play'}`}
            >
                <Icon
                    name={isPlaying ? 'controller-paus' : 'controller-play'}
                    style={styles.button}
                />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onNext}
                testID={`${testID}-next`}
            >
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
        padding: 0,
    },
    button: {
        color: '#fff',
        fontSize: 30,
        padding: 30,
    },
});
