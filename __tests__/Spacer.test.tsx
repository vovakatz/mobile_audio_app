import React from 'react';
import { render } from '@testing-library/react-native';
import {Spacer} from '../components/Spacer.tsx';

describe('Spacer', () => {
    it('renders vertical spacer with default size', () => {
        const { getByTestId } = render(<Spacer testID="spacer" />);
        const spacer = getByTestId('spacer');
        expect(spacer.props.style).toEqual({ height: 20 });
    });

    it('renders horizontal spacer with custom size', () => {
        const { getByTestId } = render(
            <Spacer mode="horizontal" size={30} testID="spacer" />
        );
        const spacer = getByTestId('spacer');
        expect(spacer.props.style).toEqual({ width: 30 });
    });

    it('renders expand spacer', () => {
        const { getByTestId } = render(
            <Spacer mode="expand" testID="spacer" />
        );
        const spacer = getByTestId('spacer');
        expect(spacer.props.style).toEqual({ flex: 1 });
    });
});
