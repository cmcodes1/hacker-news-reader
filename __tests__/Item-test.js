import React from 'react'
import { create } from 'react-test-renderer'
import Item from '../src/screens/Item'

jest.useFakeTimers()

const tree = create(<Item />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot()
})