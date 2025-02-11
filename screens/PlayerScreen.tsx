import React, { useEffect, useState } from 'react';
import {View, StyleSheet, Text, ScrollView, Image} from 'react-native';
import TrackPlayer, {
    useTrackPlayerEvents,
    Event,
    State, RepeatMode, AppKilledPlaybackBehavior,
} from 'react-native-track-player';
import { PlayerControls } from '../components/PlayerControls';
import { PlaylistItem } from '../components/PlaylistItem';
import {Progress} from '../components/Progress.tsx';
import {setupPlayer, tracks} from '../services/QueueService.ts';

export const DefaultRepeatMode = RepeatMode.Queue;
export const DefaultAudioServiceBehaviour =
    AppKilledPlaybackBehavior.StopPlaybackAndRemoveNotification;

export const PlayerScreen: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState<number>(0);

    useEffect(() => {
        (async function() {
            await setupPlayer();
        })();
    }, []);

    useTrackPlayerEvents([Event.PlaybackState, Event.PlaybackActiveTrackChanged], async (event) => {
        if (event.type === Event.PlaybackState) {
            setIsPlaying(event.state === State.Playing);
        } else if (event.type === Event.PlaybackActiveTrackChanged) {
            const index = await TrackPlayer.getActiveTrackIndex();
            if (index !== null) {setCurrentTrack(index!);}
        }
    });

    const handlePlayPause = async () => {
        const currentState = (await TrackPlayer.getPlaybackState()).state;
        if (currentState === State.Playing) {
            await TrackPlayer.pause();
        } else {
            await TrackPlayer.play();
        }
    };

    const handleNext = async () => {
        await TrackPlayer.skipToNext();
    };

    const handlePrevious = async () => {
        await TrackPlayer.skipToPrevious();
    };

    const handleTrackSelect = async (index: number) => {
        await TrackPlayer.skip(index);
        await TrackPlayer.play();
    };

    return (
        <View style={styles.container}>
            <View style={styles.nowPlaying}>
                <Image
                    style={styles.artwork}
                    source={{ uri: tracks[currentTrack].artwork }}
                    testID="now-playing-artwork"
                />
                <Text
                    style={styles.nowPlayingTitle}
                    testID="now-playing-title"
                >
                    {tracks[currentTrack].title}
                </Text>
                <Text
                    style={styles.nowPlayingArtist}
                    testID="now-playing-artist"
                >
                    {tracks[currentTrack].artist}
                </Text>

                <Progress />

                <PlayerControls
                    testID="player-controls"
                    isPlaying={isPlaying}
                    onPlayPause={handlePlayPause}
                    onNext={handleNext}
                    onPrevious={handlePrevious}
                />
            </View>

            <ScrollView style={styles.playlist}>
                {tracks.map((track, index) => (
                    <PlaylistItem
                        key={track.id}
                        testID="playlist-item"
                        track={track}
                        isPlaying={currentTrack === index && isPlaying}
                        onPress={() => handleTrackSelect(index)}
                    />
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121212',
    },
    nowPlaying: {
        padding: 20,
        alignItems: 'center',
    },
    nowPlayingTitle: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    nowPlayingArtist: {
        color: '#b3b3b3',
        fontSize: 18,
        marginBottom: 20,
    },
    playlist: {
        flex: 1,
        padding: 20,
    },
    artwork: {
        width: '60%',
        aspectRatio: 1,
        marginTop: '2%',
        backgroundColor: 'grey',
    },
});
