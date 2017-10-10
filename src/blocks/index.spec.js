import test from 'ava'
import { isNil } from 'ramda'
import { Kick } from '../'

test('Kick is defined', (t) => {
	t.true(!isNil(Kick))
})
