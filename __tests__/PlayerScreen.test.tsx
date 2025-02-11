import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { PlayerScreen } from '../screens/PlayerScreen';
import TrackPlayer, { State } from 'react-native-track-player';

// Mock the tracks data
jest.mock('../services/QueueService', () => ({
    tracks: [
        {
            id: '1',
            title: 'Test Track 1',
            artist: 'Test Artist 1',
            artwork: 'test-artwork-1',
            url: 'test-url-1',
        },
        {
            id: '2',
            title: 'Test Track 2',
            artist: 'Test Artist 2',
            artwork: 'test-artwork-2',
            url: 'test-url-2',
        },
    ],
    setupPlayer: jest.fn().mockResolvedValue(undefined),
    addTracks: jest.fn().mockResolvedValue(undefined),
}));

describe('PlayerScreen', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Setup default mock implementations
        (TrackPlayer.getPlaybackState as jest.Mock).mockResolvedValue({ state: State.Paused });
        (TrackPlayer.getActiveTrackIndex as jest.Mock).mockResolvedValue(0);
    });

    it('renders current track information', async () => {
        const { getByTestId } = render(<PlayerScreen />);

        // Wait for useEffect to complete
        await act(async () => {});

        expect(getByTestId('now-playing-title').children[0]).toBe('Test Track 1');
        expect(getByTestId('now-playing-artist').children[0]).toBe('Test Artist 1');
    });

    it('handles track selection', async () => {
        const { getAllByTestId } = render(<PlayerScreen />);

        await act(async () => {
            await Promise.resolve();
        });

        const playlistItems = getAllByTestId('playlist-item');
        expect(playlistItems).toHaveLength(2);

        await act(async () => {
            fireEvent.press(playlistItems[1]);
            await Promise.resolve();
        });

        expect(TrackPlayer.skip).toHaveBeenCalledWith(1);
        expect(TrackPlayer.play).toHaveBeenCalled();
    });

    it('initializes player on mount', async () => {
        render(<PlayerScreen />);

        await act(async () => {
            await Promise.resolve();
        });

        const { setupPlayer } = require('../services/QueueService');
        expect(setupPlayer).toHaveBeenCalled();
    });
});
