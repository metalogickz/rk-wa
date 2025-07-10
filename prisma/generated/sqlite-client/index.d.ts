
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Instance
 * 
 */
export type Instance = $Result.DefaultSelection<Prisma.$InstancePayload>
/**
 * Model WebhookSettings
 * 
 */
export type WebhookSettings = $Result.DefaultSelection<Prisma.$WebhookSettingsPayload>
/**
 * Model Message
 * 
 */
export type Message = $Result.DefaultSelection<Prisma.$MessagePayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model ActivityLog
 * 
 */
export type ActivityLog = $Result.DefaultSelection<Prisma.$ActivityLogPayload>
/**
 * Model WebhookLog
 * 
 */
export type WebhookLog = $Result.DefaultSelection<Prisma.$WebhookLogPayload>
/**
 * Model InstanceUsage
 * 
 */
export type InstanceUsage = $Result.DefaultSelection<Prisma.$InstanceUsagePayload>
/**
 * Model UsageLimit
 * 
 */
export type UsageLimit = $Result.DefaultSelection<Prisma.$UsageLimitPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instance`: Exposes CRUD operations for the **Instance** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Instances
    * const instances = await prisma.instance.findMany()
    * ```
    */
  get instance(): Prisma.InstanceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookSettings`: Exposes CRUD operations for the **WebhookSettings** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookSettings
    * const webhookSettings = await prisma.webhookSettings.findMany()
    * ```
    */
  get webhookSettings(): Prisma.WebhookSettingsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.message`: Exposes CRUD operations for the **Message** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Messages
    * const messages = await prisma.message.findMany()
    * ```
    */
  get message(): Prisma.MessageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ActivityLogs
    * const activityLogs = await prisma.activityLog.findMany()
    * ```
    */
  get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.webhookLog`: Exposes CRUD operations for the **WebhookLog** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WebhookLogs
    * const webhookLogs = await prisma.webhookLog.findMany()
    * ```
    */
  get webhookLog(): Prisma.WebhookLogDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.instanceUsage`: Exposes CRUD operations for the **InstanceUsage** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InstanceUsages
    * const instanceUsages = await prisma.instanceUsage.findMany()
    * ```
    */
  get instanceUsage(): Prisma.InstanceUsageDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usageLimit`: Exposes CRUD operations for the **UsageLimit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UsageLimits
    * const usageLimits = await prisma.usageLimit.findMany()
    * ```
    */
  get usageLimit(): Prisma.UsageLimitDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.11.1
   * Query Engine version: f40f79ec31188888a2e33acda0ecc8fd10a853a9
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Instance: 'Instance',
    WebhookSettings: 'WebhookSettings',
    Message: 'Message',
    Contact: 'Contact',
    ActivityLog: 'ActivityLog',
    WebhookLog: 'WebhookLog',
    InstanceUsage: 'InstanceUsage',
    UsageLimit: 'UsageLimit'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "instance" | "webhookSettings" | "message" | "contact" | "activityLog" | "webhookLog" | "instanceUsage" | "usageLimit"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Instance: {
        payload: Prisma.$InstancePayload<ExtArgs>
        fields: Prisma.InstanceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstanceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstanceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          findFirst: {
            args: Prisma.InstanceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstanceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          findMany: {
            args: Prisma.InstanceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>[]
          }
          create: {
            args: Prisma.InstanceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          createMany: {
            args: Prisma.InstanceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstanceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>[]
          }
          delete: {
            args: Prisma.InstanceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          update: {
            args: Prisma.InstanceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          deleteMany: {
            args: Prisma.InstanceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstanceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InstanceUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>[]
          }
          upsert: {
            args: Prisma.InstanceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstancePayload>
          }
          aggregate: {
            args: Prisma.InstanceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstance>
          }
          groupBy: {
            args: Prisma.InstanceGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstanceGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstanceCountArgs<ExtArgs>
            result: $Utils.Optional<InstanceCountAggregateOutputType> | number
          }
        }
      }
      WebhookSettings: {
        payload: Prisma.$WebhookSettingsPayload<ExtArgs>
        fields: Prisma.WebhookSettingsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookSettingsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookSettingsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          findFirst: {
            args: Prisma.WebhookSettingsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookSettingsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          findMany: {
            args: Prisma.WebhookSettingsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>[]
          }
          create: {
            args: Prisma.WebhookSettingsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          createMany: {
            args: Prisma.WebhookSettingsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookSettingsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>[]
          }
          delete: {
            args: Prisma.WebhookSettingsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          update: {
            args: Prisma.WebhookSettingsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          deleteMany: {
            args: Prisma.WebhookSettingsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookSettingsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookSettingsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>[]
          }
          upsert: {
            args: Prisma.WebhookSettingsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookSettingsPayload>
          }
          aggregate: {
            args: Prisma.WebhookSettingsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookSettings>
          }
          groupBy: {
            args: Prisma.WebhookSettingsGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookSettingsGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookSettingsCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookSettingsCountAggregateOutputType> | number
          }
        }
      }
      Message: {
        payload: Prisma.$MessagePayload<ExtArgs>
        fields: Prisma.MessageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MessageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MessageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findFirst: {
            args: Prisma.MessageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MessageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          findMany: {
            args: Prisma.MessageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          create: {
            args: Prisma.MessageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          createMany: {
            args: Prisma.MessageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MessageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          delete: {
            args: Prisma.MessageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          update: {
            args: Prisma.MessageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          deleteMany: {
            args: Prisma.MessageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MessageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MessageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>[]
          }
          upsert: {
            args: Prisma.MessageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MessagePayload>
          }
          aggregate: {
            args: Prisma.MessageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMessage>
          }
          groupBy: {
            args: Prisma.MessageGroupByArgs<ExtArgs>
            result: $Utils.Optional<MessageGroupByOutputType>[]
          }
          count: {
            args: Prisma.MessageCountArgs<ExtArgs>
            result: $Utils.Optional<MessageCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      ActivityLog: {
        payload: Prisma.$ActivityLogPayload<ExtArgs>
        fields: Prisma.ActivityLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findFirst: {
            args: Prisma.ActivityLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          findMany: {
            args: Prisma.ActivityLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          create: {
            args: Prisma.ActivityLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          createMany: {
            args: Prisma.ActivityLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          delete: {
            args: Prisma.ActivityLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          update: {
            args: Prisma.ActivityLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          deleteMany: {
            args: Prisma.ActivityLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>[]
          }
          upsert: {
            args: Prisma.ActivityLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityLogPayload>
          }
          aggregate: {
            args: Prisma.ActivityLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivityLog>
          }
          groupBy: {
            args: Prisma.ActivityLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityLogCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityLogCountAggregateOutputType> | number
          }
        }
      }
      WebhookLog: {
        payload: Prisma.$WebhookLogPayload<ExtArgs>
        fields: Prisma.WebhookLogFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WebhookLogFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WebhookLogFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findFirst: {
            args: Prisma.WebhookLogFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WebhookLogFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          findMany: {
            args: Prisma.WebhookLogFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          create: {
            args: Prisma.WebhookLogCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          createMany: {
            args: Prisma.WebhookLogCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WebhookLogCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          delete: {
            args: Prisma.WebhookLogDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          update: {
            args: Prisma.WebhookLogUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          deleteMany: {
            args: Prisma.WebhookLogDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WebhookLogUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.WebhookLogUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>[]
          }
          upsert: {
            args: Prisma.WebhookLogUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WebhookLogPayload>
          }
          aggregate: {
            args: Prisma.WebhookLogAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWebhookLog>
          }
          groupBy: {
            args: Prisma.WebhookLogGroupByArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogGroupByOutputType>[]
          }
          count: {
            args: Prisma.WebhookLogCountArgs<ExtArgs>
            result: $Utils.Optional<WebhookLogCountAggregateOutputType> | number
          }
        }
      }
      InstanceUsage: {
        payload: Prisma.$InstanceUsagePayload<ExtArgs>
        fields: Prisma.InstanceUsageFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InstanceUsageFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InstanceUsageFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          findFirst: {
            args: Prisma.InstanceUsageFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InstanceUsageFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          findMany: {
            args: Prisma.InstanceUsageFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>[]
          }
          create: {
            args: Prisma.InstanceUsageCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          createMany: {
            args: Prisma.InstanceUsageCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InstanceUsageCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>[]
          }
          delete: {
            args: Prisma.InstanceUsageDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          update: {
            args: Prisma.InstanceUsageUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          deleteMany: {
            args: Prisma.InstanceUsageDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InstanceUsageUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InstanceUsageUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>[]
          }
          upsert: {
            args: Prisma.InstanceUsageUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InstanceUsagePayload>
          }
          aggregate: {
            args: Prisma.InstanceUsageAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInstanceUsage>
          }
          groupBy: {
            args: Prisma.InstanceUsageGroupByArgs<ExtArgs>
            result: $Utils.Optional<InstanceUsageGroupByOutputType>[]
          }
          count: {
            args: Prisma.InstanceUsageCountArgs<ExtArgs>
            result: $Utils.Optional<InstanceUsageCountAggregateOutputType> | number
          }
        }
      }
      UsageLimit: {
        payload: Prisma.$UsageLimitPayload<ExtArgs>
        fields: Prisma.UsageLimitFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsageLimitFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsageLimitFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          findFirst: {
            args: Prisma.UsageLimitFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsageLimitFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          findMany: {
            args: Prisma.UsageLimitFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>[]
          }
          create: {
            args: Prisma.UsageLimitCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          createMany: {
            args: Prisma.UsageLimitCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsageLimitCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>[]
          }
          delete: {
            args: Prisma.UsageLimitDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          update: {
            args: Prisma.UsageLimitUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          deleteMany: {
            args: Prisma.UsageLimitDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsageLimitUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsageLimitUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>[]
          }
          upsert: {
            args: Prisma.UsageLimitUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsageLimitPayload>
          }
          aggregate: {
            args: Prisma.UsageLimitAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsageLimit>
          }
          groupBy: {
            args: Prisma.UsageLimitGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsageLimitGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsageLimitCountArgs<ExtArgs>
            result: $Utils.Optional<UsageLimitCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    instance?: InstanceOmit
    webhookSettings?: WebhookSettingsOmit
    message?: MessageOmit
    contact?: ContactOmit
    activityLog?: ActivityLogOmit
    webhookLog?: WebhookLogOmit
    instanceUsage?: InstanceUsageOmit
    usageLimit?: UsageLimitOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    instances: number
    usageLimits: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instances?: boolean | UserCountOutputTypeCountInstancesArgs
    usageLimits?: boolean | UserCountOutputTypeCountUsageLimitsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountInstancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstanceWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountUsageLimitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLimitWhereInput
  }


  /**
   * Count Type InstanceCountOutputType
   */

  export type InstanceCountOutputType = {
    messages: number
    activityLogs: number
    webhookLogs: number
    instanceUsage: number
    usageLimits: number
    Contact: number
  }

  export type InstanceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    messages?: boolean | InstanceCountOutputTypeCountMessagesArgs
    activityLogs?: boolean | InstanceCountOutputTypeCountActivityLogsArgs
    webhookLogs?: boolean | InstanceCountOutputTypeCountWebhookLogsArgs
    instanceUsage?: boolean | InstanceCountOutputTypeCountInstanceUsageArgs
    usageLimits?: boolean | InstanceCountOutputTypeCountUsageLimitsArgs
    Contact?: boolean | InstanceCountOutputTypeCountContactArgs
  }

  // Custom InputTypes
  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceCountOutputType
     */
    select?: InstanceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountMessagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountActivityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountWebhookLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountInstanceUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstanceUsageWhereInput
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountUsageLimitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLimitWhereInput
  }

  /**
   * InstanceCountOutputType without action
   */
  export type InstanceCountOutputTypeCountContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    apiKey: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    password: string | null
    firstName: string | null
    lastName: string | null
    apiKey: string | null
    isAdmin: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    firstName: number
    lastName: number
    apiKey: number
    isAdmin: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    apiKey?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    apiKey?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    firstName?: true
    lastName?: true
    apiKey?: true
    isAdmin?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    password: string
    firstName: string | null
    lastName: string | null
    apiKey: string
    isAdmin: boolean
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    apiKey?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instances?: boolean | User$instancesArgs<ExtArgs>
    usageLimits?: boolean | User$usageLimitsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    apiKey?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    apiKey?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    firstName?: boolean
    lastName?: boolean
    apiKey?: boolean
    isAdmin?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "firstName" | "lastName" | "apiKey" | "isAdmin" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instances?: boolean | User$instancesArgs<ExtArgs>
    usageLimits?: boolean | User$usageLimitsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      instances: Prisma.$InstancePayload<ExtArgs>[]
      usageLimits: Prisma.$UsageLimitPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      password: string
      firstName: string | null
      lastName: string | null
      apiKey: string
      isAdmin: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instances<T extends User$instancesArgs<ExtArgs> = {}>(args?: Subset<T, User$instancesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageLimits<T extends User$usageLimitsArgs<ExtArgs> = {}>(args?: Subset<T, User$usageLimitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly apiKey: FieldRef<"User", 'String'>
    readonly isAdmin: FieldRef<"User", 'Boolean'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.instances
   */
  export type User$instancesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    where?: InstanceWhereInput
    orderBy?: InstanceOrderByWithRelationInput | InstanceOrderByWithRelationInput[]
    cursor?: InstanceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstanceScalarFieldEnum | InstanceScalarFieldEnum[]
  }

  /**
   * User.usageLimits
   */
  export type User$usageLimitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    where?: UsageLimitWhereInput
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    cursor?: UsageLimitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLimitScalarFieldEnum | UsageLimitScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Instance
   */

  export type AggregateInstance = {
    _count: InstanceCountAggregateOutputType | null
    _avg: InstanceAvgAggregateOutputType | null
    _sum: InstanceSumAggregateOutputType | null
    _min: InstanceMinAggregateOutputType | null
    _max: InstanceMaxAggregateOutputType | null
  }

  export type InstanceAvgAggregateOutputType = {
    sentMessages: number | null
    receivedMessages: number | null
  }

  export type InstanceSumAggregateOutputType = {
    sentMessages: number | null
    receivedMessages: number | null
  }

  export type InstanceMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    userId: string | null
    status: string | null
    qrCode: string | null
    webhookUrl: string | null
    webhookEnabled: boolean | null
    sentMessages: number | null
    receivedMessages: number | null
    credentials: string | null
    lastActivity: Date | null
    authCreatedAt: Date | null
    authExpiresAt: Date | null
    authRefreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstanceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    userId: string | null
    status: string | null
    qrCode: string | null
    webhookUrl: string | null
    webhookEnabled: boolean | null
    sentMessages: number | null
    receivedMessages: number | null
    credentials: string | null
    lastActivity: Date | null
    authCreatedAt: Date | null
    authExpiresAt: Date | null
    authRefreshToken: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstanceCountAggregateOutputType = {
    id: number
    name: number
    description: number
    userId: number
    status: number
    qrCode: number
    webhookUrl: number
    webhookEnabled: number
    sentMessages: number
    receivedMessages: number
    credentials: number
    lastActivity: number
    authCreatedAt: number
    authExpiresAt: number
    authRefreshToken: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InstanceAvgAggregateInputType = {
    sentMessages?: true
    receivedMessages?: true
  }

  export type InstanceSumAggregateInputType = {
    sentMessages?: true
    receivedMessages?: true
  }

  export type InstanceMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
    status?: true
    qrCode?: true
    webhookUrl?: true
    webhookEnabled?: true
    sentMessages?: true
    receivedMessages?: true
    credentials?: true
    lastActivity?: true
    authCreatedAt?: true
    authExpiresAt?: true
    authRefreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstanceMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
    status?: true
    qrCode?: true
    webhookUrl?: true
    webhookEnabled?: true
    sentMessages?: true
    receivedMessages?: true
    credentials?: true
    lastActivity?: true
    authCreatedAt?: true
    authExpiresAt?: true
    authRefreshToken?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstanceCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    userId?: true
    status?: true
    qrCode?: true
    webhookUrl?: true
    webhookEnabled?: true
    sentMessages?: true
    receivedMessages?: true
    credentials?: true
    lastActivity?: true
    authCreatedAt?: true
    authExpiresAt?: true
    authRefreshToken?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InstanceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instance to aggregate.
     */
    where?: InstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instances to fetch.
     */
    orderBy?: InstanceOrderByWithRelationInput | InstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Instances
    **/
    _count?: true | InstanceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstanceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstanceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstanceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstanceMaxAggregateInputType
  }

  export type GetInstanceAggregateType<T extends InstanceAggregateArgs> = {
        [P in keyof T & keyof AggregateInstance]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstance[P]>
      : GetScalarType<T[P], AggregateInstance[P]>
  }




  export type InstanceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstanceWhereInput
    orderBy?: InstanceOrderByWithAggregationInput | InstanceOrderByWithAggregationInput[]
    by: InstanceScalarFieldEnum[] | InstanceScalarFieldEnum
    having?: InstanceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstanceCountAggregateInputType | true
    _avg?: InstanceAvgAggregateInputType
    _sum?: InstanceSumAggregateInputType
    _min?: InstanceMinAggregateInputType
    _max?: InstanceMaxAggregateInputType
  }

  export type InstanceGroupByOutputType = {
    id: string
    name: string
    description: string | null
    userId: string
    status: string
    qrCode: string | null
    webhookUrl: string | null
    webhookEnabled: boolean
    sentMessages: number
    receivedMessages: number
    credentials: string | null
    lastActivity: Date | null
    authCreatedAt: Date | null
    authExpiresAt: Date | null
    authRefreshToken: string | null
    createdAt: Date
    updatedAt: Date
    _count: InstanceCountAggregateOutputType | null
    _avg: InstanceAvgAggregateOutputType | null
    _sum: InstanceSumAggregateOutputType | null
    _min: InstanceMinAggregateOutputType | null
    _max: InstanceMaxAggregateOutputType | null
  }

  type GetInstanceGroupByPayload<T extends InstanceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstanceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstanceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstanceGroupByOutputType[P]>
            : GetScalarType<T[P], InstanceGroupByOutputType[P]>
        }
      >
    >


  export type InstanceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    status?: boolean
    qrCode?: boolean
    webhookUrl?: boolean
    webhookEnabled?: boolean
    sentMessages?: boolean
    receivedMessages?: boolean
    credentials?: boolean
    lastActivity?: boolean
    authCreatedAt?: boolean
    authExpiresAt?: boolean
    authRefreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    webhookSettings?: boolean | Instance$webhookSettingsArgs<ExtArgs>
    messages?: boolean | Instance$messagesArgs<ExtArgs>
    activityLogs?: boolean | Instance$activityLogsArgs<ExtArgs>
    webhookLogs?: boolean | Instance$webhookLogsArgs<ExtArgs>
    instanceUsage?: boolean | Instance$instanceUsageArgs<ExtArgs>
    usageLimits?: boolean | Instance$usageLimitsArgs<ExtArgs>
    Contact?: boolean | Instance$ContactArgs<ExtArgs>
    _count?: boolean | InstanceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instance"]>

  export type InstanceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    status?: boolean
    qrCode?: boolean
    webhookUrl?: boolean
    webhookEnabled?: boolean
    sentMessages?: boolean
    receivedMessages?: boolean
    credentials?: boolean
    lastActivity?: boolean
    authCreatedAt?: boolean
    authExpiresAt?: boolean
    authRefreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instance"]>

  export type InstanceSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    status?: boolean
    qrCode?: boolean
    webhookUrl?: boolean
    webhookEnabled?: boolean
    sentMessages?: boolean
    receivedMessages?: boolean
    credentials?: boolean
    lastActivity?: boolean
    authCreatedAt?: boolean
    authExpiresAt?: boolean
    authRefreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instance"]>

  export type InstanceSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    userId?: boolean
    status?: boolean
    qrCode?: boolean
    webhookUrl?: boolean
    webhookEnabled?: boolean
    sentMessages?: boolean
    receivedMessages?: boolean
    credentials?: boolean
    lastActivity?: boolean
    authCreatedAt?: boolean
    authExpiresAt?: boolean
    authRefreshToken?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InstanceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "userId" | "status" | "qrCode" | "webhookUrl" | "webhookEnabled" | "sentMessages" | "receivedMessages" | "credentials" | "lastActivity" | "authCreatedAt" | "authExpiresAt" | "authRefreshToken" | "createdAt" | "updatedAt", ExtArgs["result"]["instance"]>
  export type InstanceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    webhookSettings?: boolean | Instance$webhookSettingsArgs<ExtArgs>
    messages?: boolean | Instance$messagesArgs<ExtArgs>
    activityLogs?: boolean | Instance$activityLogsArgs<ExtArgs>
    webhookLogs?: boolean | Instance$webhookLogsArgs<ExtArgs>
    instanceUsage?: boolean | Instance$instanceUsageArgs<ExtArgs>
    usageLimits?: boolean | Instance$usageLimitsArgs<ExtArgs>
    Contact?: boolean | Instance$ContactArgs<ExtArgs>
    _count?: boolean | InstanceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type InstanceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type InstanceIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $InstancePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Instance"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      webhookSettings: Prisma.$WebhookSettingsPayload<ExtArgs> | null
      messages: Prisma.$MessagePayload<ExtArgs>[]
      activityLogs: Prisma.$ActivityLogPayload<ExtArgs>[]
      webhookLogs: Prisma.$WebhookLogPayload<ExtArgs>[]
      instanceUsage: Prisma.$InstanceUsagePayload<ExtArgs>[]
      usageLimits: Prisma.$UsageLimitPayload<ExtArgs>[]
      Contact: Prisma.$ContactPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string | null
      userId: string
      status: string
      qrCode: string | null
      webhookUrl: string | null
      webhookEnabled: boolean
      sentMessages: number
      receivedMessages: number
      credentials: string | null
      lastActivity: Date | null
      authCreatedAt: Date | null
      authExpiresAt: Date | null
      authRefreshToken: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["instance"]>
    composites: {}
  }

  type InstanceGetPayload<S extends boolean | null | undefined | InstanceDefaultArgs> = $Result.GetResult<Prisma.$InstancePayload, S>

  type InstanceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstanceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstanceCountAggregateInputType | true
    }

  export interface InstanceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Instance'], meta: { name: 'Instance' } }
    /**
     * Find zero or one Instance that matches the filter.
     * @param {InstanceFindUniqueArgs} args - Arguments to find a Instance
     * @example
     * // Get one Instance
     * const instance = await prisma.instance.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstanceFindUniqueArgs>(args: SelectSubset<T, InstanceFindUniqueArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Instance that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstanceFindUniqueOrThrowArgs} args - Arguments to find a Instance
     * @example
     * // Get one Instance
     * const instance = await prisma.instance.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstanceFindUniqueOrThrowArgs>(args: SelectSubset<T, InstanceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instance that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceFindFirstArgs} args - Arguments to find a Instance
     * @example
     * // Get one Instance
     * const instance = await prisma.instance.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstanceFindFirstArgs>(args?: SelectSubset<T, InstanceFindFirstArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Instance that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceFindFirstOrThrowArgs} args - Arguments to find a Instance
     * @example
     * // Get one Instance
     * const instance = await prisma.instance.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstanceFindFirstOrThrowArgs>(args?: SelectSubset<T, InstanceFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Instances that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Instances
     * const instances = await prisma.instance.findMany()
     * 
     * // Get first 10 Instances
     * const instances = await prisma.instance.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instanceWithIdOnly = await prisma.instance.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstanceFindManyArgs>(args?: SelectSubset<T, InstanceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Instance.
     * @param {InstanceCreateArgs} args - Arguments to create a Instance.
     * @example
     * // Create one Instance
     * const Instance = await prisma.instance.create({
     *   data: {
     *     // ... data to create a Instance
     *   }
     * })
     * 
     */
    create<T extends InstanceCreateArgs>(args: SelectSubset<T, InstanceCreateArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Instances.
     * @param {InstanceCreateManyArgs} args - Arguments to create many Instances.
     * @example
     * // Create many Instances
     * const instance = await prisma.instance.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstanceCreateManyArgs>(args?: SelectSubset<T, InstanceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Instances and returns the data saved in the database.
     * @param {InstanceCreateManyAndReturnArgs} args - Arguments to create many Instances.
     * @example
     * // Create many Instances
     * const instance = await prisma.instance.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Instances and only return the `id`
     * const instanceWithIdOnly = await prisma.instance.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstanceCreateManyAndReturnArgs>(args?: SelectSubset<T, InstanceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Instance.
     * @param {InstanceDeleteArgs} args - Arguments to delete one Instance.
     * @example
     * // Delete one Instance
     * const Instance = await prisma.instance.delete({
     *   where: {
     *     // ... filter to delete one Instance
     *   }
     * })
     * 
     */
    delete<T extends InstanceDeleteArgs>(args: SelectSubset<T, InstanceDeleteArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Instance.
     * @param {InstanceUpdateArgs} args - Arguments to update one Instance.
     * @example
     * // Update one Instance
     * const instance = await prisma.instance.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstanceUpdateArgs>(args: SelectSubset<T, InstanceUpdateArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Instances.
     * @param {InstanceDeleteManyArgs} args - Arguments to filter Instances to delete.
     * @example
     * // Delete a few Instances
     * const { count } = await prisma.instance.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstanceDeleteManyArgs>(args?: SelectSubset<T, InstanceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Instances
     * const instance = await prisma.instance.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstanceUpdateManyArgs>(args: SelectSubset<T, InstanceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Instances and returns the data updated in the database.
     * @param {InstanceUpdateManyAndReturnArgs} args - Arguments to update many Instances.
     * @example
     * // Update many Instances
     * const instance = await prisma.instance.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Instances and only return the `id`
     * const instanceWithIdOnly = await prisma.instance.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InstanceUpdateManyAndReturnArgs>(args: SelectSubset<T, InstanceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Instance.
     * @param {InstanceUpsertArgs} args - Arguments to update or create a Instance.
     * @example
     * // Update or create a Instance
     * const instance = await prisma.instance.upsert({
     *   create: {
     *     // ... data to create a Instance
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Instance we want to update
     *   }
     * })
     */
    upsert<T extends InstanceUpsertArgs>(args: SelectSubset<T, InstanceUpsertArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Instances.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceCountArgs} args - Arguments to filter Instances to count.
     * @example
     * // Count the number of Instances
     * const count = await prisma.instance.count({
     *   where: {
     *     // ... the filter for the Instances we want to count
     *   }
     * })
    **/
    count<T extends InstanceCountArgs>(
      args?: Subset<T, InstanceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstanceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstanceAggregateArgs>(args: Subset<T, InstanceAggregateArgs>): Prisma.PrismaPromise<GetInstanceAggregateType<T>>

    /**
     * Group by Instance.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstanceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstanceGroupByArgs['orderBy'] }
        : { orderBy?: InstanceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstanceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstanceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Instance model
   */
  readonly fields: InstanceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Instance.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstanceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    webhookSettings<T extends Instance$webhookSettingsArgs<ExtArgs> = {}>(args?: Subset<T, Instance$webhookSettingsArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    messages<T extends Instance$messagesArgs<ExtArgs> = {}>(args?: Subset<T, Instance$messagesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    activityLogs<T extends Instance$activityLogsArgs<ExtArgs> = {}>(args?: Subset<T, Instance$activityLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    webhookLogs<T extends Instance$webhookLogsArgs<ExtArgs> = {}>(args?: Subset<T, Instance$webhookLogsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    instanceUsage<T extends Instance$instanceUsageArgs<ExtArgs> = {}>(args?: Subset<T, Instance$instanceUsageArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    usageLimits<T extends Instance$usageLimitsArgs<ExtArgs> = {}>(args?: Subset<T, Instance$usageLimitsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Contact<T extends Instance$ContactArgs<ExtArgs> = {}>(args?: Subset<T, Instance$ContactArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Instance model
   */
  interface InstanceFieldRefs {
    readonly id: FieldRef<"Instance", 'String'>
    readonly name: FieldRef<"Instance", 'String'>
    readonly description: FieldRef<"Instance", 'String'>
    readonly userId: FieldRef<"Instance", 'String'>
    readonly status: FieldRef<"Instance", 'String'>
    readonly qrCode: FieldRef<"Instance", 'String'>
    readonly webhookUrl: FieldRef<"Instance", 'String'>
    readonly webhookEnabled: FieldRef<"Instance", 'Boolean'>
    readonly sentMessages: FieldRef<"Instance", 'Int'>
    readonly receivedMessages: FieldRef<"Instance", 'Int'>
    readonly credentials: FieldRef<"Instance", 'String'>
    readonly lastActivity: FieldRef<"Instance", 'DateTime'>
    readonly authCreatedAt: FieldRef<"Instance", 'DateTime'>
    readonly authExpiresAt: FieldRef<"Instance", 'DateTime'>
    readonly authRefreshToken: FieldRef<"Instance", 'String'>
    readonly createdAt: FieldRef<"Instance", 'DateTime'>
    readonly updatedAt: FieldRef<"Instance", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Instance findUnique
   */
  export type InstanceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter, which Instance to fetch.
     */
    where: InstanceWhereUniqueInput
  }

  /**
   * Instance findUniqueOrThrow
   */
  export type InstanceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter, which Instance to fetch.
     */
    where: InstanceWhereUniqueInput
  }

  /**
   * Instance findFirst
   */
  export type InstanceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter, which Instance to fetch.
     */
    where?: InstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instances to fetch.
     */
    orderBy?: InstanceOrderByWithRelationInput | InstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instances.
     */
    cursor?: InstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instances.
     */
    distinct?: InstanceScalarFieldEnum | InstanceScalarFieldEnum[]
  }

  /**
   * Instance findFirstOrThrow
   */
  export type InstanceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter, which Instance to fetch.
     */
    where?: InstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instances to fetch.
     */
    orderBy?: InstanceOrderByWithRelationInput | InstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Instances.
     */
    cursor?: InstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instances.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Instances.
     */
    distinct?: InstanceScalarFieldEnum | InstanceScalarFieldEnum[]
  }

  /**
   * Instance findMany
   */
  export type InstanceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter, which Instances to fetch.
     */
    where?: InstanceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Instances to fetch.
     */
    orderBy?: InstanceOrderByWithRelationInput | InstanceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Instances.
     */
    cursor?: InstanceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Instances from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Instances.
     */
    skip?: number
    distinct?: InstanceScalarFieldEnum | InstanceScalarFieldEnum[]
  }

  /**
   * Instance create
   */
  export type InstanceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * The data needed to create a Instance.
     */
    data: XOR<InstanceCreateInput, InstanceUncheckedCreateInput>
  }

  /**
   * Instance createMany
   */
  export type InstanceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Instances.
     */
    data: InstanceCreateManyInput | InstanceCreateManyInput[]
  }

  /**
   * Instance createManyAndReturn
   */
  export type InstanceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * The data used to create many Instances.
     */
    data: InstanceCreateManyInput | InstanceCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Instance update
   */
  export type InstanceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * The data needed to update a Instance.
     */
    data: XOR<InstanceUpdateInput, InstanceUncheckedUpdateInput>
    /**
     * Choose, which Instance to update.
     */
    where: InstanceWhereUniqueInput
  }

  /**
   * Instance updateMany
   */
  export type InstanceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Instances.
     */
    data: XOR<InstanceUpdateManyMutationInput, InstanceUncheckedUpdateManyInput>
    /**
     * Filter which Instances to update
     */
    where?: InstanceWhereInput
    /**
     * Limit how many Instances to update.
     */
    limit?: number
  }

  /**
   * Instance updateManyAndReturn
   */
  export type InstanceUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * The data used to update Instances.
     */
    data: XOR<InstanceUpdateManyMutationInput, InstanceUncheckedUpdateManyInput>
    /**
     * Filter which Instances to update
     */
    where?: InstanceWhereInput
    /**
     * Limit how many Instances to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Instance upsert
   */
  export type InstanceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * The filter to search for the Instance to update in case it exists.
     */
    where: InstanceWhereUniqueInput
    /**
     * In case the Instance found by the `where` argument doesn't exist, create a new Instance with this data.
     */
    create: XOR<InstanceCreateInput, InstanceUncheckedCreateInput>
    /**
     * In case the Instance was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstanceUpdateInput, InstanceUncheckedUpdateInput>
  }

  /**
   * Instance delete
   */
  export type InstanceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    /**
     * Filter which Instance to delete.
     */
    where: InstanceWhereUniqueInput
  }

  /**
   * Instance deleteMany
   */
  export type InstanceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Instances to delete
     */
    where?: InstanceWhereInput
    /**
     * Limit how many Instances to delete.
     */
    limit?: number
  }

  /**
   * Instance.webhookSettings
   */
  export type Instance$webhookSettingsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    where?: WebhookSettingsWhereInput
  }

  /**
   * Instance.messages
   */
  export type Instance$messagesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    cursor?: MessageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Instance.activityLogs
   */
  export type Instance$activityLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    cursor?: ActivityLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * Instance.webhookLogs
   */
  export type Instance$webhookLogsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    cursor?: WebhookLogWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * Instance.instanceUsage
   */
  export type Instance$instanceUsageArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    where?: InstanceUsageWhereInput
    orderBy?: InstanceUsageOrderByWithRelationInput | InstanceUsageOrderByWithRelationInput[]
    cursor?: InstanceUsageWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InstanceUsageScalarFieldEnum | InstanceUsageScalarFieldEnum[]
  }

  /**
   * Instance.usageLimits
   */
  export type Instance$usageLimitsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    where?: UsageLimitWhereInput
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    cursor?: UsageLimitWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UsageLimitScalarFieldEnum | UsageLimitScalarFieldEnum[]
  }

  /**
   * Instance.Contact
   */
  export type Instance$ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Instance without action
   */
  export type InstanceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
  }


  /**
   * Model WebhookSettings
   */

  export type AggregateWebhookSettings = {
    _count: WebhookSettingsCountAggregateOutputType | null
    _avg: WebhookSettingsAvgAggregateOutputType | null
    _sum: WebhookSettingsSumAggregateOutputType | null
    _min: WebhookSettingsMinAggregateOutputType | null
    _max: WebhookSettingsMaxAggregateOutputType | null
  }

  export type WebhookSettingsAvgAggregateOutputType = {
    maxRetries: number | null
    retryInterval: number | null
  }

  export type WebhookSettingsSumAggregateOutputType = {
    maxRetries: number | null
    retryInterval: number | null
  }

  export type WebhookSettingsMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    notifyReceived: boolean | null
    notifySent: boolean | null
    notifyDelivery: boolean | null
    notifyRead: boolean | null
    maxRetries: number | null
    retryInterval: number | null
    secret: string | null
    headers: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookSettingsMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    notifyReceived: boolean | null
    notifySent: boolean | null
    notifyDelivery: boolean | null
    notifyRead: boolean | null
    maxRetries: number | null
    retryInterval: number | null
    secret: string | null
    headers: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WebhookSettingsCountAggregateOutputType = {
    id: number
    instanceId: number
    notifyReceived: number
    notifySent: number
    notifyDelivery: number
    notifyRead: number
    maxRetries: number
    retryInterval: number
    secret: number
    headers: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WebhookSettingsAvgAggregateInputType = {
    maxRetries?: true
    retryInterval?: true
  }

  export type WebhookSettingsSumAggregateInputType = {
    maxRetries?: true
    retryInterval?: true
  }

  export type WebhookSettingsMinAggregateInputType = {
    id?: true
    instanceId?: true
    notifyReceived?: true
    notifySent?: true
    notifyDelivery?: true
    notifyRead?: true
    maxRetries?: true
    retryInterval?: true
    secret?: true
    headers?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookSettingsMaxAggregateInputType = {
    id?: true
    instanceId?: true
    notifyReceived?: true
    notifySent?: true
    notifyDelivery?: true
    notifyRead?: true
    maxRetries?: true
    retryInterval?: true
    secret?: true
    headers?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WebhookSettingsCountAggregateInputType = {
    id?: true
    instanceId?: true
    notifyReceived?: true
    notifySent?: true
    notifyDelivery?: true
    notifyRead?: true
    maxRetries?: true
    retryInterval?: true
    secret?: true
    headers?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WebhookSettingsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookSettings to aggregate.
     */
    where?: WebhookSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookSettings to fetch.
     */
    orderBy?: WebhookSettingsOrderByWithRelationInput | WebhookSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookSettings
    **/
    _count?: true | WebhookSettingsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookSettingsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookSettingsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookSettingsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookSettingsMaxAggregateInputType
  }

  export type GetWebhookSettingsAggregateType<T extends WebhookSettingsAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookSettings]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookSettings[P]>
      : GetScalarType<T[P], AggregateWebhookSettings[P]>
  }




  export type WebhookSettingsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookSettingsWhereInput
    orderBy?: WebhookSettingsOrderByWithAggregationInput | WebhookSettingsOrderByWithAggregationInput[]
    by: WebhookSettingsScalarFieldEnum[] | WebhookSettingsScalarFieldEnum
    having?: WebhookSettingsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookSettingsCountAggregateInputType | true
    _avg?: WebhookSettingsAvgAggregateInputType
    _sum?: WebhookSettingsSumAggregateInputType
    _min?: WebhookSettingsMinAggregateInputType
    _max?: WebhookSettingsMaxAggregateInputType
  }

  export type WebhookSettingsGroupByOutputType = {
    id: string
    instanceId: string
    notifyReceived: boolean
    notifySent: boolean
    notifyDelivery: boolean
    notifyRead: boolean
    maxRetries: number
    retryInterval: number
    secret: string | null
    headers: string | null
    createdAt: Date
    updatedAt: Date
    _count: WebhookSettingsCountAggregateOutputType | null
    _avg: WebhookSettingsAvgAggregateOutputType | null
    _sum: WebhookSettingsSumAggregateOutputType | null
    _min: WebhookSettingsMinAggregateOutputType | null
    _max: WebhookSettingsMaxAggregateOutputType | null
  }

  type GetWebhookSettingsGroupByPayload<T extends WebhookSettingsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookSettingsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookSettingsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookSettingsGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookSettingsGroupByOutputType[P]>
        }
      >
    >


  export type WebhookSettingsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: boolean
    retryInterval?: boolean
    secret?: boolean
    headers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookSettings"]>

  export type WebhookSettingsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: boolean
    retryInterval?: boolean
    secret?: boolean
    headers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookSettings"]>

  export type WebhookSettingsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: boolean
    retryInterval?: boolean
    secret?: boolean
    headers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookSettings"]>

  export type WebhookSettingsSelectScalar = {
    id?: boolean
    instanceId?: boolean
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: boolean
    retryInterval?: boolean
    secret?: boolean
    headers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WebhookSettingsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "notifyReceived" | "notifySent" | "notifyDelivery" | "notifyRead" | "maxRetries" | "retryInterval" | "secret" | "headers" | "createdAt" | "updatedAt", ExtArgs["result"]["webhookSettings"]>
  export type WebhookSettingsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type WebhookSettingsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type WebhookSettingsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $WebhookSettingsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookSettings"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      notifyReceived: boolean
      notifySent: boolean
      notifyDelivery: boolean
      notifyRead: boolean
      maxRetries: number
      retryInterval: number
      secret: string | null
      headers: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["webhookSettings"]>
    composites: {}
  }

  type WebhookSettingsGetPayload<S extends boolean | null | undefined | WebhookSettingsDefaultArgs> = $Result.GetResult<Prisma.$WebhookSettingsPayload, S>

  type WebhookSettingsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookSettingsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookSettingsCountAggregateInputType | true
    }

  export interface WebhookSettingsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookSettings'], meta: { name: 'WebhookSettings' } }
    /**
     * Find zero or one WebhookSettings that matches the filter.
     * @param {WebhookSettingsFindUniqueArgs} args - Arguments to find a WebhookSettings
     * @example
     * // Get one WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookSettingsFindUniqueArgs>(args: SelectSubset<T, WebhookSettingsFindUniqueArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookSettings that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookSettingsFindUniqueOrThrowArgs} args - Arguments to find a WebhookSettings
     * @example
     * // Get one WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookSettingsFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookSettingsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsFindFirstArgs} args - Arguments to find a WebhookSettings
     * @example
     * // Get one WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookSettingsFindFirstArgs>(args?: SelectSubset<T, WebhookSettingsFindFirstArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookSettings that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsFindFirstOrThrowArgs} args - Arguments to find a WebhookSettings
     * @example
     * // Get one WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookSettingsFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookSettingsFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findMany()
     * 
     * // Get first 10 WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookSettingsWithIdOnly = await prisma.webhookSettings.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookSettingsFindManyArgs>(args?: SelectSubset<T, WebhookSettingsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookSettings.
     * @param {WebhookSettingsCreateArgs} args - Arguments to create a WebhookSettings.
     * @example
     * // Create one WebhookSettings
     * const WebhookSettings = await prisma.webhookSettings.create({
     *   data: {
     *     // ... data to create a WebhookSettings
     *   }
     * })
     * 
     */
    create<T extends WebhookSettingsCreateArgs>(args: SelectSubset<T, WebhookSettingsCreateArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookSettings.
     * @param {WebhookSettingsCreateManyArgs} args - Arguments to create many WebhookSettings.
     * @example
     * // Create many WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookSettingsCreateManyArgs>(args?: SelectSubset<T, WebhookSettingsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookSettings and returns the data saved in the database.
     * @param {WebhookSettingsCreateManyAndReturnArgs} args - Arguments to create many WebhookSettings.
     * @example
     * // Create many WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookSettings and only return the `id`
     * const webhookSettingsWithIdOnly = await prisma.webhookSettings.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookSettingsCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookSettingsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookSettings.
     * @param {WebhookSettingsDeleteArgs} args - Arguments to delete one WebhookSettings.
     * @example
     * // Delete one WebhookSettings
     * const WebhookSettings = await prisma.webhookSettings.delete({
     *   where: {
     *     // ... filter to delete one WebhookSettings
     *   }
     * })
     * 
     */
    delete<T extends WebhookSettingsDeleteArgs>(args: SelectSubset<T, WebhookSettingsDeleteArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookSettings.
     * @param {WebhookSettingsUpdateArgs} args - Arguments to update one WebhookSettings.
     * @example
     * // Update one WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookSettingsUpdateArgs>(args: SelectSubset<T, WebhookSettingsUpdateArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookSettings.
     * @param {WebhookSettingsDeleteManyArgs} args - Arguments to filter WebhookSettings to delete.
     * @example
     * // Delete a few WebhookSettings
     * const { count } = await prisma.webhookSettings.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookSettingsDeleteManyArgs>(args?: SelectSubset<T, WebhookSettingsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookSettingsUpdateManyArgs>(args: SelectSubset<T, WebhookSettingsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookSettings and returns the data updated in the database.
     * @param {WebhookSettingsUpdateManyAndReturnArgs} args - Arguments to update many WebhookSettings.
     * @example
     * // Update many WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookSettings and only return the `id`
     * const webhookSettingsWithIdOnly = await prisma.webhookSettings.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookSettingsUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookSettingsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookSettings.
     * @param {WebhookSettingsUpsertArgs} args - Arguments to update or create a WebhookSettings.
     * @example
     * // Update or create a WebhookSettings
     * const webhookSettings = await prisma.webhookSettings.upsert({
     *   create: {
     *     // ... data to create a WebhookSettings
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookSettings we want to update
     *   }
     * })
     */
    upsert<T extends WebhookSettingsUpsertArgs>(args: SelectSubset<T, WebhookSettingsUpsertArgs<ExtArgs>>): Prisma__WebhookSettingsClient<$Result.GetResult<Prisma.$WebhookSettingsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsCountArgs} args - Arguments to filter WebhookSettings to count.
     * @example
     * // Count the number of WebhookSettings
     * const count = await prisma.webhookSettings.count({
     *   where: {
     *     // ... the filter for the WebhookSettings we want to count
     *   }
     * })
    **/
    count<T extends WebhookSettingsCountArgs>(
      args?: Subset<T, WebhookSettingsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookSettingsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookSettingsAggregateArgs>(args: Subset<T, WebhookSettingsAggregateArgs>): Prisma.PrismaPromise<GetWebhookSettingsAggregateType<T>>

    /**
     * Group by WebhookSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookSettingsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookSettingsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookSettingsGroupByArgs['orderBy'] }
        : { orderBy?: WebhookSettingsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookSettingsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookSettingsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookSettings model
   */
  readonly fields: WebhookSettingsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookSettings.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookSettingsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookSettings model
   */
  interface WebhookSettingsFieldRefs {
    readonly id: FieldRef<"WebhookSettings", 'String'>
    readonly instanceId: FieldRef<"WebhookSettings", 'String'>
    readonly notifyReceived: FieldRef<"WebhookSettings", 'Boolean'>
    readonly notifySent: FieldRef<"WebhookSettings", 'Boolean'>
    readonly notifyDelivery: FieldRef<"WebhookSettings", 'Boolean'>
    readonly notifyRead: FieldRef<"WebhookSettings", 'Boolean'>
    readonly maxRetries: FieldRef<"WebhookSettings", 'Int'>
    readonly retryInterval: FieldRef<"WebhookSettings", 'Int'>
    readonly secret: FieldRef<"WebhookSettings", 'String'>
    readonly headers: FieldRef<"WebhookSettings", 'String'>
    readonly createdAt: FieldRef<"WebhookSettings", 'DateTime'>
    readonly updatedAt: FieldRef<"WebhookSettings", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookSettings findUnique
   */
  export type WebhookSettingsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WebhookSettings to fetch.
     */
    where: WebhookSettingsWhereUniqueInput
  }

  /**
   * WebhookSettings findUniqueOrThrow
   */
  export type WebhookSettingsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WebhookSettings to fetch.
     */
    where: WebhookSettingsWhereUniqueInput
  }

  /**
   * WebhookSettings findFirst
   */
  export type WebhookSettingsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WebhookSettings to fetch.
     */
    where?: WebhookSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookSettings to fetch.
     */
    orderBy?: WebhookSettingsOrderByWithRelationInput | WebhookSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookSettings.
     */
    cursor?: WebhookSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookSettings.
     */
    distinct?: WebhookSettingsScalarFieldEnum | WebhookSettingsScalarFieldEnum[]
  }

  /**
   * WebhookSettings findFirstOrThrow
   */
  export type WebhookSettingsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WebhookSettings to fetch.
     */
    where?: WebhookSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookSettings to fetch.
     */
    orderBy?: WebhookSettingsOrderByWithRelationInput | WebhookSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookSettings.
     */
    cursor?: WebhookSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookSettings.
     */
    distinct?: WebhookSettingsScalarFieldEnum | WebhookSettingsScalarFieldEnum[]
  }

  /**
   * WebhookSettings findMany
   */
  export type WebhookSettingsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter, which WebhookSettings to fetch.
     */
    where?: WebhookSettingsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookSettings to fetch.
     */
    orderBy?: WebhookSettingsOrderByWithRelationInput | WebhookSettingsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookSettings.
     */
    cursor?: WebhookSettingsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookSettings.
     */
    skip?: number
    distinct?: WebhookSettingsScalarFieldEnum | WebhookSettingsScalarFieldEnum[]
  }

  /**
   * WebhookSettings create
   */
  export type WebhookSettingsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookSettings.
     */
    data: XOR<WebhookSettingsCreateInput, WebhookSettingsUncheckedCreateInput>
  }

  /**
   * WebhookSettings createMany
   */
  export type WebhookSettingsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookSettings.
     */
    data: WebhookSettingsCreateManyInput | WebhookSettingsCreateManyInput[]
  }

  /**
   * WebhookSettings createManyAndReturn
   */
  export type WebhookSettingsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookSettings.
     */
    data: WebhookSettingsCreateManyInput | WebhookSettingsCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookSettings update
   */
  export type WebhookSettingsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookSettings.
     */
    data: XOR<WebhookSettingsUpdateInput, WebhookSettingsUncheckedUpdateInput>
    /**
     * Choose, which WebhookSettings to update.
     */
    where: WebhookSettingsWhereUniqueInput
  }

  /**
   * WebhookSettings updateMany
   */
  export type WebhookSettingsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookSettings.
     */
    data: XOR<WebhookSettingsUpdateManyMutationInput, WebhookSettingsUncheckedUpdateManyInput>
    /**
     * Filter which WebhookSettings to update
     */
    where?: WebhookSettingsWhereInput
    /**
     * Limit how many WebhookSettings to update.
     */
    limit?: number
  }

  /**
   * WebhookSettings updateManyAndReturn
   */
  export type WebhookSettingsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * The data used to update WebhookSettings.
     */
    data: XOR<WebhookSettingsUpdateManyMutationInput, WebhookSettingsUncheckedUpdateManyInput>
    /**
     * Filter which WebhookSettings to update
     */
    where?: WebhookSettingsWhereInput
    /**
     * Limit how many WebhookSettings to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookSettings upsert
   */
  export type WebhookSettingsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookSettings to update in case it exists.
     */
    where: WebhookSettingsWhereUniqueInput
    /**
     * In case the WebhookSettings found by the `where` argument doesn't exist, create a new WebhookSettings with this data.
     */
    create: XOR<WebhookSettingsCreateInput, WebhookSettingsUncheckedCreateInput>
    /**
     * In case the WebhookSettings was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookSettingsUpdateInput, WebhookSettingsUncheckedUpdateInput>
  }

  /**
   * WebhookSettings delete
   */
  export type WebhookSettingsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
    /**
     * Filter which WebhookSettings to delete.
     */
    where: WebhookSettingsWhereUniqueInput
  }

  /**
   * WebhookSettings deleteMany
   */
  export type WebhookSettingsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookSettings to delete
     */
    where?: WebhookSettingsWhereInput
    /**
     * Limit how many WebhookSettings to delete.
     */
    limit?: number
  }

  /**
   * WebhookSettings without action
   */
  export type WebhookSettingsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookSettings
     */
    select?: WebhookSettingsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookSettings
     */
    omit?: WebhookSettingsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookSettingsInclude<ExtArgs> | null
  }


  /**
   * Model Message
   */

  export type AggregateMessage = {
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  export type MessageMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    remoteJid: string | null
    fromMe: boolean | null
    messageType: string | null
    content: string | null
    messageId: string | null
    hasMedia: boolean | null
    mediaUrl: string | null
    caption: string | null
    mimeType: string | null
    fileName: string | null
    status: string | null
    statusUpdatedAt: Date | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    remoteJid: string | null
    fromMe: boolean | null
    messageType: string | null
    content: string | null
    messageId: string | null
    hasMedia: boolean | null
    mediaUrl: string | null
    caption: string | null
    mimeType: string | null
    fileName: string | null
    status: string | null
    statusUpdatedAt: Date | null
    metadata: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MessageCountAggregateOutputType = {
    id: number
    instanceId: number
    remoteJid: number
    fromMe: number
    messageType: number
    content: number
    messageId: number
    hasMedia: number
    mediaUrl: number
    caption: number
    mimeType: number
    fileName: number
    status: number
    statusUpdatedAt: number
    metadata: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MessageMinAggregateInputType = {
    id?: true
    instanceId?: true
    remoteJid?: true
    fromMe?: true
    messageType?: true
    content?: true
    messageId?: true
    hasMedia?: true
    mediaUrl?: true
    caption?: true
    mimeType?: true
    fileName?: true
    status?: true
    statusUpdatedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageMaxAggregateInputType = {
    id?: true
    instanceId?: true
    remoteJid?: true
    fromMe?: true
    messageType?: true
    content?: true
    messageId?: true
    hasMedia?: true
    mediaUrl?: true
    caption?: true
    mimeType?: true
    fileName?: true
    status?: true
    statusUpdatedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MessageCountAggregateInputType = {
    id?: true
    instanceId?: true
    remoteJid?: true
    fromMe?: true
    messageType?: true
    content?: true
    messageId?: true
    hasMedia?: true
    mediaUrl?: true
    caption?: true
    mimeType?: true
    fileName?: true
    status?: true
    statusUpdatedAt?: true
    metadata?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MessageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Message to aggregate.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Messages
    **/
    _count?: true | MessageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MessageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MessageMaxAggregateInputType
  }

  export type GetMessageAggregateType<T extends MessageAggregateArgs> = {
        [P in keyof T & keyof AggregateMessage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMessage[P]>
      : GetScalarType<T[P], AggregateMessage[P]>
  }




  export type MessageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MessageWhereInput
    orderBy?: MessageOrderByWithAggregationInput | MessageOrderByWithAggregationInput[]
    by: MessageScalarFieldEnum[] | MessageScalarFieldEnum
    having?: MessageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MessageCountAggregateInputType | true
    _min?: MessageMinAggregateInputType
    _max?: MessageMaxAggregateInputType
  }

  export type MessageGroupByOutputType = {
    id: string
    instanceId: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia: boolean
    mediaUrl: string | null
    caption: string | null
    mimeType: string | null
    fileName: string | null
    status: string
    statusUpdatedAt: Date | null
    metadata: string | null
    createdAt: Date
    updatedAt: Date
    _count: MessageCountAggregateOutputType | null
    _min: MessageMinAggregateOutputType | null
    _max: MessageMaxAggregateOutputType | null
  }

  type GetMessageGroupByPayload<T extends MessageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MessageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MessageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MessageGroupByOutputType[P]>
            : GetScalarType<T[P], MessageGroupByOutputType[P]>
        }
      >
    >


  export type MessageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    remoteJid?: boolean
    fromMe?: boolean
    messageType?: boolean
    content?: boolean
    messageId?: boolean
    hasMedia?: boolean
    mediaUrl?: boolean
    caption?: boolean
    mimeType?: boolean
    fileName?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    remoteJid?: boolean
    fromMe?: boolean
    messageType?: boolean
    content?: boolean
    messageId?: boolean
    hasMedia?: boolean
    mediaUrl?: boolean
    caption?: boolean
    mimeType?: boolean
    fileName?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    remoteJid?: boolean
    fromMe?: boolean
    messageType?: boolean
    content?: boolean
    messageId?: boolean
    hasMedia?: boolean
    mediaUrl?: boolean
    caption?: boolean
    mimeType?: boolean
    fileName?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["message"]>

  export type MessageSelectScalar = {
    id?: boolean
    instanceId?: boolean
    remoteJid?: boolean
    fromMe?: boolean
    messageType?: boolean
    content?: boolean
    messageId?: boolean
    hasMedia?: boolean
    mediaUrl?: boolean
    caption?: boolean
    mimeType?: boolean
    fileName?: boolean
    status?: boolean
    statusUpdatedAt?: boolean
    metadata?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MessageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "remoteJid" | "fromMe" | "messageType" | "content" | "messageId" | "hasMedia" | "mediaUrl" | "caption" | "mimeType" | "fileName" | "status" | "statusUpdatedAt" | "metadata" | "createdAt" | "updatedAt", ExtArgs["result"]["message"]>
  export type MessageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type MessageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type MessageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $MessagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Message"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      remoteJid: string
      fromMe: boolean
      messageType: string
      content: string
      messageId: string
      hasMedia: boolean
      mediaUrl: string | null
      caption: string | null
      mimeType: string | null
      fileName: string | null
      status: string
      statusUpdatedAt: Date | null
      metadata: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["message"]>
    composites: {}
  }

  type MessageGetPayload<S extends boolean | null | undefined | MessageDefaultArgs> = $Result.GetResult<Prisma.$MessagePayload, S>

  type MessageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MessageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MessageCountAggregateInputType | true
    }

  export interface MessageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Message'], meta: { name: 'Message' } }
    /**
     * Find zero or one Message that matches the filter.
     * @param {MessageFindUniqueArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MessageFindUniqueArgs>(args: SelectSubset<T, MessageFindUniqueArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Message that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MessageFindUniqueOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MessageFindUniqueOrThrowArgs>(args: SelectSubset<T, MessageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MessageFindFirstArgs>(args?: SelectSubset<T, MessageFindFirstArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Message that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindFirstOrThrowArgs} args - Arguments to find a Message
     * @example
     * // Get one Message
     * const message = await prisma.message.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MessageFindFirstOrThrowArgs>(args?: SelectSubset<T, MessageFindFirstOrThrowArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Messages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Messages
     * const messages = await prisma.message.findMany()
     * 
     * // Get first 10 Messages
     * const messages = await prisma.message.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const messageWithIdOnly = await prisma.message.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MessageFindManyArgs>(args?: SelectSubset<T, MessageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Message.
     * @param {MessageCreateArgs} args - Arguments to create a Message.
     * @example
     * // Create one Message
     * const Message = await prisma.message.create({
     *   data: {
     *     // ... data to create a Message
     *   }
     * })
     * 
     */
    create<T extends MessageCreateArgs>(args: SelectSubset<T, MessageCreateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Messages.
     * @param {MessageCreateManyArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MessageCreateManyArgs>(args?: SelectSubset<T, MessageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Messages and returns the data saved in the database.
     * @param {MessageCreateManyAndReturnArgs} args - Arguments to create many Messages.
     * @example
     * // Create many Messages
     * const message = await prisma.message.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MessageCreateManyAndReturnArgs>(args?: SelectSubset<T, MessageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Message.
     * @param {MessageDeleteArgs} args - Arguments to delete one Message.
     * @example
     * // Delete one Message
     * const Message = await prisma.message.delete({
     *   where: {
     *     // ... filter to delete one Message
     *   }
     * })
     * 
     */
    delete<T extends MessageDeleteArgs>(args: SelectSubset<T, MessageDeleteArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Message.
     * @param {MessageUpdateArgs} args - Arguments to update one Message.
     * @example
     * // Update one Message
     * const message = await prisma.message.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MessageUpdateArgs>(args: SelectSubset<T, MessageUpdateArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Messages.
     * @param {MessageDeleteManyArgs} args - Arguments to filter Messages to delete.
     * @example
     * // Delete a few Messages
     * const { count } = await prisma.message.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MessageDeleteManyArgs>(args?: SelectSubset<T, MessageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MessageUpdateManyArgs>(args: SelectSubset<T, MessageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Messages and returns the data updated in the database.
     * @param {MessageUpdateManyAndReturnArgs} args - Arguments to update many Messages.
     * @example
     * // Update many Messages
     * const message = await prisma.message.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Messages and only return the `id`
     * const messageWithIdOnly = await prisma.message.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MessageUpdateManyAndReturnArgs>(args: SelectSubset<T, MessageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Message.
     * @param {MessageUpsertArgs} args - Arguments to update or create a Message.
     * @example
     * // Update or create a Message
     * const message = await prisma.message.upsert({
     *   create: {
     *     // ... data to create a Message
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Message we want to update
     *   }
     * })
     */
    upsert<T extends MessageUpsertArgs>(args: SelectSubset<T, MessageUpsertArgs<ExtArgs>>): Prisma__MessageClient<$Result.GetResult<Prisma.$MessagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Messages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageCountArgs} args - Arguments to filter Messages to count.
     * @example
     * // Count the number of Messages
     * const count = await prisma.message.count({
     *   where: {
     *     // ... the filter for the Messages we want to count
     *   }
     * })
    **/
    count<T extends MessageCountArgs>(
      args?: Subset<T, MessageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MessageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MessageAggregateArgs>(args: Subset<T, MessageAggregateArgs>): Prisma.PrismaPromise<GetMessageAggregateType<T>>

    /**
     * Group by Message.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MessageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MessageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MessageGroupByArgs['orderBy'] }
        : { orderBy?: MessageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MessageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMessageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Message model
   */
  readonly fields: MessageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Message.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MessageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Message model
   */
  interface MessageFieldRefs {
    readonly id: FieldRef<"Message", 'String'>
    readonly instanceId: FieldRef<"Message", 'String'>
    readonly remoteJid: FieldRef<"Message", 'String'>
    readonly fromMe: FieldRef<"Message", 'Boolean'>
    readonly messageType: FieldRef<"Message", 'String'>
    readonly content: FieldRef<"Message", 'String'>
    readonly messageId: FieldRef<"Message", 'String'>
    readonly hasMedia: FieldRef<"Message", 'Boolean'>
    readonly mediaUrl: FieldRef<"Message", 'String'>
    readonly caption: FieldRef<"Message", 'String'>
    readonly mimeType: FieldRef<"Message", 'String'>
    readonly fileName: FieldRef<"Message", 'String'>
    readonly status: FieldRef<"Message", 'String'>
    readonly statusUpdatedAt: FieldRef<"Message", 'DateTime'>
    readonly metadata: FieldRef<"Message", 'String'>
    readonly createdAt: FieldRef<"Message", 'DateTime'>
    readonly updatedAt: FieldRef<"Message", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Message findUnique
   */
  export type MessageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findUniqueOrThrow
   */
  export type MessageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message findFirst
   */
  export type MessageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findFirstOrThrow
   */
  export type MessageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Message to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Messages.
     */
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message findMany
   */
  export type MessageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter, which Messages to fetch.
     */
    where?: MessageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Messages to fetch.
     */
    orderBy?: MessageOrderByWithRelationInput | MessageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Messages.
     */
    cursor?: MessageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Messages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Messages.
     */
    skip?: number
    distinct?: MessageScalarFieldEnum | MessageScalarFieldEnum[]
  }

  /**
   * Message create
   */
  export type MessageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to create a Message.
     */
    data: XOR<MessageCreateInput, MessageUncheckedCreateInput>
  }

  /**
   * Message createMany
   */
  export type MessageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
  }

  /**
   * Message createManyAndReturn
   */
  export type MessageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to create many Messages.
     */
    data: MessageCreateManyInput | MessageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message update
   */
  export type MessageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The data needed to update a Message.
     */
    data: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
    /**
     * Choose, which Message to update.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message updateMany
   */
  export type MessageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
  }

  /**
   * Message updateManyAndReturn
   */
  export type MessageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * The data used to update Messages.
     */
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyInput>
    /**
     * Filter which Messages to update
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Message upsert
   */
  export type MessageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * The filter to search for the Message to update in case it exists.
     */
    where: MessageWhereUniqueInput
    /**
     * In case the Message found by the `where` argument doesn't exist, create a new Message with this data.
     */
    create: XOR<MessageCreateInput, MessageUncheckedCreateInput>
    /**
     * In case the Message was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MessageUpdateInput, MessageUncheckedUpdateInput>
  }

  /**
   * Message delete
   */
  export type MessageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
    /**
     * Filter which Message to delete.
     */
    where: MessageWhereUniqueInput
  }

  /**
   * Message deleteMany
   */
  export type MessageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Messages to delete
     */
    where?: MessageWhereInput
    /**
     * Limit how many Messages to delete.
     */
    limit?: number
  }

  /**
   * Message without action
   */
  export type MessageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Message
     */
    select?: MessageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Message
     */
    omit?: MessageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MessageInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    name: string | null
    number: string | null
    remoteJid: string | null
    pushName: string | null
    isGroup: boolean | null
    profilePicture: string | null
    about: string | null
    lastActivity: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    name: string | null
    number: string | null
    remoteJid: string | null
    pushName: string | null
    isGroup: boolean | null
    profilePicture: string | null
    about: string | null
    lastActivity: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ContactCountAggregateOutputType = {
    id: number
    instanceId: number
    name: number
    number: number
    remoteJid: number
    pushName: number
    isGroup: number
    profilePicture: number
    about: number
    lastActivity: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ContactMinAggregateInputType = {
    id?: true
    instanceId?: true
    name?: true
    number?: true
    remoteJid?: true
    pushName?: true
    isGroup?: true
    profilePicture?: true
    about?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactMaxAggregateInputType = {
    id?: true
    instanceId?: true
    name?: true
    number?: true
    remoteJid?: true
    pushName?: true
    isGroup?: true
    profilePicture?: true
    about?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ContactCountAggregateInputType = {
    id?: true
    instanceId?: true
    name?: true
    number?: true
    remoteJid?: true
    pushName?: true
    isGroup?: true
    profilePicture?: true
    about?: true
    lastActivity?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    id: string
    instanceId: string
    name: string | null
    number: string
    remoteJid: string
    pushName: string | null
    isGroup: boolean
    profilePicture: string | null
    about: string | null
    lastActivity: Date | null
    createdAt: Date
    updatedAt: Date
    _count: ContactCountAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    name?: boolean
    number?: boolean
    remoteJid?: boolean
    pushName?: boolean
    isGroup?: boolean
    profilePicture?: boolean
    about?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    name?: boolean
    number?: boolean
    remoteJid?: boolean
    pushName?: boolean
    isGroup?: boolean
    profilePicture?: boolean
    about?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    name?: boolean
    number?: boolean
    remoteJid?: boolean
    pushName?: boolean
    isGroup?: boolean
    profilePicture?: boolean
    about?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    id?: boolean
    instanceId?: boolean
    name?: boolean
    number?: boolean
    remoteJid?: boolean
    pushName?: boolean
    isGroup?: boolean
    profilePicture?: boolean
    about?: boolean
    lastActivity?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "name" | "number" | "remoteJid" | "pushName" | "isGroup" | "profilePicture" | "about" | "lastActivity" | "createdAt" | "updatedAt", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      name: string | null
      number: string
      remoteJid: string
      pushName: string | null
      isGroup: boolean
      profilePicture: string | null
      about: string | null
      lastActivity: Date | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const contactWithIdOnly = await prisma.contact.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `id`
     * const contactWithIdOnly = await prisma.contact.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */
  interface ContactFieldRefs {
    readonly id: FieldRef<"Contact", 'String'>
    readonly instanceId: FieldRef<"Contact", 'String'>
    readonly name: FieldRef<"Contact", 'String'>
    readonly number: FieldRef<"Contact", 'String'>
    readonly remoteJid: FieldRef<"Contact", 'String'>
    readonly pushName: FieldRef<"Contact", 'String'>
    readonly isGroup: FieldRef<"Contact", 'Boolean'>
    readonly profilePicture: FieldRef<"Contact", 'String'>
    readonly about: FieldRef<"Contact", 'String'>
    readonly lastActivity: FieldRef<"Contact", 'DateTime'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly updatedAt: FieldRef<"Contact", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
    /**
     * Limit how many Contacts to delete.
     */
    limit?: number
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model ActivityLog
   */

  export type AggregateActivityLog = {
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  export type ActivityLogMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityLogMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    action: string | null
    details: string | null
    createdAt: Date | null
  }

  export type ActivityLogCountAggregateOutputType = {
    id: number
    instanceId: number
    action: number
    details: number
    createdAt: number
    _all: number
  }


  export type ActivityLogMinAggregateInputType = {
    id?: true
    instanceId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type ActivityLogMaxAggregateInputType = {
    id?: true
    instanceId?: true
    action?: true
    details?: true
    createdAt?: true
  }

  export type ActivityLogCountAggregateInputType = {
    id?: true
    instanceId?: true
    action?: true
    details?: true
    createdAt?: true
    _all?: true
  }

  export type ActivityLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLog to aggregate.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ActivityLogs
    **/
    _count?: true | ActivityLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityLogMaxAggregateInputType
  }

  export type GetActivityLogAggregateType<T extends ActivityLogAggregateArgs> = {
        [P in keyof T & keyof AggregateActivityLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivityLog[P]>
      : GetScalarType<T[P], AggregateActivityLog[P]>
  }




  export type ActivityLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityLogWhereInput
    orderBy?: ActivityLogOrderByWithAggregationInput | ActivityLogOrderByWithAggregationInput[]
    by: ActivityLogScalarFieldEnum[] | ActivityLogScalarFieldEnum
    having?: ActivityLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityLogCountAggregateInputType | true
    _min?: ActivityLogMinAggregateInputType
    _max?: ActivityLogMaxAggregateInputType
  }

  export type ActivityLogGroupByOutputType = {
    id: string
    instanceId: string
    action: string
    details: string | null
    createdAt: Date
    _count: ActivityLogCountAggregateOutputType | null
    _min: ActivityLogMinAggregateOutputType | null
    _max: ActivityLogMaxAggregateOutputType | null
  }

  type GetActivityLogGroupByPayload<T extends ActivityLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityLogGroupByOutputType[P]>
        }
      >
    >


  export type ActivityLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activityLog"]>

  export type ActivityLogSelectScalar = {
    id?: boolean
    instanceId?: boolean
    action?: boolean
    details?: boolean
    createdAt?: boolean
  }

  export type ActivityLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "action" | "details" | "createdAt", ExtArgs["result"]["activityLog"]>
  export type ActivityLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type ActivityLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $ActivityLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ActivityLog"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      action: string
      details: string | null
      createdAt: Date
    }, ExtArgs["result"]["activityLog"]>
    composites: {}
  }

  type ActivityLogGetPayload<S extends boolean | null | undefined | ActivityLogDefaultArgs> = $Result.GetResult<Prisma.$ActivityLogPayload, S>

  type ActivityLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityLogCountAggregateInputType | true
    }

  export interface ActivityLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ActivityLog'], meta: { name: 'ActivityLog' } }
    /**
     * Find zero or one ActivityLog that matches the filter.
     * @param {ActivityLogFindUniqueArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityLogFindUniqueArgs>(args: SelectSubset<T, ActivityLogFindUniqueArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ActivityLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityLogFindUniqueOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityLogFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityLogFindFirstArgs>(args?: SelectSubset<T, ActivityLogFindFirstArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ActivityLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindFirstOrThrowArgs} args - Arguments to find a ActivityLog
     * @example
     * // Get one ActivityLog
     * const activityLog = await prisma.activityLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityLogFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ActivityLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany()
     * 
     * // Get first 10 ActivityLogs
     * const activityLogs = await prisma.activityLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityLogFindManyArgs>(args?: SelectSubset<T, ActivityLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ActivityLog.
     * @param {ActivityLogCreateArgs} args - Arguments to create a ActivityLog.
     * @example
     * // Create one ActivityLog
     * const ActivityLog = await prisma.activityLog.create({
     *   data: {
     *     // ... data to create a ActivityLog
     *   }
     * })
     * 
     */
    create<T extends ActivityLogCreateArgs>(args: SelectSubset<T, ActivityLogCreateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ActivityLogs.
     * @param {ActivityLogCreateManyArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityLogCreateManyArgs>(args?: SelectSubset<T, ActivityLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ActivityLogs and returns the data saved in the database.
     * @param {ActivityLogCreateManyAndReturnArgs} args - Arguments to create many ActivityLogs.
     * @example
     * // Create many ActivityLogs
     * const activityLog = await prisma.activityLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityLogCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ActivityLog.
     * @param {ActivityLogDeleteArgs} args - Arguments to delete one ActivityLog.
     * @example
     * // Delete one ActivityLog
     * const ActivityLog = await prisma.activityLog.delete({
     *   where: {
     *     // ... filter to delete one ActivityLog
     *   }
     * })
     * 
     */
    delete<T extends ActivityLogDeleteArgs>(args: SelectSubset<T, ActivityLogDeleteArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ActivityLog.
     * @param {ActivityLogUpdateArgs} args - Arguments to update one ActivityLog.
     * @example
     * // Update one ActivityLog
     * const activityLog = await prisma.activityLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityLogUpdateArgs>(args: SelectSubset<T, ActivityLogUpdateArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ActivityLogs.
     * @param {ActivityLogDeleteManyArgs} args - Arguments to filter ActivityLogs to delete.
     * @example
     * // Delete a few ActivityLogs
     * const { count } = await prisma.activityLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityLogDeleteManyArgs>(args?: SelectSubset<T, ActivityLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityLogUpdateManyArgs>(args: SelectSubset<T, ActivityLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ActivityLogs and returns the data updated in the database.
     * @param {ActivityLogUpdateManyAndReturnArgs} args - Arguments to update many ActivityLogs.
     * @example
     * // Update many ActivityLogs
     * const activityLog = await prisma.activityLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ActivityLogs and only return the `id`
     * const activityLogWithIdOnly = await prisma.activityLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityLogUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ActivityLog.
     * @param {ActivityLogUpsertArgs} args - Arguments to update or create a ActivityLog.
     * @example
     * // Update or create a ActivityLog
     * const activityLog = await prisma.activityLog.upsert({
     *   create: {
     *     // ... data to create a ActivityLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ActivityLog we want to update
     *   }
     * })
     */
    upsert<T extends ActivityLogUpsertArgs>(args: SelectSubset<T, ActivityLogUpsertArgs<ExtArgs>>): Prisma__ActivityLogClient<$Result.GetResult<Prisma.$ActivityLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ActivityLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogCountArgs} args - Arguments to filter ActivityLogs to count.
     * @example
     * // Count the number of ActivityLogs
     * const count = await prisma.activityLog.count({
     *   where: {
     *     // ... the filter for the ActivityLogs we want to count
     *   }
     * })
    **/
    count<T extends ActivityLogCountArgs>(
      args?: Subset<T, ActivityLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityLogAggregateArgs>(args: Subset<T, ActivityLogAggregateArgs>): Prisma.PrismaPromise<GetActivityLogAggregateType<T>>

    /**
     * Group by ActivityLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityLogGroupByArgs['orderBy'] }
        : { orderBy?: ActivityLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ActivityLog model
   */
  readonly fields: ActivityLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ActivityLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ActivityLog model
   */
  interface ActivityLogFieldRefs {
    readonly id: FieldRef<"ActivityLog", 'String'>
    readonly instanceId: FieldRef<"ActivityLog", 'String'>
    readonly action: FieldRef<"ActivityLog", 'String'>
    readonly details: FieldRef<"ActivityLog", 'String'>
    readonly createdAt: FieldRef<"ActivityLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ActivityLog findUnique
   */
  export type ActivityLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findUniqueOrThrow
   */
  export type ActivityLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog findFirst
   */
  export type ActivityLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findFirstOrThrow
   */
  export type ActivityLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLog to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ActivityLogs.
     */
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog findMany
   */
  export type ActivityLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter, which ActivityLogs to fetch.
     */
    where?: ActivityLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ActivityLogs to fetch.
     */
    orderBy?: ActivityLogOrderByWithRelationInput | ActivityLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ActivityLogs.
     */
    cursor?: ActivityLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ActivityLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ActivityLogs.
     */
    skip?: number
    distinct?: ActivityLogScalarFieldEnum | ActivityLogScalarFieldEnum[]
  }

  /**
   * ActivityLog create
   */
  export type ActivityLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to create a ActivityLog.
     */
    data: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
  }

  /**
   * ActivityLog createMany
   */
  export type ActivityLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
  }

  /**
   * ActivityLog createManyAndReturn
   */
  export type ActivityLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to create many ActivityLogs.
     */
    data: ActivityLogCreateManyInput | ActivityLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog update
   */
  export type ActivityLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The data needed to update a ActivityLog.
     */
    data: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
    /**
     * Choose, which ActivityLog to update.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog updateMany
   */
  export type ActivityLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
  }

  /**
   * ActivityLog updateManyAndReturn
   */
  export type ActivityLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * The data used to update ActivityLogs.
     */
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyInput>
    /**
     * Filter which ActivityLogs to update
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ActivityLog upsert
   */
  export type ActivityLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * The filter to search for the ActivityLog to update in case it exists.
     */
    where: ActivityLogWhereUniqueInput
    /**
     * In case the ActivityLog found by the `where` argument doesn't exist, create a new ActivityLog with this data.
     */
    create: XOR<ActivityLogCreateInput, ActivityLogUncheckedCreateInput>
    /**
     * In case the ActivityLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityLogUpdateInput, ActivityLogUncheckedUpdateInput>
  }

  /**
   * ActivityLog delete
   */
  export type ActivityLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
    /**
     * Filter which ActivityLog to delete.
     */
    where: ActivityLogWhereUniqueInput
  }

  /**
   * ActivityLog deleteMany
   */
  export type ActivityLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ActivityLogs to delete
     */
    where?: ActivityLogWhereInput
    /**
     * Limit how many ActivityLogs to delete.
     */
    limit?: number
  }

  /**
   * ActivityLog without action
   */
  export type ActivityLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ActivityLog
     */
    select?: ActivityLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ActivityLog
     */
    omit?: ActivityLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityLogInclude<ExtArgs> | null
  }


  /**
   * Model WebhookLog
   */

  export type AggregateWebhookLog = {
    _count: WebhookLogCountAggregateOutputType | null
    _avg: WebhookLogAvgAggregateOutputType | null
    _sum: WebhookLogSumAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  export type WebhookLogAvgAggregateOutputType = {
    statusCode: number | null
    attempt: number | null
  }

  export type WebhookLogSumAggregateOutputType = {
    statusCode: number | null
    attempt: number | null
  }

  export type WebhookLogMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    webhookUrl: string | null
    payload: string | null
    response: string | null
    statusCode: number | null
    success: boolean | null
    attempt: number | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type WebhookLogMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    webhookUrl: string | null
    payload: string | null
    response: string | null
    statusCode: number | null
    success: boolean | null
    attempt: number | null
    errorMessage: string | null
    createdAt: Date | null
  }

  export type WebhookLogCountAggregateOutputType = {
    id: number
    instanceId: number
    webhookUrl: number
    payload: number
    response: number
    statusCode: number
    success: number
    attempt: number
    errorMessage: number
    createdAt: number
    _all: number
  }


  export type WebhookLogAvgAggregateInputType = {
    statusCode?: true
    attempt?: true
  }

  export type WebhookLogSumAggregateInputType = {
    statusCode?: true
    attempt?: true
  }

  export type WebhookLogMinAggregateInputType = {
    id?: true
    instanceId?: true
    webhookUrl?: true
    payload?: true
    response?: true
    statusCode?: true
    success?: true
    attempt?: true
    errorMessage?: true
    createdAt?: true
  }

  export type WebhookLogMaxAggregateInputType = {
    id?: true
    instanceId?: true
    webhookUrl?: true
    payload?: true
    response?: true
    statusCode?: true
    success?: true
    attempt?: true
    errorMessage?: true
    createdAt?: true
  }

  export type WebhookLogCountAggregateInputType = {
    id?: true
    instanceId?: true
    webhookUrl?: true
    payload?: true
    response?: true
    statusCode?: true
    success?: true
    attempt?: true
    errorMessage?: true
    createdAt?: true
    _all?: true
  }

  export type WebhookLogAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLog to aggregate.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WebhookLogs
    **/
    _count?: true | WebhookLogCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: WebhookLogAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: WebhookLogSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WebhookLogMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WebhookLogMaxAggregateInputType
  }

  export type GetWebhookLogAggregateType<T extends WebhookLogAggregateArgs> = {
        [P in keyof T & keyof AggregateWebhookLog]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWebhookLog[P]>
      : GetScalarType<T[P], AggregateWebhookLog[P]>
  }




  export type WebhookLogGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WebhookLogWhereInput
    orderBy?: WebhookLogOrderByWithAggregationInput | WebhookLogOrderByWithAggregationInput[]
    by: WebhookLogScalarFieldEnum[] | WebhookLogScalarFieldEnum
    having?: WebhookLogScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WebhookLogCountAggregateInputType | true
    _avg?: WebhookLogAvgAggregateInputType
    _sum?: WebhookLogSumAggregateInputType
    _min?: WebhookLogMinAggregateInputType
    _max?: WebhookLogMaxAggregateInputType
  }

  export type WebhookLogGroupByOutputType = {
    id: string
    instanceId: string
    webhookUrl: string
    payload: string
    response: string | null
    statusCode: number | null
    success: boolean
    attempt: number
    errorMessage: string | null
    createdAt: Date
    _count: WebhookLogCountAggregateOutputType | null
    _avg: WebhookLogAvgAggregateOutputType | null
    _sum: WebhookLogSumAggregateOutputType | null
    _min: WebhookLogMinAggregateOutputType | null
    _max: WebhookLogMaxAggregateOutputType | null
  }

  type GetWebhookLogGroupByPayload<T extends WebhookLogGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WebhookLogGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WebhookLogGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
            : GetScalarType<T[P], WebhookLogGroupByOutputType[P]>
        }
      >
    >


  export type WebhookLogSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    webhookUrl?: boolean
    payload?: boolean
    response?: boolean
    statusCode?: boolean
    success?: boolean
    attempt?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    webhookUrl?: boolean
    payload?: boolean
    response?: boolean
    statusCode?: boolean
    success?: boolean
    attempt?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    webhookUrl?: boolean
    payload?: boolean
    response?: boolean
    statusCode?: boolean
    success?: boolean
    attempt?: boolean
    errorMessage?: boolean
    createdAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["webhookLog"]>

  export type WebhookLogSelectScalar = {
    id?: boolean
    instanceId?: boolean
    webhookUrl?: boolean
    payload?: boolean
    response?: boolean
    statusCode?: boolean
    success?: boolean
    attempt?: boolean
    errorMessage?: boolean
    createdAt?: boolean
  }

  export type WebhookLogOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "webhookUrl" | "payload" | "response" | "statusCode" | "success" | "attempt" | "errorMessage" | "createdAt", ExtArgs["result"]["webhookLog"]>
  export type WebhookLogInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type WebhookLogIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type WebhookLogIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $WebhookLogPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WebhookLog"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      webhookUrl: string
      payload: string
      response: string | null
      statusCode: number | null
      success: boolean
      attempt: number
      errorMessage: string | null
      createdAt: Date
    }, ExtArgs["result"]["webhookLog"]>
    composites: {}
  }

  type WebhookLogGetPayload<S extends boolean | null | undefined | WebhookLogDefaultArgs> = $Result.GetResult<Prisma.$WebhookLogPayload, S>

  type WebhookLogCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<WebhookLogFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: WebhookLogCountAggregateInputType | true
    }

  export interface WebhookLogDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WebhookLog'], meta: { name: 'WebhookLog' } }
    /**
     * Find zero or one WebhookLog that matches the filter.
     * @param {WebhookLogFindUniqueArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WebhookLogFindUniqueArgs>(args: SelectSubset<T, WebhookLogFindUniqueArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one WebhookLog that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {WebhookLogFindUniqueOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WebhookLogFindUniqueOrThrowArgs>(args: SelectSubset<T, WebhookLogFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WebhookLogFindFirstArgs>(args?: SelectSubset<T, WebhookLogFindFirstArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first WebhookLog that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindFirstOrThrowArgs} args - Arguments to find a WebhookLog
     * @example
     * // Get one WebhookLog
     * const webhookLog = await prisma.webhookLog.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WebhookLogFindFirstOrThrowArgs>(args?: SelectSubset<T, WebhookLogFindFirstOrThrowArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more WebhookLogs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany()
     * 
     * // Get first 10 WebhookLogs
     * const webhookLogs = await prisma.webhookLog.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WebhookLogFindManyArgs>(args?: SelectSubset<T, WebhookLogFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a WebhookLog.
     * @param {WebhookLogCreateArgs} args - Arguments to create a WebhookLog.
     * @example
     * // Create one WebhookLog
     * const WebhookLog = await prisma.webhookLog.create({
     *   data: {
     *     // ... data to create a WebhookLog
     *   }
     * })
     * 
     */
    create<T extends WebhookLogCreateArgs>(args: SelectSubset<T, WebhookLogCreateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many WebhookLogs.
     * @param {WebhookLogCreateManyArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WebhookLogCreateManyArgs>(args?: SelectSubset<T, WebhookLogCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WebhookLogs and returns the data saved in the database.
     * @param {WebhookLogCreateManyAndReturnArgs} args - Arguments to create many WebhookLogs.
     * @example
     * // Create many WebhookLogs
     * const webhookLog = await prisma.webhookLog.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WebhookLogs and only return the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WebhookLogCreateManyAndReturnArgs>(args?: SelectSubset<T, WebhookLogCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a WebhookLog.
     * @param {WebhookLogDeleteArgs} args - Arguments to delete one WebhookLog.
     * @example
     * // Delete one WebhookLog
     * const WebhookLog = await prisma.webhookLog.delete({
     *   where: {
     *     // ... filter to delete one WebhookLog
     *   }
     * })
     * 
     */
    delete<T extends WebhookLogDeleteArgs>(args: SelectSubset<T, WebhookLogDeleteArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one WebhookLog.
     * @param {WebhookLogUpdateArgs} args - Arguments to update one WebhookLog.
     * @example
     * // Update one WebhookLog
     * const webhookLog = await prisma.webhookLog.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WebhookLogUpdateArgs>(args: SelectSubset<T, WebhookLogUpdateArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more WebhookLogs.
     * @param {WebhookLogDeleteManyArgs} args - Arguments to filter WebhookLogs to delete.
     * @example
     * // Delete a few WebhookLogs
     * const { count } = await prisma.webhookLog.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WebhookLogDeleteManyArgs>(args?: SelectSubset<T, WebhookLogDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WebhookLogUpdateManyArgs>(args: SelectSubset<T, WebhookLogUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WebhookLogs and returns the data updated in the database.
     * @param {WebhookLogUpdateManyAndReturnArgs} args - Arguments to update many WebhookLogs.
     * @example
     * // Update many WebhookLogs
     * const webhookLog = await prisma.webhookLog.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more WebhookLogs and only return the `id`
     * const webhookLogWithIdOnly = await prisma.webhookLog.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends WebhookLogUpdateManyAndReturnArgs>(args: SelectSubset<T, WebhookLogUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one WebhookLog.
     * @param {WebhookLogUpsertArgs} args - Arguments to update or create a WebhookLog.
     * @example
     * // Update or create a WebhookLog
     * const webhookLog = await prisma.webhookLog.upsert({
     *   create: {
     *     // ... data to create a WebhookLog
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WebhookLog we want to update
     *   }
     * })
     */
    upsert<T extends WebhookLogUpsertArgs>(args: SelectSubset<T, WebhookLogUpsertArgs<ExtArgs>>): Prisma__WebhookLogClient<$Result.GetResult<Prisma.$WebhookLogPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of WebhookLogs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogCountArgs} args - Arguments to filter WebhookLogs to count.
     * @example
     * // Count the number of WebhookLogs
     * const count = await prisma.webhookLog.count({
     *   where: {
     *     // ... the filter for the WebhookLogs we want to count
     *   }
     * })
    **/
    count<T extends WebhookLogCountArgs>(
      args?: Subset<T, WebhookLogCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WebhookLogCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends WebhookLogAggregateArgs>(args: Subset<T, WebhookLogAggregateArgs>): Prisma.PrismaPromise<GetWebhookLogAggregateType<T>>

    /**
     * Group by WebhookLog.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WebhookLogGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends WebhookLogGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WebhookLogGroupByArgs['orderBy'] }
        : { orderBy?: WebhookLogGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, WebhookLogGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWebhookLogGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WebhookLog model
   */
  readonly fields: WebhookLogFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WebhookLog.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WebhookLogClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the WebhookLog model
   */
  interface WebhookLogFieldRefs {
    readonly id: FieldRef<"WebhookLog", 'String'>
    readonly instanceId: FieldRef<"WebhookLog", 'String'>
    readonly webhookUrl: FieldRef<"WebhookLog", 'String'>
    readonly payload: FieldRef<"WebhookLog", 'String'>
    readonly response: FieldRef<"WebhookLog", 'String'>
    readonly statusCode: FieldRef<"WebhookLog", 'Int'>
    readonly success: FieldRef<"WebhookLog", 'Boolean'>
    readonly attempt: FieldRef<"WebhookLog", 'Int'>
    readonly errorMessage: FieldRef<"WebhookLog", 'String'>
    readonly createdAt: FieldRef<"WebhookLog", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WebhookLog findUnique
   */
  export type WebhookLogFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findUniqueOrThrow
   */
  export type WebhookLogFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog findFirst
   */
  export type WebhookLogFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findFirstOrThrow
   */
  export type WebhookLogFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLog to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WebhookLogs.
     */
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog findMany
   */
  export type WebhookLogFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter, which WebhookLogs to fetch.
     */
    where?: WebhookLogWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WebhookLogs to fetch.
     */
    orderBy?: WebhookLogOrderByWithRelationInput | WebhookLogOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WebhookLogs.
     */
    cursor?: WebhookLogWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WebhookLogs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WebhookLogs.
     */
    skip?: number
    distinct?: WebhookLogScalarFieldEnum | WebhookLogScalarFieldEnum[]
  }

  /**
   * WebhookLog create
   */
  export type WebhookLogCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The data needed to create a WebhookLog.
     */
    data: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
  }

  /**
   * WebhookLog createMany
   */
  export type WebhookLogCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[]
  }

  /**
   * WebhookLog createManyAndReturn
   */
  export type WebhookLogCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data used to create many WebhookLogs.
     */
    data: WebhookLogCreateManyInput | WebhookLogCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookLog update
   */
  export type WebhookLogUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The data needed to update a WebhookLog.
     */
    data: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
    /**
     * Choose, which WebhookLog to update.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog updateMany
   */
  export type WebhookLogUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to update.
     */
    limit?: number
  }

  /**
   * WebhookLog updateManyAndReturn
   */
  export type WebhookLogUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * The data used to update WebhookLogs.
     */
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyInput>
    /**
     * Filter which WebhookLogs to update
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * WebhookLog upsert
   */
  export type WebhookLogUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * The filter to search for the WebhookLog to update in case it exists.
     */
    where: WebhookLogWhereUniqueInput
    /**
     * In case the WebhookLog found by the `where` argument doesn't exist, create a new WebhookLog with this data.
     */
    create: XOR<WebhookLogCreateInput, WebhookLogUncheckedCreateInput>
    /**
     * In case the WebhookLog was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WebhookLogUpdateInput, WebhookLogUncheckedUpdateInput>
  }

  /**
   * WebhookLog delete
   */
  export type WebhookLogDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
    /**
     * Filter which WebhookLog to delete.
     */
    where: WebhookLogWhereUniqueInput
  }

  /**
   * WebhookLog deleteMany
   */
  export type WebhookLogDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WebhookLogs to delete
     */
    where?: WebhookLogWhereInput
    /**
     * Limit how many WebhookLogs to delete.
     */
    limit?: number
  }

  /**
   * WebhookLog without action
   */
  export type WebhookLogDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WebhookLog
     */
    select?: WebhookLogSelect<ExtArgs> | null
    /**
     * Omit specific fields from the WebhookLog
     */
    omit?: WebhookLogOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WebhookLogInclude<ExtArgs> | null
  }


  /**
   * Model InstanceUsage
   */

  export type AggregateInstanceUsage = {
    _count: InstanceUsageCountAggregateOutputType | null
    _avg: InstanceUsageAvgAggregateOutputType | null
    _sum: InstanceUsageSumAggregateOutputType | null
    _min: InstanceUsageMinAggregateOutputType | null
    _max: InstanceUsageMaxAggregateOutputType | null
  }

  export type InstanceUsageAvgAggregateOutputType = {
    messagesSent: number | null
    messagesReceived: number | null
    mediaSent: number | null
    mediaReceived: number | null
    totalMediaSize: number | null
    apiCalls: number | null
    webhookSent: number | null
    memoryUsage: number | null
    cpuUsage: number | null
  }

  export type InstanceUsageSumAggregateOutputType = {
    messagesSent: number | null
    messagesReceived: number | null
    mediaSent: number | null
    mediaReceived: number | null
    totalMediaSize: number | null
    apiCalls: number | null
    webhookSent: number | null
    memoryUsage: number | null
    cpuUsage: number | null
  }

  export type InstanceUsageMinAggregateOutputType = {
    id: string | null
    instanceId: string | null
    date: Date | null
    messagesSent: number | null
    messagesReceived: number | null
    mediaSent: number | null
    mediaReceived: number | null
    totalMediaSize: number | null
    apiCalls: number | null
    webhookSent: number | null
    memoryUsage: number | null
    cpuUsage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstanceUsageMaxAggregateOutputType = {
    id: string | null
    instanceId: string | null
    date: Date | null
    messagesSent: number | null
    messagesReceived: number | null
    mediaSent: number | null
    mediaReceived: number | null
    totalMediaSize: number | null
    apiCalls: number | null
    webhookSent: number | null
    memoryUsage: number | null
    cpuUsage: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type InstanceUsageCountAggregateOutputType = {
    id: number
    instanceId: number
    date: number
    messagesSent: number
    messagesReceived: number
    mediaSent: number
    mediaReceived: number
    totalMediaSize: number
    apiCalls: number
    webhookSent: number
    memoryUsage: number
    cpuUsage: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type InstanceUsageAvgAggregateInputType = {
    messagesSent?: true
    messagesReceived?: true
    mediaSent?: true
    mediaReceived?: true
    totalMediaSize?: true
    apiCalls?: true
    webhookSent?: true
    memoryUsage?: true
    cpuUsage?: true
  }

  export type InstanceUsageSumAggregateInputType = {
    messagesSent?: true
    messagesReceived?: true
    mediaSent?: true
    mediaReceived?: true
    totalMediaSize?: true
    apiCalls?: true
    webhookSent?: true
    memoryUsage?: true
    cpuUsage?: true
  }

  export type InstanceUsageMinAggregateInputType = {
    id?: true
    instanceId?: true
    date?: true
    messagesSent?: true
    messagesReceived?: true
    mediaSent?: true
    mediaReceived?: true
    totalMediaSize?: true
    apiCalls?: true
    webhookSent?: true
    memoryUsage?: true
    cpuUsage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstanceUsageMaxAggregateInputType = {
    id?: true
    instanceId?: true
    date?: true
    messagesSent?: true
    messagesReceived?: true
    mediaSent?: true
    mediaReceived?: true
    totalMediaSize?: true
    apiCalls?: true
    webhookSent?: true
    memoryUsage?: true
    cpuUsage?: true
    createdAt?: true
    updatedAt?: true
  }

  export type InstanceUsageCountAggregateInputType = {
    id?: true
    instanceId?: true
    date?: true
    messagesSent?: true
    messagesReceived?: true
    mediaSent?: true
    mediaReceived?: true
    totalMediaSize?: true
    apiCalls?: true
    webhookSent?: true
    memoryUsage?: true
    cpuUsage?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type InstanceUsageAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstanceUsage to aggregate.
     */
    where?: InstanceUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceUsages to fetch.
     */
    orderBy?: InstanceUsageOrderByWithRelationInput | InstanceUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InstanceUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InstanceUsages
    **/
    _count?: true | InstanceUsageCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InstanceUsageAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InstanceUsageSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InstanceUsageMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InstanceUsageMaxAggregateInputType
  }

  export type GetInstanceUsageAggregateType<T extends InstanceUsageAggregateArgs> = {
        [P in keyof T & keyof AggregateInstanceUsage]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInstanceUsage[P]>
      : GetScalarType<T[P], AggregateInstanceUsage[P]>
  }




  export type InstanceUsageGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InstanceUsageWhereInput
    orderBy?: InstanceUsageOrderByWithAggregationInput | InstanceUsageOrderByWithAggregationInput[]
    by: InstanceUsageScalarFieldEnum[] | InstanceUsageScalarFieldEnum
    having?: InstanceUsageScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InstanceUsageCountAggregateInputType | true
    _avg?: InstanceUsageAvgAggregateInputType
    _sum?: InstanceUsageSumAggregateInputType
    _min?: InstanceUsageMinAggregateInputType
    _max?: InstanceUsageMaxAggregateInputType
  }

  export type InstanceUsageGroupByOutputType = {
    id: string
    instanceId: string
    date: Date
    messagesSent: number
    messagesReceived: number
    mediaSent: number
    mediaReceived: number
    totalMediaSize: number
    apiCalls: number
    webhookSent: number
    memoryUsage: number | null
    cpuUsage: number | null
    createdAt: Date
    updatedAt: Date
    _count: InstanceUsageCountAggregateOutputType | null
    _avg: InstanceUsageAvgAggregateOutputType | null
    _sum: InstanceUsageSumAggregateOutputType | null
    _min: InstanceUsageMinAggregateOutputType | null
    _max: InstanceUsageMaxAggregateOutputType | null
  }

  type GetInstanceUsageGroupByPayload<T extends InstanceUsageGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InstanceUsageGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InstanceUsageGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InstanceUsageGroupByOutputType[P]>
            : GetScalarType<T[P], InstanceUsageGroupByOutputType[P]>
        }
      >
    >


  export type InstanceUsageSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    date?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    mediaSent?: boolean
    mediaReceived?: boolean
    totalMediaSize?: boolean
    apiCalls?: boolean
    webhookSent?: boolean
    memoryUsage?: boolean
    cpuUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instanceUsage"]>

  export type InstanceUsageSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    date?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    mediaSent?: boolean
    mediaReceived?: boolean
    totalMediaSize?: boolean
    apiCalls?: boolean
    webhookSent?: boolean
    memoryUsage?: boolean
    cpuUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instanceUsage"]>

  export type InstanceUsageSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    instanceId?: boolean
    date?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    mediaSent?: boolean
    mediaReceived?: boolean
    totalMediaSize?: boolean
    apiCalls?: boolean
    webhookSent?: boolean
    memoryUsage?: boolean
    cpuUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["instanceUsage"]>

  export type InstanceUsageSelectScalar = {
    id?: boolean
    instanceId?: boolean
    date?: boolean
    messagesSent?: boolean
    messagesReceived?: boolean
    mediaSent?: boolean
    mediaReceived?: boolean
    totalMediaSize?: boolean
    apiCalls?: boolean
    webhookSent?: boolean
    memoryUsage?: boolean
    cpuUsage?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type InstanceUsageOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "instanceId" | "date" | "messagesSent" | "messagesReceived" | "mediaSent" | "mediaReceived" | "totalMediaSize" | "apiCalls" | "webhookSent" | "memoryUsage" | "cpuUsage" | "createdAt" | "updatedAt", ExtArgs["result"]["instanceUsage"]>
  export type InstanceUsageInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type InstanceUsageIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }
  export type InstanceUsageIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    instance?: boolean | InstanceDefaultArgs<ExtArgs>
  }

  export type $InstanceUsagePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InstanceUsage"
    objects: {
      instance: Prisma.$InstancePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      instanceId: string
      date: Date
      messagesSent: number
      messagesReceived: number
      mediaSent: number
      mediaReceived: number
      totalMediaSize: number
      apiCalls: number
      webhookSent: number
      memoryUsage: number | null
      cpuUsage: number | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["instanceUsage"]>
    composites: {}
  }

  type InstanceUsageGetPayload<S extends boolean | null | undefined | InstanceUsageDefaultArgs> = $Result.GetResult<Prisma.$InstanceUsagePayload, S>

  type InstanceUsageCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InstanceUsageFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InstanceUsageCountAggregateInputType | true
    }

  export interface InstanceUsageDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InstanceUsage'], meta: { name: 'InstanceUsage' } }
    /**
     * Find zero or one InstanceUsage that matches the filter.
     * @param {InstanceUsageFindUniqueArgs} args - Arguments to find a InstanceUsage
     * @example
     * // Get one InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InstanceUsageFindUniqueArgs>(args: SelectSubset<T, InstanceUsageFindUniqueArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one InstanceUsage that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InstanceUsageFindUniqueOrThrowArgs} args - Arguments to find a InstanceUsage
     * @example
     * // Get one InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InstanceUsageFindUniqueOrThrowArgs>(args: SelectSubset<T, InstanceUsageFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InstanceUsage that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageFindFirstArgs} args - Arguments to find a InstanceUsage
     * @example
     * // Get one InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InstanceUsageFindFirstArgs>(args?: SelectSubset<T, InstanceUsageFindFirstArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first InstanceUsage that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageFindFirstOrThrowArgs} args - Arguments to find a InstanceUsage
     * @example
     * // Get one InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InstanceUsageFindFirstOrThrowArgs>(args?: SelectSubset<T, InstanceUsageFindFirstOrThrowArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more InstanceUsages that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InstanceUsages
     * const instanceUsages = await prisma.instanceUsage.findMany()
     * 
     * // Get first 10 InstanceUsages
     * const instanceUsages = await prisma.instanceUsage.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const instanceUsageWithIdOnly = await prisma.instanceUsage.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends InstanceUsageFindManyArgs>(args?: SelectSubset<T, InstanceUsageFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a InstanceUsage.
     * @param {InstanceUsageCreateArgs} args - Arguments to create a InstanceUsage.
     * @example
     * // Create one InstanceUsage
     * const InstanceUsage = await prisma.instanceUsage.create({
     *   data: {
     *     // ... data to create a InstanceUsage
     *   }
     * })
     * 
     */
    create<T extends InstanceUsageCreateArgs>(args: SelectSubset<T, InstanceUsageCreateArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many InstanceUsages.
     * @param {InstanceUsageCreateManyArgs} args - Arguments to create many InstanceUsages.
     * @example
     * // Create many InstanceUsages
     * const instanceUsage = await prisma.instanceUsage.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InstanceUsageCreateManyArgs>(args?: SelectSubset<T, InstanceUsageCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InstanceUsages and returns the data saved in the database.
     * @param {InstanceUsageCreateManyAndReturnArgs} args - Arguments to create many InstanceUsages.
     * @example
     * // Create many InstanceUsages
     * const instanceUsage = await prisma.instanceUsage.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InstanceUsages and only return the `id`
     * const instanceUsageWithIdOnly = await prisma.instanceUsage.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InstanceUsageCreateManyAndReturnArgs>(args?: SelectSubset<T, InstanceUsageCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a InstanceUsage.
     * @param {InstanceUsageDeleteArgs} args - Arguments to delete one InstanceUsage.
     * @example
     * // Delete one InstanceUsage
     * const InstanceUsage = await prisma.instanceUsage.delete({
     *   where: {
     *     // ... filter to delete one InstanceUsage
     *   }
     * })
     * 
     */
    delete<T extends InstanceUsageDeleteArgs>(args: SelectSubset<T, InstanceUsageDeleteArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one InstanceUsage.
     * @param {InstanceUsageUpdateArgs} args - Arguments to update one InstanceUsage.
     * @example
     * // Update one InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InstanceUsageUpdateArgs>(args: SelectSubset<T, InstanceUsageUpdateArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more InstanceUsages.
     * @param {InstanceUsageDeleteManyArgs} args - Arguments to filter InstanceUsages to delete.
     * @example
     * // Delete a few InstanceUsages
     * const { count } = await prisma.instanceUsage.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InstanceUsageDeleteManyArgs>(args?: SelectSubset<T, InstanceUsageDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstanceUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InstanceUsages
     * const instanceUsage = await prisma.instanceUsage.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InstanceUsageUpdateManyArgs>(args: SelectSubset<T, InstanceUsageUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InstanceUsages and returns the data updated in the database.
     * @param {InstanceUsageUpdateManyAndReturnArgs} args - Arguments to update many InstanceUsages.
     * @example
     * // Update many InstanceUsages
     * const instanceUsage = await prisma.instanceUsage.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InstanceUsages and only return the `id`
     * const instanceUsageWithIdOnly = await prisma.instanceUsage.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InstanceUsageUpdateManyAndReturnArgs>(args: SelectSubset<T, InstanceUsageUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one InstanceUsage.
     * @param {InstanceUsageUpsertArgs} args - Arguments to update or create a InstanceUsage.
     * @example
     * // Update or create a InstanceUsage
     * const instanceUsage = await prisma.instanceUsage.upsert({
     *   create: {
     *     // ... data to create a InstanceUsage
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InstanceUsage we want to update
     *   }
     * })
     */
    upsert<T extends InstanceUsageUpsertArgs>(args: SelectSubset<T, InstanceUsageUpsertArgs<ExtArgs>>): Prisma__InstanceUsageClient<$Result.GetResult<Prisma.$InstanceUsagePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of InstanceUsages.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageCountArgs} args - Arguments to filter InstanceUsages to count.
     * @example
     * // Count the number of InstanceUsages
     * const count = await prisma.instanceUsage.count({
     *   where: {
     *     // ... the filter for the InstanceUsages we want to count
     *   }
     * })
    **/
    count<T extends InstanceUsageCountArgs>(
      args?: Subset<T, InstanceUsageCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InstanceUsageCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InstanceUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InstanceUsageAggregateArgs>(args: Subset<T, InstanceUsageAggregateArgs>): Prisma.PrismaPromise<GetInstanceUsageAggregateType<T>>

    /**
     * Group by InstanceUsage.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InstanceUsageGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InstanceUsageGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InstanceUsageGroupByArgs['orderBy'] }
        : { orderBy?: InstanceUsageGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InstanceUsageGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInstanceUsageGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InstanceUsage model
   */
  readonly fields: InstanceUsageFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InstanceUsage.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InstanceUsageClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    instance<T extends InstanceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, InstanceDefaultArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InstanceUsage model
   */
  interface InstanceUsageFieldRefs {
    readonly id: FieldRef<"InstanceUsage", 'String'>
    readonly instanceId: FieldRef<"InstanceUsage", 'String'>
    readonly date: FieldRef<"InstanceUsage", 'DateTime'>
    readonly messagesSent: FieldRef<"InstanceUsage", 'Int'>
    readonly messagesReceived: FieldRef<"InstanceUsage", 'Int'>
    readonly mediaSent: FieldRef<"InstanceUsage", 'Int'>
    readonly mediaReceived: FieldRef<"InstanceUsage", 'Int'>
    readonly totalMediaSize: FieldRef<"InstanceUsage", 'Int'>
    readonly apiCalls: FieldRef<"InstanceUsage", 'Int'>
    readonly webhookSent: FieldRef<"InstanceUsage", 'Int'>
    readonly memoryUsage: FieldRef<"InstanceUsage", 'Int'>
    readonly cpuUsage: FieldRef<"InstanceUsage", 'Float'>
    readonly createdAt: FieldRef<"InstanceUsage", 'DateTime'>
    readonly updatedAt: FieldRef<"InstanceUsage", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * InstanceUsage findUnique
   */
  export type InstanceUsageFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter, which InstanceUsage to fetch.
     */
    where: InstanceUsageWhereUniqueInput
  }

  /**
   * InstanceUsage findUniqueOrThrow
   */
  export type InstanceUsageFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter, which InstanceUsage to fetch.
     */
    where: InstanceUsageWhereUniqueInput
  }

  /**
   * InstanceUsage findFirst
   */
  export type InstanceUsageFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter, which InstanceUsage to fetch.
     */
    where?: InstanceUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceUsages to fetch.
     */
    orderBy?: InstanceUsageOrderByWithRelationInput | InstanceUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstanceUsages.
     */
    cursor?: InstanceUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstanceUsages.
     */
    distinct?: InstanceUsageScalarFieldEnum | InstanceUsageScalarFieldEnum[]
  }

  /**
   * InstanceUsage findFirstOrThrow
   */
  export type InstanceUsageFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter, which InstanceUsage to fetch.
     */
    where?: InstanceUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceUsages to fetch.
     */
    orderBy?: InstanceUsageOrderByWithRelationInput | InstanceUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InstanceUsages.
     */
    cursor?: InstanceUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceUsages.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InstanceUsages.
     */
    distinct?: InstanceUsageScalarFieldEnum | InstanceUsageScalarFieldEnum[]
  }

  /**
   * InstanceUsage findMany
   */
  export type InstanceUsageFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter, which InstanceUsages to fetch.
     */
    where?: InstanceUsageWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InstanceUsages to fetch.
     */
    orderBy?: InstanceUsageOrderByWithRelationInput | InstanceUsageOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InstanceUsages.
     */
    cursor?: InstanceUsageWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InstanceUsages from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InstanceUsages.
     */
    skip?: number
    distinct?: InstanceUsageScalarFieldEnum | InstanceUsageScalarFieldEnum[]
  }

  /**
   * InstanceUsage create
   */
  export type InstanceUsageCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * The data needed to create a InstanceUsage.
     */
    data: XOR<InstanceUsageCreateInput, InstanceUsageUncheckedCreateInput>
  }

  /**
   * InstanceUsage createMany
   */
  export type InstanceUsageCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InstanceUsages.
     */
    data: InstanceUsageCreateManyInput | InstanceUsageCreateManyInput[]
  }

  /**
   * InstanceUsage createManyAndReturn
   */
  export type InstanceUsageCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * The data used to create many InstanceUsages.
     */
    data: InstanceUsageCreateManyInput | InstanceUsageCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InstanceUsage update
   */
  export type InstanceUsageUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * The data needed to update a InstanceUsage.
     */
    data: XOR<InstanceUsageUpdateInput, InstanceUsageUncheckedUpdateInput>
    /**
     * Choose, which InstanceUsage to update.
     */
    where: InstanceUsageWhereUniqueInput
  }

  /**
   * InstanceUsage updateMany
   */
  export type InstanceUsageUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InstanceUsages.
     */
    data: XOR<InstanceUsageUpdateManyMutationInput, InstanceUsageUncheckedUpdateManyInput>
    /**
     * Filter which InstanceUsages to update
     */
    where?: InstanceUsageWhereInput
    /**
     * Limit how many InstanceUsages to update.
     */
    limit?: number
  }

  /**
   * InstanceUsage updateManyAndReturn
   */
  export type InstanceUsageUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * The data used to update InstanceUsages.
     */
    data: XOR<InstanceUsageUpdateManyMutationInput, InstanceUsageUncheckedUpdateManyInput>
    /**
     * Filter which InstanceUsages to update
     */
    where?: InstanceUsageWhereInput
    /**
     * Limit how many InstanceUsages to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InstanceUsage upsert
   */
  export type InstanceUsageUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * The filter to search for the InstanceUsage to update in case it exists.
     */
    where: InstanceUsageWhereUniqueInput
    /**
     * In case the InstanceUsage found by the `where` argument doesn't exist, create a new InstanceUsage with this data.
     */
    create: XOR<InstanceUsageCreateInput, InstanceUsageUncheckedCreateInput>
    /**
     * In case the InstanceUsage was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InstanceUsageUpdateInput, InstanceUsageUncheckedUpdateInput>
  }

  /**
   * InstanceUsage delete
   */
  export type InstanceUsageDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
    /**
     * Filter which InstanceUsage to delete.
     */
    where: InstanceUsageWhereUniqueInput
  }

  /**
   * InstanceUsage deleteMany
   */
  export type InstanceUsageDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InstanceUsages to delete
     */
    where?: InstanceUsageWhereInput
    /**
     * Limit how many InstanceUsages to delete.
     */
    limit?: number
  }

  /**
   * InstanceUsage without action
   */
  export type InstanceUsageDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InstanceUsage
     */
    select?: InstanceUsageSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InstanceUsage
     */
    omit?: InstanceUsageOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceUsageInclude<ExtArgs> | null
  }


  /**
   * Model UsageLimit
   */

  export type AggregateUsageLimit = {
    _count: UsageLimitCountAggregateOutputType | null
    _avg: UsageLimitAvgAggregateOutputType | null
    _sum: UsageLimitSumAggregateOutputType | null
    _min: UsageLimitMinAggregateOutputType | null
    _max: UsageLimitMaxAggregateOutputType | null
  }

  export type UsageLimitAvgAggregateOutputType = {
    maxMessagesSent: number | null
    maxMessagesReceived: number | null
    maxMediaSent: number | null
    maxMediaReceived: number | null
    maxMediaSize: number | null
    maxApiCalls: number | null
    maxWebhookCalls: number | null
    timeWindowHours: number | null
  }

  export type UsageLimitSumAggregateOutputType = {
    maxMessagesSent: number | null
    maxMessagesReceived: number | null
    maxMediaSent: number | null
    maxMediaReceived: number | null
    maxMediaSize: number | null
    maxApiCalls: number | null
    maxWebhookCalls: number | null
    timeWindowHours: number | null
  }

  export type UsageLimitMinAggregateOutputType = {
    id: string | null
    userId: string | null
    instanceId: string | null
    isDefault: boolean | null
    maxMessagesSent: number | null
    maxMessagesReceived: number | null
    maxMediaSent: number | null
    maxMediaReceived: number | null
    maxMediaSize: number | null
    maxApiCalls: number | null
    maxWebhookCalls: number | null
    timeWindowHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageLimitMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    instanceId: string | null
    isDefault: boolean | null
    maxMessagesSent: number | null
    maxMessagesReceived: number | null
    maxMediaSent: number | null
    maxMediaReceived: number | null
    maxMediaSize: number | null
    maxApiCalls: number | null
    maxWebhookCalls: number | null
    timeWindowHours: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UsageLimitCountAggregateOutputType = {
    id: number
    userId: number
    instanceId: number
    isDefault: number
    maxMessagesSent: number
    maxMessagesReceived: number
    maxMediaSent: number
    maxMediaReceived: number
    maxMediaSize: number
    maxApiCalls: number
    maxWebhookCalls: number
    timeWindowHours: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UsageLimitAvgAggregateInputType = {
    maxMessagesSent?: true
    maxMessagesReceived?: true
    maxMediaSent?: true
    maxMediaReceived?: true
    maxMediaSize?: true
    maxApiCalls?: true
    maxWebhookCalls?: true
    timeWindowHours?: true
  }

  export type UsageLimitSumAggregateInputType = {
    maxMessagesSent?: true
    maxMessagesReceived?: true
    maxMediaSent?: true
    maxMediaReceived?: true
    maxMediaSize?: true
    maxApiCalls?: true
    maxWebhookCalls?: true
    timeWindowHours?: true
  }

  export type UsageLimitMinAggregateInputType = {
    id?: true
    userId?: true
    instanceId?: true
    isDefault?: true
    maxMessagesSent?: true
    maxMessagesReceived?: true
    maxMediaSent?: true
    maxMediaReceived?: true
    maxMediaSize?: true
    maxApiCalls?: true
    maxWebhookCalls?: true
    timeWindowHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageLimitMaxAggregateInputType = {
    id?: true
    userId?: true
    instanceId?: true
    isDefault?: true
    maxMessagesSent?: true
    maxMessagesReceived?: true
    maxMediaSent?: true
    maxMediaReceived?: true
    maxMediaSize?: true
    maxApiCalls?: true
    maxWebhookCalls?: true
    timeWindowHours?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UsageLimitCountAggregateInputType = {
    id?: true
    userId?: true
    instanceId?: true
    isDefault?: true
    maxMessagesSent?: true
    maxMessagesReceived?: true
    maxMediaSent?: true
    maxMediaReceived?: true
    maxMediaSize?: true
    maxApiCalls?: true
    maxWebhookCalls?: true
    timeWindowHours?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UsageLimitAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLimit to aggregate.
     */
    where?: UsageLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLimits to fetch.
     */
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsageLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UsageLimits
    **/
    _count?: true | UsageLimitCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsageLimitAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsageLimitSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsageLimitMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsageLimitMaxAggregateInputType
  }

  export type GetUsageLimitAggregateType<T extends UsageLimitAggregateArgs> = {
        [P in keyof T & keyof AggregateUsageLimit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsageLimit[P]>
      : GetScalarType<T[P], AggregateUsageLimit[P]>
  }




  export type UsageLimitGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsageLimitWhereInput
    orderBy?: UsageLimitOrderByWithAggregationInput | UsageLimitOrderByWithAggregationInput[]
    by: UsageLimitScalarFieldEnum[] | UsageLimitScalarFieldEnum
    having?: UsageLimitScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsageLimitCountAggregateInputType | true
    _avg?: UsageLimitAvgAggregateInputType
    _sum?: UsageLimitSumAggregateInputType
    _min?: UsageLimitMinAggregateInputType
    _max?: UsageLimitMaxAggregateInputType
  }

  export type UsageLimitGroupByOutputType = {
    id: string
    userId: string | null
    instanceId: string | null
    isDefault: boolean
    maxMessagesSent: number | null
    maxMessagesReceived: number | null
    maxMediaSent: number | null
    maxMediaReceived: number | null
    maxMediaSize: number | null
    maxApiCalls: number | null
    maxWebhookCalls: number | null
    timeWindowHours: number
    createdAt: Date
    updatedAt: Date
    _count: UsageLimitCountAggregateOutputType | null
    _avg: UsageLimitAvgAggregateOutputType | null
    _sum: UsageLimitSumAggregateOutputType | null
    _min: UsageLimitMinAggregateOutputType | null
    _max: UsageLimitMaxAggregateOutputType | null
  }

  type GetUsageLimitGroupByPayload<T extends UsageLimitGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsageLimitGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsageLimitGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsageLimitGroupByOutputType[P]>
            : GetScalarType<T[P], UsageLimitGroupByOutputType[P]>
        }
      >
    >


  export type UsageLimitSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    instanceId?: boolean
    isDefault?: boolean
    maxMessagesSent?: boolean
    maxMessagesReceived?: boolean
    maxMediaSent?: boolean
    maxMediaReceived?: boolean
    maxMediaSize?: boolean
    maxApiCalls?: boolean
    maxWebhookCalls?: boolean
    timeWindowHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }, ExtArgs["result"]["usageLimit"]>

  export type UsageLimitSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    instanceId?: boolean
    isDefault?: boolean
    maxMessagesSent?: boolean
    maxMessagesReceived?: boolean
    maxMediaSent?: boolean
    maxMediaReceived?: boolean
    maxMediaSize?: boolean
    maxApiCalls?: boolean
    maxWebhookCalls?: boolean
    timeWindowHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }, ExtArgs["result"]["usageLimit"]>

  export type UsageLimitSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    instanceId?: boolean
    isDefault?: boolean
    maxMessagesSent?: boolean
    maxMessagesReceived?: boolean
    maxMediaSent?: boolean
    maxMediaReceived?: boolean
    maxMediaSize?: boolean
    maxApiCalls?: boolean
    maxWebhookCalls?: boolean
    timeWindowHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }, ExtArgs["result"]["usageLimit"]>

  export type UsageLimitSelectScalar = {
    id?: boolean
    userId?: boolean
    instanceId?: boolean
    isDefault?: boolean
    maxMessagesSent?: boolean
    maxMessagesReceived?: boolean
    maxMediaSent?: boolean
    maxMediaReceived?: boolean
    maxMediaSize?: boolean
    maxApiCalls?: boolean
    maxWebhookCalls?: boolean
    timeWindowHours?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UsageLimitOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "instanceId" | "isDefault" | "maxMessagesSent" | "maxMessagesReceived" | "maxMediaSent" | "maxMediaReceived" | "maxMediaSize" | "maxApiCalls" | "maxWebhookCalls" | "timeWindowHours" | "createdAt" | "updatedAt", ExtArgs["result"]["usageLimit"]>
  export type UsageLimitInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }
  export type UsageLimitIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }
  export type UsageLimitIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UsageLimit$userArgs<ExtArgs>
    instance?: boolean | UsageLimit$instanceArgs<ExtArgs>
  }

  export type $UsageLimitPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UsageLimit"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      instance: Prisma.$InstancePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string | null
      instanceId: string | null
      isDefault: boolean
      maxMessagesSent: number | null
      maxMessagesReceived: number | null
      maxMediaSent: number | null
      maxMediaReceived: number | null
      maxMediaSize: number | null
      maxApiCalls: number | null
      maxWebhookCalls: number | null
      timeWindowHours: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["usageLimit"]>
    composites: {}
  }

  type UsageLimitGetPayload<S extends boolean | null | undefined | UsageLimitDefaultArgs> = $Result.GetResult<Prisma.$UsageLimitPayload, S>

  type UsageLimitCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsageLimitFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsageLimitCountAggregateInputType | true
    }

  export interface UsageLimitDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UsageLimit'], meta: { name: 'UsageLimit' } }
    /**
     * Find zero or one UsageLimit that matches the filter.
     * @param {UsageLimitFindUniqueArgs} args - Arguments to find a UsageLimit
     * @example
     * // Get one UsageLimit
     * const usageLimit = await prisma.usageLimit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsageLimitFindUniqueArgs>(args: SelectSubset<T, UsageLimitFindUniqueArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UsageLimit that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsageLimitFindUniqueOrThrowArgs} args - Arguments to find a UsageLimit
     * @example
     * // Get one UsageLimit
     * const usageLimit = await prisma.usageLimit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsageLimitFindUniqueOrThrowArgs>(args: SelectSubset<T, UsageLimitFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLimit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitFindFirstArgs} args - Arguments to find a UsageLimit
     * @example
     * // Get one UsageLimit
     * const usageLimit = await prisma.usageLimit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsageLimitFindFirstArgs>(args?: SelectSubset<T, UsageLimitFindFirstArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UsageLimit that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitFindFirstOrThrowArgs} args - Arguments to find a UsageLimit
     * @example
     * // Get one UsageLimit
     * const usageLimit = await prisma.usageLimit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsageLimitFindFirstOrThrowArgs>(args?: SelectSubset<T, UsageLimitFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UsageLimits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UsageLimits
     * const usageLimits = await prisma.usageLimit.findMany()
     * 
     * // Get first 10 UsageLimits
     * const usageLimits = await prisma.usageLimit.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const usageLimitWithIdOnly = await prisma.usageLimit.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UsageLimitFindManyArgs>(args?: SelectSubset<T, UsageLimitFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UsageLimit.
     * @param {UsageLimitCreateArgs} args - Arguments to create a UsageLimit.
     * @example
     * // Create one UsageLimit
     * const UsageLimit = await prisma.usageLimit.create({
     *   data: {
     *     // ... data to create a UsageLimit
     *   }
     * })
     * 
     */
    create<T extends UsageLimitCreateArgs>(args: SelectSubset<T, UsageLimitCreateArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UsageLimits.
     * @param {UsageLimitCreateManyArgs} args - Arguments to create many UsageLimits.
     * @example
     * // Create many UsageLimits
     * const usageLimit = await prisma.usageLimit.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsageLimitCreateManyArgs>(args?: SelectSubset<T, UsageLimitCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UsageLimits and returns the data saved in the database.
     * @param {UsageLimitCreateManyAndReturnArgs} args - Arguments to create many UsageLimits.
     * @example
     * // Create many UsageLimits
     * const usageLimit = await prisma.usageLimit.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UsageLimits and only return the `id`
     * const usageLimitWithIdOnly = await prisma.usageLimit.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsageLimitCreateManyAndReturnArgs>(args?: SelectSubset<T, UsageLimitCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UsageLimit.
     * @param {UsageLimitDeleteArgs} args - Arguments to delete one UsageLimit.
     * @example
     * // Delete one UsageLimit
     * const UsageLimit = await prisma.usageLimit.delete({
     *   where: {
     *     // ... filter to delete one UsageLimit
     *   }
     * })
     * 
     */
    delete<T extends UsageLimitDeleteArgs>(args: SelectSubset<T, UsageLimitDeleteArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UsageLimit.
     * @param {UsageLimitUpdateArgs} args - Arguments to update one UsageLimit.
     * @example
     * // Update one UsageLimit
     * const usageLimit = await prisma.usageLimit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsageLimitUpdateArgs>(args: SelectSubset<T, UsageLimitUpdateArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UsageLimits.
     * @param {UsageLimitDeleteManyArgs} args - Arguments to filter UsageLimits to delete.
     * @example
     * // Delete a few UsageLimits
     * const { count } = await prisma.usageLimit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsageLimitDeleteManyArgs>(args?: SelectSubset<T, UsageLimitDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UsageLimits
     * const usageLimit = await prisma.usageLimit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsageLimitUpdateManyArgs>(args: SelectSubset<T, UsageLimitUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UsageLimits and returns the data updated in the database.
     * @param {UsageLimitUpdateManyAndReturnArgs} args - Arguments to update many UsageLimits.
     * @example
     * // Update many UsageLimits
     * const usageLimit = await prisma.usageLimit.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UsageLimits and only return the `id`
     * const usageLimitWithIdOnly = await prisma.usageLimit.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsageLimitUpdateManyAndReturnArgs>(args: SelectSubset<T, UsageLimitUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UsageLimit.
     * @param {UsageLimitUpsertArgs} args - Arguments to update or create a UsageLimit.
     * @example
     * // Update or create a UsageLimit
     * const usageLimit = await prisma.usageLimit.upsert({
     *   create: {
     *     // ... data to create a UsageLimit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UsageLimit we want to update
     *   }
     * })
     */
    upsert<T extends UsageLimitUpsertArgs>(args: SelectSubset<T, UsageLimitUpsertArgs<ExtArgs>>): Prisma__UsageLimitClient<$Result.GetResult<Prisma.$UsageLimitPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UsageLimits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitCountArgs} args - Arguments to filter UsageLimits to count.
     * @example
     * // Count the number of UsageLimits
     * const count = await prisma.usageLimit.count({
     *   where: {
     *     // ... the filter for the UsageLimits we want to count
     *   }
     * })
    **/
    count<T extends UsageLimitCountArgs>(
      args?: Subset<T, UsageLimitCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsageLimitCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UsageLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsageLimitAggregateArgs>(args: Subset<T, UsageLimitAggregateArgs>): Prisma.PrismaPromise<GetUsageLimitAggregateType<T>>

    /**
     * Group by UsageLimit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsageLimitGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsageLimitGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsageLimitGroupByArgs['orderBy'] }
        : { orderBy?: UsageLimitGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsageLimitGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsageLimitGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UsageLimit model
   */
  readonly fields: UsageLimitFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UsageLimit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsageLimitClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UsageLimit$userArgs<ExtArgs> = {}>(args?: Subset<T, UsageLimit$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    instance<T extends UsageLimit$instanceArgs<ExtArgs> = {}>(args?: Subset<T, UsageLimit$instanceArgs<ExtArgs>>): Prisma__InstanceClient<$Result.GetResult<Prisma.$InstancePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UsageLimit model
   */
  interface UsageLimitFieldRefs {
    readonly id: FieldRef<"UsageLimit", 'String'>
    readonly userId: FieldRef<"UsageLimit", 'String'>
    readonly instanceId: FieldRef<"UsageLimit", 'String'>
    readonly isDefault: FieldRef<"UsageLimit", 'Boolean'>
    readonly maxMessagesSent: FieldRef<"UsageLimit", 'Int'>
    readonly maxMessagesReceived: FieldRef<"UsageLimit", 'Int'>
    readonly maxMediaSent: FieldRef<"UsageLimit", 'Int'>
    readonly maxMediaReceived: FieldRef<"UsageLimit", 'Int'>
    readonly maxMediaSize: FieldRef<"UsageLimit", 'Int'>
    readonly maxApiCalls: FieldRef<"UsageLimit", 'Int'>
    readonly maxWebhookCalls: FieldRef<"UsageLimit", 'Int'>
    readonly timeWindowHours: FieldRef<"UsageLimit", 'Int'>
    readonly createdAt: FieldRef<"UsageLimit", 'DateTime'>
    readonly updatedAt: FieldRef<"UsageLimit", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UsageLimit findUnique
   */
  export type UsageLimitFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter, which UsageLimit to fetch.
     */
    where: UsageLimitWhereUniqueInput
  }

  /**
   * UsageLimit findUniqueOrThrow
   */
  export type UsageLimitFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter, which UsageLimit to fetch.
     */
    where: UsageLimitWhereUniqueInput
  }

  /**
   * UsageLimit findFirst
   */
  export type UsageLimitFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter, which UsageLimit to fetch.
     */
    where?: UsageLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLimits to fetch.
     */
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLimits.
     */
    cursor?: UsageLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLimits.
     */
    distinct?: UsageLimitScalarFieldEnum | UsageLimitScalarFieldEnum[]
  }

  /**
   * UsageLimit findFirstOrThrow
   */
  export type UsageLimitFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter, which UsageLimit to fetch.
     */
    where?: UsageLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLimits to fetch.
     */
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UsageLimits.
     */
    cursor?: UsageLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLimits.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UsageLimits.
     */
    distinct?: UsageLimitScalarFieldEnum | UsageLimitScalarFieldEnum[]
  }

  /**
   * UsageLimit findMany
   */
  export type UsageLimitFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter, which UsageLimits to fetch.
     */
    where?: UsageLimitWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UsageLimits to fetch.
     */
    orderBy?: UsageLimitOrderByWithRelationInput | UsageLimitOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UsageLimits.
     */
    cursor?: UsageLimitWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UsageLimits from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UsageLimits.
     */
    skip?: number
    distinct?: UsageLimitScalarFieldEnum | UsageLimitScalarFieldEnum[]
  }

  /**
   * UsageLimit create
   */
  export type UsageLimitCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * The data needed to create a UsageLimit.
     */
    data: XOR<UsageLimitCreateInput, UsageLimitUncheckedCreateInput>
  }

  /**
   * UsageLimit createMany
   */
  export type UsageLimitCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UsageLimits.
     */
    data: UsageLimitCreateManyInput | UsageLimitCreateManyInput[]
  }

  /**
   * UsageLimit createManyAndReturn
   */
  export type UsageLimitCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * The data used to create many UsageLimits.
     */
    data: UsageLimitCreateManyInput | UsageLimitCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLimit update
   */
  export type UsageLimitUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * The data needed to update a UsageLimit.
     */
    data: XOR<UsageLimitUpdateInput, UsageLimitUncheckedUpdateInput>
    /**
     * Choose, which UsageLimit to update.
     */
    where: UsageLimitWhereUniqueInput
  }

  /**
   * UsageLimit updateMany
   */
  export type UsageLimitUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UsageLimits.
     */
    data: XOR<UsageLimitUpdateManyMutationInput, UsageLimitUncheckedUpdateManyInput>
    /**
     * Filter which UsageLimits to update
     */
    where?: UsageLimitWhereInput
    /**
     * Limit how many UsageLimits to update.
     */
    limit?: number
  }

  /**
   * UsageLimit updateManyAndReturn
   */
  export type UsageLimitUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * The data used to update UsageLimits.
     */
    data: XOR<UsageLimitUpdateManyMutationInput, UsageLimitUncheckedUpdateManyInput>
    /**
     * Filter which UsageLimits to update
     */
    where?: UsageLimitWhereInput
    /**
     * Limit how many UsageLimits to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UsageLimit upsert
   */
  export type UsageLimitUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * The filter to search for the UsageLimit to update in case it exists.
     */
    where: UsageLimitWhereUniqueInput
    /**
     * In case the UsageLimit found by the `where` argument doesn't exist, create a new UsageLimit with this data.
     */
    create: XOR<UsageLimitCreateInput, UsageLimitUncheckedCreateInput>
    /**
     * In case the UsageLimit was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsageLimitUpdateInput, UsageLimitUncheckedUpdateInput>
  }

  /**
   * UsageLimit delete
   */
  export type UsageLimitDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
    /**
     * Filter which UsageLimit to delete.
     */
    where: UsageLimitWhereUniqueInput
  }

  /**
   * UsageLimit deleteMany
   */
  export type UsageLimitDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UsageLimits to delete
     */
    where?: UsageLimitWhereInput
    /**
     * Limit how many UsageLimits to delete.
     */
    limit?: number
  }

  /**
   * UsageLimit.user
   */
  export type UsageLimit$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * UsageLimit.instance
   */
  export type UsageLimit$instanceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Instance
     */
    select?: InstanceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Instance
     */
    omit?: InstanceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InstanceInclude<ExtArgs> | null
    where?: InstanceWhereInput
  }

  /**
   * UsageLimit without action
   */
  export type UsageLimitDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsageLimit
     */
    select?: UsageLimitSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UsageLimit
     */
    omit?: UsageLimitOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsageLimitInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    firstName: 'firstName',
    lastName: 'lastName',
    apiKey: 'apiKey',
    isAdmin: 'isAdmin',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const InstanceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    userId: 'userId',
    status: 'status',
    qrCode: 'qrCode',
    webhookUrl: 'webhookUrl',
    webhookEnabled: 'webhookEnabled',
    sentMessages: 'sentMessages',
    receivedMessages: 'receivedMessages',
    credentials: 'credentials',
    lastActivity: 'lastActivity',
    authCreatedAt: 'authCreatedAt',
    authExpiresAt: 'authExpiresAt',
    authRefreshToken: 'authRefreshToken',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InstanceScalarFieldEnum = (typeof InstanceScalarFieldEnum)[keyof typeof InstanceScalarFieldEnum]


  export const WebhookSettingsScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    notifyReceived: 'notifyReceived',
    notifySent: 'notifySent',
    notifyDelivery: 'notifyDelivery',
    notifyRead: 'notifyRead',
    maxRetries: 'maxRetries',
    retryInterval: 'retryInterval',
    secret: 'secret',
    headers: 'headers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WebhookSettingsScalarFieldEnum = (typeof WebhookSettingsScalarFieldEnum)[keyof typeof WebhookSettingsScalarFieldEnum]


  export const MessageScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    remoteJid: 'remoteJid',
    fromMe: 'fromMe',
    messageType: 'messageType',
    content: 'content',
    messageId: 'messageId',
    hasMedia: 'hasMedia',
    mediaUrl: 'mediaUrl',
    caption: 'caption',
    mimeType: 'mimeType',
    fileName: 'fileName',
    status: 'status',
    statusUpdatedAt: 'statusUpdatedAt',
    metadata: 'metadata',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MessageScalarFieldEnum = (typeof MessageScalarFieldEnum)[keyof typeof MessageScalarFieldEnum]


  export const ContactScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    name: 'name',
    number: 'number',
    remoteJid: 'remoteJid',
    pushName: 'pushName',
    isGroup: 'isGroup',
    profilePicture: 'profilePicture',
    about: 'about',
    lastActivity: 'lastActivity',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const ActivityLogScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    action: 'action',
    details: 'details',
    createdAt: 'createdAt'
  };

  export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum]


  export const WebhookLogScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    webhookUrl: 'webhookUrl',
    payload: 'payload',
    response: 'response',
    statusCode: 'statusCode',
    success: 'success',
    attempt: 'attempt',
    errorMessage: 'errorMessage',
    createdAt: 'createdAt'
  };

  export type WebhookLogScalarFieldEnum = (typeof WebhookLogScalarFieldEnum)[keyof typeof WebhookLogScalarFieldEnum]


  export const InstanceUsageScalarFieldEnum: {
    id: 'id',
    instanceId: 'instanceId',
    date: 'date',
    messagesSent: 'messagesSent',
    messagesReceived: 'messagesReceived',
    mediaSent: 'mediaSent',
    mediaReceived: 'mediaReceived',
    totalMediaSize: 'totalMediaSize',
    apiCalls: 'apiCalls',
    webhookSent: 'webhookSent',
    memoryUsage: 'memoryUsage',
    cpuUsage: 'cpuUsage',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type InstanceUsageScalarFieldEnum = (typeof InstanceUsageScalarFieldEnum)[keyof typeof InstanceUsageScalarFieldEnum]


  export const UsageLimitScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    instanceId: 'instanceId',
    isDefault: 'isDefault',
    maxMessagesSent: 'maxMessagesSent',
    maxMessagesReceived: 'maxMessagesReceived',
    maxMediaSent: 'maxMediaSent',
    maxMediaReceived: 'maxMediaReceived',
    maxMediaSize: 'maxMediaSize',
    maxApiCalls: 'maxApiCalls',
    maxWebhookCalls: 'maxWebhookCalls',
    timeWindowHours: 'timeWindowHours',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UsageLimitScalarFieldEnum = (typeof UsageLimitScalarFieldEnum)[keyof typeof UsageLimitScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    apiKey?: StringFilter<"User"> | string
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    instances?: InstanceListRelationFilter
    usageLimits?: UsageLimitListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    apiKey?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instances?: InstanceOrderByRelationAggregateInput
    usageLimits?: UsageLimitOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    apiKey?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastName?: StringNullableFilter<"User"> | string | null
    isAdmin?: BoolFilter<"User"> | boolean
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    instances?: InstanceListRelationFilter
    usageLimits?: UsageLimitListRelationFilter
  }, "id" | "email" | "apiKey">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastName?: SortOrderInput | SortOrder
    apiKey?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastName?: StringNullableWithAggregatesFilter<"User"> | string | null
    apiKey?: StringWithAggregatesFilter<"User"> | string
    isAdmin?: BoolWithAggregatesFilter<"User"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type InstanceWhereInput = {
    AND?: InstanceWhereInput | InstanceWhereInput[]
    OR?: InstanceWhereInput[]
    NOT?: InstanceWhereInput | InstanceWhereInput[]
    id?: StringFilter<"Instance"> | string
    name?: StringFilter<"Instance"> | string
    description?: StringNullableFilter<"Instance"> | string | null
    userId?: StringFilter<"Instance"> | string
    status?: StringFilter<"Instance"> | string
    qrCode?: StringNullableFilter<"Instance"> | string | null
    webhookUrl?: StringNullableFilter<"Instance"> | string | null
    webhookEnabled?: BoolFilter<"Instance"> | boolean
    sentMessages?: IntFilter<"Instance"> | number
    receivedMessages?: IntFilter<"Instance"> | number
    credentials?: StringNullableFilter<"Instance"> | string | null
    lastActivity?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authCreatedAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authExpiresAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authRefreshToken?: StringNullableFilter<"Instance"> | string | null
    createdAt?: DateTimeFilter<"Instance"> | Date | string
    updatedAt?: DateTimeFilter<"Instance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    webhookSettings?: XOR<WebhookSettingsNullableScalarRelationFilter, WebhookSettingsWhereInput> | null
    messages?: MessageListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    webhookLogs?: WebhookLogListRelationFilter
    instanceUsage?: InstanceUsageListRelationFilter
    usageLimits?: UsageLimitListRelationFilter
    Contact?: ContactListRelationFilter
  }

  export type InstanceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    status?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    webhookUrl?: SortOrderInput | SortOrder
    webhookEnabled?: SortOrder
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
    credentials?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    authCreatedAt?: SortOrderInput | SortOrder
    authExpiresAt?: SortOrderInput | SortOrder
    authRefreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    webhookSettings?: WebhookSettingsOrderByWithRelationInput
    messages?: MessageOrderByRelationAggregateInput
    activityLogs?: ActivityLogOrderByRelationAggregateInput
    webhookLogs?: WebhookLogOrderByRelationAggregateInput
    instanceUsage?: InstanceUsageOrderByRelationAggregateInput
    usageLimits?: UsageLimitOrderByRelationAggregateInput
    Contact?: ContactOrderByRelationAggregateInput
  }

  export type InstanceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: InstanceWhereInput | InstanceWhereInput[]
    OR?: InstanceWhereInput[]
    NOT?: InstanceWhereInput | InstanceWhereInput[]
    name?: StringFilter<"Instance"> | string
    description?: StringNullableFilter<"Instance"> | string | null
    userId?: StringFilter<"Instance"> | string
    status?: StringFilter<"Instance"> | string
    qrCode?: StringNullableFilter<"Instance"> | string | null
    webhookUrl?: StringNullableFilter<"Instance"> | string | null
    webhookEnabled?: BoolFilter<"Instance"> | boolean
    sentMessages?: IntFilter<"Instance"> | number
    receivedMessages?: IntFilter<"Instance"> | number
    credentials?: StringNullableFilter<"Instance"> | string | null
    lastActivity?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authCreatedAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authExpiresAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authRefreshToken?: StringNullableFilter<"Instance"> | string | null
    createdAt?: DateTimeFilter<"Instance"> | Date | string
    updatedAt?: DateTimeFilter<"Instance"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    webhookSettings?: XOR<WebhookSettingsNullableScalarRelationFilter, WebhookSettingsWhereInput> | null
    messages?: MessageListRelationFilter
    activityLogs?: ActivityLogListRelationFilter
    webhookLogs?: WebhookLogListRelationFilter
    instanceUsage?: InstanceUsageListRelationFilter
    usageLimits?: UsageLimitListRelationFilter
    Contact?: ContactListRelationFilter
  }, "id">

  export type InstanceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrderInput | SortOrder
    userId?: SortOrder
    status?: SortOrder
    qrCode?: SortOrderInput | SortOrder
    webhookUrl?: SortOrderInput | SortOrder
    webhookEnabled?: SortOrder
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
    credentials?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    authCreatedAt?: SortOrderInput | SortOrder
    authExpiresAt?: SortOrderInput | SortOrder
    authRefreshToken?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InstanceCountOrderByAggregateInput
    _avg?: InstanceAvgOrderByAggregateInput
    _max?: InstanceMaxOrderByAggregateInput
    _min?: InstanceMinOrderByAggregateInput
    _sum?: InstanceSumOrderByAggregateInput
  }

  export type InstanceScalarWhereWithAggregatesInput = {
    AND?: InstanceScalarWhereWithAggregatesInput | InstanceScalarWhereWithAggregatesInput[]
    OR?: InstanceScalarWhereWithAggregatesInput[]
    NOT?: InstanceScalarWhereWithAggregatesInput | InstanceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Instance"> | string
    name?: StringWithAggregatesFilter<"Instance"> | string
    description?: StringNullableWithAggregatesFilter<"Instance"> | string | null
    userId?: StringWithAggregatesFilter<"Instance"> | string
    status?: StringWithAggregatesFilter<"Instance"> | string
    qrCode?: StringNullableWithAggregatesFilter<"Instance"> | string | null
    webhookUrl?: StringNullableWithAggregatesFilter<"Instance"> | string | null
    webhookEnabled?: BoolWithAggregatesFilter<"Instance"> | boolean
    sentMessages?: IntWithAggregatesFilter<"Instance"> | number
    receivedMessages?: IntWithAggregatesFilter<"Instance"> | number
    credentials?: StringNullableWithAggregatesFilter<"Instance"> | string | null
    lastActivity?: DateTimeNullableWithAggregatesFilter<"Instance"> | Date | string | null
    authCreatedAt?: DateTimeNullableWithAggregatesFilter<"Instance"> | Date | string | null
    authExpiresAt?: DateTimeNullableWithAggregatesFilter<"Instance"> | Date | string | null
    authRefreshToken?: StringNullableWithAggregatesFilter<"Instance"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Instance"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Instance"> | Date | string
  }

  export type WebhookSettingsWhereInput = {
    AND?: WebhookSettingsWhereInput | WebhookSettingsWhereInput[]
    OR?: WebhookSettingsWhereInput[]
    NOT?: WebhookSettingsWhereInput | WebhookSettingsWhereInput[]
    id?: StringFilter<"WebhookSettings"> | string
    instanceId?: StringFilter<"WebhookSettings"> | string
    notifyReceived?: BoolFilter<"WebhookSettings"> | boolean
    notifySent?: BoolFilter<"WebhookSettings"> | boolean
    notifyDelivery?: BoolFilter<"WebhookSettings"> | boolean
    notifyRead?: BoolFilter<"WebhookSettings"> | boolean
    maxRetries?: IntFilter<"WebhookSettings"> | number
    retryInterval?: IntFilter<"WebhookSettings"> | number
    secret?: StringNullableFilter<"WebhookSettings"> | string | null
    headers?: StringNullableFilter<"WebhookSettings"> | string | null
    createdAt?: DateTimeFilter<"WebhookSettings"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookSettings"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type WebhookSettingsOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    notifyReceived?: SortOrder
    notifySent?: SortOrder
    notifyDelivery?: SortOrder
    notifyRead?: SortOrder
    maxRetries?: SortOrder
    retryInterval?: SortOrder
    secret?: SortOrderInput | SortOrder
    headers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type WebhookSettingsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instanceId?: string
    AND?: WebhookSettingsWhereInput | WebhookSettingsWhereInput[]
    OR?: WebhookSettingsWhereInput[]
    NOT?: WebhookSettingsWhereInput | WebhookSettingsWhereInput[]
    notifyReceived?: BoolFilter<"WebhookSettings"> | boolean
    notifySent?: BoolFilter<"WebhookSettings"> | boolean
    notifyDelivery?: BoolFilter<"WebhookSettings"> | boolean
    notifyRead?: BoolFilter<"WebhookSettings"> | boolean
    maxRetries?: IntFilter<"WebhookSettings"> | number
    retryInterval?: IntFilter<"WebhookSettings"> | number
    secret?: StringNullableFilter<"WebhookSettings"> | string | null
    headers?: StringNullableFilter<"WebhookSettings"> | string | null
    createdAt?: DateTimeFilter<"WebhookSettings"> | Date | string
    updatedAt?: DateTimeFilter<"WebhookSettings"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id" | "instanceId">

  export type WebhookSettingsOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    notifyReceived?: SortOrder
    notifySent?: SortOrder
    notifyDelivery?: SortOrder
    notifyRead?: SortOrder
    maxRetries?: SortOrder
    retryInterval?: SortOrder
    secret?: SortOrderInput | SortOrder
    headers?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WebhookSettingsCountOrderByAggregateInput
    _avg?: WebhookSettingsAvgOrderByAggregateInput
    _max?: WebhookSettingsMaxOrderByAggregateInput
    _min?: WebhookSettingsMinOrderByAggregateInput
    _sum?: WebhookSettingsSumOrderByAggregateInput
  }

  export type WebhookSettingsScalarWhereWithAggregatesInput = {
    AND?: WebhookSettingsScalarWhereWithAggregatesInput | WebhookSettingsScalarWhereWithAggregatesInput[]
    OR?: WebhookSettingsScalarWhereWithAggregatesInput[]
    NOT?: WebhookSettingsScalarWhereWithAggregatesInput | WebhookSettingsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookSettings"> | string
    instanceId?: StringWithAggregatesFilter<"WebhookSettings"> | string
    notifyReceived?: BoolWithAggregatesFilter<"WebhookSettings"> | boolean
    notifySent?: BoolWithAggregatesFilter<"WebhookSettings"> | boolean
    notifyDelivery?: BoolWithAggregatesFilter<"WebhookSettings"> | boolean
    notifyRead?: BoolWithAggregatesFilter<"WebhookSettings"> | boolean
    maxRetries?: IntWithAggregatesFilter<"WebhookSettings"> | number
    retryInterval?: IntWithAggregatesFilter<"WebhookSettings"> | number
    secret?: StringNullableWithAggregatesFilter<"WebhookSettings"> | string | null
    headers?: StringNullableWithAggregatesFilter<"WebhookSettings"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookSettings"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"WebhookSettings"> | Date | string
  }

  export type MessageWhereInput = {
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    id?: StringFilter<"Message"> | string
    instanceId?: StringFilter<"Message"> | string
    remoteJid?: StringFilter<"Message"> | string
    fromMe?: BoolFilter<"Message"> | boolean
    messageType?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    messageId?: StringFilter<"Message"> | string
    hasMedia?: BoolFilter<"Message"> | boolean
    mediaUrl?: StringNullableFilter<"Message"> | string | null
    caption?: StringNullableFilter<"Message"> | string | null
    mimeType?: StringNullableFilter<"Message"> | string | null
    fileName?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    statusUpdatedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type MessageOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    remoteJid?: SortOrder
    fromMe?: SortOrder
    messageType?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    hasMedia?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    fileName?: SortOrderInput | SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type MessageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: MessageWhereInput | MessageWhereInput[]
    OR?: MessageWhereInput[]
    NOT?: MessageWhereInput | MessageWhereInput[]
    instanceId?: StringFilter<"Message"> | string
    remoteJid?: StringFilter<"Message"> | string
    fromMe?: BoolFilter<"Message"> | boolean
    messageType?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    messageId?: StringFilter<"Message"> | string
    hasMedia?: BoolFilter<"Message"> | boolean
    mediaUrl?: StringNullableFilter<"Message"> | string | null
    caption?: StringNullableFilter<"Message"> | string | null
    mimeType?: StringNullableFilter<"Message"> | string | null
    fileName?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    statusUpdatedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id">

  export type MessageOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    remoteJid?: SortOrder
    fromMe?: SortOrder
    messageType?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    hasMedia?: SortOrder
    mediaUrl?: SortOrderInput | SortOrder
    caption?: SortOrderInput | SortOrder
    mimeType?: SortOrderInput | SortOrder
    fileName?: SortOrderInput | SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrderInput | SortOrder
    metadata?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MessageCountOrderByAggregateInput
    _max?: MessageMaxOrderByAggregateInput
    _min?: MessageMinOrderByAggregateInput
  }

  export type MessageScalarWhereWithAggregatesInput = {
    AND?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    OR?: MessageScalarWhereWithAggregatesInput[]
    NOT?: MessageScalarWhereWithAggregatesInput | MessageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Message"> | string
    instanceId?: StringWithAggregatesFilter<"Message"> | string
    remoteJid?: StringWithAggregatesFilter<"Message"> | string
    fromMe?: BoolWithAggregatesFilter<"Message"> | boolean
    messageType?: StringWithAggregatesFilter<"Message"> | string
    content?: StringWithAggregatesFilter<"Message"> | string
    messageId?: StringWithAggregatesFilter<"Message"> | string
    hasMedia?: BoolWithAggregatesFilter<"Message"> | boolean
    mediaUrl?: StringNullableWithAggregatesFilter<"Message"> | string | null
    caption?: StringNullableWithAggregatesFilter<"Message"> | string | null
    mimeType?: StringNullableWithAggregatesFilter<"Message"> | string | null
    fileName?: StringNullableWithAggregatesFilter<"Message"> | string | null
    status?: StringWithAggregatesFilter<"Message"> | string
    statusUpdatedAt?: DateTimeNullableWithAggregatesFilter<"Message"> | Date | string | null
    metadata?: StringNullableWithAggregatesFilter<"Message"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Message"> | Date | string
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    id?: StringFilter<"Contact"> | string
    instanceId?: StringFilter<"Contact"> | string
    name?: StringNullableFilter<"Contact"> | string | null
    number?: StringFilter<"Contact"> | string
    remoteJid?: StringFilter<"Contact"> | string
    pushName?: StringNullableFilter<"Contact"> | string | null
    isGroup?: BoolFilter<"Contact"> | boolean
    profilePicture?: StringNullableFilter<"Contact"> | string | null
    about?: StringNullableFilter<"Contact"> | string | null
    lastActivity?: DateTimeNullableFilter<"Contact"> | Date | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type ContactOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    name?: SortOrderInput | SortOrder
    number?: SortOrder
    remoteJid?: SortOrder
    pushName?: SortOrderInput | SortOrder
    isGroup?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instanceId_remoteJid?: ContactInstanceIdRemoteJidCompoundUniqueInput
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    instanceId?: StringFilter<"Contact"> | string
    name?: StringNullableFilter<"Contact"> | string | null
    number?: StringFilter<"Contact"> | string
    remoteJid?: StringFilter<"Contact"> | string
    pushName?: StringNullableFilter<"Contact"> | string | null
    isGroup?: BoolFilter<"Contact"> | boolean
    profilePicture?: StringNullableFilter<"Contact"> | string | null
    about?: StringNullableFilter<"Contact"> | string | null
    lastActivity?: DateTimeNullableFilter<"Contact"> | Date | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id" | "instanceId_remoteJid">

  export type ContactOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    name?: SortOrderInput | SortOrder
    number?: SortOrder
    remoteJid?: SortOrder
    pushName?: SortOrderInput | SortOrder
    isGroup?: SortOrder
    profilePicture?: SortOrderInput | SortOrder
    about?: SortOrderInput | SortOrder
    lastActivity?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ContactCountOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Contact"> | string
    instanceId?: StringWithAggregatesFilter<"Contact"> | string
    name?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    number?: StringWithAggregatesFilter<"Contact"> | string
    remoteJid?: StringWithAggregatesFilter<"Contact"> | string
    pushName?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    isGroup?: BoolWithAggregatesFilter<"Contact"> | boolean
    profilePicture?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    about?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    lastActivity?: DateTimeNullableWithAggregatesFilter<"Contact"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
  }

  export type ActivityLogWhereInput = {
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    instanceId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type ActivityLogOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type ActivityLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityLogWhereInput | ActivityLogWhereInput[]
    OR?: ActivityLogWhereInput[]
    NOT?: ActivityLogWhereInput | ActivityLogWhereInput[]
    instanceId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id">

  export type ActivityLogOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    action?: SortOrder
    details?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: ActivityLogCountOrderByAggregateInput
    _max?: ActivityLogMaxOrderByAggregateInput
    _min?: ActivityLogMinOrderByAggregateInput
  }

  export type ActivityLogScalarWhereWithAggregatesInput = {
    AND?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    OR?: ActivityLogScalarWhereWithAggregatesInput[]
    NOT?: ActivityLogScalarWhereWithAggregatesInput | ActivityLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ActivityLog"> | string
    instanceId?: StringWithAggregatesFilter<"ActivityLog"> | string
    action?: StringWithAggregatesFilter<"ActivityLog"> | string
    details?: StringNullableWithAggregatesFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"ActivityLog"> | Date | string
  }

  export type WebhookLogWhereInput = {
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    id?: StringFilter<"WebhookLog"> | string
    instanceId?: StringFilter<"WebhookLog"> | string
    webhookUrl?: StringFilter<"WebhookLog"> | string
    payload?: StringFilter<"WebhookLog"> | string
    response?: StringNullableFilter<"WebhookLog"> | string | null
    statusCode?: IntNullableFilter<"WebhookLog"> | number | null
    success?: BoolFilter<"WebhookLog"> | boolean
    attempt?: IntFilter<"WebhookLog"> | number
    errorMessage?: StringNullableFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookLog"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type WebhookLogOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    webhookUrl?: SortOrder
    payload?: SortOrder
    response?: SortOrderInput | SortOrder
    statusCode?: SortOrderInput | SortOrder
    success?: SortOrder
    attempt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type WebhookLogWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: WebhookLogWhereInput | WebhookLogWhereInput[]
    OR?: WebhookLogWhereInput[]
    NOT?: WebhookLogWhereInput | WebhookLogWhereInput[]
    instanceId?: StringFilter<"WebhookLog"> | string
    webhookUrl?: StringFilter<"WebhookLog"> | string
    payload?: StringFilter<"WebhookLog"> | string
    response?: StringNullableFilter<"WebhookLog"> | string | null
    statusCode?: IntNullableFilter<"WebhookLog"> | number | null
    success?: BoolFilter<"WebhookLog"> | boolean
    attempt?: IntFilter<"WebhookLog"> | number
    errorMessage?: StringNullableFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookLog"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id">

  export type WebhookLogOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    webhookUrl?: SortOrder
    payload?: SortOrder
    response?: SortOrderInput | SortOrder
    statusCode?: SortOrderInput | SortOrder
    success?: SortOrder
    attempt?: SortOrder
    errorMessage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: WebhookLogCountOrderByAggregateInput
    _avg?: WebhookLogAvgOrderByAggregateInput
    _max?: WebhookLogMaxOrderByAggregateInput
    _min?: WebhookLogMinOrderByAggregateInput
    _sum?: WebhookLogSumOrderByAggregateInput
  }

  export type WebhookLogScalarWhereWithAggregatesInput = {
    AND?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    OR?: WebhookLogScalarWhereWithAggregatesInput[]
    NOT?: WebhookLogScalarWhereWithAggregatesInput | WebhookLogScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WebhookLog"> | string
    instanceId?: StringWithAggregatesFilter<"WebhookLog"> | string
    webhookUrl?: StringWithAggregatesFilter<"WebhookLog"> | string
    payload?: StringWithAggregatesFilter<"WebhookLog"> | string
    response?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    statusCode?: IntNullableWithAggregatesFilter<"WebhookLog"> | number | null
    success?: BoolWithAggregatesFilter<"WebhookLog"> | boolean
    attempt?: IntWithAggregatesFilter<"WebhookLog"> | number
    errorMessage?: StringNullableWithAggregatesFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"WebhookLog"> | Date | string
  }

  export type InstanceUsageWhereInput = {
    AND?: InstanceUsageWhereInput | InstanceUsageWhereInput[]
    OR?: InstanceUsageWhereInput[]
    NOT?: InstanceUsageWhereInput | InstanceUsageWhereInput[]
    id?: StringFilter<"InstanceUsage"> | string
    instanceId?: StringFilter<"InstanceUsage"> | string
    date?: DateTimeFilter<"InstanceUsage"> | Date | string
    messagesSent?: IntFilter<"InstanceUsage"> | number
    messagesReceived?: IntFilter<"InstanceUsage"> | number
    mediaSent?: IntFilter<"InstanceUsage"> | number
    mediaReceived?: IntFilter<"InstanceUsage"> | number
    totalMediaSize?: IntFilter<"InstanceUsage"> | number
    apiCalls?: IntFilter<"InstanceUsage"> | number
    webhookSent?: IntFilter<"InstanceUsage"> | number
    memoryUsage?: IntNullableFilter<"InstanceUsage"> | number | null
    cpuUsage?: FloatNullableFilter<"InstanceUsage"> | number | null
    createdAt?: DateTimeFilter<"InstanceUsage"> | Date | string
    updatedAt?: DateTimeFilter<"InstanceUsage"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }

  export type InstanceUsageOrderByWithRelationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    date?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrderInput | SortOrder
    cpuUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    instance?: InstanceOrderByWithRelationInput
  }

  export type InstanceUsageWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    instance_usage_date?: InstanceUsageInstance_usage_dateCompoundUniqueInput
    AND?: InstanceUsageWhereInput | InstanceUsageWhereInput[]
    OR?: InstanceUsageWhereInput[]
    NOT?: InstanceUsageWhereInput | InstanceUsageWhereInput[]
    instanceId?: StringFilter<"InstanceUsage"> | string
    date?: DateTimeFilter<"InstanceUsage"> | Date | string
    messagesSent?: IntFilter<"InstanceUsage"> | number
    messagesReceived?: IntFilter<"InstanceUsage"> | number
    mediaSent?: IntFilter<"InstanceUsage"> | number
    mediaReceived?: IntFilter<"InstanceUsage"> | number
    totalMediaSize?: IntFilter<"InstanceUsage"> | number
    apiCalls?: IntFilter<"InstanceUsage"> | number
    webhookSent?: IntFilter<"InstanceUsage"> | number
    memoryUsage?: IntNullableFilter<"InstanceUsage"> | number | null
    cpuUsage?: FloatNullableFilter<"InstanceUsage"> | number | null
    createdAt?: DateTimeFilter<"InstanceUsage"> | Date | string
    updatedAt?: DateTimeFilter<"InstanceUsage"> | Date | string
    instance?: XOR<InstanceScalarRelationFilter, InstanceWhereInput>
  }, "id" | "instance_usage_date">

  export type InstanceUsageOrderByWithAggregationInput = {
    id?: SortOrder
    instanceId?: SortOrder
    date?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrderInput | SortOrder
    cpuUsage?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: InstanceUsageCountOrderByAggregateInput
    _avg?: InstanceUsageAvgOrderByAggregateInput
    _max?: InstanceUsageMaxOrderByAggregateInput
    _min?: InstanceUsageMinOrderByAggregateInput
    _sum?: InstanceUsageSumOrderByAggregateInput
  }

  export type InstanceUsageScalarWhereWithAggregatesInput = {
    AND?: InstanceUsageScalarWhereWithAggregatesInput | InstanceUsageScalarWhereWithAggregatesInput[]
    OR?: InstanceUsageScalarWhereWithAggregatesInput[]
    NOT?: InstanceUsageScalarWhereWithAggregatesInput | InstanceUsageScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"InstanceUsage"> | string
    instanceId?: StringWithAggregatesFilter<"InstanceUsage"> | string
    date?: DateTimeWithAggregatesFilter<"InstanceUsage"> | Date | string
    messagesSent?: IntWithAggregatesFilter<"InstanceUsage"> | number
    messagesReceived?: IntWithAggregatesFilter<"InstanceUsage"> | number
    mediaSent?: IntWithAggregatesFilter<"InstanceUsage"> | number
    mediaReceived?: IntWithAggregatesFilter<"InstanceUsage"> | number
    totalMediaSize?: IntWithAggregatesFilter<"InstanceUsage"> | number
    apiCalls?: IntWithAggregatesFilter<"InstanceUsage"> | number
    webhookSent?: IntWithAggregatesFilter<"InstanceUsage"> | number
    memoryUsage?: IntNullableWithAggregatesFilter<"InstanceUsage"> | number | null
    cpuUsage?: FloatNullableWithAggregatesFilter<"InstanceUsage"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"InstanceUsage"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"InstanceUsage"> | Date | string
  }

  export type UsageLimitWhereInput = {
    AND?: UsageLimitWhereInput | UsageLimitWhereInput[]
    OR?: UsageLimitWhereInput[]
    NOT?: UsageLimitWhereInput | UsageLimitWhereInput[]
    id?: StringFilter<"UsageLimit"> | string
    userId?: StringNullableFilter<"UsageLimit"> | string | null
    instanceId?: StringNullableFilter<"UsageLimit"> | string | null
    isDefault?: BoolFilter<"UsageLimit"> | boolean
    maxMessagesSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMessagesReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSize?: IntNullableFilter<"UsageLimit"> | number | null
    maxApiCalls?: IntNullableFilter<"UsageLimit"> | number | null
    maxWebhookCalls?: IntNullableFilter<"UsageLimit"> | number | null
    timeWindowHours?: IntFilter<"UsageLimit"> | number
    createdAt?: DateTimeFilter<"UsageLimit"> | Date | string
    updatedAt?: DateTimeFilter<"UsageLimit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    instance?: XOR<InstanceNullableScalarRelationFilter, InstanceWhereInput> | null
  }

  export type UsageLimitOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    instanceId?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    maxMessagesSent?: SortOrderInput | SortOrder
    maxMessagesReceived?: SortOrderInput | SortOrder
    maxMediaSent?: SortOrderInput | SortOrder
    maxMediaReceived?: SortOrderInput | SortOrder
    maxMediaSize?: SortOrderInput | SortOrder
    maxApiCalls?: SortOrderInput | SortOrder
    maxWebhookCalls?: SortOrderInput | SortOrder
    timeWindowHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    instance?: InstanceOrderByWithRelationInput
  }

  export type UsageLimitWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UsageLimitWhereInput | UsageLimitWhereInput[]
    OR?: UsageLimitWhereInput[]
    NOT?: UsageLimitWhereInput | UsageLimitWhereInput[]
    userId?: StringNullableFilter<"UsageLimit"> | string | null
    instanceId?: StringNullableFilter<"UsageLimit"> | string | null
    isDefault?: BoolFilter<"UsageLimit"> | boolean
    maxMessagesSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMessagesReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSize?: IntNullableFilter<"UsageLimit"> | number | null
    maxApiCalls?: IntNullableFilter<"UsageLimit"> | number | null
    maxWebhookCalls?: IntNullableFilter<"UsageLimit"> | number | null
    timeWindowHours?: IntFilter<"UsageLimit"> | number
    createdAt?: DateTimeFilter<"UsageLimit"> | Date | string
    updatedAt?: DateTimeFilter<"UsageLimit"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    instance?: XOR<InstanceNullableScalarRelationFilter, InstanceWhereInput> | null
  }, "id">

  export type UsageLimitOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrderInput | SortOrder
    instanceId?: SortOrderInput | SortOrder
    isDefault?: SortOrder
    maxMessagesSent?: SortOrderInput | SortOrder
    maxMessagesReceived?: SortOrderInput | SortOrder
    maxMediaSent?: SortOrderInput | SortOrder
    maxMediaReceived?: SortOrderInput | SortOrder
    maxMediaSize?: SortOrderInput | SortOrder
    maxApiCalls?: SortOrderInput | SortOrder
    maxWebhookCalls?: SortOrderInput | SortOrder
    timeWindowHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UsageLimitCountOrderByAggregateInput
    _avg?: UsageLimitAvgOrderByAggregateInput
    _max?: UsageLimitMaxOrderByAggregateInput
    _min?: UsageLimitMinOrderByAggregateInput
    _sum?: UsageLimitSumOrderByAggregateInput
  }

  export type UsageLimitScalarWhereWithAggregatesInput = {
    AND?: UsageLimitScalarWhereWithAggregatesInput | UsageLimitScalarWhereWithAggregatesInput[]
    OR?: UsageLimitScalarWhereWithAggregatesInput[]
    NOT?: UsageLimitScalarWhereWithAggregatesInput | UsageLimitScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UsageLimit"> | string
    userId?: StringNullableWithAggregatesFilter<"UsageLimit"> | string | null
    instanceId?: StringNullableWithAggregatesFilter<"UsageLimit"> | string | null
    isDefault?: BoolWithAggregatesFilter<"UsageLimit"> | boolean
    maxMessagesSent?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxMessagesReceived?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxMediaSent?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxMediaReceived?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxMediaSize?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxApiCalls?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    maxWebhookCalls?: IntNullableWithAggregatesFilter<"UsageLimit"> | number | null
    timeWindowHours?: IntWithAggregatesFilter<"UsageLimit"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UsageLimit"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UsageLimit"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instances?: InstanceCreateNestedManyWithoutUserInput
    usageLimits?: UsageLimitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instances?: InstanceUncheckedCreateNestedManyWithoutUserInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instances?: InstanceUpdateManyWithoutUserNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instances?: InstanceUncheckedUpdateManyWithoutUserNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceCreateInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateManyInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookSettingsCreateInput = {
    id?: string
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: number
    retryInterval?: number
    secret?: string | null
    headers?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    instance: InstanceCreateNestedOneWithoutWebhookSettingsInput
  }

  export type WebhookSettingsUncheckedCreateInput = {
    id?: string
    instanceId: string
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: number
    retryInterval?: number
    secret?: string | null
    headers?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookSettingsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutWebhookSettingsNestedInput
  }

  export type WebhookSettingsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookSettingsCreateManyInput = {
    id?: string
    instanceId: string
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: number
    retryInterval?: number
    secret?: string | null
    headers?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookSettingsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookSettingsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateInput = {
    id?: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    instance: InstanceCreateNestedOneWithoutMessagesInput
  }

  export type MessageUncheckedCreateInput = {
    id?: string
    instanceId: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutMessagesNestedInput
  }

  export type MessageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInput = {
    id?: string
    instanceId: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateInput = {
    id?: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    instance: InstanceCreateNestedOneWithoutContactInput
  }

  export type ContactUncheckedCreateInput = {
    id?: string
    instanceId: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactCreateManyInput = {
    id?: string
    instanceId: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateInput = {
    id?: string
    action: string
    details?: string | null
    createdAt?: Date | string
    instance: InstanceCreateNestedOneWithoutActivityLogsInput
  }

  export type ActivityLogUncheckedCreateInput = {
    id?: string
    instanceId: string
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutActivityLogsNestedInput
  }

  export type ActivityLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogCreateManyInput = {
    id?: string
    instanceId: string
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogCreateInput = {
    id?: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
    instance: InstanceCreateNestedOneWithoutWebhookLogsInput
  }

  export type WebhookLogUncheckedCreateInput = {
    id?: string
    instanceId: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type WebhookLogUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutWebhookLogsNestedInput
  }

  export type WebhookLogUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogCreateManyInput = {
    id?: string
    instanceId: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type WebhookLogUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageCreateInput = {
    id?: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
    instance: InstanceCreateNestedOneWithoutInstanceUsageInput
  }

  export type InstanceUsageUncheckedCreateInput = {
    id?: string
    instanceId: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUsageUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneRequiredWithoutInstanceUsageNestedInput
  }

  export type InstanceUsageUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageCreateManyInput = {
    id?: string
    instanceId: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUsageUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitCreateInput = {
    id?: string
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutUsageLimitsInput
    instance?: InstanceCreateNestedOneWithoutUsageLimitsInput
  }

  export type UsageLimitUncheckedCreateInput = {
    id?: string
    userId?: string | null
    instanceId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutUsageLimitsNestedInput
    instance?: InstanceUpdateOneWithoutUsageLimitsNestedInput
  }

  export type UsageLimitUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    instanceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitCreateManyInput = {
    id?: string
    userId?: string | null
    instanceId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    instanceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type InstanceListRelationFilter = {
    every?: InstanceWhereInput
    some?: InstanceWhereInput
    none?: InstanceWhereInput
  }

  export type UsageLimitListRelationFilter = {
    every?: UsageLimitWhereInput
    some?: UsageLimitWhereInput
    none?: UsageLimitWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type InstanceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsageLimitOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    apiKey?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    apiKey?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    apiKey?: SortOrder
    isAdmin?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WebhookSettingsNullableScalarRelationFilter = {
    is?: WebhookSettingsWhereInput | null
    isNot?: WebhookSettingsWhereInput | null
  }

  export type MessageListRelationFilter = {
    every?: MessageWhereInput
    some?: MessageWhereInput
    none?: MessageWhereInput
  }

  export type ActivityLogListRelationFilter = {
    every?: ActivityLogWhereInput
    some?: ActivityLogWhereInput
    none?: ActivityLogWhereInput
  }

  export type WebhookLogListRelationFilter = {
    every?: WebhookLogWhereInput
    some?: WebhookLogWhereInput
    none?: WebhookLogWhereInput
  }

  export type InstanceUsageListRelationFilter = {
    every?: InstanceUsageWhereInput
    some?: InstanceUsageWhereInput
    none?: InstanceUsageWhereInput
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type MessageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ActivityLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WebhookLogOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstanceUsageOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InstanceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    qrCode?: SortOrder
    webhookUrl?: SortOrder
    webhookEnabled?: SortOrder
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
    credentials?: SortOrder
    lastActivity?: SortOrder
    authCreatedAt?: SortOrder
    authExpiresAt?: SortOrder
    authRefreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceAvgOrderByAggregateInput = {
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
  }

  export type InstanceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    qrCode?: SortOrder
    webhookUrl?: SortOrder
    webhookEnabled?: SortOrder
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
    credentials?: SortOrder
    lastActivity?: SortOrder
    authCreatedAt?: SortOrder
    authExpiresAt?: SortOrder
    authRefreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    qrCode?: SortOrder
    webhookUrl?: SortOrder
    webhookEnabled?: SortOrder
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
    credentials?: SortOrder
    lastActivity?: SortOrder
    authCreatedAt?: SortOrder
    authExpiresAt?: SortOrder
    authRefreshToken?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceSumOrderByAggregateInput = {
    sentMessages?: SortOrder
    receivedMessages?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type InstanceScalarRelationFilter = {
    is?: InstanceWhereInput
    isNot?: InstanceWhereInput
  }

  export type WebhookSettingsCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    notifyReceived?: SortOrder
    notifySent?: SortOrder
    notifyDelivery?: SortOrder
    notifyRead?: SortOrder
    maxRetries?: SortOrder
    retryInterval?: SortOrder
    secret?: SortOrder
    headers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookSettingsAvgOrderByAggregateInput = {
    maxRetries?: SortOrder
    retryInterval?: SortOrder
  }

  export type WebhookSettingsMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    notifyReceived?: SortOrder
    notifySent?: SortOrder
    notifyDelivery?: SortOrder
    notifyRead?: SortOrder
    maxRetries?: SortOrder
    retryInterval?: SortOrder
    secret?: SortOrder
    headers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookSettingsMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    notifyReceived?: SortOrder
    notifySent?: SortOrder
    notifyDelivery?: SortOrder
    notifyRead?: SortOrder
    maxRetries?: SortOrder
    retryInterval?: SortOrder
    secret?: SortOrder
    headers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WebhookSettingsSumOrderByAggregateInput = {
    maxRetries?: SortOrder
    retryInterval?: SortOrder
  }

  export type MessageCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    remoteJid?: SortOrder
    fromMe?: SortOrder
    messageType?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    hasMedia?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    mimeType?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    remoteJid?: SortOrder
    fromMe?: SortOrder
    messageType?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    hasMedia?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    mimeType?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MessageMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    remoteJid?: SortOrder
    fromMe?: SortOrder
    messageType?: SortOrder
    content?: SortOrder
    messageId?: SortOrder
    hasMedia?: SortOrder
    mediaUrl?: SortOrder
    caption?: SortOrder
    mimeType?: SortOrder
    fileName?: SortOrder
    status?: SortOrder
    statusUpdatedAt?: SortOrder
    metadata?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactInstanceIdRemoteJidCompoundUniqueInput = {
    instanceId: string
    remoteJid: string
  }

  export type ContactCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    remoteJid?: SortOrder
    pushName?: SortOrder
    isGroup?: SortOrder
    profilePicture?: SortOrder
    about?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    remoteJid?: SortOrder
    pushName?: SortOrder
    isGroup?: SortOrder
    profilePicture?: SortOrder
    about?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    name?: SortOrder
    number?: SortOrder
    remoteJid?: SortOrder
    pushName?: SortOrder
    isGroup?: SortOrder
    profilePicture?: SortOrder
    about?: SortOrder
    lastActivity?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityLogCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type ActivityLogMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    action?: SortOrder
    details?: SortOrder
    createdAt?: SortOrder
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type WebhookLogCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    webhookUrl?: SortOrder
    payload?: SortOrder
    response?: SortOrder
    statusCode?: SortOrder
    success?: SortOrder
    attempt?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookLogAvgOrderByAggregateInput = {
    statusCode?: SortOrder
    attempt?: SortOrder
  }

  export type WebhookLogMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    webhookUrl?: SortOrder
    payload?: SortOrder
    response?: SortOrder
    statusCode?: SortOrder
    success?: SortOrder
    attempt?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookLogMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    webhookUrl?: SortOrder
    payload?: SortOrder
    response?: SortOrder
    statusCode?: SortOrder
    success?: SortOrder
    attempt?: SortOrder
    errorMessage?: SortOrder
    createdAt?: SortOrder
  }

  export type WebhookLogSumOrderByAggregateInput = {
    statusCode?: SortOrder
    attempt?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type InstanceUsageInstance_usage_dateCompoundUniqueInput = {
    instanceId: string
    date: Date | string
  }

  export type InstanceUsageCountOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    date?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrder
    cpuUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceUsageAvgOrderByAggregateInput = {
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrder
    cpuUsage?: SortOrder
  }

  export type InstanceUsageMaxOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    date?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrder
    cpuUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceUsageMinOrderByAggregateInput = {
    id?: SortOrder
    instanceId?: SortOrder
    date?: SortOrder
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrder
    cpuUsage?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type InstanceUsageSumOrderByAggregateInput = {
    messagesSent?: SortOrder
    messagesReceived?: SortOrder
    mediaSent?: SortOrder
    mediaReceived?: SortOrder
    totalMediaSize?: SortOrder
    apiCalls?: SortOrder
    webhookSent?: SortOrder
    memoryUsage?: SortOrder
    cpuUsage?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type InstanceNullableScalarRelationFilter = {
    is?: InstanceWhereInput | null
    isNot?: InstanceWhereInput | null
  }

  export type UsageLimitCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    instanceId?: SortOrder
    isDefault?: SortOrder
    maxMessagesSent?: SortOrder
    maxMessagesReceived?: SortOrder
    maxMediaSent?: SortOrder
    maxMediaReceived?: SortOrder
    maxMediaSize?: SortOrder
    maxApiCalls?: SortOrder
    maxWebhookCalls?: SortOrder
    timeWindowHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageLimitAvgOrderByAggregateInput = {
    maxMessagesSent?: SortOrder
    maxMessagesReceived?: SortOrder
    maxMediaSent?: SortOrder
    maxMediaReceived?: SortOrder
    maxMediaSize?: SortOrder
    maxApiCalls?: SortOrder
    maxWebhookCalls?: SortOrder
    timeWindowHours?: SortOrder
  }

  export type UsageLimitMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    instanceId?: SortOrder
    isDefault?: SortOrder
    maxMessagesSent?: SortOrder
    maxMessagesReceived?: SortOrder
    maxMediaSent?: SortOrder
    maxMediaReceived?: SortOrder
    maxMediaSize?: SortOrder
    maxApiCalls?: SortOrder
    maxWebhookCalls?: SortOrder
    timeWindowHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageLimitMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    instanceId?: SortOrder
    isDefault?: SortOrder
    maxMessagesSent?: SortOrder
    maxMessagesReceived?: SortOrder
    maxMediaSent?: SortOrder
    maxMediaReceived?: SortOrder
    maxMediaSize?: SortOrder
    maxApiCalls?: SortOrder
    maxWebhookCalls?: SortOrder
    timeWindowHours?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UsageLimitSumOrderByAggregateInput = {
    maxMessagesSent?: SortOrder
    maxMessagesReceived?: SortOrder
    maxMediaSent?: SortOrder
    maxMediaReceived?: SortOrder
    maxMediaSize?: SortOrder
    maxApiCalls?: SortOrder
    maxWebhookCalls?: SortOrder
    timeWindowHours?: SortOrder
  }

  export type InstanceCreateNestedManyWithoutUserInput = {
    create?: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput> | InstanceCreateWithoutUserInput[] | InstanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InstanceCreateOrConnectWithoutUserInput | InstanceCreateOrConnectWithoutUserInput[]
    createMany?: InstanceCreateManyUserInputEnvelope
    connect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
  }

  export type UsageLimitCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput> | UsageLimitCreateWithoutUserInput[] | UsageLimitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutUserInput | UsageLimitCreateOrConnectWithoutUserInput[]
    createMany?: UsageLimitCreateManyUserInputEnvelope
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
  }

  export type InstanceUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput> | InstanceCreateWithoutUserInput[] | InstanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InstanceCreateOrConnectWithoutUserInput | InstanceCreateOrConnectWithoutUserInput[]
    createMany?: InstanceCreateManyUserInputEnvelope
    connect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
  }

  export type UsageLimitUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput> | UsageLimitCreateWithoutUserInput[] | UsageLimitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutUserInput | UsageLimitCreateOrConnectWithoutUserInput[]
    createMany?: UsageLimitCreateManyUserInputEnvelope
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type InstanceUpdateManyWithoutUserNestedInput = {
    create?: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput> | InstanceCreateWithoutUserInput[] | InstanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InstanceCreateOrConnectWithoutUserInput | InstanceCreateOrConnectWithoutUserInput[]
    upsert?: InstanceUpsertWithWhereUniqueWithoutUserInput | InstanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InstanceCreateManyUserInputEnvelope
    set?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    disconnect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    delete?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    connect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    update?: InstanceUpdateWithWhereUniqueWithoutUserInput | InstanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InstanceUpdateManyWithWhereWithoutUserInput | InstanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InstanceScalarWhereInput | InstanceScalarWhereInput[]
  }

  export type UsageLimitUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput> | UsageLimitCreateWithoutUserInput[] | UsageLimitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutUserInput | UsageLimitCreateOrConnectWithoutUserInput[]
    upsert?: UsageLimitUpsertWithWhereUniqueWithoutUserInput | UsageLimitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLimitCreateManyUserInputEnvelope
    set?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    disconnect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    delete?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    update?: UsageLimitUpdateWithWhereUniqueWithoutUserInput | UsageLimitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLimitUpdateManyWithWhereWithoutUserInput | UsageLimitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
  }

  export type InstanceUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput> | InstanceCreateWithoutUserInput[] | InstanceUncheckedCreateWithoutUserInput[]
    connectOrCreate?: InstanceCreateOrConnectWithoutUserInput | InstanceCreateOrConnectWithoutUserInput[]
    upsert?: InstanceUpsertWithWhereUniqueWithoutUserInput | InstanceUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: InstanceCreateManyUserInputEnvelope
    set?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    disconnect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    delete?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    connect?: InstanceWhereUniqueInput | InstanceWhereUniqueInput[]
    update?: InstanceUpdateWithWhereUniqueWithoutUserInput | InstanceUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: InstanceUpdateManyWithWhereWithoutUserInput | InstanceUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: InstanceScalarWhereInput | InstanceScalarWhereInput[]
  }

  export type UsageLimitUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput> | UsageLimitCreateWithoutUserInput[] | UsageLimitUncheckedCreateWithoutUserInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutUserInput | UsageLimitCreateOrConnectWithoutUserInput[]
    upsert?: UsageLimitUpsertWithWhereUniqueWithoutUserInput | UsageLimitUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: UsageLimitCreateManyUserInputEnvelope
    set?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    disconnect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    delete?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    update?: UsageLimitUpdateWithWhereUniqueWithoutUserInput | UsageLimitUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: UsageLimitUpdateManyWithWhereWithoutUserInput | UsageLimitUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutInstancesInput = {
    create?: XOR<UserCreateWithoutInstancesInput, UserUncheckedCreateWithoutInstancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstancesInput
    connect?: UserWhereUniqueInput
  }

  export type WebhookSettingsCreateNestedOneWithoutInstanceInput = {
    create?: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: WebhookSettingsCreateOrConnectWithoutInstanceInput
    connect?: WebhookSettingsWhereUniqueInput
  }

  export type MessageCreateNestedManyWithoutInstanceInput = {
    create?: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput> | MessageCreateWithoutInstanceInput[] | MessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutInstanceInput | MessageCreateOrConnectWithoutInstanceInput[]
    createMany?: MessageCreateManyInstanceInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ActivityLogCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput> | ActivityLogCreateWithoutInstanceInput[] | ActivityLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutInstanceInput | ActivityLogCreateOrConnectWithoutInstanceInput[]
    createMany?: ActivityLogCreateManyInstanceInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type WebhookLogCreateNestedManyWithoutInstanceInput = {
    create?: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput> | WebhookLogCreateWithoutInstanceInput[] | WebhookLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutInstanceInput | WebhookLogCreateOrConnectWithoutInstanceInput[]
    createMany?: WebhookLogCreateManyInstanceInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type InstanceUsageCreateNestedManyWithoutInstanceInput = {
    create?: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput> | InstanceUsageCreateWithoutInstanceInput[] | InstanceUsageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: InstanceUsageCreateOrConnectWithoutInstanceInput | InstanceUsageCreateOrConnectWithoutInstanceInput[]
    createMany?: InstanceUsageCreateManyInstanceInputEnvelope
    connect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
  }

  export type UsageLimitCreateNestedManyWithoutInstanceInput = {
    create?: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput> | UsageLimitCreateWithoutInstanceInput[] | UsageLimitUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutInstanceInput | UsageLimitCreateOrConnectWithoutInstanceInput[]
    createMany?: UsageLimitCreateManyInstanceInputEnvelope
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
  }

  export type ContactCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput = {
    create?: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: WebhookSettingsCreateOrConnectWithoutInstanceInput
    connect?: WebhookSettingsWhereUniqueInput
  }

  export type MessageUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput> | MessageCreateWithoutInstanceInput[] | MessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutInstanceInput | MessageCreateOrConnectWithoutInstanceInput[]
    createMany?: MessageCreateManyInstanceInputEnvelope
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
  }

  export type ActivityLogUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput> | ActivityLogCreateWithoutInstanceInput[] | ActivityLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutInstanceInput | ActivityLogCreateOrConnectWithoutInstanceInput[]
    createMany?: ActivityLogCreateManyInstanceInputEnvelope
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
  }

  export type WebhookLogUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput> | WebhookLogCreateWithoutInstanceInput[] | WebhookLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutInstanceInput | WebhookLogCreateOrConnectWithoutInstanceInput[]
    createMany?: WebhookLogCreateManyInstanceInputEnvelope
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
  }

  export type InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput> | InstanceUsageCreateWithoutInstanceInput[] | InstanceUsageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: InstanceUsageCreateOrConnectWithoutInstanceInput | InstanceUsageCreateOrConnectWithoutInstanceInput[]
    createMany?: InstanceUsageCreateManyInstanceInputEnvelope
    connect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
  }

  export type UsageLimitUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput> | UsageLimitCreateWithoutInstanceInput[] | UsageLimitUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutInstanceInput | UsageLimitCreateOrConnectWithoutInstanceInput[]
    createMany?: UsageLimitCreateManyInstanceInputEnvelope
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutInstanceInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutInstancesNestedInput = {
    create?: XOR<UserCreateWithoutInstancesInput, UserUncheckedCreateWithoutInstancesInput>
    connectOrCreate?: UserCreateOrConnectWithoutInstancesInput
    upsert?: UserUpsertWithoutInstancesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutInstancesInput, UserUpdateWithoutInstancesInput>, UserUncheckedUpdateWithoutInstancesInput>
  }

  export type WebhookSettingsUpdateOneWithoutInstanceNestedInput = {
    create?: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: WebhookSettingsCreateOrConnectWithoutInstanceInput
    upsert?: WebhookSettingsUpsertWithoutInstanceInput
    disconnect?: WebhookSettingsWhereInput | boolean
    delete?: WebhookSettingsWhereInput | boolean
    connect?: WebhookSettingsWhereUniqueInput
    update?: XOR<XOR<WebhookSettingsUpdateToOneWithWhereWithoutInstanceInput, WebhookSettingsUpdateWithoutInstanceInput>, WebhookSettingsUncheckedUpdateWithoutInstanceInput>
  }

  export type MessageUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput> | MessageCreateWithoutInstanceInput[] | MessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutInstanceInput | MessageCreateOrConnectWithoutInstanceInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutInstanceInput | MessageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: MessageCreateManyInstanceInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutInstanceInput | MessageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutInstanceInput | MessageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ActivityLogUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput> | ActivityLogCreateWithoutInstanceInput[] | ActivityLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutInstanceInput | ActivityLogCreateOrConnectWithoutInstanceInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutInstanceInput | ActivityLogUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ActivityLogCreateManyInstanceInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutInstanceInput | ActivityLogUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutInstanceInput | ActivityLogUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type WebhookLogUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput> | WebhookLogCreateWithoutInstanceInput[] | WebhookLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutInstanceInput | WebhookLogCreateOrConnectWithoutInstanceInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutInstanceInput | WebhookLogUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: WebhookLogCreateManyInstanceInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutInstanceInput | WebhookLogUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutInstanceInput | WebhookLogUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type InstanceUsageUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput> | InstanceUsageCreateWithoutInstanceInput[] | InstanceUsageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: InstanceUsageCreateOrConnectWithoutInstanceInput | InstanceUsageCreateOrConnectWithoutInstanceInput[]
    upsert?: InstanceUsageUpsertWithWhereUniqueWithoutInstanceInput | InstanceUsageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: InstanceUsageCreateManyInstanceInputEnvelope
    set?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    disconnect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    delete?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    connect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    update?: InstanceUsageUpdateWithWhereUniqueWithoutInstanceInput | InstanceUsageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: InstanceUsageUpdateManyWithWhereWithoutInstanceInput | InstanceUsageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: InstanceUsageScalarWhereInput | InstanceUsageScalarWhereInput[]
  }

  export type UsageLimitUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput> | UsageLimitCreateWithoutInstanceInput[] | UsageLimitUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutInstanceInput | UsageLimitCreateOrConnectWithoutInstanceInput[]
    upsert?: UsageLimitUpsertWithWhereUniqueWithoutInstanceInput | UsageLimitUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: UsageLimitCreateManyInstanceInputEnvelope
    set?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    disconnect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    delete?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    update?: UsageLimitUpdateWithWhereUniqueWithoutInstanceInput | UsageLimitUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: UsageLimitUpdateManyWithWhereWithoutInstanceInput | UsageLimitUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
  }

  export type ContactUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutInstanceInput | ContactUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutInstanceInput | ContactUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutInstanceInput | ContactUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput = {
    create?: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
    connectOrCreate?: WebhookSettingsCreateOrConnectWithoutInstanceInput
    upsert?: WebhookSettingsUpsertWithoutInstanceInput
    disconnect?: WebhookSettingsWhereInput | boolean
    delete?: WebhookSettingsWhereInput | boolean
    connect?: WebhookSettingsWhereUniqueInput
    update?: XOR<XOR<WebhookSettingsUpdateToOneWithWhereWithoutInstanceInput, WebhookSettingsUpdateWithoutInstanceInput>, WebhookSettingsUncheckedUpdateWithoutInstanceInput>
  }

  export type MessageUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput> | MessageCreateWithoutInstanceInput[] | MessageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: MessageCreateOrConnectWithoutInstanceInput | MessageCreateOrConnectWithoutInstanceInput[]
    upsert?: MessageUpsertWithWhereUniqueWithoutInstanceInput | MessageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: MessageCreateManyInstanceInputEnvelope
    set?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    disconnect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    delete?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    connect?: MessageWhereUniqueInput | MessageWhereUniqueInput[]
    update?: MessageUpdateWithWhereUniqueWithoutInstanceInput | MessageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: MessageUpdateManyWithWhereWithoutInstanceInput | MessageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: MessageScalarWhereInput | MessageScalarWhereInput[]
  }

  export type ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput> | ActivityLogCreateWithoutInstanceInput[] | ActivityLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ActivityLogCreateOrConnectWithoutInstanceInput | ActivityLogCreateOrConnectWithoutInstanceInput[]
    upsert?: ActivityLogUpsertWithWhereUniqueWithoutInstanceInput | ActivityLogUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ActivityLogCreateManyInstanceInputEnvelope
    set?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    disconnect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    delete?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    connect?: ActivityLogWhereUniqueInput | ActivityLogWhereUniqueInput[]
    update?: ActivityLogUpdateWithWhereUniqueWithoutInstanceInput | ActivityLogUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ActivityLogUpdateManyWithWhereWithoutInstanceInput | ActivityLogUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
  }

  export type WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput> | WebhookLogCreateWithoutInstanceInput[] | WebhookLogUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: WebhookLogCreateOrConnectWithoutInstanceInput | WebhookLogCreateOrConnectWithoutInstanceInput[]
    upsert?: WebhookLogUpsertWithWhereUniqueWithoutInstanceInput | WebhookLogUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: WebhookLogCreateManyInstanceInputEnvelope
    set?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    disconnect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    delete?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    connect?: WebhookLogWhereUniqueInput | WebhookLogWhereUniqueInput[]
    update?: WebhookLogUpdateWithWhereUniqueWithoutInstanceInput | WebhookLogUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: WebhookLogUpdateManyWithWhereWithoutInstanceInput | WebhookLogUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
  }

  export type InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput> | InstanceUsageCreateWithoutInstanceInput[] | InstanceUsageUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: InstanceUsageCreateOrConnectWithoutInstanceInput | InstanceUsageCreateOrConnectWithoutInstanceInput[]
    upsert?: InstanceUsageUpsertWithWhereUniqueWithoutInstanceInput | InstanceUsageUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: InstanceUsageCreateManyInstanceInputEnvelope
    set?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    disconnect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    delete?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    connect?: InstanceUsageWhereUniqueInput | InstanceUsageWhereUniqueInput[]
    update?: InstanceUsageUpdateWithWhereUniqueWithoutInstanceInput | InstanceUsageUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: InstanceUsageUpdateManyWithWhereWithoutInstanceInput | InstanceUsageUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: InstanceUsageScalarWhereInput | InstanceUsageScalarWhereInput[]
  }

  export type UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput> | UsageLimitCreateWithoutInstanceInput[] | UsageLimitUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: UsageLimitCreateOrConnectWithoutInstanceInput | UsageLimitCreateOrConnectWithoutInstanceInput[]
    upsert?: UsageLimitUpsertWithWhereUniqueWithoutInstanceInput | UsageLimitUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: UsageLimitCreateManyInstanceInputEnvelope
    set?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    disconnect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    delete?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    connect?: UsageLimitWhereUniqueInput | UsageLimitWhereUniqueInput[]
    update?: UsageLimitUpdateWithWhereUniqueWithoutInstanceInput | UsageLimitUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: UsageLimitUpdateManyWithWhereWithoutInstanceInput | UsageLimitUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutInstanceNestedInput = {
    create?: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput> | ContactCreateWithoutInstanceInput[] | ContactUncheckedCreateWithoutInstanceInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutInstanceInput | ContactCreateOrConnectWithoutInstanceInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutInstanceInput | ContactUpsertWithWhereUniqueWithoutInstanceInput[]
    createMany?: ContactCreateManyInstanceInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutInstanceInput | ContactUpdateWithWhereUniqueWithoutInstanceInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutInstanceInput | ContactUpdateManyWithWhereWithoutInstanceInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type InstanceCreateNestedOneWithoutWebhookSettingsInput = {
    create?: XOR<InstanceCreateWithoutWebhookSettingsInput, InstanceUncheckedCreateWithoutWebhookSettingsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutWebhookSettingsInput
    connect?: InstanceWhereUniqueInput
  }

  export type InstanceUpdateOneRequiredWithoutWebhookSettingsNestedInput = {
    create?: XOR<InstanceCreateWithoutWebhookSettingsInput, InstanceUncheckedCreateWithoutWebhookSettingsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutWebhookSettingsInput
    upsert?: InstanceUpsertWithoutWebhookSettingsInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutWebhookSettingsInput, InstanceUpdateWithoutWebhookSettingsInput>, InstanceUncheckedUpdateWithoutWebhookSettingsInput>
  }

  export type InstanceCreateNestedOneWithoutMessagesInput = {
    create?: XOR<InstanceCreateWithoutMessagesInput, InstanceUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutMessagesInput
    connect?: InstanceWhereUniqueInput
  }

  export type InstanceUpdateOneRequiredWithoutMessagesNestedInput = {
    create?: XOR<InstanceCreateWithoutMessagesInput, InstanceUncheckedCreateWithoutMessagesInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutMessagesInput
    upsert?: InstanceUpsertWithoutMessagesInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutMessagesInput, InstanceUpdateWithoutMessagesInput>, InstanceUncheckedUpdateWithoutMessagesInput>
  }

  export type InstanceCreateNestedOneWithoutContactInput = {
    create?: XOR<InstanceCreateWithoutContactInput, InstanceUncheckedCreateWithoutContactInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutContactInput
    connect?: InstanceWhereUniqueInput
  }

  export type InstanceUpdateOneRequiredWithoutContactNestedInput = {
    create?: XOR<InstanceCreateWithoutContactInput, InstanceUncheckedCreateWithoutContactInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutContactInput
    upsert?: InstanceUpsertWithoutContactInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutContactInput, InstanceUpdateWithoutContactInput>, InstanceUncheckedUpdateWithoutContactInput>
  }

  export type InstanceCreateNestedOneWithoutActivityLogsInput = {
    create?: XOR<InstanceCreateWithoutActivityLogsInput, InstanceUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutActivityLogsInput
    connect?: InstanceWhereUniqueInput
  }

  export type InstanceUpdateOneRequiredWithoutActivityLogsNestedInput = {
    create?: XOR<InstanceCreateWithoutActivityLogsInput, InstanceUncheckedCreateWithoutActivityLogsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutActivityLogsInput
    upsert?: InstanceUpsertWithoutActivityLogsInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutActivityLogsInput, InstanceUpdateWithoutActivityLogsInput>, InstanceUncheckedUpdateWithoutActivityLogsInput>
  }

  export type InstanceCreateNestedOneWithoutWebhookLogsInput = {
    create?: XOR<InstanceCreateWithoutWebhookLogsInput, InstanceUncheckedCreateWithoutWebhookLogsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutWebhookLogsInput
    connect?: InstanceWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InstanceUpdateOneRequiredWithoutWebhookLogsNestedInput = {
    create?: XOR<InstanceCreateWithoutWebhookLogsInput, InstanceUncheckedCreateWithoutWebhookLogsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutWebhookLogsInput
    upsert?: InstanceUpsertWithoutWebhookLogsInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutWebhookLogsInput, InstanceUpdateWithoutWebhookLogsInput>, InstanceUncheckedUpdateWithoutWebhookLogsInput>
  }

  export type InstanceCreateNestedOneWithoutInstanceUsageInput = {
    create?: XOR<InstanceCreateWithoutInstanceUsageInput, InstanceUncheckedCreateWithoutInstanceUsageInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutInstanceUsageInput
    connect?: InstanceWhereUniqueInput
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type InstanceUpdateOneRequiredWithoutInstanceUsageNestedInput = {
    create?: XOR<InstanceCreateWithoutInstanceUsageInput, InstanceUncheckedCreateWithoutInstanceUsageInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutInstanceUsageInput
    upsert?: InstanceUpsertWithoutInstanceUsageInput
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutInstanceUsageInput, InstanceUpdateWithoutInstanceUsageInput>, InstanceUncheckedUpdateWithoutInstanceUsageInput>
  }

  export type UserCreateNestedOneWithoutUsageLimitsInput = {
    create?: XOR<UserCreateWithoutUsageLimitsInput, UserUncheckedCreateWithoutUsageLimitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageLimitsInput
    connect?: UserWhereUniqueInput
  }

  export type InstanceCreateNestedOneWithoutUsageLimitsInput = {
    create?: XOR<InstanceCreateWithoutUsageLimitsInput, InstanceUncheckedCreateWithoutUsageLimitsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutUsageLimitsInput
    connect?: InstanceWhereUniqueInput
  }

  export type UserUpdateOneWithoutUsageLimitsNestedInput = {
    create?: XOR<UserCreateWithoutUsageLimitsInput, UserUncheckedCreateWithoutUsageLimitsInput>
    connectOrCreate?: UserCreateOrConnectWithoutUsageLimitsInput
    upsert?: UserUpsertWithoutUsageLimitsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutUsageLimitsInput, UserUpdateWithoutUsageLimitsInput>, UserUncheckedUpdateWithoutUsageLimitsInput>
  }

  export type InstanceUpdateOneWithoutUsageLimitsNestedInput = {
    create?: XOR<InstanceCreateWithoutUsageLimitsInput, InstanceUncheckedCreateWithoutUsageLimitsInput>
    connectOrCreate?: InstanceCreateOrConnectWithoutUsageLimitsInput
    upsert?: InstanceUpsertWithoutUsageLimitsInput
    disconnect?: InstanceWhereInput | boolean
    delete?: InstanceWhereInput | boolean
    connect?: InstanceWhereUniqueInput
    update?: XOR<XOR<InstanceUpdateToOneWithWhereWithoutUsageLimitsInput, InstanceUpdateWithoutUsageLimitsInput>, InstanceUncheckedUpdateWithoutUsageLimitsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type InstanceCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutUserInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput>
  }

  export type InstanceCreateManyUserInputEnvelope = {
    data: InstanceCreateManyUserInput | InstanceCreateManyUserInput[]
  }

  export type UsageLimitCreateWithoutUserInput = {
    id?: string
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    instance?: InstanceCreateNestedOneWithoutUsageLimitsInput
  }

  export type UsageLimitUncheckedCreateWithoutUserInput = {
    id?: string
    instanceId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitCreateOrConnectWithoutUserInput = {
    where: UsageLimitWhereUniqueInput
    create: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput>
  }

  export type UsageLimitCreateManyUserInputEnvelope = {
    data: UsageLimitCreateManyUserInput | UsageLimitCreateManyUserInput[]
  }

  export type InstanceUpsertWithWhereUniqueWithoutUserInput = {
    where: InstanceWhereUniqueInput
    update: XOR<InstanceUpdateWithoutUserInput, InstanceUncheckedUpdateWithoutUserInput>
    create: XOR<InstanceCreateWithoutUserInput, InstanceUncheckedCreateWithoutUserInput>
  }

  export type InstanceUpdateWithWhereUniqueWithoutUserInput = {
    where: InstanceWhereUniqueInput
    data: XOR<InstanceUpdateWithoutUserInput, InstanceUncheckedUpdateWithoutUserInput>
  }

  export type InstanceUpdateManyWithWhereWithoutUserInput = {
    where: InstanceScalarWhereInput
    data: XOR<InstanceUpdateManyMutationInput, InstanceUncheckedUpdateManyWithoutUserInput>
  }

  export type InstanceScalarWhereInput = {
    AND?: InstanceScalarWhereInput | InstanceScalarWhereInput[]
    OR?: InstanceScalarWhereInput[]
    NOT?: InstanceScalarWhereInput | InstanceScalarWhereInput[]
    id?: StringFilter<"Instance"> | string
    name?: StringFilter<"Instance"> | string
    description?: StringNullableFilter<"Instance"> | string | null
    userId?: StringFilter<"Instance"> | string
    status?: StringFilter<"Instance"> | string
    qrCode?: StringNullableFilter<"Instance"> | string | null
    webhookUrl?: StringNullableFilter<"Instance"> | string | null
    webhookEnabled?: BoolFilter<"Instance"> | boolean
    sentMessages?: IntFilter<"Instance"> | number
    receivedMessages?: IntFilter<"Instance"> | number
    credentials?: StringNullableFilter<"Instance"> | string | null
    lastActivity?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authCreatedAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authExpiresAt?: DateTimeNullableFilter<"Instance"> | Date | string | null
    authRefreshToken?: StringNullableFilter<"Instance"> | string | null
    createdAt?: DateTimeFilter<"Instance"> | Date | string
    updatedAt?: DateTimeFilter<"Instance"> | Date | string
  }

  export type UsageLimitUpsertWithWhereUniqueWithoutUserInput = {
    where: UsageLimitWhereUniqueInput
    update: XOR<UsageLimitUpdateWithoutUserInput, UsageLimitUncheckedUpdateWithoutUserInput>
    create: XOR<UsageLimitCreateWithoutUserInput, UsageLimitUncheckedCreateWithoutUserInput>
  }

  export type UsageLimitUpdateWithWhereUniqueWithoutUserInput = {
    where: UsageLimitWhereUniqueInput
    data: XOR<UsageLimitUpdateWithoutUserInput, UsageLimitUncheckedUpdateWithoutUserInput>
  }

  export type UsageLimitUpdateManyWithWhereWithoutUserInput = {
    where: UsageLimitScalarWhereInput
    data: XOR<UsageLimitUpdateManyMutationInput, UsageLimitUncheckedUpdateManyWithoutUserInput>
  }

  export type UsageLimitScalarWhereInput = {
    AND?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
    OR?: UsageLimitScalarWhereInput[]
    NOT?: UsageLimitScalarWhereInput | UsageLimitScalarWhereInput[]
    id?: StringFilter<"UsageLimit"> | string
    userId?: StringNullableFilter<"UsageLimit"> | string | null
    instanceId?: StringNullableFilter<"UsageLimit"> | string | null
    isDefault?: BoolFilter<"UsageLimit"> | boolean
    maxMessagesSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMessagesReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSent?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaReceived?: IntNullableFilter<"UsageLimit"> | number | null
    maxMediaSize?: IntNullableFilter<"UsageLimit"> | number | null
    maxApiCalls?: IntNullableFilter<"UsageLimit"> | number | null
    maxWebhookCalls?: IntNullableFilter<"UsageLimit"> | number | null
    timeWindowHours?: IntFilter<"UsageLimit"> | number
    createdAt?: DateTimeFilter<"UsageLimit"> | Date | string
    updatedAt?: DateTimeFilter<"UsageLimit"> | Date | string
  }

  export type UserCreateWithoutInstancesInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLimits?: UsageLimitCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutInstancesInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutInstancesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutInstancesInput, UserUncheckedCreateWithoutInstancesInput>
  }

  export type WebhookSettingsCreateWithoutInstanceInput = {
    id?: string
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: number
    retryInterval?: number
    secret?: string | null
    headers?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookSettingsUncheckedCreateWithoutInstanceInput = {
    id?: string
    notifyReceived?: boolean
    notifySent?: boolean
    notifyDelivery?: boolean
    notifyRead?: boolean
    maxRetries?: number
    retryInterval?: number
    secret?: string | null
    headers?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WebhookSettingsCreateOrConnectWithoutInstanceInput = {
    where: WebhookSettingsWhereUniqueInput
    create: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
  }

  export type MessageCreateWithoutInstanceInput = {
    id?: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUncheckedCreateWithoutInstanceInput = {
    id?: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageCreateOrConnectWithoutInstanceInput = {
    where: MessageWhereUniqueInput
    create: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput>
  }

  export type MessageCreateManyInstanceInputEnvelope = {
    data: MessageCreateManyInstanceInput | MessageCreateManyInstanceInput[]
  }

  export type ActivityLogCreateWithoutInstanceInput = {
    id?: string
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogUncheckedCreateWithoutInstanceInput = {
    id?: string
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type ActivityLogCreateOrConnectWithoutInstanceInput = {
    where: ActivityLogWhereUniqueInput
    create: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput>
  }

  export type ActivityLogCreateManyInstanceInputEnvelope = {
    data: ActivityLogCreateManyInstanceInput | ActivityLogCreateManyInstanceInput[]
  }

  export type WebhookLogCreateWithoutInstanceInput = {
    id?: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type WebhookLogUncheckedCreateWithoutInstanceInput = {
    id?: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type WebhookLogCreateOrConnectWithoutInstanceInput = {
    where: WebhookLogWhereUniqueInput
    create: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput>
  }

  export type WebhookLogCreateManyInstanceInputEnvelope = {
    data: WebhookLogCreateManyInstanceInput | WebhookLogCreateManyInstanceInput[]
  }

  export type InstanceUsageCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUsageUncheckedCreateWithoutInstanceInput = {
    id?: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUsageCreateOrConnectWithoutInstanceInput = {
    where: InstanceUsageWhereUniqueInput
    create: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput>
  }

  export type InstanceUsageCreateManyInstanceInputEnvelope = {
    data: InstanceUsageCreateManyInstanceInput | InstanceUsageCreateManyInstanceInput[]
  }

  export type UsageLimitCreateWithoutInstanceInput = {
    id?: string
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutUsageLimitsInput
  }

  export type UsageLimitUncheckedCreateWithoutInstanceInput = {
    id?: string
    userId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitCreateOrConnectWithoutInstanceInput = {
    where: UsageLimitWhereUniqueInput
    create: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput>
  }

  export type UsageLimitCreateManyInstanceInputEnvelope = {
    data: UsageLimitCreateManyInstanceInput | UsageLimitCreateManyInstanceInput[]
  }

  export type ContactCreateWithoutInstanceInput = {
    id?: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactUncheckedCreateWithoutInstanceInput = {
    id?: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactCreateOrConnectWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput>
  }

  export type ContactCreateManyInstanceInputEnvelope = {
    data: ContactCreateManyInstanceInput | ContactCreateManyInstanceInput[]
  }

  export type UserUpsertWithoutInstancesInput = {
    update: XOR<UserUpdateWithoutInstancesInput, UserUncheckedUpdateWithoutInstancesInput>
    create: XOR<UserCreateWithoutInstancesInput, UserUncheckedCreateWithoutInstancesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutInstancesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutInstancesInput, UserUncheckedUpdateWithoutInstancesInput>
  }

  export type UserUpdateWithoutInstancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLimits?: UsageLimitUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutInstancesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WebhookSettingsUpsertWithoutInstanceInput = {
    update: XOR<WebhookSettingsUpdateWithoutInstanceInput, WebhookSettingsUncheckedUpdateWithoutInstanceInput>
    create: XOR<WebhookSettingsCreateWithoutInstanceInput, WebhookSettingsUncheckedCreateWithoutInstanceInput>
    where?: WebhookSettingsWhereInput
  }

  export type WebhookSettingsUpdateToOneWithWhereWithoutInstanceInput = {
    where?: WebhookSettingsWhereInput
    data: XOR<WebhookSettingsUpdateWithoutInstanceInput, WebhookSettingsUncheckedUpdateWithoutInstanceInput>
  }

  export type WebhookSettingsUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookSettingsUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    notifyReceived?: BoolFieldUpdateOperationsInput | boolean
    notifySent?: BoolFieldUpdateOperationsInput | boolean
    notifyDelivery?: BoolFieldUpdateOperationsInput | boolean
    notifyRead?: BoolFieldUpdateOperationsInput | boolean
    maxRetries?: IntFieldUpdateOperationsInput | number
    retryInterval?: IntFieldUpdateOperationsInput | number
    secret?: NullableStringFieldUpdateOperationsInput | string | null
    headers?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUpsertWithWhereUniqueWithoutInstanceInput = {
    where: MessageWhereUniqueInput
    update: XOR<MessageUpdateWithoutInstanceInput, MessageUncheckedUpdateWithoutInstanceInput>
    create: XOR<MessageCreateWithoutInstanceInput, MessageUncheckedCreateWithoutInstanceInput>
  }

  export type MessageUpdateWithWhereUniqueWithoutInstanceInput = {
    where: MessageWhereUniqueInput
    data: XOR<MessageUpdateWithoutInstanceInput, MessageUncheckedUpdateWithoutInstanceInput>
  }

  export type MessageUpdateManyWithWhereWithoutInstanceInput = {
    where: MessageScalarWhereInput
    data: XOR<MessageUpdateManyMutationInput, MessageUncheckedUpdateManyWithoutInstanceInput>
  }

  export type MessageScalarWhereInput = {
    AND?: MessageScalarWhereInput | MessageScalarWhereInput[]
    OR?: MessageScalarWhereInput[]
    NOT?: MessageScalarWhereInput | MessageScalarWhereInput[]
    id?: StringFilter<"Message"> | string
    instanceId?: StringFilter<"Message"> | string
    remoteJid?: StringFilter<"Message"> | string
    fromMe?: BoolFilter<"Message"> | boolean
    messageType?: StringFilter<"Message"> | string
    content?: StringFilter<"Message"> | string
    messageId?: StringFilter<"Message"> | string
    hasMedia?: BoolFilter<"Message"> | boolean
    mediaUrl?: StringNullableFilter<"Message"> | string | null
    caption?: StringNullableFilter<"Message"> | string | null
    mimeType?: StringNullableFilter<"Message"> | string | null
    fileName?: StringNullableFilter<"Message"> | string | null
    status?: StringFilter<"Message"> | string
    statusUpdatedAt?: DateTimeNullableFilter<"Message"> | Date | string | null
    metadata?: StringNullableFilter<"Message"> | string | null
    createdAt?: DateTimeFilter<"Message"> | Date | string
    updatedAt?: DateTimeFilter<"Message"> | Date | string
  }

  export type ActivityLogUpsertWithWhereUniqueWithoutInstanceInput = {
    where: ActivityLogWhereUniqueInput
    update: XOR<ActivityLogUpdateWithoutInstanceInput, ActivityLogUncheckedUpdateWithoutInstanceInput>
    create: XOR<ActivityLogCreateWithoutInstanceInput, ActivityLogUncheckedCreateWithoutInstanceInput>
  }

  export type ActivityLogUpdateWithWhereUniqueWithoutInstanceInput = {
    where: ActivityLogWhereUniqueInput
    data: XOR<ActivityLogUpdateWithoutInstanceInput, ActivityLogUncheckedUpdateWithoutInstanceInput>
  }

  export type ActivityLogUpdateManyWithWhereWithoutInstanceInput = {
    where: ActivityLogScalarWhereInput
    data: XOR<ActivityLogUpdateManyMutationInput, ActivityLogUncheckedUpdateManyWithoutInstanceInput>
  }

  export type ActivityLogScalarWhereInput = {
    AND?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    OR?: ActivityLogScalarWhereInput[]
    NOT?: ActivityLogScalarWhereInput | ActivityLogScalarWhereInput[]
    id?: StringFilter<"ActivityLog"> | string
    instanceId?: StringFilter<"ActivityLog"> | string
    action?: StringFilter<"ActivityLog"> | string
    details?: StringNullableFilter<"ActivityLog"> | string | null
    createdAt?: DateTimeFilter<"ActivityLog"> | Date | string
  }

  export type WebhookLogUpsertWithWhereUniqueWithoutInstanceInput = {
    where: WebhookLogWhereUniqueInput
    update: XOR<WebhookLogUpdateWithoutInstanceInput, WebhookLogUncheckedUpdateWithoutInstanceInput>
    create: XOR<WebhookLogCreateWithoutInstanceInput, WebhookLogUncheckedCreateWithoutInstanceInput>
  }

  export type WebhookLogUpdateWithWhereUniqueWithoutInstanceInput = {
    where: WebhookLogWhereUniqueInput
    data: XOR<WebhookLogUpdateWithoutInstanceInput, WebhookLogUncheckedUpdateWithoutInstanceInput>
  }

  export type WebhookLogUpdateManyWithWhereWithoutInstanceInput = {
    where: WebhookLogScalarWhereInput
    data: XOR<WebhookLogUpdateManyMutationInput, WebhookLogUncheckedUpdateManyWithoutInstanceInput>
  }

  export type WebhookLogScalarWhereInput = {
    AND?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
    OR?: WebhookLogScalarWhereInput[]
    NOT?: WebhookLogScalarWhereInput | WebhookLogScalarWhereInput[]
    id?: StringFilter<"WebhookLog"> | string
    instanceId?: StringFilter<"WebhookLog"> | string
    webhookUrl?: StringFilter<"WebhookLog"> | string
    payload?: StringFilter<"WebhookLog"> | string
    response?: StringNullableFilter<"WebhookLog"> | string | null
    statusCode?: IntNullableFilter<"WebhookLog"> | number | null
    success?: BoolFilter<"WebhookLog"> | boolean
    attempt?: IntFilter<"WebhookLog"> | number
    errorMessage?: StringNullableFilter<"WebhookLog"> | string | null
    createdAt?: DateTimeFilter<"WebhookLog"> | Date | string
  }

  export type InstanceUsageUpsertWithWhereUniqueWithoutInstanceInput = {
    where: InstanceUsageWhereUniqueInput
    update: XOR<InstanceUsageUpdateWithoutInstanceInput, InstanceUsageUncheckedUpdateWithoutInstanceInput>
    create: XOR<InstanceUsageCreateWithoutInstanceInput, InstanceUsageUncheckedCreateWithoutInstanceInput>
  }

  export type InstanceUsageUpdateWithWhereUniqueWithoutInstanceInput = {
    where: InstanceUsageWhereUniqueInput
    data: XOR<InstanceUsageUpdateWithoutInstanceInput, InstanceUsageUncheckedUpdateWithoutInstanceInput>
  }

  export type InstanceUsageUpdateManyWithWhereWithoutInstanceInput = {
    where: InstanceUsageScalarWhereInput
    data: XOR<InstanceUsageUpdateManyMutationInput, InstanceUsageUncheckedUpdateManyWithoutInstanceInput>
  }

  export type InstanceUsageScalarWhereInput = {
    AND?: InstanceUsageScalarWhereInput | InstanceUsageScalarWhereInput[]
    OR?: InstanceUsageScalarWhereInput[]
    NOT?: InstanceUsageScalarWhereInput | InstanceUsageScalarWhereInput[]
    id?: StringFilter<"InstanceUsage"> | string
    instanceId?: StringFilter<"InstanceUsage"> | string
    date?: DateTimeFilter<"InstanceUsage"> | Date | string
    messagesSent?: IntFilter<"InstanceUsage"> | number
    messagesReceived?: IntFilter<"InstanceUsage"> | number
    mediaSent?: IntFilter<"InstanceUsage"> | number
    mediaReceived?: IntFilter<"InstanceUsage"> | number
    totalMediaSize?: IntFilter<"InstanceUsage"> | number
    apiCalls?: IntFilter<"InstanceUsage"> | number
    webhookSent?: IntFilter<"InstanceUsage"> | number
    memoryUsage?: IntNullableFilter<"InstanceUsage"> | number | null
    cpuUsage?: FloatNullableFilter<"InstanceUsage"> | number | null
    createdAt?: DateTimeFilter<"InstanceUsage"> | Date | string
    updatedAt?: DateTimeFilter<"InstanceUsage"> | Date | string
  }

  export type UsageLimitUpsertWithWhereUniqueWithoutInstanceInput = {
    where: UsageLimitWhereUniqueInput
    update: XOR<UsageLimitUpdateWithoutInstanceInput, UsageLimitUncheckedUpdateWithoutInstanceInput>
    create: XOR<UsageLimitCreateWithoutInstanceInput, UsageLimitUncheckedCreateWithoutInstanceInput>
  }

  export type UsageLimitUpdateWithWhereUniqueWithoutInstanceInput = {
    where: UsageLimitWhereUniqueInput
    data: XOR<UsageLimitUpdateWithoutInstanceInput, UsageLimitUncheckedUpdateWithoutInstanceInput>
  }

  export type UsageLimitUpdateManyWithWhereWithoutInstanceInput = {
    where: UsageLimitScalarWhereInput
    data: XOR<UsageLimitUpdateManyMutationInput, UsageLimitUncheckedUpdateManyWithoutInstanceInput>
  }

  export type ContactUpsertWithWhereUniqueWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutInstanceInput, ContactUncheckedUpdateWithoutInstanceInput>
    create: XOR<ContactCreateWithoutInstanceInput, ContactUncheckedCreateWithoutInstanceInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutInstanceInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutInstanceInput, ContactUncheckedUpdateWithoutInstanceInput>
  }

  export type ContactUpdateManyWithWhereWithoutInstanceInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutInstanceInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    id?: StringFilter<"Contact"> | string
    instanceId?: StringFilter<"Contact"> | string
    name?: StringNullableFilter<"Contact"> | string | null
    number?: StringFilter<"Contact"> | string
    remoteJid?: StringFilter<"Contact"> | string
    pushName?: StringNullableFilter<"Contact"> | string | null
    isGroup?: BoolFilter<"Contact"> | boolean
    profilePicture?: StringNullableFilter<"Contact"> | string | null
    about?: StringNullableFilter<"Contact"> | string | null
    lastActivity?: DateTimeNullableFilter<"Contact"> | Date | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    updatedAt?: DateTimeFilter<"Contact"> | Date | string
  }

  export type InstanceCreateWithoutWebhookSettingsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutWebhookSettingsInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutWebhookSettingsInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutWebhookSettingsInput, InstanceUncheckedCreateWithoutWebhookSettingsInput>
  }

  export type InstanceUpsertWithoutWebhookSettingsInput = {
    update: XOR<InstanceUpdateWithoutWebhookSettingsInput, InstanceUncheckedUpdateWithoutWebhookSettingsInput>
    create: XOR<InstanceCreateWithoutWebhookSettingsInput, InstanceUncheckedCreateWithoutWebhookSettingsInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutWebhookSettingsInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutWebhookSettingsInput, InstanceUncheckedUpdateWithoutWebhookSettingsInput>
  }

  export type InstanceUpdateWithoutWebhookSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutWebhookSettingsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutMessagesInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutMessagesInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutMessagesInput, InstanceUncheckedCreateWithoutMessagesInput>
  }

  export type InstanceUpsertWithoutMessagesInput = {
    update: XOR<InstanceUpdateWithoutMessagesInput, InstanceUncheckedUpdateWithoutMessagesInput>
    create: XOR<InstanceCreateWithoutMessagesInput, InstanceUncheckedCreateWithoutMessagesInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutMessagesInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutMessagesInput, InstanceUncheckedUpdateWithoutMessagesInput>
  }

  export type InstanceUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutMessagesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateWithoutContactInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutContactInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutContactInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutContactInput, InstanceUncheckedCreateWithoutContactInput>
  }

  export type InstanceUpsertWithoutContactInput = {
    update: XOR<InstanceUpdateWithoutContactInput, InstanceUncheckedUpdateWithoutContactInput>
    create: XOR<InstanceCreateWithoutContactInput, InstanceUncheckedCreateWithoutContactInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutContactInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutContactInput, InstanceUncheckedUpdateWithoutContactInput>
  }

  export type InstanceUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutContactInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutActivityLogsInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutActivityLogsInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutActivityLogsInput, InstanceUncheckedCreateWithoutActivityLogsInput>
  }

  export type InstanceUpsertWithoutActivityLogsInput = {
    update: XOR<InstanceUpdateWithoutActivityLogsInput, InstanceUncheckedUpdateWithoutActivityLogsInput>
    create: XOR<InstanceCreateWithoutActivityLogsInput, InstanceUncheckedCreateWithoutActivityLogsInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutActivityLogsInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutActivityLogsInput, InstanceUncheckedUpdateWithoutActivityLogsInput>
  }

  export type InstanceUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutActivityLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateWithoutWebhookLogsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutWebhookLogsInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutWebhookLogsInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutWebhookLogsInput, InstanceUncheckedCreateWithoutWebhookLogsInput>
  }

  export type InstanceUpsertWithoutWebhookLogsInput = {
    update: XOR<InstanceUpdateWithoutWebhookLogsInput, InstanceUncheckedUpdateWithoutWebhookLogsInput>
    create: XOR<InstanceCreateWithoutWebhookLogsInput, InstanceUncheckedCreateWithoutWebhookLogsInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutWebhookLogsInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutWebhookLogsInput, InstanceUncheckedUpdateWithoutWebhookLogsInput>
  }

  export type InstanceUpdateWithoutWebhookLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutWebhookLogsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateWithoutInstanceUsageInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutInstanceUsageInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    usageLimits?: UsageLimitUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutInstanceUsageInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutInstanceUsageInput, InstanceUncheckedCreateWithoutInstanceUsageInput>
  }

  export type InstanceUpsertWithoutInstanceUsageInput = {
    update: XOR<InstanceUpdateWithoutInstanceUsageInput, InstanceUncheckedUpdateWithoutInstanceUsageInput>
    create: XOR<InstanceCreateWithoutInstanceUsageInput, InstanceUncheckedCreateWithoutInstanceUsageInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutInstanceUsageInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutInstanceUsageInput, InstanceUncheckedUpdateWithoutInstanceUsageInput>
  }

  export type InstanceUpdateWithoutInstanceUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutInstanceUsageInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type UserCreateWithoutUsageLimitsInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instances?: InstanceCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutUsageLimitsInput = {
    id?: string
    email: string
    password: string
    firstName?: string | null
    lastName?: string | null
    apiKey: string
    isAdmin?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    instances?: InstanceUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutUsageLimitsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutUsageLimitsInput, UserUncheckedCreateWithoutUsageLimitsInput>
  }

  export type InstanceCreateWithoutUsageLimitsInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutInstancesInput
    webhookSettings?: WebhookSettingsCreateNestedOneWithoutInstanceInput
    messages?: MessageCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageCreateNestedManyWithoutInstanceInput
    Contact?: ContactCreateNestedManyWithoutInstanceInput
  }

  export type InstanceUncheckedCreateWithoutUsageLimitsInput = {
    id?: string
    name: string
    description?: string | null
    userId: string
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    webhookSettings?: WebhookSettingsUncheckedCreateNestedOneWithoutInstanceInput
    messages?: MessageUncheckedCreateNestedManyWithoutInstanceInput
    activityLogs?: ActivityLogUncheckedCreateNestedManyWithoutInstanceInput
    webhookLogs?: WebhookLogUncheckedCreateNestedManyWithoutInstanceInput
    instanceUsage?: InstanceUsageUncheckedCreateNestedManyWithoutInstanceInput
    Contact?: ContactUncheckedCreateNestedManyWithoutInstanceInput
  }

  export type InstanceCreateOrConnectWithoutUsageLimitsInput = {
    where: InstanceWhereUniqueInput
    create: XOR<InstanceCreateWithoutUsageLimitsInput, InstanceUncheckedCreateWithoutUsageLimitsInput>
  }

  export type UserUpsertWithoutUsageLimitsInput = {
    update: XOR<UserUpdateWithoutUsageLimitsInput, UserUncheckedUpdateWithoutUsageLimitsInput>
    create: XOR<UserCreateWithoutUsageLimitsInput, UserUncheckedCreateWithoutUsageLimitsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutUsageLimitsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutUsageLimitsInput, UserUncheckedUpdateWithoutUsageLimitsInput>
  }

  export type UserUpdateWithoutUsageLimitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instances?: InstanceUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutUsageLimitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastName?: NullableStringFieldUpdateOperationsInput | string | null
    apiKey?: StringFieldUpdateOperationsInput | string
    isAdmin?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instances?: InstanceUncheckedUpdateManyWithoutUserNestedInput
  }

  export type InstanceUpsertWithoutUsageLimitsInput = {
    update: XOR<InstanceUpdateWithoutUsageLimitsInput, InstanceUncheckedUpdateWithoutUsageLimitsInput>
    create: XOR<InstanceCreateWithoutUsageLimitsInput, InstanceUncheckedCreateWithoutUsageLimitsInput>
    where?: InstanceWhereInput
  }

  export type InstanceUpdateToOneWithWhereWithoutUsageLimitsInput = {
    where?: InstanceWhereInput
    data: XOR<InstanceUpdateWithoutUsageLimitsInput, InstanceUncheckedUpdateWithoutUsageLimitsInput>
  }

  export type InstanceUpdateWithoutUsageLimitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutInstancesNestedInput
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutUsageLimitsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceCreateManyUserInput = {
    id?: string
    name: string
    description?: string | null
    status?: string
    qrCode?: string | null
    webhookUrl?: string | null
    webhookEnabled?: boolean
    sentMessages?: number
    receivedMessages?: number
    credentials?: string | null
    lastActivity?: Date | string | null
    authCreatedAt?: Date | string | null
    authExpiresAt?: Date | string | null
    authRefreshToken?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitCreateManyUserInput = {
    id?: string
    instanceId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type InstanceUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUpdateOneWithoutInstanceNestedInput
    messages?: MessageUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    webhookSettings?: WebhookSettingsUncheckedUpdateOneWithoutInstanceNestedInput
    messages?: MessageUncheckedUpdateManyWithoutInstanceNestedInput
    activityLogs?: ActivityLogUncheckedUpdateManyWithoutInstanceNestedInput
    webhookLogs?: WebhookLogUncheckedUpdateManyWithoutInstanceNestedInput
    instanceUsage?: InstanceUsageUncheckedUpdateManyWithoutInstanceNestedInput
    usageLimits?: UsageLimitUncheckedUpdateManyWithoutInstanceNestedInput
    Contact?: ContactUncheckedUpdateManyWithoutInstanceNestedInput
  }

  export type InstanceUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    qrCode?: NullableStringFieldUpdateOperationsInput | string | null
    webhookUrl?: NullableStringFieldUpdateOperationsInput | string | null
    webhookEnabled?: BoolFieldUpdateOperationsInput | boolean
    sentMessages?: IntFieldUpdateOperationsInput | number
    receivedMessages?: IntFieldUpdateOperationsInput | number
    credentials?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authCreatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    authRefreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    instance?: InstanceUpdateOneWithoutUsageLimitsNestedInput
  }

  export type UsageLimitUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    instanceId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageCreateManyInstanceInput = {
    id?: string
    remoteJid: string
    fromMe: boolean
    messageType: string
    content: string
    messageId: string
    hasMedia?: boolean
    mediaUrl?: string | null
    caption?: string | null
    mimeType?: string | null
    fileName?: string | null
    status?: string
    statusUpdatedAt?: Date | string | null
    metadata?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ActivityLogCreateManyInstanceInput = {
    id?: string
    action: string
    details?: string | null
    createdAt?: Date | string
  }

  export type WebhookLogCreateManyInstanceInput = {
    id?: string
    webhookUrl: string
    payload: string
    response?: string | null
    statusCode?: number | null
    success: boolean
    attempt?: number
    errorMessage?: string | null
    createdAt?: Date | string
  }

  export type InstanceUsageCreateManyInstanceInput = {
    id?: string
    date: Date | string
    messagesSent?: number
    messagesReceived?: number
    mediaSent?: number
    mediaReceived?: number
    totalMediaSize?: number
    apiCalls?: number
    webhookSent?: number
    memoryUsage?: number | null
    cpuUsage?: number | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UsageLimitCreateManyInstanceInput = {
    id?: string
    userId?: string | null
    isDefault?: boolean
    maxMessagesSent?: number | null
    maxMessagesReceived?: number | null
    maxMediaSent?: number | null
    maxMediaReceived?: number | null
    maxMediaSize?: number | null
    maxApiCalls?: number | null
    maxWebhookCalls?: number | null
    timeWindowHours?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ContactCreateManyInstanceInput = {
    id?: string
    name?: string | null
    number: string
    remoteJid: string
    pushName?: string | null
    isGroup?: boolean
    profilePicture?: string | null
    about?: string | null
    lastActivity?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MessageUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MessageUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    fromMe?: BoolFieldUpdateOperationsInput | boolean
    messageType?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    messageId?: StringFieldUpdateOperationsInput | string
    hasMedia?: BoolFieldUpdateOperationsInput | boolean
    mediaUrl?: NullableStringFieldUpdateOperationsInput | string | null
    caption?: NullableStringFieldUpdateOperationsInput | string | null
    mimeType?: NullableStringFieldUpdateOperationsInput | string | null
    fileName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    statusUpdatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    metadata?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ActivityLogUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    action?: StringFieldUpdateOperationsInput | string
    details?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WebhookLogUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    webhookUrl?: StringFieldUpdateOperationsInput | string
    payload?: StringFieldUpdateOperationsInput | string
    response?: NullableStringFieldUpdateOperationsInput | string | null
    statusCode?: NullableIntFieldUpdateOperationsInput | number | null
    success?: BoolFieldUpdateOperationsInput | boolean
    attempt?: IntFieldUpdateOperationsInput | number
    errorMessage?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InstanceUsageUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    messagesSent?: IntFieldUpdateOperationsInput | number
    messagesReceived?: IntFieldUpdateOperationsInput | number
    mediaSent?: IntFieldUpdateOperationsInput | number
    mediaReceived?: IntFieldUpdateOperationsInput | number
    totalMediaSize?: IntFieldUpdateOperationsInput | number
    apiCalls?: IntFieldUpdateOperationsInput | number
    webhookSent?: IntFieldUpdateOperationsInput | number
    memoryUsage?: NullableIntFieldUpdateOperationsInput | number | null
    cpuUsage?: NullableFloatFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutUsageLimitsNestedInput
  }

  export type UsageLimitUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsageLimitUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    isDefault?: BoolFieldUpdateOperationsInput | boolean
    maxMessagesSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMessagesReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSent?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaReceived?: NullableIntFieldUpdateOperationsInput | number | null
    maxMediaSize?: NullableIntFieldUpdateOperationsInput | number | null
    maxApiCalls?: NullableIntFieldUpdateOperationsInput | number | null
    maxWebhookCalls?: NullableIntFieldUpdateOperationsInput | number | null
    timeWindowHours?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactUncheckedUpdateManyWithoutInstanceInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: NullableStringFieldUpdateOperationsInput | string | null
    number?: StringFieldUpdateOperationsInput | string
    remoteJid?: StringFieldUpdateOperationsInput | string
    pushName?: NullableStringFieldUpdateOperationsInput | string | null
    isGroup?: BoolFieldUpdateOperationsInput | boolean
    profilePicture?: NullableStringFieldUpdateOperationsInput | string | null
    about?: NullableStringFieldUpdateOperationsInput | string | null
    lastActivity?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}