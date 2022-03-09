import React from 'react'
import { create } from 'react-test-renderer'
import Story from '../src/components/Story'

jest.useFakeTimers()

const tree = create(<Story />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot()
})