import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlayerControls } from '../components/PlayerControls';

jest.mock('react-native-vector-icons/Entypo', () => 'Icon');

describe('PlayerControls', () => {
    const mockOnPlayPause = jest.fn();
    const mockOnNext = jest.fn();
    const mockOnPrevious = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('calls onPlayPause when play/pause button is pressed', () => {
        const { getByTestId } = render(
            <PlayerControls
                testID="player-controls"
                isPlaying={false}
                onPlayPause={mockOnPlayPause}
                onNext={mockOnNext}
                onPrevious={mockOnPrevious}
            />
        );

        fireEvent.press(getByTestId('player-controls-play'));
        expect(mockOnPlayPause).toHaveBeenCalledTimes(1);
    });

    it('calls onNext when next button is pressed', () => {
        const { getByTestId } = render(
            <PlayerControls
                testID="player-controls"
                isPlaying={false}
                onPlayPause={mockOnPlayPause}
                onNext={mockOnNext}
                onPrevious={mockOnPrevious}
            />
        );

        fireEvent.press(getByTestId('player-controls-next'));
        expect(mockOnNext).toHaveBeenCalledTimes(1);
    });

    it('calls onPrevious when previous button is pressed', () => {
        const { getByTestId } = render(
            <PlayerControls
                testID="player-controls"
                isPlaying={false}
                onPlayPause={mockOnPlayPause}
                onNext={mockOnNext}
                onPrevious={mockOnPrevious}
            />
        );

        fireEvent.press(getByTestId('player-controls-previous'));
        expect(mockOnPrevious).toHaveBeenCalledTimes(1);
    });

    it('shows pause button when isPlaying is true', () => {
        const { queryByTestId } = render(
            <PlayerControls
                testID="player-controls"
                isPlaying={true}
                onPlayPause={mockOnPlayPause}
                onNext={mockOnNext}
                onPrevious={mockOnPrevious}
            />
        );

        expect(queryByTestId('player-controls-pause')).toBeTruthy();
        expect(queryByTestId('player-controls-play')).toBeFalsy();
    });

    it('shows play button when isPlaying is false', () => {
        const { queryByTestId } = render(
            <PlayerControls
                testID="player-controls"
                isPlaying={false}
                onPlayPause={mockOnPlayPause}
                onNext={mockOnNext}
                onPrevious={mockOnPrevious}
            />
        );

        expect(queryByTestId('player-controls-play')).toBeTruthy();
        expect(queryByTestId('player-controls-pause')).toBeFalsy();
    });
});
