import { describe, it, expect, vi } from "vitest";

import { mount } from "@vue/test-utils";
import MovieRatingVue from "../MovieRating.vue";

function toFixedNumber(num: number, digits = 2) {
  let pow = Math.pow(10, digits);
  return Math.round(num * pow) / pow;
}

function getComponent(value?: number) {
  return mount(MovieRatingVue, {
    props: { value },
  });
}

describe("MovieRating", () => {
  it("passes brute force rendering", () => {
    // This is a brute force rendering test.
    // It's not very useful but validates for
    // sure that the component renders
    // the correct percentage value each time

    Array.from(Array(100))
      .map(() => toFixedNumber(Math.random() * 10))
      .forEach((value) => {
        const percentageValue = Math.round((value / 10) * 100);
        const wrapper = getComponent(value);

        expect(wrapper.html()).toContain(`data-pct="${percentageValue}"`);
      });
  });

  it("matches snapshot", () => {
    // This is a snapshot test to ensure that any
    // generated svg from the 0 to 10 range is valid
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((value) => {
      let wrapper = getComponent(10);
      expect(wrapper.html()).toMatchSnapshot();

      wrapper = getComponent();
      expect(wrapper.html()).toMatchSnapshot();
    });
  });

  it("returns errors for invalid values", () => {
    // A tricky maneuver to test the warning
    // mock the console.warn function
    // test the execution
    // restore the original console.warn function
    const mockedWarn = vi.fn(() => console.log("WARNING EXECUTED"));
    const originalWarn = console.warn;
    console.warn = mockedWarn;

    getComponent(-4);
    expect(mockedWarn).toHaveBeenCalledOnce();

    console.warn = originalWarn;
  });
});
