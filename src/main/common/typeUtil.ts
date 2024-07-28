export { Typed, eitherEquals, Vo, strJoin, Ent, Id, isErrorWithMessage };
import * as E from "fp-ts/lib/Either.js";
import * as Eq from "fp-ts/lib/Eq.js";

interface Typed {
  readonly _tag: string;
}

abstract class Vo<T> implements Eq.Eq<T>, Typed {
  abstract _tag: string;
  abstract toString(): string;
  abstract equals(other: T): boolean;
}

interface Ent<T> extends Eq.Eq<T>, Typed {
  readonly _id: Id;
}
function isErrorWithMessage(error: unknown): error is { message: string } {
  return typeof error === "object" && error !== null && "message" in error;
}

class Id implements Vo<Id> {
  readonly _tag = "Id";
  readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }

  equals = (other: Id): boolean => {
    return this.value === other.value;
  };

  // need crypto method
  static of(): Id {
    return new Id(crypto.randomUUID());
  }

  // doesn't need validate
  static ofUnsafe(value: string): Id {
    return new Id(value);
  }

  // needs validate
  static ofValue(value: string): E.Either<string, Id> {
    const result = this.validate({ value: value });
    return E.isRight(result) ? E.right(new Id(value)) : E.left(result.left);
  }

  static validate: (input: { value: string }) => E.Either<string, boolean> = (
    input
  ) => {
    const { value } = input;
    if (!this.isUuid(value)) {
      return E.left(this.isUuIdMessage);
    }
    return E.right(true);
  };

  // validation
  static isUuid(value: string): boolean {
    // Implement the logic to check if the value is a valid UUID
    // Return true if it is a valid UUID, false otherwise
    // You can use a regular expression or any other method to validate the UUID format
    // For example, you can use the following regular expression pattern:
    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidPattern.test(value);
  }
  static isUuIdMessage = "Id must be a valid UUID";
}

const eitherEquals = <L, R extends Eq.Eq<R>>(
  a: E.Either<L, R>,
  b: E.Either<L, R>
): boolean => {
  if (E.isLeft(a) || E.isLeft(b)) {
    return false;
  }
  return a.right.equals(a.right, b.right);
};

const strJoin = (str: string, ...args: string[]): string => {
  return args.join(str);
};
