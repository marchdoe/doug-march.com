/**
 * Every hue-distance threshold the pipeline reasons with, in one place.
 *
 * Three modules each carried their own bare number and each number meant
 * something different (#225): 30 was a forbidden-zone radius in one file, 15
 * a scheme-vs-preset mismatch in another, and 30 again a "reads as the same
 * color" test in a third, beside prompt copy telling the Art Director to
 * stay 60° away. Naming them does not change any value — that is a
 * separate decision — but it makes the three meanings visible next to each
 * other, which is the first step toward reconciling them.
 *
 * All in degrees on the 0–360 hue circle; distances are the short way round.
 */

/**
 * color-mandate: how far either side of a recent primary hue is
 * soft-forbidden for tonight's palette.
 */
export const HUE_FORBIDDEN_ZONE_RADIUS = 30

/**
 * color-validation: how far the preset's actual accent may sit from the hue
 * the Art Director declared before it is flagged as a mismatch.
 */
export const HUE_DECLARED_MISMATCH = 15

/**
 * uniqueness-index: under this distance from a recent hue, the repetition
 * check tells the Art Director the color reads as the same.
 */
export const HUE_NEAR_REPEAT = 30

/**
 * uniqueness-index: the distance the repetition check asks for instead.
 * Note this is twice HUE_NEAR_REPEAT and does not equal the mandate's
 * forbidden radius — the copy and the gate disagree, and this constant
 * exists so that disagreement has a name.
 */
export const HUE_ASK_FOR_DISTANCE = 60
