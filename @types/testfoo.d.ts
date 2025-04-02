// types/testfoo.d.ts
declare module "testfoo" {
  export interface ITest {
    disabled: boolean;
  }

  export class TestCl {
    constructor();
    go(): void;
  }
}
