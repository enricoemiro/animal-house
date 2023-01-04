/**
 * Creates a new type that has all the properties of the `T` type, but with the specified properties
 * in the `K` type parameter being required and the rest being optional.
 *
 * @example
 * type User = { name: string, email: string, password: string, age?: number };
 * type RequiredUser = MustHaveFields<User, 'name' | 'email' | 'password'>;
 *
 * This will create a new type with the 'name', 'email', and 'password' fields being required and the
 * 'age' field being optional.
 */
export type MustHaveFields<T, K extends keyof T> = Pick<T, K> & {
  [P in Exclude<keyof T, K>]?: T[P];
};
