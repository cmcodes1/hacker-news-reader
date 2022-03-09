import React from 'react'
import { create } from 'react-test-renderer'
import Home from '../src/screens/Home'

jest.useFakeTimers()

const tree = create(<Home />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot()
})