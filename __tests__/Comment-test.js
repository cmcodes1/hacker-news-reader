import React from 'react'
import { create } from 'react-test-renderer'
import Comment from '../src/components/Comment'

jest.useFakeTimers()

const tree = create(<Comment />)

test('snapshot', () => {
    expect(tree).toMatchSnapshot()
})