import { describe, it, expect } from "vitest";

import { mount } from "@vue/test-utils";
import MovieCardVue from "../MovieCard.vue";

const mockMovie = () => {
  return {
    adult: false,
    backdrop_path: "/yNXarQfosBZADXVzdLlvDjsk8aq.jpg",
    genre_ids: [18, 35],
    id: 914216,
    original_language: "en",
    original_title: "The Lost King",
    overview:
      "An amateur historian defies the academic establishment in her efforts to find King Richard III's remains, which were lost for over 500 years.",
    popularity: 6.896,
    poster_path: "/bvteSajbZguotujz0e4Y8JpgJ1G.jpg",
    release_date: "2022-10-07",
    title: "The Lost King",
    video: false,
    vote_average: 8,
    vote_count: 5,
  };
};

describe("MovieCard", () => {
  it("renders properly", () => {
    const wrapper = mount(MovieCardVue, { props: mockMovie() });
    expect(wrapper.text()).toContain("The Lost King");
  });
});
