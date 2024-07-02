/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

export type ProviderProps = {
  children: React.ReactNode;
};

export type Path<T, K extends keyof T = keyof T> = K extends string
  ? T[K] extends Record<string, any>
    ? `${K}.${Path<T[K]>}`
    : K
  : never;
