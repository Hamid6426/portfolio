// src/types/global.d.ts

import type { Mongoose } from "mongoose";

declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };
}

export {};
