import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { Progress } from '../components/Progress';
import TrackPlayer from 'react-native-track-player';

jest.mock('react-native-track-player');

describe('Progress', () => {
    it('renders live stream text when live prop is true', () => {
        const { getByText } = render(<Progress live />);
        expect(getByText('Live Stream')).toBeTruthy();
    });

    it('renders slider and time labels for regular track', () => {
        const { getByTestId, getByText } = render(<Progress />);
        const slider = getByTestId('progress-slider');
        expect(slider).toBeTruthy();
        expect(getByText('00:30')).toBeTruthy(); // position
        expect(getByText('02:30')).toBeTruthy(); // remaining time
    });

    it('calls TrackPlayer.seekTo when sliding complete', () => {
        const { getByTestId } = render(<Progress />);
        const slider = getByTestId('progress-slider');

        fireEvent(slider, 'slidingComplete', 50);

        expect(TrackPlayer.seekTo).toHaveBeenCalledWith(50);
    });
});
