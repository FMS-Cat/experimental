import type { RawQuaternion } from '../../RawQuaternion';
import { vecDot } from '../../../vec/vecDot';

function quatToString( quat: RawQuaternion ): string {
  return `( ${ quat[ 0 ].toFixed( 3 ) }, ${ quat[ 1 ].toFixed( 3 ) }, ${ quat[ 2 ].toFixed( 3 ) }; ${ quat[ 3 ].toFixed( 3 ) } )`;
}

export function toBeCloseToQuaternion(
  received: RawQuaternion,
  expected: RawQuaternion,
  precision = 2
): jest.CustomMatcherResult {
  const expectedDiff = Math.pow( 10.0, -precision ) / 2;

  const dot = vecDot( received, expected );
  const diff = 1.0 - Math.abs( dot );

  const isPassed = expectedDiff >= diff;

  if ( !isPassed ) {
    return {
      pass: false,
      message: () => `The received quaternion doesn't match to the expected quaternion:
expected ${ quatToString( expected ) },
received ${ quatToString( received ) }
diff: ${ diff }`
    };
  } else {
    return {
      pass: true,
      message: () => 'The received array approximately matches to the expected array'
    };
  }
}

beforeEach( () => {
  expect.extend( { toBeCloseToQuaternion } );
} );

declare global {
  namespace jest { // eslint-disable-line
    interface Matchers<R> {
      toBeCloseToQuaternion( expected: RawQuaternion, precision?: number ): R;
    }
  }
}
