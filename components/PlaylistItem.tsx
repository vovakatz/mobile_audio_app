import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Track } from '../types';

interface PlaylistItemProps {
    track: Track;
    isPlaying: boolean;
    onPress: () => void;
    testID?: string;
}

export const PlaylistItem: React.FC<PlaylistItemProps> = ({
                                                              track,
                                                              isPlaying,
                                                              onPress,
                                                              testID,
                                                          }) => {
    return (
        <TouchableOpacity
            style={[styles.playlistItem, isPlaying && styles.playingItem]}
            onPress={onPress} testID={testID}
        >
            <View style={styles.trackInfo}>
                <Text style={styles.title}>{track.title}</Text>
                <Text style={styles.artist}>{track.artist}</Text>
            </View>
            <Text style={styles.duration}>
                {Math.floor(track.duration / 60)}:{(track.duration % 60).toString().padStart(2, '0')}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    playlistItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
    },
    playingItem: {
        backgroundColor: '#282828',
    },
    trackInfo: {
        flex: 1,
    },
    title: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    artist: {
        color: '#b3b3b3',
        fontSize: 14,
    },
    duration: {
        color: '#b3b3b3',
        fontSize: 14,
    },
});
