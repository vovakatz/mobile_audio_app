const TrackPlayer = {
    addEventListener: jest.fn(),
    play: jest.fn(),
    pause: jest.fn(),
    skipToNext: jest.fn(),
    skipToPrevious: jest.fn(),
    seekTo: jest.fn(),
    getPlaybackState: jest.fn(),
    setupPlayer: jest.fn(),
    updateOptions: jest.fn(),
    setRepeatMode: jest.fn(),
    add: jest.fn(),
    skip: jest.fn(),
    getActiveTrackIndex: jest.fn(),
};

export const useProgress = () => ({ position: 30, duration: 180 });

// Add mock for useTrackPlayerEvents
export const useTrackPlayerEvents = jest.fn((events, handler) => {
    // Store the handler so we can call it in tests
    if (handler && typeof handler === 'function') {
        TrackPlayer.addEventListener.mockImplementation((eventType, callback) => {
            callback({ type: eventType });
        });
    }
});

export const State = {
    None: 'none',
    Playing: 'playing',
    Paused: 'paused',
    Stopped: 'stopped',
    Buffering: 'buffering',
    Ready: 'ready',
};

export const Event = {
    PlaybackState: 'playbackState',
    PlaybackActiveTrackChanged: 'playbackActiveTrackChanged',
};

export const RepeatMode = {
    Off: 0,
    Track: 1,
    Queue: 2,
};

export const Capability = {
    Play: 0,
    Pause: 1,
    Stop: 2,
    Skip: 3,
    SkipToNext: 4,
    SkipToPrevious: 5,
    JumpForward: 6,
    JumpBackward: 7,
    SeekTo: 8,
};

export const AppKilledPlaybackBehavior = {
    StopPlaybackAndRemoveNotification: 0,
    ContinuePlayback: 1,
    RemoveNotification: 2,
};

export default TrackPlayer;
