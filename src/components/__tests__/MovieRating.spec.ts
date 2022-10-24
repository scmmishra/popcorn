import { describe, it, expect } from "vitest";

import { mount, VueWrapper } from "@vue/test-utils";
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

  it.only("matches snapshot", () => {
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
    let wrapper = getComponent(4);
  });
});
