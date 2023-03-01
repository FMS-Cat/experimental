/**
 * The naive implementation of so-called SmoothDamp.
 * Pretty much the same as {@link CDS}, but it has a way easier parameter to tweak, {@link smoothTime}.
 *
 * Ref: Game Programming Gems 4, Chapter 1.10
 *
 * See: https://github.com/Unity-Technologies/UnityCsReference/blob/a2bdfe9b3c4cd4476f44bf52f848063bfaf7b6b9/Runtime/Export/Math/Mathf.cs#L308
 */
export declare class SmoothDamp {
    smoothTime: number;
    velocity: number;
    value: number;
    target: number;
    update(deltaTime: number): number;
}
