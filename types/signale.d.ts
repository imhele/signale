/* Authors: Resi Respati <https://github.com/resir014>
 *          Kingdaro <https://github.com/kingdaro>
 *          Joydip Roy <https://github.com/rjoydip>
 *          Klaus Sinani <https://github.com/klaussinani>
 */

import { Level as ColorLevel } from 'chalk';
import dayjs from 'dayjs'
import { Writable as WritableStream } from 'stream';

export type DefaultLogger =
  | 'await'
  | 'complete'
  | 'debug'
  | 'error'
  | 'fatal'
  | 'fav'
  | 'info'
  | 'log'
  | 'note'
  | 'pause'
  | 'pending'
  | 'star'
  | 'start'
  | 'success'
  | 'wait'
  | 'warn'
  | 'watch';

export type ChalkColor =
  | 'black'
  | 'blue'
  | 'blueBright'
  | 'cyan'
  | 'cyanBright'
  | 'gray'
  | 'green'
  | 'greenBright'
  | 'magenta'
  | 'magentaBright'
  | 'red'
  | 'redBright'
  | 'white'
  | 'whiteBright'
  | 'yellow'
  | 'yellowBright';

export type Secret = (string | number)[];

export type LoggerFunction = (...message: any[]) => void;

export type LogLevel = 'info' | 'timer' | 'debug' | 'warn' | 'error';

export interface LoggerConfiguration {
  badge: string;
  color: ChalkColor;
  label: string;
  logLevel?: LogLevel;
  stream?: WritableStream | WritableStream[];
}

export interface SignaleConfiguration {
  displayBadge?: boolean;
  /** Set to a string to customize the output format of dayjs. */
  displayDate?: boolean | string;
  displayFilename?: boolean;
  displayLabel?: boolean;
  displayScope?: boolean;
  /** Set to a string to customize the output format of dayjs. */
  displayTimestamp?: boolean | string;
  underlineLabel?: boolean;
  underlineMessage?: boolean;
  underlinePrefix?: boolean;
  underlineSuffix?: boolean;
  uppercaseLabel?: boolean;
}

export interface SignaleConstructorOptions<T extends string> {
  colorLevel?: ColorLevel;
  config?: SignaleConfiguration;
  dayjs?: typeof dayjs;
  disabled?: boolean;
  interactive?: boolean;
  logLevel?: LogLevel;
  scope?: string;
  secrets?: Secret;
  stream?: WritableStream | WritableStream[];
  types?: Partial<Record<T, LoggerConfiguration>>;
}

export interface SignaleConstructor {
  new <T extends string = DefaultLogger>(
    options?: SignaleConstructorOptions<T>
  ): Signale<T>;
}

interface Base<T extends string = DefaultLogger> {
  addSecrets(secrets: Secret): void;
  clearSecrets(): void;
  config(configObj: SignaleConfiguration): Signale<T>;
  disable(): void;
  enable(): void;
  isEnabled(): boolean;
  scope(...name: string[]): Signale<T>;
  time(label?: string): string;
  timeEnd(label?: string): { label: string; span: number };
  unscope(): void;
}

export type Signale<T extends string = DefaultLogger> = Base<T> &
  Record<T, LoggerFunction> &
  Record<DefaultLogger, LoggerFunction>;

declare const signale: Signale & {
  Signale: SignaleConstructor;
};

export = signale;
