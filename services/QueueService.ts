import TrackPlayer, {Capability} from 'react-native-track-player';
import playlistData from '../assets/data/playlist.json';
import {Track} from '../types';
import {DefaultAudioServiceBehaviour, DefaultRepeatMode} from '../screens/PlayerScreen.tsx';

export const tracks = playlistData as Track[];

export const addTracks = async (): Promise<void> => {
  await TrackPlayer.add(tracks);
};

export const setupPlayer = async () => {
  try {
    const setup = async () => {
      try {
        await TrackPlayer.setupPlayer({
          autoHandleInterruptions: true,
        });
      } catch (error) {
        return (error as Error & { code?: string }).code;
      }
    };

    while ((await setup()) === 'android_cannot_setup_player_in_background') {
      await new Promise<void>((resolve) => setTimeout(resolve, 1));
    }

    await TrackPlayer.updateOptions({
      android: {
        appKilledPlaybackBehavior: DefaultAudioServiceBehaviour,
      },
      capabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
        Capability.SkipToPrevious,
        Capability.SeekTo,
      ],
      compactCapabilities: [
        Capability.Play,
        Capability.Pause,
        Capability.SkipToNext,
      ],
      progressUpdateEventInterval: 2,
    });
    await TrackPlayer.setRepeatMode(DefaultRepeatMode);
    await addTracks();
  } catch (error) {
    console.error('Error setting up player:', error);
  }
};
