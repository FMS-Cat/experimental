import type { RawMatrix4 } from './RawMatrix4';

/**
 * Transpose a mat4.
 */
export function mat4Transpose( m: RawMatrix4 ): RawMatrix4 {
  return [
    m[ 0 ], m[ 4 ], m[ 8 ], m[ 12 ],
    m[ 1 ], m[ 5 ], m[ 9 ], m[ 13 ],
    m[ 2 ], m[ 6 ], m[ 10 ], m[ 14 ],
    m[ 3 ], m[ 7 ], m[ 11 ], m[ 15 ],
  ];
}
