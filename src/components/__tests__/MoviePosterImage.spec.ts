import { describe, it, expect } from "vitest";

import { mount, VueWrapper } from "@vue/test-utils";
import MoviePosterImageVue from "../MoviePosterImage.vue";
import defaultImage from "@/assets/default.png";

function getComponent(
  poster_path: string,
  title = "Testing this movie"
): VueWrapper {
  return mount(MoviePosterImageVue, {
    props: { poster_path, title },
  });
}

describe("MoviePosterImage", () => {
  it("renders properly", () => {
    const wrapper = getComponent("test.jpg");
    expect(wrapper.html()).toContain("test.jpg");
    expect(wrapper.html()).toMatchInlineSnapshot(
      '"<img src=\\"https://image.tmdb.org/t/p/w500/test.jpg\\" alt=\\"Testing this movie\\">"'
    );
  });

  it("renders the default image on error", () => {
    const wrapper = getComponent("test.jpg");
    wrapper.trigger("error");
    // this should test the setAltImage function too
    expect(wrapper.html()).toContain(defaultImage);
  });
});
