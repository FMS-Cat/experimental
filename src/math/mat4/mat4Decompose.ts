import type { RawMatrix4 } from './RawMatrix4';
import type { RawQuaternion } from '../quat/RawQuaternion';
import type { RawVector3 } from '../vec3/RawVector3';
import { mat4Determinant } from './mat4Determinant';
import { quatFromMatrix4 } from '../quat/quatFromMatrix4';
import { vecLength } from '../vec/vecLength';

/**
 * Decompose a matrix into a position, a scale, and a rotation.
 * Yoinked from Three.js.
 */
export function mat4Decompose( m: RawMatrix4 ): {
  position: RawVector3;
  scale: RawVector3;
  rotation: RawQuaternion;
} {
  let sx = vecLength( [ m[ 0 ], m[ 1 ], m[ 2 ] ] );
  const sy = vecLength( [ m[ 4 ], m[ 5 ], m[ 6 ] ] );
  const sz = vecLength( [ m[ 8 ], m[ 9 ], m[ 10 ] ] );

  // if determinant is negative, we need to invert one scale
  const det = mat4Determinant( m );
  if ( det < 0 ) { sx = -sx; }

  const invSx = 1.0 / sx;
  const invSy = 1.0 / sy;
  const invSz = 1.0 / sz;

  const rotationMatrix = m.concat() as RawMatrix4;

  rotationMatrix[ 0 ] *= invSx;
  rotationMatrix[ 1 ] *= invSx;
  rotationMatrix[ 2 ] *= invSx;

  rotationMatrix[ 4 ] *= invSy;
  rotationMatrix[ 5 ] *= invSy;
  rotationMatrix[ 6 ] *= invSy;

  rotationMatrix[ 8 ] *= invSz;
  rotationMatrix[ 9 ] *= invSz;
  rotationMatrix[ 10 ] *= invSz;

  return {
    position: [ m[ 12 ], m[ 13 ], m[ 14 ] ],
    scale: [ sx, sy, sz ],
    rotation: quatFromMatrix4( rotationMatrix ),
  };
}
