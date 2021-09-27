import type { RawVector3 } from './RawVector3';

/**
 * Return a cross product of two vec3s.
 */
export function vec3Cross( vecA: RawVector3, vecB: RawVector3 ): RawVector3 {
  return [
    vecA[ 1 ] * vecB[ 2 ] - vecA[ 2 ] * vecB[ 1 ],
    vecA[ 2 ] * vecB[ 0 ] - vecA[ 0 ] * vecB[ 2 ],
    vecA[ 0 ] * vecB[ 1 ] - vecA[ 1 ] * vecB[ 0 ],
  ];
}
