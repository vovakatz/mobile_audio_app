// __tests__/PlaylistItem.test.tsx
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { PlaylistItem } from '../components/PlaylistItem';

describe('PlaylistItem', () => {
    const mockTrack = {
        id: '1',
        title: 'Test Song',
        artist: 'Test Artist',
        duration: 180,
        url: 'test-url',
        artwork: 'test-artwork'
    };

    const mockOnPress = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const hasStyleProperty = (styles: any, propertyName: string, value: any): boolean => {
        if (Array.isArray(styles)) {
            return styles.some(style => style && style[propertyName] === value);
        }
        return styles && styles[propertyName] === value;
    };

    it('renders track information correctly', () => {
        const { getByText } = render(
            <PlaylistItem
                track={mockTrack}
                isPlaying={false}
                onPress={mockOnPress}
                testID="playlist-item"
            />
        );

        expect(getByText('Test Song')).toBeTruthy();
        expect(getByText('Test Artist')).toBeTruthy();
        expect(getByText('3:00')).toBeTruthy();
    });

    it('applies playing style when isPlaying is true', () => {
        const { getByTestId } = render(
            <PlaylistItem
                track={mockTrack}
                isPlaying={true}
                onPress={mockOnPress}
                testID="playlist-item"
            />
        );

        const container = getByTestId('playlist-item');
        expect(hasStyleProperty(container.props.style, 'backgroundColor', '#282828')).toBe(true);
    });

    it('does not apply playing style when isPlaying is false', () => {
        const { getByTestId } = render(
            <PlaylistItem
                track={mockTrack}
                isPlaying={false}
                onPress={mockOnPress}
                testID="playlist-item"
            />
        );

        const container = getByTestId('playlist-item');
        expect(hasStyleProperty(container.props.style, 'backgroundColor', '#282828')).toBe(false);
    });

    it('calls onPress when pressed', () => {
        const { getByTestId } = render(
            <PlaylistItem
                track={mockTrack}
                isPlaying={false}
                onPress={mockOnPress}
                testID="playlist-item"
            />
        );

        fireEvent.press(getByTestId('playlist-item'));
        expect(mockOnPress).toHaveBeenCalledTimes(1);
    });
});
