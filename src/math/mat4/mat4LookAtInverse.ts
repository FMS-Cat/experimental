import type { RawMatrix4 } from './RawMatrix4';
import type { RawVector3 } from '../vec3/RawVector3';
import { vec3Cross } from '../vec3/vec3Cross';
import { vecAdd } from '../vec/vecAdd';
import { vecDot } from '../vec/vecDot';
import { vecNormalize } from '../vec/vecNormalize';
import { vecScale } from '../vec/vecScale';
import { vecSub } from '../vec/vecSub';

/**
 * Generate an inverse of "LookAt" matrix. Good for creating a view matrix.
 *
 * See also: {@link mat4LookAt}
 */
export function mat4LookAtInverse(
  position: RawVector3,
  target: RawVector3 = [ 0.0, 0.0, 0.0 ],
  up: RawVector3 = [ 0.0, 1.0, 0.0 ],
  roll = 0.0,
): RawMatrix4 {
  const dir = vecNormalize( vecSub( position, target ) ) as RawVector3;

  let sid = vecNormalize( vec3Cross( up, dir ) ) as RawVector3;

  if ( roll !== 0.0 ) {
    sid = vecAdd(
      vecScale( sid, Math.cos( roll ) ),
      vecScale( vec3Cross( dir, sid ), Math.sin( roll ) ),
    ) as RawVector3;
  }

  const top = vec3Cross( dir, sid );

  return [
    sid[ 0 ], top[ 0 ], dir[ 0 ], 0.0,
    sid[ 1 ], top[ 1 ], dir[ 1 ], 0.0,
    sid[ 2 ], top[ 2 ], dir[ 2 ], 0.0,
    -vecDot( sid, position ),
    -vecDot( top, position ),
    -vecDot( dir, position ),
    1.0,
  ];
}
