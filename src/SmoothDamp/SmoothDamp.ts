/**
 * The naive implementation of so-called SmoothDamp.
 * Pretty much the same as {@link CDS}, but it has a way easier parameter to tweak, {@link smoothTime}.
 *
 * Ref: Game Programming Gems 4, Chapter 1.10
 *
 * See: https://github.com/Unity-Technologies/UnityCsReference/blob/a2bdfe9b3c4cd4476f44bf52f848063bfaf7b6b9/Runtime/Export/Math/Mathf.cs#L308
 */
export class SmoothDamp {
  public smoothTime = 1.0;
  public velocity = 0.0;
  public value = 0.0;
  public target = 0.0;

  public update( deltaTime: number ): number {
    const omega = 2.0 / this.smoothTime;
    const x = omega * deltaTime;
    const exp = 1.0 / ( 1.0 + x + 0.48 * x * x + 0.235 * x * x * x );
    const delta = this.value - this.target;
    const temp = ( this.velocity + omega * delta ) * deltaTime;
    this.velocity = ( this.velocity - omega * temp ) * exp;
    this.value = this.target + ( delta + temp ) * exp;
    return this.value;
  }
}
